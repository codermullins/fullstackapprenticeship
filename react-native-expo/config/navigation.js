import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
    createBottomTabNavigator,
} from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from '../screens/SettingsScreen';
import CreateEventScreen from "../screens/CreateEventScreen"
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from "../screens/EditProfileScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import PreviewScreen from "../screens/PreviewScreen";
import SandboxScreen from '../screens/SandboxScreen';
import SubcategoriesScreen from '../screens/SubcategoriesScreen';
import ContentScreen from "../screens/ContentScreen";
import BlueprintScreen from "../screens/BlueprintScreen";
import MessagesListScreen from '../screens/MessagesListScreen';
import WebPaymentScreen from "../screens/WebPaymentScreen";
import ExperienceScreen from "../screens/ExperienceScreen";
import AchievementScreen from "../screens/AchievementScreen";
import CreatePaymentRequestScreen from "../screens/CreatePaymentRequestScreen"
import Students from "../components/StudentList";
import PaymentScreen from "../screens/PaymentScreen";


const AuthStackNavigator = createStackNavigator({
    Welcome: { screen: WelcomeScreen },
    SignIn: { screen: SignInScreen },
    SignUp: { screen: SignUpScreen },

});

const FeedNavigator = createStackNavigator({
    HomeScreen: { screen: HomeScreen },
    BlueprintScreen: { screen: BlueprintScreen },
    WebPaymentScreen: { screen: WebPaymentScreen },
    Subcategories: { screen: SubcategoriesScreen },
    Content: { screen: ContentScreen },
    SandboxScreen: { screen: SandboxScreen },
    Profile: { screen: ProfileScreen },
    EditProfile: { screen: EditProfileScreen },
    CreateProfile: { screen: CreateProfileScreen },
    PaymentScreen: { screen: PaymentScreen },
    ExperienceScreen: { screen: ExperienceScreen },
    AchievementScreen: { screen: AchievementScreen }
  });

const ChatStackNavigator = createStackNavigator({
    MessagesList: { 
      screen: MessagesListScreen, 
      navigationOptions: ({ navigation }) => ({
        title: 'Messages',
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View style={{ paddingHorizontal: 10 }}>
                    <Ionicons name="md-menu" size={32} />
                </View>
            </TouchableOpacity>
        ),
      }),
    },
    Chat: { screen: ChatScreen }
  });

const EventNavigator = createStackNavigator({
  CreateEventScreen: {
    screen: CreateEventScreen,
    navigationOptions: ({ navigation }) => ({
        title: 'Preview: Create Event',
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View style={{ paddingHorizontal: 10 }}>
                    <Ionicons name="md-menu" size={32} />
                </View>
            </TouchableOpacity>
        ),
    }),
},
})

const PreviewNavigator = createStackNavigator({
  PreviewScreen: {
    screen: PreviewScreen,
    navigationOptions: ({ navigation }) => ({
        title: 'Preview: Dashboard',
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View style={{ paddingHorizontal: 10 }}>
                    <Ionicons name="md-menu" size={32} />
                </View>
            </TouchableOpacity>
        ),
    }),
},
})

const AppDrawerNavigator = createDrawerNavigator({
    Home: FeedNavigator,
    'Create Event': EventNavigator,
    // 'Create Payment': CreatePaymentRequestScreen,
    // 'My Students': Students,
    'Logout': { screen: SettingsScreen },
    // 'Preview: Messages': ChatStackNavigator,
    // 'Preview: Dashboard': PreviewNavigator
});

const AppNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: AppDrawerNavigator,

});

export default createAppContainer(AppNavigator);