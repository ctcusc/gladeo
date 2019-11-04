import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'
import styles from './styles'

interface State {
  value: boolean,
  text: string,
}

export default class CreateScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create</Text>
      </View>
    )
  }

}


