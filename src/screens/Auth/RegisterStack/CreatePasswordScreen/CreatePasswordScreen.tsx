import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
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

export default function CreatePasswordScreen(props: Props) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {navigate} = props.navigation 
  const user = {
    companyCode: props.navigation.state.params.companyCode,
    name: props.navigation.state.params.name,
    email: props.navigation.state.params.email,
    userRecord: props.navigation.state.params.userRecord,
  }
  const [message, setMessage] = useState('Keep this secure! Use 10+ characters')
  const [messageStyle, setMessageStyle] = useState(styles.regularText)

  async function handleRegister(){
    fetch(`${BASE_PATH}/api/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'Email': user.email,
        'Password': password,
        '_record': user.userRecord,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        navigate('Onboarding')
      })
      .catch(error => {
        console.log('Error: ' + error)
      })
  }

  function checkMessage() {
    if(password.length < 10) {
      setMessage('Error: Password must be 10+ characters')
      setMessageStyle(styles.messageError)
    } else if(password != confirmPassword) {
      setMessage('Error: Passwords don\'t match')
      setMessageStyle(styles.messageError)
    } else {
      handleRegister()
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="Create a Password" />
        <Text style={messageStyle}>{message}</Text>
        <Text style={styles.margin}></Text>
        <GreyTextInput changeTextContent={(password) => {
          setPassword(password)
        }} placeholder="Password (10+ characters)" inputType='password' input={password}/>
        <GreyTextInput changeTextContent={(confirmPassword) => {
          setConfirmPassword(confirmPassword)
        }} placeholder="Confirm Password" inputType='password' input={confirmPassword}/>
        <PinkButton title="CONTINUE" onPress={() => checkMessage()}
          disabled={!password}
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