/* eslint-disable react/display-name */
import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../shared_components/TabBarIcon'
import HomeScreen from '../screens/Home/HomeScreen/HomeScreen'
import CreateScreen from '../screens/Home/CreateScreen/CreateScreen'
import ProfileScreen from '../screens/Home/ProfileScreen/ProfileScreen'
//remove below later
import OnboardingScreen from '../screens/Home/OnboardingScreen/OnboardingScreen'

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
)

HomeStack.navigationOptions = {
  tabBarLabel: 'Answer',
  tabBarIcon: (focused: boolean) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-videocam${focused ? '' : '-outline'}`
          : 'md-videocam'
      }
    />
  ),
}

const CreateStack = createStackNavigator(
  {
    //Links: CreateScreen,
    Links: OnboardingScreen,
  },
)

CreateStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: (focused: boolean) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'} />
  ),
}

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
)

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: (focused: boolean) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
}

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CreateStack,
  ProfileStack,
})

export default tabNavigator
