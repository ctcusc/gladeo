import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from '../screens/Auth/LoginStack/LoginScreen/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterStack/RegisterScreen/RegisterScreen'
import PasswordResetScreen from '../screens/Auth/LoginStack/PasswordResetScreen/PasswordResetScreen'
import CreatePasswordScreen from '../screens/Auth/RegisterStack/CreatePasswordScreen/CreatePasswordScreen'
import WelcomeScreen from '../screens/Auth/WelcomeScreen/WelcomeScreen'
import GetStartedScreen from '../screens/Auth/RegisterStack/GetStartedScreen/GetStartedScreen'
import UserInfoScreen from '../screens/Auth/RegisterStack/UserInfoScreen/UserInfoScreen'

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
    UserInfo: UserInfoScreen
  },
  {
    headerMode: 'none',
    initialRouteName: 'UserInfo'
  }
)

const AuthNavigator = createSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginStack,
    Register: RegisterStack,
    UserInfo: UserInfoScreen
  },
  {
    headerMode: 'none',
    initialRouteName: 'Register', // Determines which screen is shown first from AuthStack
  },
)

export default AuthNavigator
