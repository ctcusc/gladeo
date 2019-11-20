import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'
import logo from '../../../../assets/images/gladeo_logo.png'
import background from '../../../../assets/images/dotsbackground.png'
import {
  Text,
  View,
  Image,
  Alert,
  SafeAreaView, 
  FlatList,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import styles from './styles'

// questions
const DATA = [
  {
    id: '1',
    title: 'Who/what influenced or inspired you to do what you do?',
  },
  {
    id: '2',
    title: 'What is a typical day for you?',
  },
  {
    id: '3',
    title: 'What do you love most about your job?',
  },
  {
    id: '4',
    title: 'hi',
  },
  {
    id: '5',
    title: 'hi',
  },
];

/* AKA: Q&A screen */
export default function HomeScreen() {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback( // marks item as selected
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
        <View style={styles.banner}>
          <Text style={styles.bannertext}>QUESTIONS</Text>
          <Image source={logo} style={styles.bannerlogo} />
        </View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.title}
              selected={!!selected.get(item.id)}
              onSelect={onSelect}
            />
          )}
          keyExtractor={item => item.id}
          extraData={selected}
        />
        {/* replace with PinkButton from sharedcomponents later */}
        <TouchableOpacity onPress={() => Alert.alert("button")} style={styles.continueButton}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#E5186E' : '#FFFFFF' },
        
      ]}
    >
    <Text 
      style={[
        styles.title,
        { color: selected ? '#FFFFFF' : '#E5186E' },
      ]}
      >{title}</Text>
    </TouchableOpacity>
  );
}



