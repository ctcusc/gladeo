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
import { BASE_PATH, TESTING_PATH } from 'react-native-dotenv'
import styles from './styles'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Question {
  ID: number,
  text: string,
  Answered: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}

/* AKA: Q&A screen */
export default function QuestionsScreen(props: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Array<Question>>([])
  const {navigate, push} = props.navigation
  const [modalVisibility, setModalVisibility] = useState(false)

  useEffect(() => {
    fetch(`${BASE_PATH}/api/user/questions`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data)
        console.log(data)
      })
      .catch(error => {
        console.log('Error' + error)
      })
  }, [])

  function questionStyle(selected: boolean, answered: boolean) {
    if(selected) {
      if(answered)
        return styles.selectedAnswered
      else return styles.selectedUnanswered
    } else { // unselected
      if(answered)
        return styles.notSelectedAnswered
      else return styles.notSelectedUnanswered
    }
  }

  return (
    <ImageBackground source={background} style={styles.container}>
   
      <FlatList<Question>
        data={questions}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if(item.Answered) {
                setModalVisibility(true)
              } else {
                push('Record', {question: item.text})
              }
              setSelected(item.ID)
            }}
            style={questionStyle((item.ID == selected), item.Answered)}
            key={item.text}>
            <Text
              style={item.Answered ? styles.titleAnswered : styles.titleUnanswered}
            >{item.text}</Text>
          </TouchableOpacity>
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
}

interface ItemProps {
  id: number,
  title: string,
  selected: boolean,
  onSelect: Function,
}