import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text
} from 'react-native';
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
                <Text style={{fontSize: 60, fontStyle: 'italic', marginTop: 150}}>FSA</Text>
                    <Text style={{fontSize: 30, fontStyle: 'italic', marginTop: 100}}>Now Loading</Text>
                    <ActivityIndicator
                        animating={loading}
                        size="large"
                        color="#0000ff"
                        />                    
                    <Text style={{fontSize: 24, marginBottom: 150}}>"People think that programming is this pure kind of logical thinking, when it's mostly 99% banging your head against a wall until the wall gives" - Jeff Atwood</Text>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: '100%',
        width: '100%',
        // borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
export default Loader;