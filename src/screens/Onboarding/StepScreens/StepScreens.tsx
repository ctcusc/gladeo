import React, {useState} from 'react'
import {
  NavigationScreenProp, 
  NavigationState
} from 'react-navigation'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import styles from './styles'

export default function StepScreens(props: Props) {
  const {navigate} = props.navigation
  const [step, setStep] = useState(2)
  const [text, setText] = useState('Select questions to answer\n')
  const [title, setTitle] = useState('Step 1')
  const [imageSource, setImageSource] = useState(require('../../../../assets/images/step1.png'))
  const [imageSource2, setImageSource2] = useState(require('../../../../assets/images/ellipses1.png'))

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.header}>
        <Image resizeMode='contain' source={imageSource}/>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={() => {
            setStep(step + 1)
            if(step == 2) {
              setText('Record your responses as video snippets')
              setTitle('Step 2')
              setImageSource(require('../../../../assets/images/step2.png'))
              setImageSource2(require('../../../../assets/images/ellipses2.png'))
            }
            if(step == 3) {
              setText('Choose snippets to include in your video')
              setTitle('Step 3')
              setImageSource(require('../../../../assets/images/step3.png'))
              setImageSource2(require('../../../../assets/images/ellipses3.png'))
            }
            if(step == 4) {
              setText('Create + publish your video to Gladeo\'s Youtube')
              setTitle('Step 4')
              setImageSource(require('../../../../assets/images/step4.png'))
              setImageSource2(require('../../../../assets/images/ellipses4.png'))
            }
            if(step == 5){
              navigate('FinalStep')
            } 
          } }
        >
          <Text>
            <Image resizeMode='contain' source={require('../../../../assets/images/Arrow.png')} />
          </Text>
        </TouchableOpacity>
        <Image resizeMode='contain' source={imageSource2} />
      </View>
    </View>
  )
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}