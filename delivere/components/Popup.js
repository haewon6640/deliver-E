import React from "react";
import { Modal, StyleSheet, Dimensions, View } from "react-native";
const { width, height } = Dimensions.get("window");

export default class Popup extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    style = (this.props.style == "full") ? styles.full : styles.small;

    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}>
        <View style={style}>
          {this.props.children}
        </View>    
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  full:{
    height: height,
    width: width,
    backgroundColor: "white"
  },
  small:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});