import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import styles from './styles';

export default class CreateScreen extends Component {
  navigationOptions = {
    header: null,
  };  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create Video</Text>
      </View>
    );
  }


}


