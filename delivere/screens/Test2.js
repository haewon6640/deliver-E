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
        <Text>Goodbye</Text>
        <Button onPress={() => {
          this.props.navigation.navigate("MyOrders", {
          navIndex: 1, id: id, ident: 2
          });
          }}
          title="See list"/>
      </View>
    );
  }
}