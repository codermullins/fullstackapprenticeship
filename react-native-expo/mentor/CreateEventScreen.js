import React, { Component } from 'react';
import { API } from "aws-amplify";
import DateTimePicker from "react-native-modal-datetime-picker"
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import uuidv4 from "uuid";
import { Text, TouchableOpacity, View } from 'react-native';

export default class CreatEventScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            start: "",
            end: "",
            link: "Pareto",
            mentorId: 'b245324f-39d5-4d27-a1a4-e31358ebdb84',
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false
        }
    }

    handlePress = async () => {
        let uri = 'https://exp.host/--/api/v2/push/send'

        generateNotification = (key) => {
            let notification = {
                to: key,
                title: this.state.name,
                body: this.state.description,
                ttl: 0,
                priority: 'high',
            }
            return notification;
        }
        const keys = this.props.navigation.getParam('keys', 'none');
        let students = [];

        for (i = 0; i < keys.length; i++) {
            if (keys[i].length < 10) {
                continue;
            } else {
                let student = generateNotification(keys[i])
                students.push(student);
            }
        }

        const body = {
            id: uuidv4(),
            mentorId: this.state.mentorId,
            name: this.state.name,
            description: this.state.description,
            link: this.state.link,
            date: this.state.chosenDate,
            start: this.state.start,
            end: this.state.end,
            createdAt: Date.now()
        }
        try {
            const response = await API.post('events', '/events', { body })
            await console.log('Lambda Response: ', response);
            let notifications = await fetch(uri, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(students)
            })
            await console.log('Response: ', notifications)
            await console.log('Students array: ', students)
            this.props.screenProps.childProps.fetchEvents()
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

    showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

    showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

    hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

    hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

    handleStartDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({ start: date })
        this.hideStartDateTimePicker();
    };

    handleEndDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({ end: date })

        this.hideEndDateTimePicker();
    };

    render() {
        console.log('Create event: ', this.props.screenProps.childProps)
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Event Name</Label>
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
                        <Text>{`\n`}</Text>
                        <Item stackedLabel>
                            <Label>Room Name</Label>
                            <Input
                                placeholder="pareto"
                                returnKeyType="search"
                                value={this.state.link}
                                onChangeText={(link) => this.setState({ link })}
                                autoCapitalize="none"
                            />
                        </Item>

                        <Text>{`\n`}</Text>


                        <View style={{ paddingLeft: 15 }}>
                            <TouchableOpacity onPress={this.showStartDateTimePicker}>
                                <Text style={{ textDecorationLine: 'underline' }}>Select Start Time</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.startDateTimePickerVisible}
                                onConfirm={this.handleStartDatePicked}
                                onCancel={this.hideStartDateTimePicker}
                                mode="datetime"
                            />
                            <Text>Start: {this.state.start.toString()}</Text>
                        </View>

                        <Text>{`\n`}</Text>

                        <View style={{ paddingLeft: 15 }}>
                            <TouchableOpacity onPress={this.showEndDateTimePicker}>
                                <Text style={{ textDecorationLine: 'underline' }}>Select End Time</Text>
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
                            <Text style={{ color: 'white' }}>Create Event</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

