import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import styles from './styles'

interface Props {
  message: string,
  visible: boolean,
}
  
export default function PinkButton (props: Props) {
  if(props.visible) {
    return (
      <View>
        <Text
          style={styles.text}>
                      Error: {props.message}
        </Text>
      </View>
    )
  }
  return null
}