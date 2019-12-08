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
import { Icon, Block } from "galio-framework";
import normalize from "react-native-normalize";
import { style } from "../constants/Styles";
const { width, height } = Dimensions.get("window");

export default class AcceptPopup extends React.Component {
  // state = {acceptedOrders: []}

  render() {
    // const { goBack } = this.props.navigation;
    // const order = this.props.navigation.getParam("order");
    // const key = this.props.navigation.getParam("key");
    const order = this.props.order;
    const id = this.props.id;

    return (
      // <View style={style.smallPopupCont}>
        <View
        style={style.smallPopup}
        >
          <Block row>
            <TouchableOpacity onPress={() => this.acceptPopup()}>
              <Icon
                style={{
                  marginLeft: width * 0.02,
                  marginVertical: height * 0.02
                }}
                name="close"
                family="AntDesign"
                size={30}
                color="#5E72E4"
              />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </Block>
          <Block middle style={{flex: 1,}}>
            <TouchableOpacity
              onPress={() => {
                this.props.editList(order,id);
                this.props.acceptPopup();
                // this.props.navigation.state.params.onGoBack(order, key);
                // goBack();
              }}
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
          </Block>
        </View>
      // </View>
    );
  }
}