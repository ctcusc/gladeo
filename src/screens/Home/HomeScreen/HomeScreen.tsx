import React, {useState} from 'react'
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
  ImageBackground,
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
]

/* AKA: Q&A screen */
export default function HomeScreen() {
  const [selected, setSelected] = useState()

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
              selected={selected === item.id}
              onSelect={() => setSelected(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          extraData={selected}
        />
        {/* replace with PinkButton from sharedcomponents later */}
        <TouchableOpacity onPress={() => Alert.alert('button')} style={styles.continueButton}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  )
}

function Item(props: ItemProps) {
  return (
    <TouchableOpacity
      onPress={() => props.onSelect(props.id)}
      style = {props.selected ? styles.questionSelected : styles.question}
    >
      <Text 
        style = {props.selected ? styles.titleSelected : styles.title}
      >{props.title}</Text>
    </TouchableOpacity>
  )
}

interface ItemProps {
  id: string,
  title: string,
  selected: boolean,
  onSelect: any,
}



