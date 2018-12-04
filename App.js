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

  constructor(props) {
    super(props);
    this.state = {
      internetConnection: true,
      tests: []
    };
	
	/*
	try {
      let response = await fetch('https://pwsz-quiz-api.herokuapp.com/api/tests');
      let responseJson = await response.json();
      this.setState({ tests: responseJson });
    } catch (error) {
	  this.setState({internetConnection: false});
      alert('Błąd podczas pobierania danych.\nSprawdź połączenie z internetem!');
    }*/
	
    /*fetch('https://pwsz-quiz-api.herokuapp.com/api/tests')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        this.setState({ tests: myJson });
        //this.setState({tests: myJson});
        //alert(JSON.stringify(myJson));
        alert(myJson);
      })
      .catch((error) => {
        this.setState({internetConnection: false});
      });*/
  }
  

  //TODO:
  //Button -> TouchableOpacity
  //Lepszy wygląd?

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
    if( false ) { // !this.state.internetConnection ) {
      return(
        <View><Text>Masz mieć internet by została pobrana baza, która jeszcze w tym dniu nie była ściągnięta</Text></View>
      );
    } else {
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
