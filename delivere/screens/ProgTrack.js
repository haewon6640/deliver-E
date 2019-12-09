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
var listen;

export default class ProgTrack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0.25,
      message: "Heading to store",
      time: "10-15 min"
    };
  }

  componentDidMount() {
    var orderId = this.props.navigation.getParam("orderId");
    listen = dbh
      .collection("Order")
      .doc(orderId)
      .onSnapshot(
        function(doc) {
          prog = doc.data().progress;
          if (prog == 0.25) {
            this.setState({
              progress: prog,
              message: "Heading to store",
              time: "10-15 min"
            });
          }
          if (prog == 0.5) {
            this.setState({
              progress: prog,
              message: "Ordering food",
              time: "5-10 min"
            });
          }
          if (prog == 0.75) {
            this.setState({
              progress: prog,
              message: "Heading to you",
              time: "4 min"
            });
          }
          if (prog == 1) {
            this.props.navigation.navigate("Rating", {
              // progress: prog,
              // message: "Heading to you",
              // time: "4 min"
            });
          }
        }.bind(this)
      );
  }

  componentWillUnmount() {
    listen();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/emorymap.png")}
          style={{ height: 0.8 * height, alignSelf: "center" }}
        />
        <BottomSheet
          progress={this.state.progress}
          message={this.state.message}
          time={this.state.time}
        />
        {/* <Button
          onPress={() =>
            this.props.navigation.navigate("Rating", {
              orderId: this.props.navigation.getParam("orderId")
            })
          }
        /> */}
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
