import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'
import BlackHeading from '../../../../shared_components/BlackHeading/BlackHeading'
import GreyTextNumInput from '../../../../shared_components/GreyTextNumInput/GreyTextNumInput'
import PinkButton from '../../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { BASE_PATH } from 'react-native-dotenv'

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}

export default function ConfirmResetCodeScreen(props: Props) {
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [third, setThird] = useState('')
  const [fourth, setFourth] = useState('')
  const [message, setMessage] = useState('')
  const [messageStyle, setMessageStyle] = useState(styles.messageError)
  const {navigate} = props.navigation 
  const user = {
    email: props.navigation .state.params.email,
  }

  async function checkVerificationCode(){
    fetch(`${BASE_PATH}/api/auth/confirm-reset-code`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'Email': user.email,
        'Code': first + second + third + fourth,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.statusCode == 401) {
          setMessage('Error: Verification Code is invalid.')
          setMessageStyle(styles.messageError)
        } else {
          navigate('CreateResetPassword', {
            email: user.email,
          })
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
        <Text style={styles.regularText}>We&apos;ve sent the verification code to the email linked to this account</Text>
        <Text style={messageStyle}>{message}</Text>
        <View style = {styles.code}>
          <GreyTextNumInput changeTextContent={(first) => {
            setFirst(first)
          }} placeholder="" inputType='first' input={first}/>
          <GreyTextNumInput changeTextContent={(second) => {
            setSecond(second)
          }} placeholder="" inputType='second' input={second}/>
          <GreyTextNumInput changeTextContent={(third) => {
            setThird(third)
          }} placeholder="" inputType='third' input={third}/>
          <GreyTextNumInput changeTextContent={(fourth) => {
            setFourth(fourth)
          }} placeholder="" inputType='fourth' input={fourth}/>
        </View>
        <PinkButton title="SEND" 
          onPress={checkVerificationCode}
          disabled={!first || !second || !third || !fourth}
        />
        <View style={styles.resendButtonLine}> 
          <Text style={styles.normalText}>No dice?</Text>
          <TouchableOpacity onPress={checkVerificationCode}>
            <Text style={styles.pinkTextButton}> Resend validation link.</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        
      </View>
    </View>
  )
}
