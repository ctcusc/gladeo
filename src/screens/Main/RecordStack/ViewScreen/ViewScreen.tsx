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

interface Props {
  question: string,
  uri: string,
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

export default function ViewScreen(props: Props) {
  const {goBack} = props.navigation
  const question = props.navigation.state.params.question
  const uri = props.navigation.state.params.uri
  //   const questionID = props.navigation.state.params.questionID
  const [hasPermission, setHasPermission] = useState(false)
  const [camera, setCamera] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const [cameraDirection, setCameraDirection] = useState(Camera.Constants.Type.front)
  const [video, setVideo] = useState(null)

  //   async function save(){
  //     console.log(video.uri)
  //     const asset = await MediaLibrary.createAssetAsync(video.uri)
  //     if (asset) {
  //       setVideo(null)
  //     }

  //     let key = "video_"
  //     key += questionID
  //     props.dispatch(saveVideo({key: {video: video.uri, question: question, questionID: questionID}}))
  //     goBack()
  //   }

  //   async function stopRecord(){
  //     setIsRecording(false)
  //     camera.stopRecording()
  //   }

  //   async function startRecord(){
  //     if (camera) {
  //       setIsRecording(true)
  //       const data = await camera.recordAsync()
  //       setVideo(data)
  //     }
  //   }

  //   async function toogleRecord(){
  //     if (isRecording) {
  //       stopRecord()
  //     } else {
  //       startRecord()
  //     }
  //   }

  //   useEffect(() => {
  //     (async () => {
  //       const { status: cameraPermission } = await Camera.requestPermissionsAsync()
  //       const { status: cameraRollPermission } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
  //       setHasPermission(cameraPermission === 'granted' && cameraRollPermission === 'granted')
  //     })()
  //   }, [])

  //   if (hasPermission === null) {
  //     return <View />
  //   }
  //   if (hasPermission === false) {
  //     return <Text>No access to camera</Text>
  //   }


  return(
    <View style={styles.videoPlay}>
      <Video
        source={{ uri: uri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
        style={{ width: '100%', height: '100%' }}
      />
      <View style={ styles.videoBottom }>
        {/* <TouchableOpacity
            onPress={()=>save()}
            style={styles.saveButton}
          >
            <Text style={styles.saveText}>save</Text>
          </TouchableOpacity> */}
      </View>

      <View style={styles.middleSection}>
        {/* <View style={styles.overlay}>
            <Text style={styles.infoText}>Create a 3-4 Minute Video</Text>
          </View> */}
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
      </View>
    </View>
  )
}
// const mapDispatchToProps = dispatch => {
//   return {
//     saveVideo: (uri: string, question: string) => {
//       dispatch(saveVideo({
//         questionText: question,
//         uri: uri
//       }
//       ))
//     }
//   }
// }

// export default connect()(ViewScreen)