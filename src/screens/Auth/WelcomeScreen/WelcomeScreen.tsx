import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from '../../Auth/WelcomeScreen/styles'
import PinkButton from '../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}

export default function WelcomeScreen(props: Props) {
  const {navigate} = props.navigation 

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.margin}></Text>
        <Image style={styles.imageTop} resizeMode='contain' source={require('../../../../assets/images/Glade-Favicon-Logo-Large.png')} />
        <Text style={styles.regularText}>Share your story to empower students and guide their path</Text>
        <Image style={styles.imageMiddle} resizeMode='contain' source={require('../../../../assets/images/gladeo_logo.png')} />
      </View>
      <View style={styles.footer}>
        <PinkButton title="Get Started" onPress={() => navigate('Register')} disabled={false}/>
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text style={styles.blackTextButton}>Log In</Text>
        </TouchableOpacity>        
      </View>
    </View>
  )
}