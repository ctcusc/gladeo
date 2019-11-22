import React from 'react'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import styles from './styles'

interface Props {
  title: string;
  onPress(): void;
}

export default function PinkButton (props: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={styles.pinkButton}
      >
        <Text
          style={styles.buttonText}
        >{props.title}</Text>
      </TouchableOpacity>
    </View>
  )
}