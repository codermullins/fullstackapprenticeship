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
import SubcategoriesScreen from '../screens/SubcategoriesScreen';
import ContentScreen from "../screens/ContentScreen";
import BlueprintScreen from "../screens/BlueprintScreen";
import MessagesListScreen from '../screens/MessagesListScreen';
import ExperienceScreen from "../screens/ExperienceScreen";
import AchievementScreen from "../screens/AchievementScreen";
import CreatePaymentRequestScreen from "../screens/CreatePaymentRequestScreen"
import Students from "../components/StudentList";
import PaymentScreen from "../screens/PaymentScreen";
import ChapterScreen from "../screens/ChapterScreen";
import InstructorScreen from "../screens/InstructorScreen";
import StudentProfileScreen from "../screens/StudentProfileScreen";
import CreateResourceScreen from "../screens/CreateResourceScreen";
import ReviewResourcesScreen from "../screens/ReviewResourcesScreen";
import PaymentOptionsScreen from "../screens/PaymentOptionsScreen";
import InstructorRegistrationScreen from "../screens/InstructorRegistrationScreen";


const AuthStackNavigator = createStackNavigator({
    Welcome: { screen: WelcomeScreen },
    SignIn: { screen: SignInScreen },
    SignUp: { screen: SignUpScreen },
});

const PaymentsNavigator = createStackNavigator({
    PaymentOptionsScreen: { screen: PaymentOptionsScreen },
    PaymentScreen: { screen: PaymentScreen },

})

const FeedNavigator = createStackNavigator({
    HomeScreen: { screen: HomeScreen },
    BlueprintScreen: { screen: BlueprintScreen },
    Subcategories: { screen: SubcategoriesScreen },
    Content: { screen: ContentScreen },
    Profile: { screen: ProfileScreen },
    EditProfile: { screen: EditProfileScreen },
    CreateProfile: { screen: CreateProfileScreen },
    ExperienceScreen: { screen: ExperienceScreen },
    AchievementScreen: { screen: AchievementScreen },
    ChapterScreen: { screen: ChapterScreen},
  });

const InstructorFeedNavigator = createStackNavigator({
    InstructorScreen: { screen: InstructorScreen },
    InstructorRegistrationScreen: { screen: InstructorRegistrationScreen },
    CreateEventScreen: { screen: CreateEventScreen },
    StudentProfileScreen: { screen: StudentProfileScreen },
    ExperienceScreen: { screen: ExperienceScreen },
    AchievementScreen: { screen: AchievementScreen },
    ReviewResourcesScreen: { screen: ReviewResourcesScreen }
})

const AppDrawerNavigator = createDrawerNavigator({
    Apprenticeship: FeedNavigator,
    'Instructor (Preview)': InstructorFeedNavigator,
    'Create Resource': { screen: CreateResourceScreen },
    'Premium Training': PaymentsNavigator,
    'Logout': { screen: SettingsScreen },
});

const AppNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: AppDrawerNavigator,
});

export default createAppContainer(AppNavigator);