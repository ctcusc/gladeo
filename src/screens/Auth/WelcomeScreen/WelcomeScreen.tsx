import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from '../../Auth/WelcomeScreen/styles'
import BlackHeading from '../../../shared_components/BlackHeading/BlackHeading'
import PinkButton from '../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export default function WelcomeScreen(props: Props) {
  const {navigate} = props.navigation 

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.margin}></Text>
        <BlackHeading title="Share your Story" />
        <Text style={styles.regularText}>Empore students and guide their path</Text>
        <Image style={styles.imageMiddle} resizeMode='contain' source={require('../../../../assets/images/gladeo_logo.png')} />
        <PinkButton title="Get Started" onPress={() => navigate('Register')}/>
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text style={styles.blackTextButton}>Log In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Image style={styles.imageBotton} resizeMode='contain' source={require('../../../../assets/images/gladeo_logo.png')} />
      </View>
    </View>
  )
}