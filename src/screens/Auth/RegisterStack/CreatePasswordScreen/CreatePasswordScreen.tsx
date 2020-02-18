import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
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
    userTitle: props.navigation .state.params.userTitle,
    companyCode: props.navigation .state.params.companyCode,
    name: props.navigation .state.params.name,
    email: props.navigation .state.params.email
  }

  async function handleRegister(){
    fetch(`${BASE_PATH}/api/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'Full Name': user.name,
        'Email': user.email,
        'Current Title': user.userTitle,
        'Company Code': user.companyCode,
        'Password': password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.ID == undefined) {
          Alert.alert('User already exists')
        } else {
          navigate('Onboarding')
        }
      })
      .catch(error => {
        console.log('Error: ' + error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="Create a Password" />
        <Text style={styles.regularText}>Keep this secure!</Text>
        <GreyTextInput changeTextContent={(password) => {
          setPassword(password)
        }} placeholder="Password (8+ characters)" inputType='password' input={password}/>
        <GreyTextInput changeTextContent={(confirmPassword) => {
          setConfirmPassword(confirmPassword)
        }} placeholder="Confirm Password" inputType='password' input={confirmPassword}/>
        <PinkButton title="CONTINUE" onPress={() => handleRegister()}
          disabled={password.length < 8 || password != confirmPassword}
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