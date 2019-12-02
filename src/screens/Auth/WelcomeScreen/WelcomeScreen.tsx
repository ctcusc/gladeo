import React, { useState } from 'react'
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from '../../Auth/WelcomeScreen/styles';
import BlackHeading from '../../../shared_components/BlackHeading/BlackHeading';
import PinkButton from '../../../shared_components/PinkButton/PinkButton';

export default function WelcomeScreen() {
  
  return (
    <View style={styles.container}>
        <View style={styles.main}>
            <BlackHeading title="Share your Story" />
            <Text style={styles.regularText}>Empore students and guide their path</Text>
            <Image style={styles.imageMiddle} resizeMode='contain' source={require('../../../../assets/images/gladeo_logo.png')} />
            <PinkButton title="Get Started" onPress={() => {Alert.alert('pressed')}}/>
            <TouchableOpacity onPress={() => Alert.alert('pressed')}>
                    <Text style={styles.blackTextButton}>Log In</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Image style={styles.imageBotton} resizeMode='contain' source={require('../../../../assets/images/gladeo_logo.png')} />
        </View>
    </View>
  )
}