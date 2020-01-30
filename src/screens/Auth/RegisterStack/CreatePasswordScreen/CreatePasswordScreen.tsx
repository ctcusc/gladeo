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

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}

export default function CreatePasswordScreen(props: Props) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {navigate} = props.navigation 

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
        <PinkButton title="CONTINUE" onPress={() => {
          navigate('Home')
        }
        }
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