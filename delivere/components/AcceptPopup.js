import React from "react";
import {
  Modal,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  TouchableOpacity
} from "react-native";
import normalize from "react-native-normalize";
import { style } from "../constants/Styles";
const { width, height } = Dimensions.get("window");

export default class ModalScreen extends React.Component {
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={style.smallPopupCont}>
        <View style={style.smallPopup}>
          <TouchableOpacity
            onPress={() => goBack()}
            style={{
              height: 100,
              aspectRatio: 1.2,
              backgroundColor: "#5E72E4",
              borderRadius: normalize(15),
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: normalize(23), color: "white" }}>
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}