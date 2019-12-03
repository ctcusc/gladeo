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
  disabled: boolean;
}

export default function PinkButton (props: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={props.disabled ? styles.pinkButtonDisabled : styles.pinkButton}
        disabled={props.disabled}
      >
        <Text
          style={styles.buttonText}
        >{props.title}</Text>
      </TouchableOpacity>
    </View>
  )
}