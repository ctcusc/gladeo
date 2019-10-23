import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import styles from './styles';

interface State {
  value: boolean,
  text: string,
}

export default class ProfileScreen extends Component {
  navigationOptions = {
    header: null,
  };

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
      </View>
    );
  }


}


