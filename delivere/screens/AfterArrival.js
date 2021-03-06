import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Button
} from "react-native";
import { Checkbox, Block, Icon } from "galio-framework";
import { style } from "../constants/Styles";
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

  afterPickUp = (eater, restaurant, order, id, total) => {
    this.updateOrder(order);
    this.props.navigation.navigate("Delivering", {
      eater: eater,
      restaurant: restaurant,
      order: order,
      id: id
    });
  };

  render() {
    const { navigation } = this.props;
    var restaurant = navigation.getParam("restaurant");
    var eater = navigation.getParam("eater");
    var order = navigation.getParam("order");
    var total = (order.subtotal + order.tax).toFixed(2);
    const id = this.props.navigation.getParam("id");
    const totalCount = order["items"].reduce((total, item) => {
      return total + item.count;
    }, 0);

    let itm = "items";
    if (totalCount == 1) itm = "item";

    const DATA = [
      { text1: "Pickup By", text2: "2:23PM", text3: "", key: "1" },
      { text1: "Customer", text2: eater.name, text3: "", key: "2" },
      {
        text1: "Order Details",
        text2: totalCount + " " + itm,
        text3:
          " Subtotal: $" +
          order.subtotal.toFixed(2) +
          "\n" +
          " Tax: $" +
          order.tax +
          "\n" +
          " Total: $" +
          total,
        key: "3"
      }
    ];

    const itemList = order["items"].map((item, j) => {
      let instrc = "";
      if (item.instruction) instrc = "\n  " + item.instruction;

      return (
        <Checkbox
          style={{
            height: 70,
            borderBottomWidth: 1,
            borderBottomColor: "#c9bfbf"
          }}
          key={j}
          color="#466199"
          labelStyle={styles.text}
          label={
            item.count +
            " " +
            item.name +
            " " +
            item.type +
            ": $" +
            item.price.toFixed(2) +
            instrc
          }
        />
      );
    });

    return (
      <View style={styles.container}>
        <View style={{ height: 0.7 * height }}>
          <ScrollView>
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
            {itemList}
            {/* <Text style={styles.text}>{total}</Text> */}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => this.afterPickUp(eater, restaurant, order, id, total)}
          style={styles.button}
        >
          {/* <Block row> */}
          {/* <Icon name="right" family="AntDesign" size={20} color="white" /> */}
          <Text style={{ color: "white", fontSize: 25 }}>After pickup</Text>
          {/* </Block> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "absolute", right: 15, top: 4 }}
          onPress={() => {
            this.props.navigation.navigate("MyOrders", {
              navIndex: 1,
              id: id,
              ident: 1
            });
          }}
        >
          <Block
            middle
            style={{
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              shadowOpacity: 0.1,
              elevation: 2,
              borderRadius: 10,
              height: 85,
              aspectRatio: 0.8,
              backgroundColor: "white"
            }}
          >
            <Icon
              name="text-document"
              family="Entypo"
              size={50}
              color="#5E72E4"
            />
            <Text style={[style.text, { paddingLeft: 0, fontSize: 14 }]}>
              Orders
            </Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "absolute", right: 100, top: 4 }}
          onPress={() => {
            this.props.navigation.navigate("RunHome", {
              navIndex: 0,
              id: id,
              ident: 1
            });
          }}
        >
          <Block
            middle
            style={{
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              shadowOpacity: 0.1,
              elevation: 2,
              borderRadius: 10,
              height: 85,
              aspectRatio: 0.8,
              backgroundColor: "white"
            }}
          >
            <Icon name="home" family="Entypo" size={50} color="#5E72E4" />
            <Text style={[style.text, { paddingLeft: 0, fontSize: 14 }]}>
              Home
            </Text>
          </Block>
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
