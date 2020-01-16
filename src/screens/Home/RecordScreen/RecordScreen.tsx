import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import styles from './styles'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  question: string,
}

export default function RecordScreen(props: Props) {
  const [hasPermission, setHasPermission] = useState(false)
  const [camera, setCamera] = useState()
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
        ref={(ref: Camera) => {
          setCamera(ref)
        }}
        type={Camera.Constants.Type.front}
      >
        <View>
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
          {/* Temporary recording indicator */}
          <View>
            {
              isRecording && <Text>RECORDING IN PROGRESS...</Text>
            }
          </View>
        </View>
      </Camera>
    </View>
  )
}