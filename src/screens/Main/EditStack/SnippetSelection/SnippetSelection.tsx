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

interface questionSelected {
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
  // const [selected, setSelected] = useState<number | null>(null)
  const [selectedQuestions, setSelectedQuestions] = useState<Array<questionSelected>>([])
  const [numSelected, setNumSelected] = useState<number>(1)
  // const {navigate} = props.navigation

  useEffect(() => {
    fetch(`${BASE_PATH}/api/questions`)
      .then(res => res.json())
      .then(data => {     
        const temp = []
        for(let i = 0; i < data.length; i++){
          const item: questionSelected = {
            id: data[i]['ID'], 
            isSelected: false, 
            orderInList: 0,
            text: data[i]['text']
          }
          temp.push(item)
        }
        setSelectedQuestions(temp)
        console.log(data)
      })
      .catch(error => {
        console.log('Error' + error)
      })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.questions}>
        <FlatList<questionSelected>
          data={selectedQuestions}
          renderItem={({ item }) => (
            <View style={styles.questionAndCircle}>
              <TouchableOpacity
                onPress={
                  () => {
                    console.log(item)
                    if(item.isSelected){
                      setNumSelected(numSelected - 1)
                    } else{
                      setNumSelected(numSelected + 1)
                    }
                    
                    // the question is selected previously
                    if(selectedQuestions[item.id-1].isSelected){
                      const temp = []
                      const preOrder = item.orderInList
                      for(let i = 0; i < selectedQuestions.length; i++){
                        if(i != (item.id-1)){
                          if(selectedQuestions[i].orderInList > preOrder){  
                            const newQuestion: questionSelected = {
                              id: selectedQuestions[i].id, 
                              isSelected: selectedQuestions[i].isSelected, 
                              orderInList: selectedQuestions[i].orderInList-1,
                              text: selectedQuestions[i].text
                            }
                            temp.push(newQuestion)
                          } else{
                            const newQuestion: questionSelected = {
                              id: selectedQuestions[i].id, 
                              isSelected: selectedQuestions[i].isSelected, 
                              orderInList: selectedQuestions[i].orderInList,
                              text: selectedQuestions[i].text
                            }
                            temp.push(newQuestion)
                          }
                        } else{
                          const newQuestion: questionSelected = {
                            id: item.id, 
                            isSelected: false, 
                            orderInList: 0,
                            text: item.text
                          }
                          temp.push(newQuestion)
                        }
                        setSelectedQuestions(temp)
                      }
                    } else{
                      const temp = []
                      for(let i = 0; i < selectedQuestions.length; i++){
                        if(i != (item.id-1)){
                          const newQuestion: questionSelected = {
                            id: selectedQuestions[i].id, 
                            isSelected: selectedQuestions[i].isSelected, 
                            orderInList: selectedQuestions[i].orderInList,
                            text: selectedQuestions[i].text
                          }
                          temp.push(newQuestion)
                        } else{
                          const newQuestion: questionSelected = {
                            id: item.id, 
                            isSelected: true, 
                            orderInList: numSelected,
                            text: item.text
                          }
                          temp.push(newQuestion)
                        }
                        setSelectedQuestions(temp)
                      }
                    }
                    console.log(item.isSelected)

                    if(numSelected == 0){
                      setText('A great video requires at least 3 - 4 clips')
                    }
                    if(numSelected == 1){
                      setText(numSelected + ' snippet selected')
                    } else{
                      setText(numSelected + ' snippets selected')
                    }
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
          disabled={numSelected >= 3 ? false : true}
          style={numSelected >= 3 ? styles.pinkButtonAbled : styles.pinkButton}
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
  title: 'Snippet Selection',
  headerTitleStyle: {
    fontFamily: 'montserrat-semibold',
    fontStyle: 'normal',
    fontSize: 30,
    color: '#000',
    lineHeight: 37,
  },
}