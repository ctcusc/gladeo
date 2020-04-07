import React from 'react'
import {
  Text,
  View,
  Image
} from 'react-native'
import styles from './styles'
import PinkButton from '../../../../shared_components/PinkButton/PinkButton'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}

export default function UserInfoScreen(props: Props) {
  const {navigate} = props.navigation 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.subsection}> 
          <Text style={styles.titleText}>Hi Tommy</Text>
        </View>
        <View style={styles.subsection}> 
          <Text style={styles.subtitleText}>You are all set up.</Text>
        </View>
        <View style={styles.subsection}> 
          <Image source={require('../../../../../assets/images/wavinghands.png')} />
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.subsection}> 
          <View style={styles.bar}><Text>                                                                              </Text></View>
          <Text style={styles.catagories}>Name</Text>
          <Text style={styles.valuesText}>Tommy Trojan</Text>
        </View>
        <View style={styles.subsection}> 
          <View style={styles.bar}><Text>                                                                              </Text></View>
          <Text style={styles.catagories}>Company</Text>
          <Text style={styles.valuesText}>Figma</Text>       
        </View>
        <View style={styles.subsection}> 
          <View style={styles.bar}><Text>                                                                              </Text></View>
          <Text style={styles.catagories}>Job Title</Text>
          <Text style={styles.valuesText}>Software Engineer</Text>
        </View>
        <View style={styles.bar}><Text>                                                                              </Text></View>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonLine}> 
          <PinkButton title="LET'S GO!" 
            onPress={
              () => navigate('', {
              })
            } 
            disabled={false}
          />
        </View>
      </View>
    </View>
  )
}
