import React, { Component } from 'react';
import { quotes } from '../quotes.js';

import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text
} from 'react-native';
import PulseLoader from './PulseLoader';

const randomIndex = Math.floor(Math.random() * Math.floor(quotes.length));

const fsa = require('../assets/fsa.jpeg')
const Loader = props => {
    const {
        loading,
        ...attributes
    } = props;
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => console.log('Closed')}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <Text style={{ fontSize: 24, fontStyle: 'italic', marginTop: 250 }}>The Full-Stack Apprenticeship</Text>
                    <View>
                        <PulseLoader
                            avatar={fsa}
                            size={150}
                            backgroundColor="#7851a9"
                            borderColor="#7851a9"
                        />
                        <Text style={{ fontSize: 20, fontStyle: "italic", marginBottom: 250, marginRight: 10, marginLeft: 10 }}>{quotes[randomIndex].quote}
                            {'\n'}{'\n'}{quotes[randomIndex].author}
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}




const styles = StyleSheet.create({
    modalBackground: {
        flex: 0,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default Loader;