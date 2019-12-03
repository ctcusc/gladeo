import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from '../../Auth/RegisterScreen/styles'
import BlackHeading from '../../../shared_components/BlackHeading/BlackHeading'
import GreyTextInput from '../../../shared_components/GreyTextInput/GreyTextInput'
import PinkButton from '../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export default function RegisterScreen(props: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const {navigate} = props.navigation 

  function changeName(name: string){
    setName(name)
  }

  function changeEmail(email: string){
    setEmail(email)
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="What's your Email?" />
        <Text style={styles.regularText}>Make sure to use your work email so we can match you to your employer</Text>
        <GreyTextInput changeTextContent={changeName} placeholder="Name" inputType='text'/>
        <GreyTextInput changeTextContent={changeEmail} placeholder="Email Address" inputType='emailAddress'/>
        <PinkButton title="CONTINUE" 
          onPress={
            () => navigate('CreatePassword')
          }
          disabled={name == '' || email == ''}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.resendButtonLine}> 
          <Text style={styles.normalText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigate('Login')}>
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