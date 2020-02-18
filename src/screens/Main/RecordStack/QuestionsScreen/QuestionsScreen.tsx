import React, { useState, useEffect } from 'react'
import background from '../../../../../assets/images/dotsbackground.png'

import ModalBaseScene from '../utils/ModalBaseScene'
import DefaultModalContent from '../utils/DefaultModalContent'
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import Modal from 'react-native-modal'
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
  const [modalVisibility, setModalVisibility] = useState(false)

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
              setModalVisibility(true)
              setSelected(item.id)
              //navigate('Record', {question: item.text})
            }}
          />
        )}
        keyExtractor={item => item.text}
        extraData={selected}
      />

      <Modal
        isVisible={modalVisibility}
        onRequestClose={() => {
          setModalVisibility(false)
        } }
        backdropOpacity={0.2}
        
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View style={styles.modalLayout}>
          <View style={styles.topModalBorder}>
            <TouchableOpacity style={styles.topModal}>
              <Text style={styles.modalContent}>view question</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.middleModalBorder}>
            <TouchableOpacity style={styles.middleModal}>
              <Text style={styles.modalContent}>re-record question</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.bottomModalBorder}>
            <TouchableOpacity style={styles.bottomModal}
              onPress={() => {
                setModalVisibility(false)
              }}>
              <Text style={styles.closeTitle}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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