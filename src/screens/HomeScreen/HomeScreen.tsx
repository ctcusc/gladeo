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

/* AKA: Q&A screen */
export default class HomeScreen extends Component {
  state: State = {
    value: false,
    text: '',
  };
  
  navigationOptions = {
    header: null,
  };  

  handleSubmit() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Gladeo!</Text>
        <Image style={styles.logo} source={require("../../../assets/images/gladeo_logo.png")}/>
        <TextInput
          placeholder="Enter Code..."
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          onSubmitEditing={() => this.handleSubmit()}
        />
      </View>
    );
  }


}


