import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, StatusBar} from 'react-native'
import { Camera } from 'expo-camera'
import styles from './styles'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
import { Video } from 'expo-av'
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'
import { connect } from 'react-redux'
import { saveVideo } from '../../../../redux/actions/index'
import { BASE_PATH } from 'react-native-dotenv'

interface Props {
  dispatch: Function,
  saveVideo: Function,
  question: string,
  questionID: number,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

function RecordScreen(props: Props) {
  const {goBack, pop} = props.navigation
  const question = props.navigation.state.params.question
  const questionID = props.navigation.state.params.questionID
  const [hasPermission, setHasPermission] = useState(false)
  const [camera, setCamera] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const [cameraDirection, setCameraDirection] = useState(Camera.Constants.Type.front)
  const [video, setVideo] = useState(null)

  async function answerQuestion(){
    fetch(`${BASE_PATH}/api/user/questions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'questionId': questionID,
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

  async function save(){
    const asset = await MediaLibrary.createAssetAsync(video.uri)
    if (asset) {
      setVideo(null)
    }
    answerQuestion()
    const payload ={'questionID': questionID, 'uri': video.uri, 'questionText': question}
    props.dispatch(saveVideo(payload))
    pop()
  }

  async function stopRecord(){
    setIsRecording(false)
    camera.stopRecording()
  }

  async function startRecord(){
    if (camera) {
      setIsRecording(true)
      const data = await camera.recordAsync()
      setVideo(data)
    }
  }

  async function toogleRecord(){
    if (isRecording) {
      stopRecord()
    } else {
      startRecord()
    }
  }

  useEffect(() => {
    (async () => {
      const { status: cameraPermission } = await Camera.requestPermissionsAsync()
      const { status: cameraRollPermission } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      setHasPermission(cameraPermission === 'granted' && cameraRollPermission === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  if(video){
    return(
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
        <View style={ styles.videoBottom }>
          <TouchableOpacity
            onPress={()=>save()}
            style={styles.saveButton}
          >
            <Text style={styles.saveText}>save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  } else if(!video){
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
            onPress={()=>toogleRecord()}
            style={styles.recordOutline}
          >
            <View style={isRecording ? styles.isRecordingButton : styles.recordButton}>
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
}

export default connect()(RecordScreen)