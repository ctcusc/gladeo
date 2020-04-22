import React, { useState } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'
import styles from './styles'
import BlackHeading from '../../../../shared_components/BlackHeading/BlackHeading'
import GreyTextInput from '../../../../shared_components/GreyTextInput/GreyTextInput'
import PinkButton from '../../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { BASE_PATH } from 'react-native-dotenv'

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}


export default function LoginScreen(props: Props) {
  const {navigate} = props.navigation
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(){
    fetch('https://d46ef5f4.ngrok.io/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'Email': email,
        'Password': password
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.ID == undefined) {
          Alert.alert('Incorrect email address or password')
          setPassword('')
        } else if(data.Answered == undefined || data.Answered.length == 0) {
          navigate('Onboarding')
        } else if(data.Answered.length >= 1) {
          navigate('Questions')
        }
      })
      .catch(error => {
        console.log('Error: ' + error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="Welcome Back" />
        <Image style={styles.image} resizeMode='contain' source={require('../../../../../assets/images/gladeo_logo.png')} />
        <GreyTextInput changeTextContent={(email) => setEmail(email)} input={email} placeholder="Email Address" inputType='emailAddress'/>
        <GreyTextInput changeTextContent={(pass) => setPassword(pass)} input={password} placeholder="Password" inputType='password'/>
        <TouchableOpacity
          onPress={() => navigate('PasswordReset')}
        >
          <Text style={styles.textButton}>Forgot Password?</Text>
        </TouchableOpacity>
        <PinkButton title="LOG IN" onPress={handleLogin} disabled={!email || !password}/>
      </View>
      <View style={styles.footer}>
        <View style={styles.subFooter}>
          <Text style={styles.text}>Don&apos;t have an account?</Text>
          <TouchableOpacity
            onPress={() => navigate('Register')}
          >
            <Text style={styles.pinkTextButton}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}