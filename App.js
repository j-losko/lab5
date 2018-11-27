/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Button} from 'react-native';
import FirstScreen from './screens/FirstScreen.js';

type Props = {};
export default class App extends Component<Props> {

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: screenName
            }
          }
        }
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
          barStyle="light-content"
          backgroundColor="#4F6D7A"
      />
      <FirstScreen />
        <ScrollView>
          <View style={styles.view}>
            <Button title='1 Ekran testu' onPress={() => this.goToScreen('Test')} />
          </View>
          <View style={styles.view}>
            <Button title='2 Ekran wyników' onPress={() => this.goToScreen('Results')} />
          </View>
          <View style={styles.view}>
            <Button title='3 Ekran testu' onPress={() => this.goToScreen('Test')} />
          </View>
          <View style={styles.view}>
            <Button title='4 Ekran wyników' onPress={() => this.goToScreen('Results')} />
          </View>
          <View style={styles.view}>
            <Button title='5 Ekran testu' onPress={() => this.goToScreen('Test')} />
          </View>
          <View style={styles.view}>
            <Button title='6 Ekran wyników' onPress={() => this.goToScreen('Results')} />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Button title='Ekran wyników' onPress={() => this.goToScreen('Results')} />
        </View>
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
    flexDirection: 'column',
  },
  footer: {
    backgroundColor: '#DFDFDF',
    padding: 10
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2A4944',
    borderWidth: 1,
    backgroundColor: '#F2F7F1'
  }
});
