import React, { useState, useEffect } from 'react'
import background from '../../../../../assets/images/dotsbackground.png'
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BASE_PATH } from 'react-native-dotenv'
import styles from './styles'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Question {
  id: number,
  text: string,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}
/* AKA: Q&A screen */
export default function QuestionsScreen(props: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Array<Question>>([])
  const {navigate} = props.navigation

  useEffect(() => {
    fetch('https://e9f5cf12.ngrok.io/api/questions')
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
    <ImageBackground source={background} style={styles.container}>
      <Text style={styles.tip}>Tip: Answer 3-4 questions for a great video!</Text>
   
      <FlatList<Question>
        data={questions}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.text}
            selected={selected === item.id}
            onSelect={() => {
              setSelected(item.id)
              navigate('Record', {question: item.text})
            }}
          />
        )}
        keyExtractor={item => item.text}
        extraData={selected}
      />

    </ImageBackground>
  )
}

QuestionsScreen.navigationOptions = {
  title: 'QUESTIONS',
  headerTitleStyle: {
    fontFamily: 'roboto-bold',
    fontStyle: 'normal',
    fontSize: 18,
    color: '#D94077',
  },
  // eslint-disable-next-line react/display-name
  headerRight: () => (
    <View style={styles.counter}>
      <View style={styles.numberCounter}>
        <Text style={styles.number}>0</Text>
      </View>
      <Text style={styles.answered}>answered</Text>
    </View>
  )  
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



