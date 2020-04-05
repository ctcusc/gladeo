import React from 'react'
import {
  NavigationScreenProp, 
  NavigationState
} from 'react-navigation'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import styles from './styles'

export default function FinalStepScreen(props: Props) {
  const {navigate} = props.navigation

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
            First, we want to get to know you better!
        </Text>
        <Text style={styles.content}>
            Explain what you do in one minute or less
        </Text>
      </View>
      <View style={styles.header}>
        <Image resizeMode='contain' source={require('../../../../assets/images/finalscreen.png')} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigate('Questions')} style={styles.button}>
          <Text style={styles.buttonText}>
            LET&apos;S GO!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}