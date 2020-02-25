/* eslint-disable react/display-name */
import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import TabBarIcon from '../shared_components/TabBarIcon'
import QuestionsScreen from '../screens/Main/RecordStack/QuestionsScreen/QuestionsScreen'
import CreatingVideoScreen from '../screens/Main/EditStack/CreatingVideoScreen/CreatingVideoScreen'
import UploadingVideoScreen from '../screens/Main/EditStack/UploadingVideoScreen/UploadingVideoScreen'
import RecordScreen from '../screens/Main/RecordStack/RecordScreen/RecordScreen'
import SnippetSelectionScreen from '../screens/Main/EditStack/SnippetSelection/SnippetSelection'

// Tab #1 - Question Selection + Recording
const RecordStack = createStackNavigator(
  {
    Questions:  QuestionsScreen,
    Record: {
      screen: RecordScreen,
      navigationOptions: {
        headerShown: false,
        
      }
    }
  },
)

RecordStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'Record') {
        tabBarVisible = false
      } else {
        tabBarVisible = true
      }
    })
  }

  return {
    tabBarVisible
  }
}

// Tab #2 - Should contain Selecting Snippets, Creating Video, Complete video.. Rendering
const EditStack = createStackNavigator(
  {
    SnippetSelection: SnippetSelectionScreen,
    CreatingVideo: CreatingVideoScreen,
    UploadingVideo: UploadingVideoScreen,
  },
  {
    initialRouteName: 'SnippetSelection', 
  }
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
