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

/* AKA: Q&A screen */
export default function OnboardingScreen(props: Props) {
  const {navigate} = props.navigation
  const [step, setStep] = useState(2)
  const [text, setText] = useState('Select questions to answer')
  const [header, setHeader] = useState('Step 1')
  const [textStyle, setTextStyle] = useState(styles.stepOne)

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.header}>{header}</Text>
        <Text style={textStyle}>{text}</Text>
        <Image style={styles.image} resizeMode='contain' source={require('../../../../assets/images/rectangle.png')} />
        <Image style={styles.image} resizeMode='contain' source={require('../../../../assets/images/rectangle.png')} />
        <Image style={styles.image} resizeMode='contain' source={require('../../../../assets/images/rectangle.png')} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={() => {
            setStep(step + 1)
            if(step == 2) {
              setTextStyle(styles.stepTwo)
              setText('Record your responses as video snippets')
              setHeader('Step 2')
            }
            if(step == 3) {
              setTextStyle(styles.stepThree)
              setText('Choose snippets to include in your video')
              setHeader('Step 3')
            }
            if(step == 4) {
              setTextStyle(styles.stepFour)
              setText('Create + publish your video to Gladeo\'s Youtube')
              setHeader('Step 4')
            }
            if(step == 5){
              navigate('Home')
            }
          } 
          }
          style={styles.button}>
          <Text style={styles.buttonText}>
              Next
          </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}