import React from 'react'
import PropTypes from 'prop-types'
import HomeScreen from '../HomeScreen/HomeScreen'
import {
  Text,
  View,
<<<<<<< HEAD
  TouchableOpacity,
=======
  Image,
  Button,
  TouchableOpacity,
  Alert
>>>>>>> f9c8ad6cd3d4d894e9e80b768386e49d9f62c259
} from 'react-native'
import styles from './styles'

/* AKA: Q&A screen */
export default function OnboardingScreen(props) {
<<<<<<< HEAD
  const {navigate} = props.navigation
=======
  const {navigate} = props.navigation;
>>>>>>> f9c8ad6cd3d4d894e9e80b768386e49d9f62c259
  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 1</Text>
      <Text style={styles.question}>EXPLAIN WHAT YOU DO IN ONE MINUTE OR LESS</Text>
      <TouchableOpacity onPress={() => navigate('Home')} style={styles.button}>
        <Text style={styles.buttonText}>LET'S GO!</Text>
      </TouchableOpacity>
    </View>
  )
 
}

OnboardingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

