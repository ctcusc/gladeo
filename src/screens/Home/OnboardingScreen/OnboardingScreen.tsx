import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  Image,
  Button,
  Alert
} from 'react-native'
import styles from './styles'

/* AKA: Q&A screen */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 1</Text>
      <Text style={styles.question}>Question</Text>
      <Button title="Let's Go!" color="#fff" onPress={() => Alert.alert("hello")}></Button>


    </View>
  )
}

HomeScreen.propTypes = {
  step: PropTypes.number,
  question: PropTypes.string
}

