import React from 'react'
import {
  NavigationScreenProp, 
  NavigationState
} from 'react-navigation'
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './styles'

/* AKA: Q&A screen */
export default function OnboardingScreen(props: Props) {
  const {navigate} = props.navigation

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image style={styles.image} resizeMode='contain' source={require('../../../../assets/images/Gladeo_Favicon_Logo_Large_Black.png')} />
        <Text style={styles.text}>helps you create videos where you can answer questions and share your professional story with students.</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigate('Steps')} style={styles.button}>
          <Text style={styles.buttonText}>HOW IT WORKS</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
