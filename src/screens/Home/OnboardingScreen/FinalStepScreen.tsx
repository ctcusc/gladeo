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
import styles from './finalStepStyles'

export default function FinalStepScreen(props: Props) {
  const {navigate} = props.navigation

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
            First, we want to get to know you better!
        </Text>
        <Text style={styles.content}>
            EXPLAIN WHAT YOU DO IN ONE MINUTE OR LESS
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigate('Home')} style={styles.button}>
          <Text style={styles.buttonText}>
            LET&apos;S GO!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}