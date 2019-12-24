import React from 'react'
import AnimatedEllipsis from 'react-native-animated-ellipsis'
import {
  Text,
  View,
} from 'react-native'
import styles from './styles'

export default function RenderingVideoScreen() {
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
}


