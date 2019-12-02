import React, { useState } from 'react'
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from '../../Auth/CreatePasswordScreen/styles'
import BlackHeading from '../../../shared_components/BlackHeading/BlackHeading'
import GreyTextInput from '../../../shared_components/GreyTextInput/GreyTextInput'
import PinkButton from '../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export default function CreatePasswordScreen(props: Props) {
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const {navigate} = props.navigation 

  function changePassword1(pass1: string){
    setPassword1(pass1)
  }

  function changePassword2(pass2: string){
    setPassword2(pass2)
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="Create a Password" />
        <Text style={styles.regularText}>Keep this secure!</Text>
        <GreyTextInput changeTextContent={changePassword1} placeholder="Password (8+ characters)" inputType='password'/>
        <GreyTextInput changeTextContent={changePassword2} placeholder="Confirm Password" inputType='password'/>
        <PinkButton title="CONTINUE" onPress={() => {
          if (password1 != password2) {
            Alert.alert('Passwords do not match.')
          } else{
            navigate('GetStarted')
          }
        }
        }
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.resendButtonLine}> 
          <Text style={styles.normalText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => Alert.alert('pressed')}>
            <Text style={styles.pinkTextButton}> Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageLine}>
          <Image style={styles.image} resizeMode='contain' source={require('../../../../assets/images/gladeo_logo.png')} />
        </View>
      </View>
    </View>
  )
}