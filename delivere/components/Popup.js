import React from "react";
import { StyleSheet, Dimensions, View, 
Modal
} from "react-native";
import Modal2 from "react-native-modal";
const { width, height } = Dimensions.get("screen");

export default class Popup extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    style = (this.props.style == "full") ? styles.full : styles.small;
    if (this.props.style == "full")
      return(
        <Modal
          animationType="slide"
          visible={this.props.visible}>
          <View style={style}>
            {this.props.children}
          </View>    
        </Modal>
      );
    else
      return(
        <Modal2
          isVisible={this.props.visible}
          backdropTransitionOutTiming={0}
          backdropOpacity={0.3}
          style={style}
        >
          {this.props.children}   
        </Modal2>
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
    justifyContent: "center",
    alignItems: "center",
  }
});