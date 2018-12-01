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
      tests: []
    };
	
	this.getAllTests(DB);
  }

  getAllTests = (DB) => {
	DB.transaction((tx) => {
      tx.executeSql('SELECT * FROM tests;', [], (tx, results) => {
		var tests = [];
		for(let i = 0; i < results.rows.length; i++) {
		  tests[i] = results.rows.item(i);
		}
		this.setState({ tests: tests });
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

  /*tests = [
    {
      id: 1,
      q: 'Naciśnij A',
      a1: 'B',
      a2: 'C',
      a3: 'A',
      a4: 'D',
      good_answer: 'a3'
    },
    {
      id: 2,
      q: '2 + 2 = ?',
      a1: '2',
      a2: '22',
      a3: '4',
      a4: '44',
      good_answer: 'a3'
    },
    {
      id: 3,
      q: 'Czy słońce świeci?',
      a1: 'Tak!',
      a2: 'Nie',
      a3: 'Nie wiem',
      a4: 'Chyba',
      good_answer: 'a1'
    }
  ]*/
  
  checkResults = () => {
    if(this.state.answersPressed.length != this.state.tests.length) {
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
    for(let i = 0; i < this.state.tests.length; i++) {
      if( this.state.answersPressed[i] === this.state.tests[i].good_answer ) {
        goodAnswers += 1;
      }
    }
    alert(goodAnswers + '/' + this.state.tests.length);
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
    rows = []

    for(let i = 0; i < this.state.tests.length; i++) {
      rows.push(
        <View style={styles.testView}>
          <View style={styles.testHeader}>
            <Text>Test {i+1}:</Text>
            <Text>{this.state.tests[i].q}</Text>
          </View>
          <View style={styles.testBody}>
            <TouchableOpacity style={styles.button} onPress={() => this.buttonPress(i, 'a1')}>
              <Text>{this.state.tests[i].a1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.buttonPress(i, 'a2')}>
              <Text>{this.state.tests[i].a2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.buttonPress(i, 'a3')}>
              <Text>{this.state.tests[i].a3}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.buttonPress(i, 'a4')}>
              <Text>{this.state.tests[i].a4}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View><Text>Rozwiąż te testy:</Text></View>
        <ScrollView>
          {rows}
        </ScrollView>
        <View><Text>{this.state.answersPressed}</Text></View>
        <View>
          <Text style={styles.welcome}>TEST</Text>
        </View>
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
    backgroundColor: '#ABC',
    padding: 20,
    margin: 10,
  },
  testHeader: {
    backgroundColor: '#CBA',
    fontFamily: 'OpenSans-Regular',
  },
  testBody: {
    fontFamily: 'RobotoCondensed-Regular',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});
