import React, {useEffect, useState} from 'react'
import { Text, View, TouchableOpacity} from 'react-native'
import styles from './styles'
import Video from 'react-native-video'

import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'

interface Props {
  question: string,
  uri: string,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

export default function ViewScreen(props: Props) {
  const {goBack} = props.navigation
  const question = props.navigation.state.params.question
  const uri = props.navigation.state.params.uri

  return(
    <View style={styles.videoPlay}>
      <Video
        source={{ uri: uri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  )
}