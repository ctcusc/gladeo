import { createStackNavigator } from 'react-navigation'

import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen'
import ExampleScreen from '../screens/Auth/ExampleScreen/ExampleScreen'
import PasswordResetScreen from '../screens/Auth/PasswordResetScreen/PasswordResetScreen'
import CreatePasswordScreen from '../screens/Auth/CreatePasswordScreen/CreatePasswordScreen'
import WelcomeScreen from '../screens/Auth/WelcomeScreen/WelcomeScreen'
import GetStartedScreen from '../screens/Auth/GetStartedScreen/GetStartedScreen'

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    PasswordReset: PasswordResetScreen,
    Example: ExampleScreen,
    CreatePassword: CreatePasswordScreen,
    Welcome: WelcomeScreen,
    GetStarted: GetStartedScreen,
  },
  {
    initialRouteName: 'Welcome', // Determines which screen is shown first from AuthStack
  }
)

export default AuthStack
