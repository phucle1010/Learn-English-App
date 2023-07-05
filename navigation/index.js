import Account from '../screens/account';
import DetailReadBook from '../screens/detailReadBook';
import DetailBook from '../screens/detailBook';
import DetailVideo from '../screens/detailVideo';
import DetailWordGroup from '../screens/detailWordGroup';
import Exercise from '../screens/exercise';
import MultipleChoiceExercise from '../screens/multipleChoiceExercise';
import MultipleChoiceExerciseResult from '../screens/multipleChoiceExerciseResult';
import DetailMultipleChoiceExercise from '../screens/detailMultipleChoiceExercise';
import ListenExercise from '../screens/listenExercise';
import DetailListenExercise from '../screens/detailListenExercise';
import ListenExerciseTopic from '../screens/listenExerciseTopic';
import Grammar from '../screens/grammar';
import GrammarDetail from '../screens/grammarDetail';
import GrammarExercise from '../screens/grammarExercise';
import GrammarTheory from '../screens/grammarTheory';
import Home from '../screens/home';
import Library from '../screens/library';
import Login from '../screens/login';
import News from '../screens/news';
import PlayGame from '../screens/playGame';
import ReadBook from '../screens/readBook';
import ReadNews from '../screens/readNews';
import ReviewResult from '../screens/reviewResult';
import SearchWord from '../screens/searchWord';
import Signup from '../screens/signup';
import Test from '../screens/test';
import TestResult from '../screens/testResult';
import VerifyEmail from '../screens/verifyEmail';
import VerifyOTP from '../screens/verifyOTP';
import SettingNewPassword from '../screens/settingNewPassword';
import Videos from '../screens/videos';
import Welcome from '../screens/welcome';
import WordGroup from '../screens/wordGroup';
import Words from '../screens/words';

const screens = [
    {
        name: 'Home',
        component: Home,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#F3CFC6',
        activeColor: '#E37383',
        isHideTab: false,
        isHideNavigationTab: false,
    },
    {
        name: 'Library',
        component: Library,
        tabIconName: 'bookmark-multiple-outline',
        tabIconSize: 34,
        tabIconColor: '#F3CFC6',
        activeColor: '#E37383',
        isHideTab: false,
        isHideNavigationTab: false,
    },
    {
        name: 'Account',
        component: Account,
        tabIconName: 'account-circle-outline',
        tabIconSize: 34,
        tabIconColor: '#F3CFC6',
        activeColor: '#E37383',
        isHideTab: false,
        isHideNavigationTab: false,
    },
    {
        name: 'SearchWord',
        component: SearchWord,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'News',
        component: News,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'ReadNews',
        component: ReadNews,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'Videos',
        component: Videos,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'DetailVideo',
        component: DetailVideo,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'ReadBook',
        component: ReadBook,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'DetailReadBook',
        component: DetailReadBook,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'DetailBook',
        component: DetailBook,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'WordGroup',
        component: WordGroup,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'DetailWordGroup',
        component: DetailWordGroup,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'Grammar',
        component: Grammar,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'GrammarDetail',
        component: GrammarDetail,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'GrammarTheory',
        component: GrammarTheory,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'GrammarExercise',
        component: GrammarExercise,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'Exercise',
        component: Exercise,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'MultipleChoiceExercise',
        component: MultipleChoiceExercise,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'MultipleChoiceExerciseResult',
        component: MultipleChoiceExerciseResult,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'DetailMultipleChoiceExercise',
        component: DetailMultipleChoiceExercise,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'ListenExercise',
        component: ListenExercise,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'ListenExerciseTopic',
        component: ListenExerciseTopic,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'DetailListenExercise',
        component: DetailListenExercise,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'ReviewResult',
        component: ReviewResult,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'TestResult',
        component: TestResult,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'Test',
        component: Test,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'Words',
        component: Words,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'Login',
        component: Login,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'Signup',
        component: Signup,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'Welcome',
        component: Welcome,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
    {
        name: 'VerifyEmail',
        component: VerifyEmail,
        tabIconName: 'home-outline',
        tabIconSize: 34,
        tabIconColor: '#ddf7ff',
        activeColor: '#0047AB',
        isHideTab: true,
        isHideNavigationTab: true,
    },
];

export default screens;
