import React, { useState } from 'react'
import {
  Text,
  View,
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

export default function CreateResetPasswordScreen(props: Props) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {navigate} = props.navigation 
  const [message, setMessage] = useState('')

  const user = {
    email: props.navigation.state.params.email,
  }

  async function handleRegister(){
    fetch(`${BASE_PATH}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'Email': user.email,
        'Password': password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        navigate('Questions')
      })
      .catch(error => {
        console.log('Error: ' + error)
      })
  }

  function checkMessage() {
    if(password.length < 10) {
      setMessage('Error: Password must be 10+ characters')
    } else if(password != confirmPassword) {
      setMessage('Error: Passwords don\'t match')
    } else {
      handleRegister()
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="Create new Password" />
        <Text style={styles.messageError}>{message}</Text>
        <Text style={styles.margin}></Text>
        <GreyTextInput changeTextContent={(password) => {
          setPassword(password)
        }} placeholder="Password (10+ characters)" inputType='password' input={password}/>
        <GreyTextInput changeTextContent={(confirmPassword) => {
          setConfirmPassword(confirmPassword)
        }} placeholder="Confirm Password" inputType='password' input={confirmPassword}/>
        <PinkButton title="RESET PASSWORD" onPress={() => checkMessage()}
          disabled={!password}
        />
      </View>
    </View>
  )
}