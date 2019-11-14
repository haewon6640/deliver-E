import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { Button, Block, Icon } from "galio-framework";
import BottomSheet from "../components/BottomSheet";
const { width, height } = Dimensions.get("window");
import normalize from "react-native-normalize";

import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();

export default class ProgTrack extends React.Component {
  render() {
    var orderId = navigation.getParam("orderId");
    progress = 0.25;
    dbh
      .collection("Order")
      .doc(orderId)
      .onSnapshot(function(doc) {
        progress = doc.data().progress;
      });
    for (let index = 0; index < 20000000; index++) {
      if (index > 10000000) {
        progress = "1";
      }
    }
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/emorymap.png")}
          style={{ height: 0.8 * height, alignSelf: "center" }}
        />
        <BottomSheet progress={progress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  text: {
    fontSize: 17,
    color: "#466199",
    paddingLeft: 30
  }
});
