import React, { Component, PropTypes } from "react";
import {AsyncStorage, Modal, View, Text, TouchableHighlight, StyleSheet} from "react-native";

export default class FirstScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
 
  componentWillMount = async () => {
    try {
      const value = await AsyncStorage.getItem('termsOfUseAccepted');
      if (value == null) {
        this.setModalVisible(true);
      }
      await AsyncStorage.setItem('termsOfUseAccepted', JSON.stringify({"value":"true"}));
    } catch (error) {}
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={true}
          style={styles.container}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Zatwierdź regulamin!");
          }}
        >
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Regulamin</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>Masz zrobić to i to</Text>
            </View>
            <View style={styles.exitContainer}>
              <TouchableHighlight onPress={() => {this.setModalVisible(false)}}>
                <View style={styles.exitButtonContainer}>
                  <Text style={styles.exitButtonText}>Akceptuję regulamin</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    marginTop: 70,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'black'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  description: {
    fontSize: 15,
    marginRight: 20,
    marginLeft: 20
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  descriptionContainer: {
    flex: 6.5
  },
  exitContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  exitButtonContainer: {
    width: 200,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
  },
  exitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
