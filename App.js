import React from 'react'
import { } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './src/screens/LoginScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import QRCodeScreen from './src/screens/QRCodeScreen'
import ScannerScreen from './src/screens/ScannerScreen'
import ValiderScreen from './src/screens/ValiderScreen'
import ValiderSuccess from './src/screens/ValiderSuccess'
import ValiderFail from './src/screens/ValiderFail'
import SetInformations from './src/screens/SetInformations'
import FinishScreen from './src/screens/FinishScreen'
import Routers from './src/routerNavigation'
export default class App extends React.Component {
  render() {
    const Appcontainer = createAppContainer(Routers.Router)
    return (
      <Appcontainer />
    )
  }
}