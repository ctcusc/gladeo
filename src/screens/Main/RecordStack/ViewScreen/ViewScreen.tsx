import React, {useEffect, useState} from 'react'
import { Text, View, TouchableOpacity, Alert, Image} from 'react-native'
import styles from './styles'
import Video from 'react-native-video'
import { BASE_PATH } from 'react-native-dotenv'

import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'

interface Props {
  questionID: number,
  question: string,
  uri: string,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

export default function ViewScreen(props: Props) {
  const {navigate} = props.navigation
  const {goBack, pop} = props.navigation
  const question = props.navigation.state.params.question
  const questionID = props.navigation.state.params.questionID
  const uri = props.navigation.state.params.uri

  async function removeQuestion(id: number){
    fetch(`${BASE_PATH}/api/user/questions`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'questionId': id,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log('Error: ' + error)
      })
  }

  return (
    <View style={styles.videoPlay}>
      <Video
        source={{ uri: video.uri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
        style={{ width: '100%', height: '100%' }}
      />

       
      <View style={styles.videoTop}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Confirm Deletion?',
              'This video will not be recoverable. You will return to snippet selections.',
              [
                {text: 'Delete',
                  onPress: () => {
                    removeQuestion(questionID)
                    pop()
                  }
                },
                {text: 'Cancel', style: 'cancel'}
              ]
            )
          }}
        >
          <Image resizeMode='contain' source={require('../../../../../assets/images/xmark.png')} style = {{tintColor: 'white'}}/>
        </TouchableOpacity>
      </View>

      <View style={styles.videoBottom}></View>
      <Text style={styles.questionFinalText}>{question}</Text>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Confirm Submission?',
            'Are you sure you\'re ready to submit the video for review?',
            [
              {text: 'Submit',
                onPress: () => {
                  navigate('UploadingVideo')
                }
              },
              {text: 'Cancel', style: 'cancel'}
            ]
          )
        }}
        style={styles.saveButton}
      >
        <Text style={styles.saveText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  )
}