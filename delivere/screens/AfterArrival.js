import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  FlatList
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Button, Block, Icon, Checkbox } from "galio-framework";
import normalize from "react-native-normalize";
const { width, height } = Dimensions.get("window");
import firebase from "../components/firebase";
import "@firebase/firestore";

const dbh = firebase.firestore();

export default class AfterArrival extends React.Component {
  updateOrder(order) {
    var orderRef = dbh.collection("Order").doc(order.oid);
    orderRef.update({
      progress: 0.75
    });
  }

  afterPickUp = (eater, restaurant, order) => {
    this.updateOrder(order);
    this.props.navigation.navigate("Delivering", {
      eater: eater,
      restaurant: restaurant,
      order: order
    });
  };

  render() {
    const { navigation } = this.props;
    var restaurant = navigation.getParam("restaurant");
    var eater = navigation.getParam("eater");
    var order = navigation.getParam("order");

    const DATA = [
      { text1: "Pickup By", text2: "3:22PM", text3: "", key: "1" },
      { text1: "Customer", text2: eater.name, text3: "", key: "2" },
      {
        text1: "Order Details",
        text2: "2 Items",
        text3: "$ " + order.subtotal,
        key: "3"
      }
    ];

    return (
      <View style={styles.container}>
        <View style={{ height: 0.7 * height }}>
          <ScrollView
          // contentContainerStylecontentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
          >
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: width,
                    borderBottomWidth: 1,
                    borderBottomColor: "#c9bfbf",
                    paddingBottom: 20
                  }}
                >
                  <Text style={styles.category}>{item.text1}</Text>
                  <Text style={styles.text}>{item.text2}</Text>
                  <Text style={styles.text}>{item.text3}</Text>
                </View>
              )}
            />
            <Text style={[styles.category, { marginTop: 30 }]}>Checklist</Text>
            <Checkbox
              style={{
                height: 70,
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#c9bfbf"
              }}
              color="#466199"
              labelStyle={styles.text}
              label="1 Buffalo Bill Taco"
            />
            <Checkbox
              style={{ height: 70, alignItems: "center" }}
              color="#466199"
              labelStyle={styles.text}
              label="1 Tombstone Chicken Taco"
            />
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => this.afterPickUp(eater, restaurant, order)}
          style={styles.button}
        >
          {/* <Block row> */}
          {/* <Icon name="right" family="AntDesign" size={20} color="white" /> */}
          <Text style={{ color: "white", fontSize: 25 }}>After pickup</Text>
          {/* </Block> */}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  text: {
    fontSize: 20,
    color: "#466199",
    paddingLeft: 15
  },
  category: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 8,
    fontSize: 25,
    color: "#1f396e"
  },
  button: {
    position: "absolute",
    bottom: 0,
    height: normalize(80),
    backgroundColor: "#5E72E4",
    width: width,
    alignItems: "center",
    paddingTop: 20
  }
});
