import React from "react";
import { Modal, StyleSheet, Dimensions, View, Text, TextInput } from "react-native";
import { Icon } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

export default class LocationPopup extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.locationVisible}>
        <View style={{height: height,width: width}}>
          <TouchableOpacity onPress={this.props.seeLocation}>
            <Icon
              style={{ marginLeft: width*0.05, marginTop: height*0.05}}
              name="close"
              family="AntDesign"
              size={30}
              color="#5E72E4"
            />
          </TouchableOpacity>
          <TextInput style={{ height: 40, paddingLeft: width*0.05, borderColor: 'gray', borderWidth: 1 }}
            placeholder="Search for address"
          />
        </View>    
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    height: height,
    width: width
  }
});