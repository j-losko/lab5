import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Button} from 'react-native';

type Props = {};
export default class Drawer extends Component<Props> {

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
        <Button title='Home Page' onPress={() => this.goToScreen('Welcome')} />
		<Button title='Results' onPress={() => this.goToScreen('Results')} />
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
