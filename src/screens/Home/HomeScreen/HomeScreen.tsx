import React, { useState, useEffect } from 'react'
import background from '../../../../assets/images/dotsbackground.png'
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { BASE_PATH } from 'react-native-dotenv'
import styles from './styles'

interface Question {
  id: number,
  text: string,
}
/* AKA: Q&A screen */
export default function HomeScreen() {
  const [selected, setSelected] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Array<Question>>([])

  useEffect(() => {
    fetch(`${BASE_PATH}/api/questions`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data)
        console.log(data)
      })
      .catch(error => {
        console.log('Error' + error)
      })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={{ width: '100%', height: '100%' }}>
        <FlatList<Question>
          data={questions}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.text}
              selected={selected === item.id}
              onSelect={() => setSelected(item.id)}
            />
          )}
          keyExtractor={item => item.text}
          extraData={selected}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}

HomeScreen.navigationOptions = {
  title: 'QUESTIONS',
  headerTitleStyle: {
    fontFamily: 'roboto-bold',
    fontStyle: 'normal',
    fontSize: 18,
    color: '#D94077',
  },
  headerStyle: {
    paddingBottom: '2%',
    marginRight: '5%'
  },
  headerRight:
    <View style={styles.counter}>
      <View style={styles.numberCounter}>
        <Text style={styles.number}>0</Text>
      </View>
      <Text style={styles.answered}>answered</Text>

    </View>
}

function Item(props: ItemProps) {
  return (
    <TouchableOpacity
      onPress={() => props.onSelect(props.id)}
      style={props.selected ? styles.questionSelected : styles.question}
    >
      <Text
        style={props.selected ? styles.titleSelected : styles.title}
      >{props.title}</Text>
    </TouchableOpacity>
  )
}

interface ItemProps {
  id: number,
  title: string,
  selected: boolean,
  onSelect: Function,
}



