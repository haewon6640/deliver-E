import React from "react";
import {
  View,
  Text,
  Button
} from "react-native";

export default class Test1 extends React.Component{
  render(){
    const id = this.props.navigation.getParam("id");
    return(
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <Text>Hello</Text>
        <Button onPress={() => this.props.navigation.navigate("Test2", {id: id})} title="Next"/>
        <Button onPress={() => {
          this.props.navigation.navigate("MyOrders",{navIndex: 0, id: id, ident: 1});
          }} title="See list"/>
      </View>
    );
  }
}