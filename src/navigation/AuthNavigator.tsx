import { createStackNavigator } from 'react-navigation'

import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen'
import ExampleScreen from '../screens/Auth/ExampleScreen/ExampleScreen'

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Example: ExampleScreen
  },
  {
    initialRouteName: 'Login', // Determines which screen is shown first from AuthStack
  }
)

export default AuthStack
