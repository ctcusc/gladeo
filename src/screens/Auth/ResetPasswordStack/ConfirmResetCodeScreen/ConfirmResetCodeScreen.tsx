import React, { useState, useRef } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'
import BlackHeading from '../../../../shared_components/BlackHeading/BlackHeading'
import { GreyTextNumInput } from '../../../../shared_components/GreyTextNumInput/GreyTextNumInput'
import PinkButton from '../../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { BASE_PATH } from 'react-native-dotenv'

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}

export default function ConfirmResetCodeScreen(props: Props) {
  const [reference1, setFirstRef] = useState(useRef(null))
  const [reference2, setSecondRef] = useState(useRef(null))
  const [reference3, setThirdRef] = useState(useRef(null))
  const [reference4, setFourthRef] = useState(useRef(null))
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [third, setThird] = useState('')
  const [fourth, setFourth] = useState('')
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

  function focusFirst(first) {
    setFirst(first)
    if(first) reference2.current.focus()
  }

  function focusSecond(second) {
    setSecond(second)
    if(second) reference3.current.focus()
  }

  function focusThird(third) {
    setThird(third)
    if(third) reference4.current.focus()
  }

  function focusFourth(fourth) {
    setFourth(fourth)
    if(first && second && third && fourth) checkVerificationCode
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="Reset your Password" />
        <Text style={styles.regularText}>We&apos;ve sent the verification code to the email linked to this account</Text>
        <Text style={messageStyle}>{message}</Text>
        <View style = {styles.code}>
          <GreyTextNumInput changeTextContent={(first) => {
            focusFirst(first)
          }} changeReference={(ref1) => {
            setFirstRef(ref1)
          }}
          input={first}/>
          <GreyTextNumInput changeTextContent={(second) => {
            focusSecond(second)
          }}  changeReference={(ref2) => {
            setSecondRef(ref2)
          }}
          input={second}/>
          <GreyTextNumInput changeTextContent={(third) => {
            focusThird(third)
          }} 
          changeReference={(ref3) => {
            setThirdRef(ref3)
          }}
          input={third}/>
          <GreyTextNumInput changeTextContent={(fourth) => {
            focusFourth(fourth)
          }}
          changeReference={(ref4) => {
            setFourthRef(ref4)
          }}
          input={fourth}/>
        </View>
        <PinkButton title="SEND" 
          onPress={checkVerificationCode}
          disabled={!first || !second || !third || !fourth}
        />
        <View style={styles.resendButtonLine}> 
          <Text style={styles.normalText}>No dice?</Text>
          <TouchableOpacity onPress={resendEmail}>
            <Text style={styles.pinkTextButton}> Resend validation link.</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        
      </View>
    </View>
  )
}
