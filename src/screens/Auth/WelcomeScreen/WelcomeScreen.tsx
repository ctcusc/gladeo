import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './styles'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
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
        <TouchableOpacity
          onPress={() => navigate('Register')}
          style={styles.pinkButton}
        >
          <Text
            style={styles.pinkButtonText}
          >GET STARTED</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text style={styles.blackTextButton}>Sign In</Text>
        </TouchableOpacity>        
      </View>
    </View>
  )
}