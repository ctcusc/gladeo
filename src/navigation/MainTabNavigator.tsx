/* eslint-disable react/display-name */
import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import TabBarIcon from '../shared_components/TabBarIcon'
import QuestionsScreen from '../screens/Main/RecordStack/QuestionsScreen/QuestionsScreen'
import RenderingVideoScreen from '../screens/Main/EditStack/RenderingVideoScreen/RenderingVideoScreen'
import RecordScreen from '../screens/Main/RecordStack/RecordScreen/RecordScreen'
import SnippetSelectionScreen from '../screens/Main/EditStack/SnippetSelection/SnippetSelection'

// Tab #1 - Question Selection + Recording
const RecordStack = createStackNavigator(
  {
    Questions: QuestionsScreen,
    Record: RecordScreen,
  },
)

RecordStack.navigationOptions = {
  tabBarLabel: 'Record',
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
// Tab #2 - Should contain Selecting Snippets, Creating Video, Complete video.. Rendering
const EditStack = createStackNavigator(
  {
    RenderingVideo: RenderingVideoScreen,
    SnippetSelection: SnippetSelectionScreen,
  },
)

EditStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: (focused: boolean) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'} />
  ),
}

const mainTabNavigator = createBottomTabNavigator({
  RecordStack,
  EditStack,
})

export default mainTabNavigator
