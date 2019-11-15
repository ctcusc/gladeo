import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native'
import styles from './styles'

/* AKA: Q&A screen */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 1</Text>
      <Text style={styles.question}>EXPLAIN WHAT YOU DO IN ONE MINUTE OR LESS</Text>
      <TouchableOpacity onPress={() => Alert.alert("hello")} style={styles.button}><Text style={styles.buttonText}>LET'S GO!</Text></TouchableOpacity>


    </View>
  )
}

HomeScreen.propTypes = {
  step: PropTypes.number,
  question: PropTypes.string
}

