import React, { useState, useEffect } from 'react'
import AnimatedEllipsis from 'react-native-animated-ellipsis'
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { RNFFmpeg } from 'react-native-ffmpeg'
import RNConvertPhAsset from 'react-native-convert-ph-asset'
import CameraRoll from '@react-native-community/cameraroll'
import styles from './styles'
import { connect } from 'react-redux'


interface Snippet {
  id: number,
  isSelected: boolean,
  orderInList: number,
  text: string,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
  videos: Array<Record<string, any>>,
}

function CreatingVideoScreen(props: Props) {
  const [renderComplete, setRenderComplete] = useState(false)
  const [videoURI, setVideoURI] = useState()
  const {push} = props.navigation 
  const videosToCombine = props.navigation.state.params.videosToCombine

  
  useEffect(() => {
    //  Combine videos selected in SnippetSelection page
    async function renderVideo() {

      let ffmpegCommandFiles = ''
      let ffmpegCommandAV = ''

      // generate command string
      for (let index = 0; index < videosToCombine.length; index++) {
        ffmpegCommandFiles = ffmpegCommandFiles.concat('-i ' + props.videos[videosToCombine[index].id].uri + ' ')
        ffmpegCommandAV = ffmpegCommandAV.concat('[' + index + ':v:0]')
        ffmpegCommandAV = ffmpegCommandAV.concat('[' + index + ':a:0]')
      }
       
      // Render videos together
      await RNFFmpeg.execute(`${ffmpegCommandFiles} -filter_complex "${ffmpegCommandAV}concat=n=${videosToCombine.length}:v=1:a=1[outv][outa]" -map "[outv]" -map "[outa]" -y ${props.videos['COMBINED_PLACEHOLDER'].uri}`)
        .then(result => {
          console.log('result: ', result.rc)
        })
        // Save to camera roll
      const combinedURI = await CameraRoll.saveToCameraRoll(props.videos['COMBINED_PLACEHOLDER'].uri)
        .catch(err => console.log('err:', err))

      // convert camera roll URI to viewable URI
      await RNConvertPhAsset.convertVideoFromUrl({
        url: combinedURI,
        convertTo: 'mov',
        quality: 'high'
      }).then(response => {
        console.log('response: ', response)
        setVideoURI(response.path)
      }).catch((err) => {
        console.log(err)
      })
      setRenderComplete(true)
    }
    renderVideo()
  })

  if(!renderComplete) {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <AnimatedEllipsis numberOfDots={4}
            minOpacity={0.5}
            animationDelay={200}
            style={styles.ellipses}
          />
          <Text style={styles.text}>CREATING YOUR VIDEO</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Image 
            style={{width: 100, height: 100}}
            source={require('../../../../../assets/images/checkmark.png')}/>
          <Text style={styles.completedText}>COMPLETE</Text>
          <TouchableOpacity style={styles.button} onPress={() => {
            push('View', {
              'question': '',
              'uri': videoURI
            })          
          }}>
            <Text style={styles.buttonText}>
              VIEW MY VIDEO
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    videos: state
  }
}

export default connect(mapStateToProps)(CreatingVideoScreen)