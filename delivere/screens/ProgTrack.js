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
import Order from "../backend/Order";
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
      time: "10-15 min",
      runner: "None Currently",
      runnerSub: "",
      itemCount: 0,
      items: null,
      location: "",
      orderSet: false
    };
  }

  componentDidMount() {
    // Check Order changes real time
    var orderId = "obQAAwK0fkTExS0AcJFQ";
    listen = dbh
      .collection("Order")
      .doc(orderId)
      .onSnapshot(
        function(doc) {
          if (doc.data().completed) {
            this.props.navigation.navigate("Rating", { orderId: orderId });
          }
          if (this.state.runner == "" && doc.data().isAccepted) {
            this.setState({
              runner: doc.data().runnerEmail,
              runnerSub: "Your Runner"
            });
          }
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
        }.bind(this)
      );
  }

  componentWillUnmount() {
    listen();
  }

  setOrderDetails = async orderId => {
    const order = await new Order().queryOrder(orderId);
    var count = 0;
    const itemList = order["items"].map((item, j) => {
      count += item.count;
      return (
        <Text key={j} style={styles.orderText}>
          {item.count +
            " " +
            item.name +
            " " +
            item.type +
            ": $" +
            item.price.toFixed(2) +
            "\n"}
        </Text>
      );
    });
    this.setState({
      itemCount: count,
      items: itemList,
      location: order.instructions,
      orderSet: true
    });
  };

  render() {
    var orderId = "obQAAwK0fkTExS0AcJFQ";
    if (!this.state.orderSet) {
      this.setOrderDetails(orderId);
    }
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
          runner={this.state.runner}
          runnerSub={this.state.runnerSub}
          itemCount={this.state.itemCount}
          items={this.state.items}
          location={this.state.location}
        />
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
  },
  orderText: {
    fontSize: 20,
    color: "#466199",
    paddingLeft: 30
  }
});
