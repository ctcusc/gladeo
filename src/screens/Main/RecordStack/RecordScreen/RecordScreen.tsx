import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Route } from 'react-native'
import { Camera } from 'expo-camera'
import styles from './styles'
import { FontAwesome } from '@expo/vector-icons'
import { ScreenOrientation } from 'expo'
import TickingTimer from '../../../../shared_components/TickingTimer/TickingTimer'
import StopWatch from 'react-native-stopwatch-timer'

// Note: This page is meant to be displayed in landscape, so components are ordered left to right
// instead of top to bottom. 

interface Props {
  question: string,
}

const options = {
  container: {
    backgroundColor: 'rgba(51, 51, 51, 0.4)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'roboto-regular',
    fontSize: 16,
  }
}

export default function RecordScreen(props: Props) {
  const [hasPermission, setHasPermission] = useState(false)
  const [camera, setCamera] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
      await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE)
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
        type={cameraType}
        style={{flex: 1}}
      >
        <View style={styles.mainView}>
          <View style={styles.leftContainer}>
            <TickingTimer/>
            <View style={styles.photoButtonCircle}>
              <TouchableOpacity
                onPress={ async () => {
                  const photo = await camera.takePictureAsync()
                }}
                style={styles.photoButton}  
              />
            </View>
            <View style={styles.recordButtonCircle}>
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
                style={isRecording ? styles.stopRecordButton : styles.startRecordButton}
              />
            </View>
            <FontAwesome.Button
              name="camera"
              color="#FFFFFF"
              onPress={ () => {
                if(cameraType === Camera.Constants.Type.front) {
                  setCameraType(Camera.Constants.Type.back)
                } else {
                  setCameraType(Camera.Constants.Type.front)
                }
              }}
              backgroundColor='rgba(52, 52, 52, 0.01)'
            />
          </View>
          <View>
            <TopDisplay isRecording={isRecording}/>
            <View>
              <Text style={styles.question}>
                Question: {props.question}
              </Text>
            </View>
          </View>
        </View>
      </Camera>
    </View>
  )
}

interface TopDisplayProps {
  isRecording: boolean,
}

// Use this for the conditional rendering of the stopwatch.
function TopDisplay(props: TopDisplayProps) {
  if(props.isRecording || true) {
    return (
      <TickingTimer/>
    )
  } else {
    return (
      <View>
        <Text>Create a 3-4 Minute Video</Text>
      </View>
    )
  }
}

