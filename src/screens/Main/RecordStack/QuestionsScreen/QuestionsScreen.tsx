import React, { useState, useEffect } from 'react'

import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import Modal from 'react-native-modal'
import styles from './styles'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { BASE_PATH } from 'react-native-dotenv'

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

  return (
    <View style={styles.container}>
      <FlatList<Question>
        data={questions}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => {
              if(item.Answered) {
                setModalVisibility(true)
              } else {
                push('Record', {question: item.text})
              }
              setSelected(item.ID)
            }}
            underlayColor={item.Answered ? '#A02257' : '#E8E8E8'}
            style={[styles.question, item.Answered ? styles.notSelectedAnswered : styles.notSelectedUnanswered]}
            key={item.text}>
            <Text
              style={item.Answered ? styles.titleAnswered : styles.titleUnanswered}
            >{item.text}</Text>
          </TouchableHighlight>
        )}
        keyExtractor={item => item.text}
        extraData={selected}
        showsVerticalScrollIndicator={false}
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
    </View>
  )
}

QuestionsScreen.navigationOptions = {
  title: '',
  // eslint-disable-next-line react/display-name
  headerLeft: () => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Profile</Text>
    </View>
  ),
  headerStyle: {height: 140},   
}
