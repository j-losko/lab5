import React, {Component} from 'react';
import {AsyncStorage, ScrollView, Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import SQLite from 'react-native-sqlite-storage';
let DB;
const getDB = () => DB ? DB : DB = SQLite.openDatabase({ name: 'sqlitedb.db', createFromLocation: 1 });

type Props = {};
export default class Test extends Component<Props> {
  constructor(props) {
    super(props);
    getDB();
    this.state = {
      answersPressed: [ /* 'a1','a1','a3','a2',... */ ],
      id: '',
      name: '',
      description: '',
      tasks: [],
      tags: []
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

  testResult = {
      nick: 'John Async',
      score: 20,
      total: 20,
      type: 'przyszłość',
      date: Date()
    }

  checkResults = () => {
    if(this.state.answersPressed.length != this.state.tasks.length) {
        alert('Odpowiedz na wszystkie pytania!');
        return;
    }

    for(let i = 0; i < this.state.answersPressed.length; i++) {
      if(this.state.answersPressed[i] === undefined) {
        alert('Odpowiedz na wszystkie pytania!');
        return;
      }
    }
    
    let goodAnswers = 0
    for(let i = 0; i < this.state.tasks.length; i++) {
      if( this.state.answersPressed[i] === this.state.tasks[i].good_answer ) {
        goodAnswers += 1;
      }
    }
    alert(goodAnswers + '/' + this.state.tasks.length);
  }

  saveTestResults = async () => {
    try {
      var results = await AsyncStorage.getItem('results');
      if( results == null ) {
        results = [];
      } else {
        results = JSON.parse(results);
      }
      results.push(this.testResult);
      await AsyncStorage.setItem('results', JSON.stringify(results));
    } catch (error) {}
  }
  
  buttonPress = (id, answer) => {
    var tempAnswers = this.state.answersPressed;
    tempAnswers[id] = answer;
    this.setState({ answersPressed: tempAnswers });
  }

  render() {
    let rows = []

    for(let i = 0; i < this.state.tasks.length; i++) {

      let answers = []
      for(let j = 0; j < this.state.tasks[i].answers.length; j++) {
        answers.push(
          <TouchableOpacity key={i} style={styles.button} onPress={() => this.buttonPress(i, this.state.tasks[i].answers[j].isCorrect)}>
            <Text>{this.state.tasks[i].answers[j].content}</Text>
          </TouchableOpacity>
        );
      }

      rows.push(
        <View key={i} style={styles.testView}>
          <View key={i} style={styles.testHeader}>
            <Text>Pytanie {i+1}:</Text>
            <Text>{this.state.tasks[i].question}</Text>
          </View>
          <View key={i} style={styles.testBody}>
            {answers}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View><Text>{this.state.name}</Text></View>
        <ScrollView>
          {rows}
        </ScrollView>
        <View><Text>{JSON.stringify(this.state.answersPressed)}</Text></View>
        <TouchableOpacity style={styles.button} onPress={this.checkResults}>
          <Text>Save test results</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  testView: {
    backgroundColor: '#99c4a6',
    padding: 10,
    margin: 10,
  },
  testHeader: {
    backgroundColor: '#ABC',
    fontFamily: 'OpenSans-Regular',
    alignItems: 'center',
  },
  testBody: {
    fontFamily: 'RobotoCondensed-Regular',
    flexDirection: 'column',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 5,
  }
});
