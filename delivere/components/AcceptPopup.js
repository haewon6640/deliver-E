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
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Icon, Block } from "galio-framework";
import normalize from "react-native-normalize";
import { style } from "../constants/Styles";
const { width, height } = Dimensions.get("window");

export default class AcceptPopup extends React.Component {
  // time;

  // constructor(props) {
  //   super(props);
  //   this.state = { fill: 0, seconds: 120 };
  //   this.startTime = this.startTime.bind(this);
  //   this.resetTime = this.resetTime.bind(this);
  // }

  // startTime = () => {
  //   time = setInterval(() => {
  //     if (this.state.seconds > 0)
  //       this.setState({
  //         fill: this.state.fill + 100 / 120,
  //         seconds: this.state.seconds - 1
  //       });
  //   }, 1000);
  // };

  // resetTime = () => {
  //   clearTimeout(time);
  //   this.setState({
  //     fill: 0,
  //     seconds: 120
  //   });
  // };

  // componentDidMount() {
  //   this.focusListener = this.props.navigation.addListener(
  //     "didFocus",
  //     this.startTime
  //   );
  //   this.blurListener = this.props.navigation.addListener(
  //     "didBlur",
  //     this.resetTime
  //   );
  // }

  // componentWillUnmount() {
  //   clearTimeout(time);
  //   this.focusListener.remove();
  //   this.blurListener.remove();
  // }

  render() {
    // const { goBack } = this.props.navigation;
    // const order = this.props.navigation.getParam("order");
    // const key = this.props.navigation.getParam("key");
    const order = this.props.order;
    const id = this.props.id;

    return (
      // <View style={style.smallPopupCont}>
      <View style={style.smallPopup}>
        <Block row>
          <TouchableOpacity onPress={() => this.props.acceptPopup()}>
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
        <Block middle style={{ flex: 1 }}>
          {/* <AnimatedCircularProgress
            size={80}
            width={10}
            fill={this.state.fill}
            tintColor="#c9bfbf"
            backgroundColor="#5E72E4"
          >
            {() => <Text>{this.state.seconds}</Text>}
          </AnimatedCircularProgress> */}
          <TouchableOpacity
            onPress={() => {
              this.props.editList(order, id);
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
