import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, StatusBar} from 'react-native'
// import { Camera } from 'expo-camera'
import { RNCamera } from 'react-native-camera'
import styles from './styles'
// import * as Permissions from 'expo-permissions'
// import * as MediaLibrary from 'expo-media-library'
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation'

interface Props {
  question: string,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

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

export default function RecordScreen(props: Props) {
  const {goBack} = props.navigation
  //const question = props.navigation.state.params.question
  const [hasPermission, setHasPermission] = useState(false)
  const [camera, setCamera] = useState()
  const [isRecording, setIsRecording] = useState(false)
  // const [cameraDirection, setCameraDirection] = useState(Camera.Constants.Type.front)
  const [video, setVideo] = useState(null)

  // async function saveVideo(){
  //   const asset = await MediaLibrary.createAssetAsync(video.uri)
  //   if (asset) {
  //     setVideo(null)
  //   }
  // }

  // async function stopRecord(){
  //   setIsRecording(false)
  //   camera.stopRecording()
  // }

  // async function startRecord(){
  //   if (camera) {
  //     setIsRecording(true)
  //     const data = await camera.recordAsync()
  //     setVideo(data)
  //   }
  // }

  // async function toogleRecord(){
  //   if (isRecording) {
  //     stopRecord()
  //   } else {
  //     startRecord()
  //   }
  // }

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA, Permissions.AUDIO_RECORDING)
  //     setHasPermission(status === 'granted')
  //   })()
  // }, [])

  // if (hasPermission === null) {
  //   return <View />
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>
  // }

  async function takePicture(camera: RNCamera) {
    const options = { quality: 0.5, base64: true }
    const data = await camera.takePictureAsync(options)
    //  eslint-disable-next-line
    console.log(data.uri);
  }

  return (
    <View>
      <Text>TEST</Text>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
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
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== 'READY') return <PendingView />
          return (
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      </RNCamera>
    </View>
    // <Camera 
    //   style={styles.camera}
    //   ref={(ref: Camera) => {
    //     setCamera(ref)
    //   }}
    //   type={cameraDirection}
    // >
    //   <StatusBar hidden/>
    //   <View style={styles.bottomSection}>
    //     {video && (
    //       <TouchableOpacity
    //         onPress={()=>saveVideo()}
    //         style={styles.saveButton}
    //       >
    //         <Text style={styles.saveText}>save</Text>
    //       </TouchableOpacity>
    //     )}
    //   </View>
      
  //   {!video && (<View style={styles.middleSection}>
    
  //     <View style={styles.overlay}>
  //       <Text style={styles.infoText}>Create a 3-4 Minute Video</Text>
  //     </View>
  //     <View style={styles.overlay}>
  //       <Text style={styles.question}>{question}</Text>
  //     </View>

  //   </View>)}
     
  //   <View style={styles.topSection}>
  //     {!video && (<TouchableOpacity
  //       onPress={() => goBack()}
  //       style={styles.whiteButtonOutline}
  //     >
  //       <View style={styles.whiteButton}>
  //       </View> 
  //     </TouchableOpacity>)}
       
  //     {!video && (<TouchableOpacity
  //       onPress={()=>toogleRecord()}
  //       style={styles.recordOutline}
  //     >
  //       <View style={isRecording ? styles.isRecordingButton : styles.recordButton}>
  //       </View>
  //     </TouchableOpacity>)}
       
  //     {!video && (<TouchableOpacity 
  //       onPress={() => {
  //         setCameraDirection(cameraDirection === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front)
  //       }}
  //     >
  //       <Image style={styles.flipCamera} resizeMode='contain' source={require('../../../../../assets/images/flip_camera.png')} />
  //     </TouchableOpacity>)}
  //   </View>
        
  // </Camera>
  )
}