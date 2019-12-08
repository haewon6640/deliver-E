import React from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions
} from "react-native";
import { Block, Icon } from "galio-framework";
const { width, height } = Dimensions.get("window");
import normalize from "react-native-normalize";
import { style } from "../constants/Styles";
import firebase from "../components/firebase";
import "@firebase/firestore";
const db = firebase.firestore();

export default class PastOrders extends React.Component{
  render(){
    return(
      <View></View>
    );
  }
}