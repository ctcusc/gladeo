import React from 'react'
import {
  Text,
  View,
  Button,
  Alert
} from 'react-native'
import styles from './styles'

/* AKA: Q&A screen */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>Welcome to Gladeo!</Text>
      <Text style={styles.question}>Question</Text>
      <Button title="Let's Go!" color="#fff" onPress={() => Alert.alert("hello")}></Button>

      {/* <Text style={styles.title}>Welcome to Gladeo!</Text>
      <Image style={styles.logo} source={require('../../../../assets/images/gladeo_logo.png')} /> */}
    </View>
  )
}

