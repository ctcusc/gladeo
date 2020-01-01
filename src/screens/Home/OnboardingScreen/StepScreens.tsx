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
import styles from './stepStyles'

export default function StepScreens(props: Props) {
  const {navigate} = props.navigation
  const [step, setStep] = useState(2)
  const [text, setText] = useState('Select questions to answer')
  const [title, setTitle] = useState('Step 1')
  const [textStyle, setTextStyle] = useState(styles.textOne)
  const [imageSource, setImageSource] = useState(require('../../../../assets/images/step1.png'))
  const [buttonContent, setButtonContent] = useState('Next')

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={textStyle}>{text}</Text>
        <Image resizeMode='contain' source={imageSource} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={() => {
            setStep(step + 1)
            if(step == 2) {
              setTextStyle(styles.textTwo)
              setText('Record your responses as video snippets')
              setTitle('Step 2')
              setImageSource(require('../../../../assets/images/step2.png'))
            }
            if(step == 3) {
              setTextStyle(styles.textThree)
              setText('Choose snippets to include in your video')
              setTitle('Step 3')
              setImageSource(require('../../../../assets/images/step3.png'))
            }
            if(step == 4) {
              setTextStyle(styles.textFour)
              setText('Create + publish your video to Gladeo\'s Youtube')
              setTitle('Step 4')
              setImageSource(require('../../../../assets/images/step4.png'))
              setButtonContent('GET STARTED')
            }
            if(step == 5){
              navigate('FinalStep')
            } 
          } }
          style={styles.button}>
          <Text style={styles.buttonText}>
            {buttonContent}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}