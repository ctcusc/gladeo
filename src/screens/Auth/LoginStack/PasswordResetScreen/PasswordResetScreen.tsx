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

export default function PasswordResetScreen() {
  const [email, setEmail] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="Reset your Password" />
        <Text style={styles.regularText}>We&apos;ll send a reset link to the email linked to your account</Text>
        <GreyTextInput changeTextContent={(email) => {
          setEmail(email)
        }} placeholder="Email Address" inputType='emailAddress'/>
        <PinkButton title="SEND" onPress={() => Alert.alert('pressed')} disabled={!email}/>
        <View style={styles.resendButtonLine}> 
          <Text style={styles.normalText}>No dice?</Text>
          <TouchableOpacity
            onPress={() => Alert.alert('pressed')}
          >
            <Text style={styles.pinkTextButton}> Resend validation link.</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        
      </View>
    </View>
  )
}