import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function QuestionScreen() {
  return (
    <View style={styles.container}>
      <Text>Questions</Text>
    </View>
  );
}

QuestionScreen.navigationOptions = {
  title: 'QUESTIONS',
};
