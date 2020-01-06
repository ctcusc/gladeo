import React, { useState } from 'react'
import {
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './styles'
import BlackHeading from '../../../shared_components/BlackHeading/BlackHeading'
import GreyTextInput from '../../../shared_components/GreyTextInput/GreyTextInput'
import PinkButton from '../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}

export default function LoginScreen(props: Props) {
  const {navigate} = props.navigation
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <BlackHeading title="Welcome Back" />
        <Image style={styles.image} resizeMode='contain' source={require('../../../../assets/images/gladeo_logo.png')} />
        <GreyTextInput changeTextContent={(email) => setEmail(email)} placeholder="Email Address" inputType='emailAddress'/>
        <GreyTextInput changeTextContent={(pass) => setPassword(pass)} placeholder="Password" inputType='password'/>
        <TouchableOpacity
          onPress={() => navigate('PasswordReset')}
        >
          <Text  style={styles.textButton}>Forgot Password?</Text>
        </TouchableOpacity>
        <PinkButton title="LOG IN" onPress={() => Alert.alert('pressed')} disabled={!email || !password}/>
      </View>
      <View style={styles.footer}>
        <View style={styles.subFooter}>
          <Text style={styles.text}>Don&apos;t have an account?</Text>
          <TouchableOpacity
            onPress={() => navigate('Welcome')}
          >
            <Text style={styles.pinkTextButton}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}