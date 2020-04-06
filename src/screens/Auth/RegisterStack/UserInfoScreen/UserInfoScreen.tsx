import React, { useState } from 'react'
import {
  Text,
  View,
  Alert,
  Image
} from 'react-native'
import styles from './styles'
import BlackHeading from '../../../../shared_components/BlackHeading/BlackHeading'
import GreyTextInput from '../../../../shared_components/GreyTextInput/GreyTextInput'
import PinkButton from '../../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}

export default function UserInfoScreen(props: Props) {
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const {navigate} = props.navigation 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Hi Tommy</Text>
        <Text style={styles.subtitleText}>You're all set up.</Text>
        <Image style={styles.image} source={require('../../../../../assets/images/wavinghands.png')} />
      </View>
      <View style={styles.main}>
        <View style={styles.subsection}> 
          <Text style={styles.catagories}>Name</Text>
          <Text style={styles.valuesText}>Tommy Trojan</Text>
          <View style={styles.bar}><Text>                                                                              </Text></View>
        </View>
        <View style={styles.subsection}> 
          <Text style={styles.catagories}>Company</Text>
          <Text style={styles.valuesText}>Figma</Text>
          <View style={styles.bar}><Text>                                                                              </Text></View>
        
        </View>
        <View style={styles.subsection}> 
          <Text style={styles.catagories}>Job Title</Text>
          <Text style={styles.valuesText}>Software Engineer</Text>
          <View style={styles.bar}><Text>                                                                              </Text></View>
        </View>
        

      </View>
      <View style={styles.footer}>
        <View style={styles.resendButtonLine}> 
          <PinkButton title="LET'S GO!" 
            onPress={
              () => navigate('', {
                userTitle: title,
                companyCode: code,
              })
            } 
            disabled={!title || !code}
          />
        </View>
      </View>
    </View>
  )
}
