import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';

type Props = {};
export default class Drawer extends Component<Props> {

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

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.goToScreen('Welcome', 'Home Page')}>
          <Text>Home Page</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.goToScreen('Results', 'Results')}>
          <Text>Results</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
