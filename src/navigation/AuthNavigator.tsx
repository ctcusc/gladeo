import { createStackNavigator } from 'react-navigation'

import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen'
import ExampleScreen from '../screens/Auth/ExampleScreen/ExampleScreen'
import PasswordResetScreen from '../screens/Auth/PasswordResetScreen/PasswordResetScreen'

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    PasswordReset: PasswordResetScreen,
    Example: ExampleScreen
  },
  {
    initialRouteName: 'Example', // Determines which screen is shown first from AuthStack
  }
)

export default AuthStack
