import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen'
import ExampleScreen from '../screens/Auth/ExampleScreen/ExampleScreen'
import PasswordResetScreen from '../screens/Auth/PasswordResetScreen/PasswordResetScreen'
import CreatePasswordScreen from '../screens/Auth/CreatePasswordScreen/CreatePasswordScreen'
import WelcomeScreen from '../screens/Auth/WelcomeScreen/WelcomeScreen'
import GetStartedScreen from '../screens/Auth/GetStartedScreen/GetStartedScreen'

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
    PasswordReset: PasswordResetScreen,
  },
  {
    headerMode: 'none',
  }
)

const RegisterStack = createStackNavigator(
  {
    GetStarted: GetStartedScreen,
    Register: RegisterScreen,
    CreatePassword: CreatePasswordScreen,
  },
  {
    headerMode: 'none',
  }
)

const AuthNavigator = createSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginStack,
    Register: RegisterStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Welcome', // Determines which screen is shown first from AuthStack
  },
)

export default AuthNavigator
