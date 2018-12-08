import React, {Component} from 'react';
import {AsyncStorage, ScrollView, Platform, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';

import SQLite from 'react-native-sqlite-storage';
let DB;
const getDB = () => DB ? DB : DB = SQLite.openDatabase({ name: 'sqlitedb.db', createFromLocation: 1 });

type Props = {};
export default class Test extends Component<Props> {
  constructor(props) {
    super(props);
    getDB();
    this.state = {
      refreshing: false,
      id: '',
      name: '',
      description: '',
      tasks: [{
        question: '',
        answers: []
      }],
      tags: [],
      currentQuestion: 0,
      score: 0,
      nick: 'nick'
    };
    this.getAlltestData(DB);
  }

  getAlltestData = (DB) => {
    DB.transaction((tx) => {
      tx.executeSql('SELECT * FROM test WHERE id = ?;', [this.props.testId], (tx, results) => {
        let t = results.rows.item(0);
        this.setState({
          id: t.id,
          name: t.name,
          description: t.description,
          tasks: JSON.parse(t.tasks),
          tags: JSON.parse(t.tags)
        });
      });
    });
  }

  saveTestResults = () => {
    fetch('https://pwsz-quiz-api.herokuapp.com/api/result', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nick: this.state.nick,
        score: this.state.score,
        total: this.state.tasks.length,
        type: this.state.tags[0],
        date: new Date().toISOString().split('T')[0]
      }),
    });
  }
  
  buttonPress = (correctAnswer) => {
    if( correctAnswer ) {
      this.setState({score: this.state.score + 1});
    }
    this._onRefresh();
  }
  
  _onRefresh = () => {
    this.setState({
      refreshing: true,
      currentQuestion: this.state.currentQuestion + 1
    });
    this.setState({refreshing: false});
  };

  render() {
    if( this.state.currentQuestion === this.state.tasks.length ) {
      return(
        <View style={styles.container}>
          <Text style={styles.text}>Twój wynik to:</Text>
          <Text style={styles.text}>{this.state.score} / {this.state.tasks.length}</Text>

          <Text style={styles.text}>Wprowadź swój nick:</Text>
          <TextInput
           style={{height: 40, borderColor: 'gray', borderWidth: 1}}
           onChangeText={(nick) => this.setState({nick})}
           value={this.state.nick}
          />
          
          <TouchableOpacity style={styles.button} onPress={() => this.saveTestResults()}>
            <Text>Wysyłanko!</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      let answers = []
      for(let j = 0; j < this.state.tasks[this.state.currentQuestion].answers.length; j++) {
        answers.push(
          <TouchableOpacity key={j} style={styles.button} onPress={() => this.buttonPress(this.state.tasks[this.state.currentQuestion].answers[j].isCorrect)}>
            <Text style={styles.text}>{this.state.tasks[this.state.currentQuestion].answers[j].content}</Text>
          </TouchableOpacity>
        );
      }

      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.textHeader}>{this.state.name}</Text>
          </View>
          <ScrollView>
            <View style={styles.testView}>
              <View style={styles.testHeader}>
                <Text style={styles.text2}>Pytanie {this.state.currentQuestion+1} / {this.state.tasks.length}:</Text>
                <Text style={styles.text2}>{this.state.tasks[this.state.currentQuestion].question}</Text>
              </View>
              <View>
                {answers}
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#d2e0f4',
  },
  testView: {
    padding: 10,
    margin: 10,
  },
  testHeader: {
    backgroundColor: '#ABC',
    alignItems: 'center',
    padding: 20,
    borderRadius: 30,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f4f4e1',
    padding: 20,
    margin: 5,
    borderRadius: 50,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'RobotoCondensed-Regular',
  },
  text2: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  textHeader: {
    fontSize: 20,
    textAlign: 'center',
  }
});
