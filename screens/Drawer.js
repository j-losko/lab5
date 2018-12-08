import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';

import SQLite from 'react-native-sqlite-storage';
let DB;
const getDB = () => DB ? DB : DB = SQLite.openDatabase({ name: 'sqlitedb.db', createFromLocation: 1 });

type Props = {};
export default class Drawer extends Component<Props> {

  constructor(props) {
    super(props);
    getDB();
    this.state = {
      tests: []
    };
    this.getAlltestData(DB);
  }

  goToScreen = (screenName, screenTitle) => {
    Navigation.mergeOptions('drawerID', {
      sideMenu: {
        left: {
          visible: false
        }
      }
    })
    Navigation.push('MAIN_STACK', {
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: screenTitle
            }
          }
        }
      }
    })
  }
  
  goToTest = (screenName, testId) => {
    Navigation.mergeOptions('drawerID', {
      sideMenu: {
        left: {
          visible: false
        }
      }
    })
    Navigation.push('MAIN_STACK', {
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: screenName
            }
          }
        },
        passProps: {
          testId: testId
        },
      }
    })
  }
  
  getAlltestData = (DB) => {
    DB.transaction((tx) => {
      tx.executeSql('SELECT * FROM tests;', [], (tx, results) => {
        let tests = [];
        for(let i = 0; i < results.rows.length; i++) {
            tests[i] = results.rows.item(i);
        }
        this.setState({
          tests: tests
        });
      });
    });
  }

  render() {
    rows = []
    for(let i = 0; i < this.state.tests.length; i++) {
      rows.push(
        <View key={i} style={styles.view}>
          <TouchableOpacity key={i} onPress={() => this.goToTest('Test', this.state.tests[i].id)}>
            <Text style={styles.text}>{this.state.tests[i].name}</Text>
          </TouchableOpacity>
        </View>
      )
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.home}>
          <TouchableOpacity onPress={() => this.goToScreen('Welcome', 'Home Page')}>
            <Text style={styles.text}>Home Page</Text>
          </TouchableOpacity>
        </View>
        
        {rows}
        
        <View style={styles.results}>
          <TouchableOpacity onPress={() => this.goToScreen('Results', 'Results')}>
            <Text style={styles.text}>Results</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 2,
    borderColor: '#2A4944',
    borderWidth: 1,
    backgroundColor: '#F2F7F1',
	borderRadius: 20,
  },
  text: {
    textAlign: 'center',
    padding: 30,
  },
  home: {
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 2,
    borderColor: '#2A4944',
    borderWidth: 1,
    backgroundColor: '#44A8DD',
	borderRadius: 20,
  },
  results: {
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 2,
    borderColor: '#2A4944',
    borderWidth: 1,
    backgroundColor: '#44A8DD',
	borderRadius: 20,
  }
});
