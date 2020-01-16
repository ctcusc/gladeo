/* eslint-disable react/display-name */
import { createStackNavigator } from 'react-navigation-stack'
import OnboardingScreen from '../screens/Home/OnboardingScreen/OnboardingScreen'
import StepScreens from '../screens/Home/OnboardingScreen/StepScreens'
import FinalStepScreen from '../screens/Home/OnboardingScreen/FinalStepScreen'

const OnboardingStack = createStackNavigator(
  {
    Onboarding: OnboardingScreen,
    Steps: StepScreens,
    FinalStep: FinalStepScreen
  },
  { 
    headerMode: 'none' 
  }
)

export default OnboardingStack