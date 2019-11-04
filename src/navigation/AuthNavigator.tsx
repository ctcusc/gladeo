import { createStackNavigator } from 'react-navigation'

import LoginScreen from '../screens/LoginScreen/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen'
import ExampleScreen from '../screens/ExampleScreen/ExampleScreen'

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Example: ExampleScreen
  },
  {
    initialRouteName: 'Example', // Determines which screen is shown first from AuthStack
  }
)

export default AuthStack
