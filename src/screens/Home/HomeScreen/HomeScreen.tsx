import React from 'react'
import {
  Text,
  View,
  Image,
} from 'react-native'
import styles from './styles'

/* AKA: Q&A screen */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Gladeo!</Text>
      <Image style={styles.logo} source={require('../../../../assets/images/gladeo_logo.png')} />
    </View>
  )
}

