import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";

export default class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  componentDidMount() {
    AsyncStorage.getItem(this.props.pagekey, (err, result) => {
      if (err) {
      } else {
        if (result == null) {
          this.setModalVisible(true);
        }
      }
    });
    AsyncStorage.setItem(this.props.pagekey, JSON.stringify({"value":"true"}), (err,result) => {
            console.log("error",err,"result",result);
            });
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
          style={styles.Container}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={styles.Container}>
            <View style={styles.TitleContainer}>
              <Text style={styles.Title}>Regulamin</Text>
            </View>
            <View style={styles.DescriptionContainer}>
              <Text style={styles.Description} allowFontScaling={true}>Masz zrobić to i to</Text>
            </View>
            <View style={styles.ExitContainer}>
              <TouchableHighlight onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                <View style={styles.ExitButtonContainer}>
                  <Text style={styles.ExitButtonText}>Akceptuję regulamin</Text>
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
Container:{
		backgroundColor:'#FAFAFA',
		flex:1,
		marginTop:70,
		marginBottom:40,
		marginLeft:20,
		marginRight:20,
		borderRadius:20,
		borderWidth:4,
		borderColor:'black'
	},
	Title:{
    fontWeight:'bold',
		fontSize:20,
		textAlign:'center',
		margin:10,
	},
	Description:{
    fontSize:15,
		marginRight:20,
		marginLeft:20
	},
	CloseIcon:{
		alignSelf:'flex-end',
		flex:0.5,
		marginRight:10
	},
	TitleContainer:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
	DescriptionContainer:{
		flex:6.5
	},
	ExitContainer:{
		flex:2,
		justifyContent:'flex-start',
		alignItems:'center',
	},
	ExitButtonContainer:{
		width:200,
		height:40,
		backgroundColor:'red',
		borderRadius:10,
		justifyContent:'center',
	},
	ExitButtonText:{
		color:'white',
		fontSize:20,
		fontWeight:'bold',
		textAlign:'center'
	}
});
