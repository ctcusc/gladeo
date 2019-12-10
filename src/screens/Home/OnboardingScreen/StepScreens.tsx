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
import styles from './stepStyles'

/* AKA: Q&A screen */
export default function OnboardingScreen(props: Props) {
  const {navigate} = props.navigation
  return (
    <View style={styles.container}>
        <View style={styles.main}>
            <Text style={styles.step}>Step 1</Text>
            <Text style={styles.text}>Select questions to answer</Text>
            <Image style={styles.image} resizeMode='contain' source={require('../../../../assets/images/rectangle.png')} />
            <Image style={styles.image} resizeMode='contain' source={require('../../../../assets/images/rectangle.png')} />
            <Image style={styles.image} resizeMode='contain' source={require('../../../../assets/images/rectangle.png')} />
        </View>
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigate('Home')} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  )
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}