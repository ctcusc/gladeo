import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from '../screens/Auth/LoginStack/LoginScreen/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterStack/RegisterScreen/RegisterScreen'
import PasswordResetScreen from '../screens/Auth/ResetPasswordStack/PasswordResetScreen/PasswordResetScreen'
import CreatePasswordScreen from '../screens/Auth/RegisterStack/CreatePasswordScreen/CreatePasswordScreen'
import WelcomeScreen from '../screens/Auth/WelcomeScreen/WelcomeScreen'
import GetStartedScreen from '../screens/Auth/RegisterStack/GetStartedScreen/GetStartedScreen'
import CreateResetPasswordScreen from '../screens/Auth/ResetPasswordStack/CreateResetPasswordScreen/CreateResetPasswordScreen'
import ConfirmResetCodeScreen from '../screens/Auth/ResetPasswordStack/ConfirmResetCodeScreen/ConfirmResetCodeScreen'
import UserInfoScreen from '../screens/Auth/RegisterStack/UserInfoScreen/UserInfoScreen'

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
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
  }
)

const ResetPasswordStack = createStackNavigator(
  {
    PasswordReset: PasswordResetScreen,
    ConfirmResetCode: ConfirmResetCodeScreen,
    CreateResetPassword: CreateResetPasswordScreen,
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
    ResetPassword: ResetPasswordStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Welcome', // Determines which screen is shown first from AuthStack
  },
)

export default AuthNavigator
