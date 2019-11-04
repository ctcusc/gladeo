import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import AuthNavigator from './AuthNavigator'

export default createAppContainer(
  createSwitchNavigator({
    // AuthLoading: Loading screen, 
    Main: MainTabNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'Auth', // Determines which nav stack is shown first
  }
  )
)
