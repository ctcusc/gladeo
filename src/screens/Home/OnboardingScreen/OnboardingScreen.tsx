import React from 'react'
import {
  NavigationScreenProp, 
  NavigationState
} from 'react-navigation'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'

/* AKA: Q&A screen */
export default function OnboardingScreen(props: Props) {
  const {navigate} = props.navigation
  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 1</Text>
      <Text style={styles.question}>EXPLAIN WHAT YOU DO IN ONE MINUTE OR LESS</Text>
      <TouchableOpacity onPress={() => navigate('Home')} style={styles.button}>
        <Text style={styles.buttonText}>LET&apos;S GO!</Text>
      </TouchableOpacity>
    </View>
  )
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
