import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, StatusBar, Dimensions} from 'react-native'
import { RNCamera } from 'react-native-camera'
import { BASE_PATH } from 'react-native-dotenv'
import { connect } from 'react-redux'
import { saveVideo } from '../../../../redux/actions/index'

import styles from './styles'
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'
import RNFS from 'react-native-fs'
import Video from 'react-native-video'

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
    fetch('https://9b454f26.ngrok.io/api/user/questions', {
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
    // NOT SURE IF WE NEED THIS STILL
    // if (video) {
    //   RNFS.copyFile(video.uri, RNFS.PicturesDirectoryPath + '/Videos/' + 'change_this_name.mp4').then(() => {
    //     console.log('Video copied locally!!')
    //   }, (error) => {
    //     console.log('CopyFile fail for video: ' + error)
    //   })
    // }

    setPreviewMode(true)
    RNFS.readFile(video.uri, RNFS.PicturesDirectoryPath + '/Videos/' + 'change_this_name.mov', 'base64')
      .then(success => {
        console.log('FILE WRITTEN? NOT GETTING HERE?')
        answerQuestion()
        const payload ={'questionID': questionID, 'uri': video.uri, 'questionText': question}
        props.dispatch(saveVideo(payload))
        pop()
      })
      .catch(err => {
        console.log('File Write Error: ', err.message)
      })


  }

  async function stopRecord(){
    setIsRecording(false)
    camera.stopRecording()
    console.log('stopped')
    // NOT SURE IF WE NEED THIS STILL
    if (video) {
      RNFS.copyFile(video.uri, RNFS.PicturesDirectoryPath + '/Videos/' + 'change_this_name.mp4').then(() => {
        
        console.log('Video copied locally!!')
      }, (error) => {
        console.log('CopyFile fail for video: ' + error)
      })
    }

  }

  async function startRecord(){
    if (camera) {
      setIsRecording(true)
      try {
        const promise = camera.recordAsync()

        if (promise) {
          setIsRecording(true)
          const data = await promise
          setVideo(data)
          console.log(data)
        }
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
  } else {
    return <PendingView />
  }
}
export default connect()(RecordScreen)