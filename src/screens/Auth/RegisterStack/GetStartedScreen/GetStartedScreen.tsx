import React, { useState } from 'react'
import {
  Text,
  View,
  Image,
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

export default function GetStartedScreen(props: Props) {
  const [code, setCode] = useState('')
  const {navigate} = props.navigation 
  const [message, setMessage] = useState('It\'s a 9-character code provided by Gladeo!')
  const [messageStyle, setMessageStyle] = useState(styles.messageNormal)

  async function checkCompanyCode(){
    fetch(`${BASE_PATH}/api/company/${code}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.statusCode == 404) {
          setMessage('Error: Company code is not valid.')
          setMessageStyle(styles.messageError)
          setCode('')
        } else if(data.statusCode == 409) {
          setMessage('Error: User with code '+code+' is already registered.')
          setMessageStyle(styles.messageError)
          setCode('')
        } else {
          navigate('Register', {
            companyCode: code,
            userRecord: data['_record']
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
        <BlackHeading title="Let's get Started!" />
        <Text style={messageStyle}>{message}</Text>
        <Image style={styles.graphic} resizeMode='contain' source={require('../../../../../assets/images/registergraphic.png')} />
        <GreyTextInput changeTextContent={(code) => setCode(code)} placeholder="Company Code" inputType='text' input={code}/>
        <PinkButton title="START CREATING" 
          onPress={checkCompanyCode}
          disabled={!code}
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