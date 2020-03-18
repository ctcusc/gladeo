import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import AuthNavigator from './AuthNavigator'
import OnboardingNavigator from './OnboardingNavigator'

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      Auth: AuthNavigator,
      Onboarding: OnboardingNavigator, 
    },
    {
      initialRouteName: 'Onboarding', // Determines which nav stack is shown first
    })
)
