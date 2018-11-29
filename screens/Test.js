import React, {Component} from 'react';
import {AsyncStorage, ScrollView, Platform, StyleSheet, Text, View, Button} from 'react-native';

type Props = {};
export default class Test extends Component<Props> {

  testResult = {
      nick: 'John Async',
      score: 20,
      total: 20,
      type: 'przyszłość',
      date: Date()
    }

  tests = [
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
  ]

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

  render() {
    tests = this.tests
    rows = []

    for(let i = 0; i < tests.length; i++) {
      rows.push(
        <View style={styles.testView}>
          <View style={styles.testHeader}>
            <Text>Test {i+1}:</Text>
            <Text>{tests[i].q}</Text>
          </View>
          <View style={styles.testBody}>
            <Button title={tests[i].a1}/>
            <Button title={tests[i].a2}/>
            <Button title={tests[i].a3}/>
            <Button title={tests[i].a4}/>
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
        <View>
          <Text style={styles.welcome}>TEST</Text>
        </View>
        <Button title='Save test results' onPress={this.saveTestResults} />
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
  }
});
