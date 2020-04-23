import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'
import BlackHeading from '../../../../shared_components/BlackHeading/BlackHeading'
import PinkButton from '../../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { BASE_PATH } from 'react-native-dotenv'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}

export default function ConfirmResetCodeScreen(props: Props) {
  const [code, setCode] = useState('')
  const ref = useBlurOnFulfill({code, cellCount: 4})
  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  })
  const [message, setMessage] = useState('')
  const [messageStyle, setMessageStyle] = useState(styles.messageError)
  const {navigate} = props.navigation 
  const user = {
    email: props.navigation.state.params.email,
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
        } else if(data.statusCode == 200) {
          navigate('CreateResetPassword', {
            email: user.email,
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

  async function resendEmail(){
    fetch(`${BASE_PATH}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'Email': user.email,
        'Full name': '',
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.statusCode != 200) {
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
        <Text style={styles.regularText}>We&apos;ve sent the verification code to the email linked to this account</Text>
        <Text style={messageStyle}>{message}</Text>
        <View style = {styles.code}>
          <CodeField
            ref={ref}
            {...cellProps}
            value={code}
            onChangeText={setCode}
            cellCount={4}
            rootStyle={styles.codeField}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <PinkButton title="SEND" 
          onPress={checkVerificationCode}
          disabled={code.length !== 4}
        />
        <View style={styles.resendButtonLine}> 
          <Text style={styles.normalText}>No dice?</Text>
          <TouchableOpacity onPress={resendEmail}>
            <Text style={styles.pinkTextButton}> Resend validation link.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
