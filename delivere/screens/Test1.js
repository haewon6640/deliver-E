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
        <Text>Hello</Text>
        <Button onPress={() => this.props.navigation.navigate("Test2", {index: index})} title="Next"/>
        <Button onPress={() => this.props.navigation.navigate("OrderList")} title="See list"/>
      </View>
    );
  }
}