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
  const [message, setMessage] = useState('')
  const [messageStyle, setMessageStyle] = useState(styles.messageError)

  async function handleLogin(){
    fetch(`${BASE_PATH}/api/auth/login`, {
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
          setMessage('Error: User or Password does not exist')
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
  
  const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
    return expression.test(String(email).toLowerCase())
  }

  function validEmail() {
    if(validate(email)) {
      handleLogin()
    } else {
      setMessage('Error: Input is not an email address')
      setPassword('')
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="Welcome Back" />
        <Image style={styles.image} resizeMode='contain' source={require('../../../../../assets/images/gladeo_logo.png')} />

        <Text style={messageStyle}>{message}</Text>
        <GreyTextInput changeTextContent={(email) => setEmail(email)} input={email} placeholder="Email Address" inputType='emailAddress'/>
        <GreyTextInput changeTextContent={(pass) => setPassword(pass)} input={password} placeholder="Password" inputType='password'/>
        <TouchableOpacity
          onPress={() => navigate('ResetPassword')}
        >
          <Text style={styles.textButton}>Forgot Password?</Text>
        </TouchableOpacity>
        <PinkButton title="LOG IN" onPress={validEmail} disabled={!email || !password}/>
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