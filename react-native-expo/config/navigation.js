import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
    // createBottomTabNavigator,
} from 'react-navigation';

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from '../screens/SettingsScreen';
import CreateEventScreen from "../mentor/CreateEventScreen"
import ProfileScreen from '../profile/ProfileScreen';
import EditProfileScreen from "../profile/EditProfileScreen";
import CreateProfileScreen from "../profile/CreateProfileScreen";
import SubcategoriesScreen from '../education/SubcategoriesScreen';
import ContentScreen from "../education/ContentScreen";
import BlueprintScreen from "../education/BlueprintScreen";
import ExperienceScreen from "../experience/ExperienceScreen";
import AchievementScreen from "../experience/AchievementScreen";
import ChapterScreen from "../education/ChapterScreen";
import InstructorScreen from "../mentor/InstructorScreen";
import StudentProfileScreen from "../mentor/StudentProfileScreen";
import InstructorRegistrationScreen from "../mentor/InstructorRegistrationScreen";
import GithubView from "../components/GithubView";

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
    ChapterScreen: { screen: ChapterScreen },
    GithubView: { screen: GithubView }
});

const InstructorFeedNavigator = createStackNavigator({
    InstructorScreen: { screen: InstructorScreen },
    InstructorRegistrationScreen: { screen: InstructorRegistrationScreen },
    CreateEventScreen: { screen: CreateEventScreen },
    StudentProfileScreen: { screen: StudentProfileScreen },
    ExperienceScreen: { screen: ExperienceScreen },
    AchievementScreen: { screen: AchievementScreen },
    GithubView: { screen: GithubView }
})

const AppDrawerNavigator = createDrawerNavigator({
    Apprenticeship: FeedNavigator,
    'Instructor (Preview)': InstructorFeedNavigator,
    'Logout': { screen: SettingsScreen },
});

const AppNavigator = createSwitchNavigator({
    // Auth: AuthStackNavigator,
    App: AppDrawerNavigator,
});

export default createAppContainer(AppNavigator);