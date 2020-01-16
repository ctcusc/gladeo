/* eslint-disable react/display-name */
import { createStackNavigator } from 'react-navigation-stack'
import InitialOnboardingScreen from '../screens/Onboarding/InitialOnboardingScreen/InitialOnboardingScreen'
import StepScreens from '../screens/Onboarding/StepScreens/StepScreens'
import FinalStepScreen from '../screens/Onboarding/FinalStepScreen/FinalStepScreen'

const OnboardingStack = createStackNavigator(
  {
    InitialOnboarding: InitialOnboardingScreen,
    Steps: StepScreens,
    FinalStep: FinalStepScreen
  },
  { 
    headerMode: 'none' 
  }
)

export default OnboardingStack