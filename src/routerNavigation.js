import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './screens/LoginScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import QRCodeScreen from './screens/QRCodeScreen'
import ScannerScreen from './screens/ScannerScreen'
import ValiderScreen from './screens/ValiderScreen'
import ValiderSuccess from './screens/ValiderSuccess'
import ValiderFail from './screens/ValiderFail'
import SetInformations from './screens/SetInformations'
import FinishScreen from './screens/FinishScreen'


const LoginPage = createStackNavigator({
    Login: {
        screen: LoginScreen, navigationOptions: {
            header: null
        }
    }
})

const WelcomePage = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen, navigationOptions: {
            header: null
        }
    }
})

const QRcodePage = createStackNavigator({
    QRcode: {
        screen: QRCodeScreen, navigationOptions: {
            header: null
        }
    }
})

const ScanPage = createStackNavigator({
    Scanner: {
        screen: ScannerScreen, navigationOptions: {
            header: null
        }
    }
})

const ValiderPage = createStackNavigator({
    Valider: {
        screen: ValiderScreen, navigationOptions: {
            header: null
        }
    }
})

const SuccessPage = createStackNavigator({
    Success: {
        screen: ValiderSuccess, navigationOptions: {
            header: null
        }
    }
})

const FailPage = createStackNavigator({
    Fail: {
        screen: ValiderFail, navigationOptions: {
            header: null
        }
    }
})

const InforPage = createStackNavigator({
    Information: {
        screen: SetInformations, navigationOptions: {
            header: null
        }
    }
})

const FinishPage = createStackNavigator({
    Finish: {
        screen: FinishScreen, navigationOptions: {
            header: null
        }
    }
})

const HomePage = createStackNavigator({
    WelcomePage,
    QRcodePage,
    ScanPage,
    ValiderPage,
    SuccessPage,
    FailPage,
    InforPage,
    FinishPage,
},{
    defaultNavigationOptions:{
        header: null
    }
})

const SwitchLoginHome = createSwitchNavigator({
    LoginPage,
    HomePage,
})

module.exports.Router = createAppContainer(SwitchLoginHome)