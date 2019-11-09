import React from 'react'
import {
  Text,
  View,
  Button,
  Alert,
  Image
} from 'react-native'
import styles from './styles'
import BlackHeading from '../../../shared_components/BlackHeading/BlackHeading';
import GreyTextInput from '../../../shared_components/GreyTextInput/GreyTextInput';
import PinkButton from '../../../shared_components/PinkButton/PinkButton';

export default function LoginScreen() {
  return (
    <View>
      <View style={styles.container}>
        <BlackHeading title="Welcome Back" />
        <Image style={styles.image} resizeMode='contain' source={require('../../../../assets/images/gladeo_logo.png')} />
        <GreyTextInput placeholder="Email Address" inputType='emailAddress'/>
        <GreyTextInput placeholder="Password" inputType='password'/>
        <Button
          title='Forgot Password?'
          onPress={() => Alert.alert('pressed')}
          color='#777777'
          style={styles.textButton}
        />
        <PinkButton title="LOG IN" onPress={() => Alert.alert('pressed')} />
      </View>

      <View>
        <Text style={styles.text}>Don't have an accout?</Text>
        <Button 
          title='Sign up'
          onPress={() => Alert.alert('pressed')}
          color='#E5186E'
          style={styles.pinkTextButton}
        />
      </View>
    </View>
  )
}