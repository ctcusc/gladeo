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

export default function PasswordResetScreen(props: Props) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageStyle, setMessageStyle] = useState(styles.messageError)
  const {navigate} = props.navigation 

  async function checkEmail(){
    fetch('https://cfa83314.ngrok.io/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'Email': email,
        'Full name': '',
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.statusCode == 404) {
          setMessage('Error: Email is not registered to a user.')
          setMessageStyle(styles.messageError)
        } else if(data.statusCode == 200) {
          navigate('ConfirmResetCode', {
            email: email,
          })
        } else {
          setMessage('Error: Something went wrong')
          setMessageStyle(styles.messageError)
        }
      })
      .catch(error => {
        console.log('Error: ' + error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="Reset your Password" />
        <Text style={styles.regularText}>We&apos;ll send a verification code to the email linked to your account</Text>
        <Text style={messageStyle}>{message}</Text>
        <GreyTextInput changeTextContent={(email) => {
          setEmail(email)
        }} placeholder="Email Address" inputType='emailAddress' input={email}/>
        <PinkButton title="SEND" 
          onPress={checkEmail}
          disabled={!email}
        />
      </View>

      <View style={styles.footer}>
        
      </View>
    </View>
  )
}
