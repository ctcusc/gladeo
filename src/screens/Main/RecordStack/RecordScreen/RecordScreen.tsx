import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, StatusBar, Dimensions, Alert} from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'

import { RNCamera } from 'react-native-camera'
import { BASE_PATH } from 'react-native-dotenv'
import { connect } from 'react-redux'
import { saveVideo } from '../../../../redux/actions/index'

import styles from './styles'
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'
import Video from 'react-native-video'
import RNConvertPhAsset from 'react-native-convert-ph-asset'


interface Props {
  dispatch: Function,
  saveVideo: Function,
  questionID: number,
  question: string,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

//var RNFS = require('react-native-fs');

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
)

function RecordScreen(props: Props) {
  const {goBack, pop} = props.navigation
  //const question = props.navigation.state.params.question
  const [hasPermission, setHasPermission] = useState(true)
  const [camera, setCamera] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const [cameraDirection, setCameraDirection] = useState(RNCamera.Constants.Type.front)
  const [video, setVideo] = useState(null)
  const [isPreviewMode, setPreviewMode] = useState(false)
  const [audioCapture, setAudioCapture] = useState(true)

  const question = props.navigation.state.params.question
  const questionID = props.navigation.state.params.questionID

  const useScreenDimensions = () => {
    const [screenData, setScreenData] = useState(Dimensions.get('screen'))
  
    useEffect(() => {
      const onChange = result => {
        setScreenData(result.screen)
      }
  
      Dimensions.addEventListener('change', onChange)
  
      return () => Dimensions.removeEventListener('change', onChange)
    })
  
    return {
      ...screenData,
      isLandscape: screenData.width > screenData.height,
    }

  }

  const screenData = useScreenDimensions()

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

    const currVideo = video
    const newURI = await CameraRoll.saveToCameraRoll(video.uri)
      .then(Alert.alert('Success', 'Photo added to camera roll!'))
      .catch(err => console.log('err:', err))

    

    RNConvertPhAsset.convertVideoFromUrl({
      url: currVideo.uri,
      convertTo: 'mov',
      quality: 'high'
    }).then((response) => {
      currVideo.uri = newURI
      setVideo(currVideo)
    }).catch((err) => {
      console.log(err)
    })
    console.log('Saved video: ', currVideo)

    answerQuestion()
    const payload ={'questionID': questionID, 'uri': video.uri, 'questionText': question}
    props.dispatch(saveVideo(payload))
    pop()

  }

  async function stopRecord(){
    camera.stopRecording()
  }

  async function startRecord () {
    if (camera) {
      try {
        setIsRecording(true)
        const data = await camera.recordAsync()

        setIsRecording(false)
        setAudioCapture(false)
        setVideo(data)
          
        setTimeout(() => {
          setPreviewMode(true)
        }, 1000)
          
      } catch (e) {
        console.error(e)
      }
    }
  }

  async function toogleRecord(){
    if (isRecording) {
      stopRecord()
    } else {
      startRecord()
    }
  }

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  if (!isPreviewMode) {
    return (
      <RNCamera
        ref={(ref: RNCamera) => {
          setCamera(ref)
        }}
        style={styles.camera}
        type={cameraDirection}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={audioCapture}
      >
        <StatusBar hidden/>
        <View style={styles.uiContainer}>
          
          <View style={styles.texts}>
            <View>
              <Text style={styles.infoText}>Create a 3-4 Minute Video</Text>
            </View>
            <View>
              <Text style={styles.question}>{/*question*/}Question will go here</Text>
            </View>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity 
              onPress={() => {
                pop()                
              }}
            >
              <Image resizeMode='contain' source={require('../../../../../assets/images/back.png')} />
            </TouchableOpacity>
          
            <TouchableOpacity
              onPress={()=>toogleRecord()}
              style={styles.recordOutline}
            >
              <View style={isRecording ? styles.isRecordingButton : styles.recordButton}>
              </View>
            </TouchableOpacity>

            <View style={styles.flipCamera}> 
              <TouchableOpacity 
                onPress={() => {
                  setCameraDirection(cameraDirection === RNCamera.Constants.Type.front ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front)
                }}
              >
                <Image resizeMode='contain' source={require('../../../../../assets/images/flip_camera.png')} />
              </TouchableOpacity>
            </View> 
          </View>
        </View>
      </RNCamera>
    )
  } 
  if(isPreviewMode) {
    return (
      <View style={styles.videoPlay}>
        {/*<Video
          source={{ uri: video.uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={true}
          isLooping={true}
        />*/}
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
  } else {
    return <PendingView />
  }
}
export default connect()(RecordScreen)