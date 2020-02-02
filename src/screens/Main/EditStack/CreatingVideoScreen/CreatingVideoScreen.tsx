import React, { useState } from 'react'
import AnimatedEllipsis from 'react-native-animated-ellipsis'
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './styles'


export default function CreatingVideoScreen() {
  const [screenCreated, setScreenCreated] = useState(true)
  if(screenCreated) {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <AnimatedEllipsis numberOfDots={4}
            minOpacity={0.5}
            animationDelay={200}
            style={styles.ellipses}
          />
          <Text style={styles.text}>CREATING YOUR VIDEO</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Image 
            style={{width: 100, height: 100}}
            source={require('./checkmark.png')}/>
          <Text style={styles.completedText}>COMPLETE</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              VIEW MY VIDEO
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


