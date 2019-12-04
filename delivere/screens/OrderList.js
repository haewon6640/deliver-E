import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Image,
  ImageBackground
} from "react-native";
import { Button, Block, Icon } from "galio-framework";
import { style } from "../constants/Styles"
const { width, height } = Dimensions.get("window");
import Restaurant from "../backend/Restaurant";
import Eater from "../backend/Eater";
import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();

const DATA = [
  { text1: "Twisted Taco",
    text2: "White Hall",
    text3: "2 items",
    text4: "$9.99",
    key: "0" },
  { text1: "Twisted Taco",
    text2: "MSC",
    text3: "3 items",
    text4: "$9.99",
    key: "1" },
  {
    text1: "Maru",
    text2: "Callaway",
    text3: "2 items",
    text4: "$9.99",
    key: "2"
  },
  {
    text1: "Maru",
    text2: "Callaway",
    text3: "2 items",
    text4: "$9.99",
    key: "3"
  },
  {
    text1: "Maru",
    text2: "Callaway",
    text3: "2 items",
    text4: "$9.99",
    key: "4"
  }
];

export default class OrderList extends React.Component {
  state = {index: []};
  // this.pressed = this.pressed.bind(this);

  // async queryPickupInfo(order) {
  //   var rName = order["rName"];
  //   let restaurant = await new Restaurant().queryRestaurant(rName);
  //   let eater = await new Eater().getEaterfromEmail(order["eaterEmail"]);
  //   this.props.navigation.navigate("PickingUp", {
  //     eater: eater,
  //     restaurant: restaurant,
  //     order: order
  //   });
  // }

  // const orderList = order.map((, j) => {
  //   return (
  //     <TouchableOpacity
  //       key = {j}
  //       style={style.listItem}
  //       onPress={() => pressed(j)}
  //     >
  //       <Text style={styles.category}>{item.rName}</Text>
  //       <Text style={styles.text}>{item.text2}</Text>
  //       <Text style={styles.text}>{item.text3}</Text>
  //     </TouchableOpacity>
  //    );
  // });


  render() {
    const state = this.state;
    const nav = this.props.navigation;
    const navP = nav.getParam("navPage");
    const ind = nav.getParam("index");

    pressed = (key) => {
      if(!state.index[key]){
        state.index.push({
          navPage: 0
        })
        nav.navigate("AcceptPopup");
      }
      else{
        if (ind == key)
          state.index[key].navPage = navP;
        switch(state.index[key].navPage){
          case 0:
            nav.navigate("Test1", {index: key});
            break;
          case 1:
            nav.navigate("Test2");
            break;
        }
      }
    }
    return (
      <ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    alignSelf: 'center',
    paddingBottom: 15,
    fontSize: 30,
    color: "#1f396e"
  },
  text: {
    fontSize: 17,
    color: "#466199",
    paddingLeft: 30
  },
  category: {
    paddingLeft: 30,
    paddingTop: 15,
    fontSize: 20,
    color: "#1f396e"
  }
});