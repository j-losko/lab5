import React, {Component} from 'react';
import {AsyncStorage, Platform, StyleSheet, Text, View, Button} from 'react-native';

type Props = {};
export default class Test extends Component<Props> {

  testResult =  {
      nick: 'John Async',
      score: 20,
      total: 20,
      type: 'przyszłość',
      date: Date()
    }

  saveTestResults = async () => {
    try {
      var results = await AsyncStorage.getItem('results');
      results = JSON.parse(results);
      results.push(this.testResult);
      await AsyncStorage.setItem('results', JSON.stringify(results));
    } catch (error) {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>TEST</Text>
        <Button title='Save test results' onPress={this.saveTestResults} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
