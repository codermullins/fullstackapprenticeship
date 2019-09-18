import React, { Component } from 'react';
import { API } from "aws-amplify";
import DateTimePicker from "react-native-modal-datetime-picker"
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import { Text, TouchableOpacity, View } from 'react-native';

export default class TaskScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            start: "",
            end: "",
            link: "Pareto",
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false
        }
    }

    async componentDidMount() {
        const tasks = this.props.navigation.getParam('tasks', 'none')
        const id = this.props.navigation.getParam('mentorshipId', 'none')
        console.log('Tasks: ', tasks)
        console.log('ID: ', id)
    }

    handlePress = async () => {
        // let uri = 'https://exp.host/--/api/v2/push/send'

        // generateNotification = (key) => {
        //     let notification = {
        //         to: key,
        //         title: this.state.name,
        //         body: this.state.description,
        //         ttl: 0,
        //         priority: 'high',
        //     }
        //     return notification;
        // }
        // const keys = this.props.navigation.getParam('keys', 'none');
        // let students = [];

        // for (i = 0; i < keys.length; i++) {
        //     if (keys[i].length < 10) {
        //         continue;
        //     } else {
        //         let student = generateNotification(keys[i])
        //         students.push(student);
        //     }
        // }

        let newTask = {
            complete: false,
            details: this.state.description,
            title: this.state.name,
            dueDate: this.state.end,
            editorHtml: `<p>${this.state.details}</p>`,
            updatedAt: Date.now()
        }
        const updateEvents = this.props.navigation.getParam('updateEvents', 'none')
        let oldTasks = this.props.navigation.getParam('tasks', 'Null');
        let mentorshipId = this.props.navigation.getParam('mentorshipId', 'none')


        let updatedTasks = oldTasks.slice()

        updatedTasks.push(newTask)

        const body = {
            tasks: updatedTasks
        }

        try {
            const response = await API.put('pareto', `/relationship/${mentorshipId}`, { body })
            await console.log('Mentorship Response: ', response);
            updateEvents(response)
            // let notifications = await fetch(uri, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(students)
            // })
            // await console.log('Response: ', notifications)
            // await console.log('Students array: ', students)
            // this.props.screenProps.childProps.fetchEvents()
        } catch (e) {
            console.log('ERROR: ', e)
        }
        this.setState({
            name: "",
            description: "",
            chosenDate: new Date(),
            start: "",
            end: "",
            id: ""
        })
        this.props.navigation.goBack()
    }

    showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

    hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

    handleEndDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({ end: date })

        this.hideEndDateTimePicker();
    };

    render() {
        // console.log('Create event: ', this.props.screenProps.childProps)
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Task Name</Label>
                            <Input
                                // placeholder="Name"
                                returnKeyType="search"
                                value={this.state.name}
                                onChangeText={(name) => this.setState({ name })}
                                autoCapitalize="none"
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Description</Label>
                            <Input
                                placeholder=""
                                returnKeyType="search"
                                value={this.state.description}
                                onChangeText={(description) => this.setState({ description })}
                                autoCapitalize="none"
                            />
                        </Item>

                        <View style={{ paddingLeft: 15 }}>
                            <TouchableOpacity onPress={this.showEndDateTimePicker}>
                                <Text style={{ textDecorationLine: 'underline' }}>Due Date</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.endDateTimePickerVisible}
                                onConfirm={this.handleEndDatePicked}
                                onCancel={this.hideEndDateTimePicker}
                                mode="datetime"
                            />
                            <Text>End: {this.state.end.toString()} </Text>
                        </View>
                        <Text>{`\n`}</Text>
                        <Button full style={{ backgroundColor: "#6200EE" }} onPress={this.handlePress}>
                            <Text style={{ color: 'white' }}>Create Task</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

