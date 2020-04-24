import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, StatusBar, Dimensions} from 'react-native'
// import { Camera } from 'expo-camera'
import { RNCamera } from 'react-native-camera'
import styles from './styles'
import { Orientation } from 'react-native-orientation'
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
  const [hasPermission, setHasPermission] = useState(true)
  const [camera, setCamera] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const [cameraDirection, setCameraDirection] = useState(RNCamera.Constants.Type.front)
  const [video, setVideo] = useState(null)
  
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

  // async function saveVideo(){
  //   const asset = await MediaLibrary.createAssetAsync(video.uri)
  //   if (asset) {
  //     setVideo(null)
  //   }
  // }

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

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  async function takePicture(camera: RNCamera) {
    const options = { quality: 0.5, base64: true }
    const data = await camera.takePictureAsync(options)
    //  eslint-disable-next-line
    console.log(data.uri);
  }

  if (screenData.isLandscape) {
    return (
      //<View style={styles.container}>
      <RNCamera
        ref={(ref: RNCamera) => {
          setCamera(ref)
        }}
        style={styles.preview}
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
          <View style={styles.leftSection}>
            {!video && (<TouchableOpacity
              onPress={() => goBack()}
              style={styles.whiteButtonOutline}
            >
              <View style={styles.whiteButton}>
              </View> 
            </TouchableOpacity>)}
          
            {!video && (<TouchableOpacity
              onPress={()=>toogleRecord()}
              style={styles.recordOutline}
            >
              <View style={isRecording ? styles.isRecordingButton : styles.recordButton}>
              </View>
            </TouchableOpacity>)}

            <View style={styles.flipCamera}> 
              {!video && (<TouchableOpacity 
                onPress={() => {
                  setCameraDirection(cameraDirection === RNCamera.Constants.Type.front ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front)
                }}
              >
                <Image resizeMode='contain' source={require('../../../../../assets/images/flip_camera.png')} />
              </TouchableOpacity>)}
            </View> 
          </View>
          {!video && (<View style={styles.middleSection}>
            <View>
              <Text style={styles.infoText}>Create a 3-4 Minute Video</Text>
            </View>
            <View>
              <Text style={styles.question}>{/*question*/}Question will go here</Text>
            </View>
          </View>)}
          <View style={{flexDirection: 'column'}}>
            <View>
              {video && (
                <TouchableOpacity
                  style={styles.saveButton}
                >
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </RNCamera>
      //</View>
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
  } else {
    return <PendingView />
  }
}