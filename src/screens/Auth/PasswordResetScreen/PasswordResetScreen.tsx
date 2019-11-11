import React from 'react'
import {
  Text,
  View,
  Alert,
  Button,
} from 'react-native'
import styles from '../../Auth/PasswordResetScreen/styles';
import BlackHeading from '../../../shared_components/BlackHeading/BlackHeading';
import GreyTextInput from '../../../shared_components/GreyTextInput/GreyTextInput';
import PinkButton from '../../../shared_components/PinkButton/PinkButton';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.main}>
            <BlackHeading title="Reset your Password" />
            <Text style={styles.boldText}>We'll send a reset link to the email linked to your account</Text>
            <GreyTextInput placeholder="Email Address" inputType='emailAddress'/>
            <PinkButton title="SEND" onPress={() => Alert.alert('pressed')} />
            <View style={styles.resendButtonLine}> 
                <Text style={styles.normalText}>No dice?</Text>
                <Button 
                    title='Resend validation link'
                    onPress={() => Alert.alert('pressed')}
                    color='#E5186E'
                    style={styles.pinkTextButton}
                />
            </View>
        </View>

        <View style={styles.footer}>
        
        </View>
    </View>
  )
}