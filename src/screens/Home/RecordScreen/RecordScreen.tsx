import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import styles from './styles'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
  question: string,
}

export default function RecordScreen(props: Props) {
  const {navigate} = props.navigation
  const [hasPermission, setHasPermission] = useState(null)
  const [camera, setCamera] = useState(null)
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera 
        style={{ flex: 1 }}
        ref={(ref: Camera) => {
          setCamera(ref)
        }}
        type={Camera.Constants.Type.front}
      >
        <View>
          <TouchableOpacity
            onPress={() => navigate('FinalStep')}
          >
            <Text>GO BACK</Text>
          </TouchableOpacity>
          <View style={{height: 50}}/>
          <TouchableOpacity
            onPress={ () => {
              if(camera) {
                if (isRecording) {
                  setIsRecording(false)
                  camera.stopRecording()
                } else {
                  const video = camera.recordAsync()
                  setIsRecording(true)
                }
              }
            }}
            style={styles.recordButton}
          >
          </TouchableOpacity>
          <View>
            {isRecording &&
                <Text>RECORDING IN PROGRESS...</Text>
            }
          </View>
        </View>
      </Camera>
    </View>
  )
}