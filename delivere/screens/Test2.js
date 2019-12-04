import React from "react";
import {
  View,
  Text,
  Button
} from "react-native";

export default class Test1 extends React.Component{
  render(){
    const index = this.props.navigation.getParam("index");
    return(
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <Text>Goodbye</Text>
        <Button onPress={() => this.props.navigation.navigate("OrderList", {
          navPage: 1, index: index
        })} title="See list"/>
      </View>
    );
  }
}