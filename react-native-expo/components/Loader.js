import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text
} from 'react-native';
import PulseLoader from 'react-native-pulse-loader';
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
                <Text style={{fontSize: 30, fontStyle: 'italic', marginTop: 200, alignSelf: 'center'}}>The Full-Stack Apprenticeship</Text>
                <Text style={{fontSize: 24, fontStyle: 'italic', marginTop: 200}}>is Loading</Text>

                            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 250}}>
                            <PulseLoader
                            avatar={'https://s3.us-west-2.amazonaws.com/fsa-pictures/fsa.png?response-content-disposition=inline&X-Amz-Security-Token=AgoGb3JpZ2luEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiKAAlaZbOa4Ej98GZ%2F5hT9wPJQFboBDMzYJ%2FiUrkDflgPgbsd5p7V%2FyL0DeYMV1z5d29HtD424hkqVM%2BZW4LumHvYyxiFCsnjJ0b8D0%2Fh3anty8rEQPdMglomMPOya3%2BLlJymRC1MthNwU%2F6to%2FYZNs17yd%2F39emXwUJ39WuSnWfuN2MpvQ9Gv4kSt3AcWrIkjni%2F79CZcAUTEuKeEr3SGuhlu9KOoacUFPNwr0trJV1aHpVjzfpDQ%2FqIiUUtWwqYfKmdE5ztetzgACbxcPef8MX23zz%2BrOVJc%2FBgOWzMtuy7yy5Pbwzp5jWPx%2FsSlv8i%2FwTl60Dlwjj%2B7Fyu5AH5s3ARcq2wMIHRAAGgw5ODk4NTMzMTI5MTUiDGHYTV0Vjbh5c2A6Oyq4AyOcNlkmLHLHqzT%2BPPA5o2TxvnuKaluSDp0PrFn0RNmDWQYltytJbGMkMxhQmxq3pQvGWznpysJSOo%2FV4Sg0wLVsq4%2BHQD89m0TABUL5qPJpDtd8VTMmR7eQ%2FtW%2BtQKe%2Fjdm8fyxJpEUS8W%2BRaLJCpTPQ2gsHZWvvbO6rLMzoPMJEsVGRMp4q2FCWj95VTM4ZPNh%2BcJ2H6pVw0DbEYc0Hnb1CA2rbrPiKfDTMvS2nwiw7r3DpU6qVrH6%2FGRNYuzR9h66ZMXMSLvQYz6NhPsxJeWPRjn3wL0xeG3dIFubuQNBBRH%2BwcTd2wrCj9k6KcZ1jMmeex08DU5Y8Pa3BiFLt8FmIvfzuJBJ5o%2FSCRyLM37VmgfeaaV9y%2F7H%2FVpoG1hpCb16wkt86%2BlWSJj7ojngXP%2BEzvZPX%2BE%2FJGDC%2F3bad9MLwICV4wecURftZ7m2OeRAVJo36oxXOyOqIw8ai3nxkYRxu1XsT3jD%2Bey8QTTJtbXSVD6sF2U0pRmb8qzHfSKegogLqogZkP8ULxZmR1t3kMmXnYcT3g7I%2BR%2FFeC88LYpZGe2XqxGcJvRf3gKLUxIqU9uIHsfeYDOXMLyTpOUF&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190406T214045Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA6M56246J36657FV5%2F20190406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=f8b3ee48c59f79ea07bdef81dce12ceda003d8cca45f295661a475fea44d02d0'}
                            size={150}
                            backgroundColor="#7851a9"
                          />
                          <Text style={{fontSize: 20, fontStyle: "italic", marginBottom: 250, marginRight: 10, marginLeft: 10}}>"People think that programming is this pure kind of logical thinking, when it's mostly 99% banging your head against a wall until the wall gives" - Jeff Atwood</Text>
                          </View>
                    
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