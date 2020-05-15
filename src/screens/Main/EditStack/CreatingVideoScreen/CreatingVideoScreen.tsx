import React, { useState, useEffect } from 'react'
import AnimatedEllipsis from 'react-native-animated-ellipsis'
import { Dimensions } from 'react-native'
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

interface User {
  Name: string,
  Title: string,
  Company: string,
}

function CreatingVideoScreen(props: Props) {
  const [renderComplete, setRenderComplete] = useState(false)
  const [videoURI, setVideoURI] = useState()
  const {push} = props.navigation 
  const videosToCombine = props.navigation.state.params.videosToCombine
  let user: User

  async function getUser() {
    fetch(`${BASE_PATH}/api/user`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        user = {
          Name: data['Full Name'],
          Title: data['Current Title'],
          Company: data.Company
        }
      })
      .catch(error => {
        console.log('Error' + error)
      })
  }

  /*function toMP4(gif: string){ // convert gif to mp4 if needed ??
    var ffmpeg = require('fluent-ffmpeg');

    const fs = require('react-native-fs');
    const giffile = gif+'.gif'
    const buf = Buffer
    fs.writeFile(giffile, buf, function(err: any) {
        ffmpeg(giffile).outputOptions([
          '-movflags faststart',
          '-pix_fmt yuv420p',
          '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
       ])
       .inputFormat('gif')
       .toFormat('mp4')         
   });
};*/

  function generateInfoTitleCard(user: User) { 
    console.log('info titlecard')

    const GIFEncoder = require('gifencoder')
    const { createCanvas } = require('canvas')
    const fs = require('react-native-fs')

    // screen dimensions
    const width = Math.round(Dimensions.get('window').width)
    const height = Math.round(Dimensions.get('window').height)

    const encoder = new GIFEncoder(width, height)
    encoder.start()
    encoder.setRepeat(0)
    encoder.setDelay(0)
    encoder.setQuality(10)

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // set white background
    ctx.fillStyle='#FFFFFF'
    ctx.fillRect(0, 0, width, height)

    // set name text
    ctx.font = '48px Roboto-Bold'
    ctx.fillStyle = '#0E0E0E'
    const namewidth = ctx.measureText(user.Name).width
    const nameX = (width-namewidth)/2
    ctx.fillText(user.Name,nameX,150)
    // set position text
    ctx.font = '18px Roboto-Bold'
    ctx.fillStyle = '#0E0E0E'
    const position = user.Title+' at '+user.Company
    const poswidth = ctx.measureText(position).width
    const posX = (width-poswidth)/2
    ctx.fillText(position,posX,250)

    encoder.addFrame(ctx)
    encoder.finish()

    const buf = encoder.out.getData()
    //fs.writeFile('infotitlecard.gif', buf, function (err: any) {});
    return buf
  }

  // function generateQuestionTitleCard(question: string) {
  //   console.log('question titlecard');

  //   const GIFEncoder = require('gifencoder');
  //   const { createCanvas } = require('canvas');
  //   const fs = require('react-native-fs');

  //   // screen dimensions
  //   const width = Math.round(Dimensions.get('window').width);
  //   const height = Math.round(Dimensions.get('window').height);

  //   const encoder = new GIFEncoder(width, height);
  //   encoder.start();
  //   encoder.setRepeat(0);
  //   encoder.setDelay(0);
  //   encoder.setQuality(10);

  //   const canvas = createCanvas(width, height);
  //   const ctx = canvas.getContext('2d');

  //   // set white background
  //   ctx.fillStyle='#FFFFFF';
  //   ctx.fillRect(0, 0, width, height);

  //   // set question text
  //   ctx.font = '36px Roboto-Bold';
  //   ctx.fillStyle = '#E5186E';
  //   ctx.fillText(question,100,150);
  //   encoder.addFrame(ctx);
  //   encoder.finish();

  //   const buf = encoder.out.getData();
  //   fs.writeFile('questiontitlecard.gif', buf, function (err: any) {});
  //   return buf
  // }

  // console.log('generate')
  // generateQuestionTitleCard("hello")

  
  useEffect(() => {
    //  Combine videos selected in SnippetSelection page
    async function renderVideo() {

      let ffmpegCommandFiles = ''
      let ffmpegCommandAV = ''

      // generate command string
      ffmpegCommandFiles = ffmpegCommandFiles.concat('-i ' + generateInfoTitleCard(user) + ' ') // add info title card
      for (let index = 0; index < videosToCombine.length; index++) {
        ffmpegCommandFiles = ffmpegCommandFiles.concat('-i ' + generateQuestionTitleCard(videosToCombine[index].text) + ' ') // add question title card
        ffmpegCommandAV = ffmpegCommandAV.concat('[' + index + ':v:0]')
        ffmpegCommandAV = ffmpegCommandAV.concat('[' + index + ':a:0]')

        ffmpegCommandFiles = ffmpegCommandFiles.concat('-i ' + props.videos[videosToCombine[index].id].uri + ' ')
        ffmpegCommandAV = ffmpegCommandAV.concat('[' + (2*index+1) + ':v:0]')
        ffmpegCommandAV = ffmpegCommandAV.concat('[' + (2*index+1) + ':a:0]')
        // ffmpegCommandAV = ffmpegCommandAV.concat('[' + (index) + ':v:0]')
        // ffmpegCommandAV = ffmpegCommandAV.concat('[' + (index) + ':a:0]')
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