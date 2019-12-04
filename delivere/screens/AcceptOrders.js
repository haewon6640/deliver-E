import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Modal,
  Easing
} from "react-native";
import { Button, Block, Icon } from "galio-framework";
import { AnimatedCircularProgress } from "react-native-circular-progress";
const { width, height } = Dimensions.get("window");
import normalize from "react-native-normalize";
import Restaurant from "../backend/Restaurant";
import Eater from "../backend/Eater";
let time;
import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();

export default class AcceptOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fill: 0, seconds: 120 };
  }
  componentDidMount() {
    time = setInterval(() => {
      if (this.state.seconds > 0)
        this.setState({
          fill: this.state.fill + 100 / 120,
          seconds: this.state.seconds - 1
        });
    }, 1000);
  }
  componentWillUnmount() {
    clearTimeout(time);
  }
  updateOrder(order) {
    var orderRef = dbh.collection("Order").doc(order.oid);
    orderRef.update({
      progress: 0.25
    });
  }
  async queryPickupInfo(order) {
    var rName = order["rName"];
    this.updateOrder(order);
    let restaurant = await new Restaurant().queryRestaurant(rName);
    let eater = await new Eater().getEaterfromEmail(order["eaterEmail"]);
    this.props.navigation.navigate("PickingUp", {
      eater: eater,
      restaurant: restaurant,
      order: order
    });
  }
  render() {
    const { navigation } = this.props;
    var order = navigation.getParam("order");
    var earning = order["deliveryFee"];
    const totalCount = order["items"].reduce((total,item) => {
      return total + item.count
    }, 0);

    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require("../assets/emorymap.png")}
          style={{
            alignSelf: "center"
          }}
        />
        <Block
          style={{
            position: "absolute",
            bottom: 0,
            paddingBottom: 70,
            backgroundColor: "white",
            width: width
          }}
        >
          <Block
            row
            style={{
              paddingLeft: 30,
              paddingBottom: 25,
              paddingTop: 25,
              marginBottom: 15
            }}
          >
            <View>
              <Text style={styles.text}>Deliver by 3:27 PM</Text>
              <Text style={styles.category}>{order.rName}</Text>
              <Block row>
                <Text style={styles.text}>{totalCount} items •</Text>
                <Text style={styles.text}>0.5 miles</Text>
              </Block>
            </View>
            <View
              style={{ position: "absolute", top: 30, right: normalize(40) }}
            >
              <AnimatedCircularProgress
                size={80}
                width={10}
                fill={this.state.fill}
                tintColor="#c9bfbf"
                backgroundColor="#5E72E4"
              >
                {() => <Text>{this.state.seconds}</Text>}
              </AnimatedCircularProgress>
            </View>
          </Block>
          <Block
            style={{ height: 1, width: width, backgroundColor: "#c9bfbf" }}
          />
          <View style={{ paddingLeft: 30 }}>
            <Block row>
              <Block style={{ paddingTop: 10 }}>
                <Text style={styles.category}> {"$" + earning.toFixed(2)}</Text>
                <Text style={styles.text}>Guaranteed</Text>
                <Text style={styles.text}> Earnings</Text>
              </Block>
              <TouchableOpacity
                onPress={() => this.queryPickupInfo(order)}
                style={{
                  height: 100,
                  position: "absolute",
                  right: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  aspectRatio: 1.2,
                  backgroundColor: "#5E72E4",
                  borderRadius: normalize(15)
                }}
              >
                <Text style={{ fontSize: normalize(23), color: "white" }}>
                  Accept
                </Text>
              </TouchableOpacity>
            </Block>
          </View>
        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: normalize(20),
    color: "#466199",
    paddingLeft: normalize(10)
  },
  category: {
    fontWeight: "bold",
    paddingLeft: normalize(10),
    paddingTop: normalize(15),
    fontSize: normalize(23),
    color: "#1f396e"
  }
});
