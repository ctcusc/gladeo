import React, { useState } from 'react'
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'
import BlackHeading from '../../../../shared_components/BlackHeading/BlackHeading'
import GreyTextInput from '../../../../shared_components/GreyTextInput/GreyTextInput'
import PinkButton from '../../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}

export default function GetStartedScreen(props: Props) {
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const {navigate} = props.navigation 

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="Let's get Started!" />
        <Text style={styles.margin}></Text>
        <GreyTextInput changeTextContent={(title) => setTitle(title)} placeholder="Current Title" inputType='text'/>
        <GreyTextInput changeTextContent={(code) => setCode(code)} placeholder="Company Code" inputType='text'/>
        <PinkButton title="START CREATING" 
          onPress={
            () => navigate('Register')
          } 
          disabled={!title || !code}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.resendButtonLine}> 
          <Text style={styles.normalText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Text style={styles.pinkTextButton}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}