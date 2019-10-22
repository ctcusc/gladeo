import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

import styles from './styles';

export default function HomeScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Gladeo!</Text>
      <Image style={styles.logo} source={require("../../../assets/images/gladeo_logo.png")}/>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

