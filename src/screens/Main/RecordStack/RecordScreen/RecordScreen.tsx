import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, StatusBar, Alert } from 'react-native'
import { Camera } from 'expo-camera'
import styles from './styles'
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'

interface Props {
  question: string,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

export default function RecordScreen(props: Props) {
  const {goBack} = props.navigation
  const question = props.navigation.state.params.question
  const [hasPermission, setHasPermission] = useState(false)
  const [camera, setCamera] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const [cameraDirection, setCameraDirection] = useState(Camera.Constants.Type.front)

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
    <Camera 
      style={styles.camera}
      ref={(ref: Camera) => {
        setCamera(ref)
      }}
      type={cameraDirection}
    >
      <StatusBar hidden/>
      <View style={styles.bottomSection}>

      </View>
      <View style={styles.middleSection}>
       
        <View style={styles.overlay}>
          <Text style={styles.infoText}>Create a 3-4 Minute Video</Text>
        </View>
        <View style={styles.overlay}>
          <Text style={styles.question}>{question}</Text>
        </View>

      </View>
     
      <View style={styles.topSection}>
        <TouchableOpacity
          onPress={() => goBack()}
          style={styles.whiteButtonOutline}
        >
          <View style={styles.whiteButton}>
          </View> 
        </TouchableOpacity>
       
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
          style={styles.recordOutline}
        >
          <View style={styles.recordButton}>
          </View>
        </TouchableOpacity>
       
        <TouchableOpacity 
          onPress={() => {
            setCameraDirection(cameraDirection === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front)
          }}
        >
          <Image style={styles.flipCamera} resizeMode='contain' source={require('../../../../../assets/images/flip_camera.png')} />
        </TouchableOpacity>
      </View>
        
    </Camera>
  )
}