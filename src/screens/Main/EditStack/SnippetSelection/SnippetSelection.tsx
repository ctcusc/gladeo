import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { BASE_PATH } from 'react-native-dotenv'
import styles from './styles'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

interface Snippet {
  id: number,
  isSelected: boolean,
  orderInList: number,
  text: string,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
}

export default function SnippetSelectionScreen(props: Props) {
  const [text, setText] = useState('A great video requires at least 3 - 4 clips')
  const [snippetState, setSnippetState] = useState<Array<Snippet>>([])
  const [selectedSnippetCount, setSelectedSnippetCount] = useState<number>(1)

  useEffect(() => {
    fetch(`${BASE_PATH}/api/user/questions`)
      .then(res => res.json())
      .then(data => {     
        const initialSnippetState = []
        for(let i = 0; i < data.length; i++){
          if (data[i]['Answered']) {
            const item: Snippet = {
              id: data[i]['ID'], 
              isSelected: false, 
              orderInList: 0,
              text: data[i]['text']
            }
            initialSnippetState.push(item)
          }
        }
        setSnippetState(initialSnippetState)
        console.log(data)
      })
      .catch(error => {
        console.log('Error' + error)
      })
  }, [])

  function updateSnippetState(item: Snippet) {
    const modifiedQuestionState = snippetState
    // the question is selected previously, remove it from the list and update the order of other items
    if(modifiedQuestionState[item.id-1].isSelected){
      const preOrder = item.orderInList
      for(let i = 0; i < modifiedQuestionState.length; i++){
        // move up question in list
        if(i != (item.id-1)){
          if(modifiedQuestionState[i].orderInList > preOrder){  
            modifiedQuestionState[i].orderInList = modifiedQuestionState[i].orderInList-1
          }
        } else{
          modifiedQuestionState[i].isSelected = false
          modifiedQuestionState[i].orderInList = 0
        }
        // snippet is newly selected, add to list
        setSnippetState(modifiedQuestionState)
        setSelectedSnippetCount(selectedSnippetCount-1)
      }
    } 
    // newly selected question
    else{
      for(let i = 0; i < modifiedQuestionState.length; i++){
        if(i == (item.id-1)){
          modifiedQuestionState[i].isSelected = true
          modifiedQuestionState[i].orderInList = selectedSnippetCount
        }
        setSnippetState(modifiedQuestionState)
        setSelectedSnippetCount(selectedSnippetCount+1)
      }
    }
  }
  
  function updateBottomText(item: Snippet){
    if(item.isSelected){
      if(selectedSnippetCount == 0){
        setText('A great video requires at least 3 - 4 clips')
      } else if(selectedSnippetCount == 1){
        setText((selectedSnippetCount) + ' snippet selected')
      } else{
        setText((selectedSnippetCount) + ' snippets selected')
      }
    } else{
      if(selectedSnippetCount == 2){
        setText('A great video requires at least 3 - 4 clips')
      } else if(selectedSnippetCount == 3){
        setText(selectedSnippetCount-2 + ' snippet selected')
      } else{
        setText(selectedSnippetCount-2 + ' snippets selected')
      }
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.questions}>
        <FlatList<Snippet>
          data={snippetState}
          renderItem={({ item }) => (
            <View style={styles.questionAndCircle}>
              <TouchableOpacity
                onPress={
                  () => {
                    updateSnippetState(item)
                    updateBottomText(item)
                  }
                }
                style={item.isSelected ? styles.questionSelected : styles.question}
              >
                <Text style={styles.titleSelected}>{item.text}</Text>
              </TouchableOpacity>
              <View style={item.isSelected ? styles.circleSelected : styles.circle}>
                <Text style={styles.circleText}> {item.orderInList} </Text>
              </View>
            </View>
          )}
          keyExtractor={(item: { text: any }) => item.text}
          extraData={null}
        />
      </View>
      <View style={styles.createVideo}>
        <Text>{text}</Text>
        <TouchableOpacity
          disabled={selectedSnippetCount > 3 ? false : true}
          style={selectedSnippetCount > 3 ? styles.pinkButtonAbled : styles.pinkButton}
        >
          <Text style={styles.buttontext}>
            CREATE VIDEO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

SnippetSelectionScreen.navigationOptions = {
  title: '',
  // eslint-disable-next-line react/display-name
  headerLeft: () => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Snippet Selection</Text>
    </View>
  ),
  headerStyle: {height: 140},   
}