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

export default class ProgTrack extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/emorymap.png")} style={{height: 0.8*height,
            alignSelf: 'center'}}
          />
        <BottomSheet />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    color: "#466199",
    paddingLeft: 30
  }
});