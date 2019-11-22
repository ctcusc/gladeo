import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import styles from './styles'

interface Props {
  title: string;
}

export default function BlackHeading(props: Props){
  return(
    <View>
      <Text style={styles.title}>
        {props.title}
      </Text>
    </View>
  )
}
