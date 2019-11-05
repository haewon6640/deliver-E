import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Button, Block, Icon } from "galio-framework";
const { width, height } = Dimensions.get("window");

export default class OrderList extends React.Component {
  render() {
    return (
      <ImageBackground source={require("../assets/emorymap.png")} style={styles.container}>
        
      </ImageBackground>
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