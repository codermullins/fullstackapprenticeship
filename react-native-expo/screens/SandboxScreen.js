import React, {Component} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CardScreen from "../screens/CardScreen";
// import DashboardScreen from "./DashboardScreen"
// import ProgressChart from "../components/ProgressChart";

class SandboxScreen extends Component
{
    render()
    {
        return (
        <CardScreen />
        // <DashboardScreen />
        // <ProgressChart />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SandboxScreen;