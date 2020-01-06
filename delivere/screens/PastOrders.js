import React from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { Block, Icon } from "galio-framework";
const { width, height } = Dimensions.get("window");
import normalize from "react-native-normalize";
import { style } from "../constants/Styles";
import Restaurant from "../backend/Restaurant";
import Eater from "../backend/Eater";
import firebase from "../components/firebase";
import "@firebase/firestore";
import Order from "../backend/Order";
const dbh = firebase.firestore();

export default class PastOrders extends React.Component {
  state = {
    valid: false,
    orders: []
  };

  queryOrder = async () => {
    newOrders = await new Order().queryMyOrders();
    this.setState({ orders: newOrders, valid: true });
  };

  concatString = str => {
    if (str.length > 20) {
      str = str.substring(0, 17) + "...";
    }
    return str;
  };

  render() {
    if (!this.state.valid) {
      this.queryOrder();
    }
    const state = this.state;
    const nav = this.props.navigation;
    // const Orders = state.orders;
    let orderList = state.orders.map(order => {
      // const count = order["items"].reduce((total, item) => {
      //   return total + item.count;
      // }, 0);
      // var Items = "items";
      // if (count == 1) Items = "item";
      // const countString = count + " " + Items;
      return (
        <View key={order.oid} style={style.listItem}>
          <Text style={[style.category, { paddingBottom: 2 }]}>
            Eater: {order.cName}
          </Text>
          <Text style={[style.category, { paddingBottom: 7 }]}>
            Runner: {order.runName}
          </Text>
          <Text style={[style.category, { marginBottom: 9 }]}>
            {order.rName}
          </Text>
          {order.items.map((element, i) => {
            return (
              <Block key={i}>
                <Block row>
                  <Text style={style.text}>{element.count}</Text>
                  <Text style={style.text}>
                    {this.concatString(element.type + ": " + element.name)}
                  </Text>
                  <Text
                    style={{ position: "absolute", right: 33, fontSize: 17 }}
                  >
                    {"$" + element.price.toFixed(2)}
                  </Text>
                </Block>
                <Text style={style.text}>{element.instructions}</Text>
              </Block>
            );
          })}
          {/* <Text
            style={{
              paddingLeft: 25,
              marginTop: 50,
              paddingBottom: 20,
              fontSize: 20,
              color: "#1f396e"
            }}
          >
            Total
          </Text> */}
          <Block style={{ marginTop: 30 }} row>
            <Text
              style={[
                style.text,
                { marginLeft: 20, marginBottom: 20, fontSize: 17 }
              ]}
            >
              Subtotal
            </Text>
            <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
              {"$" + order.subtotal.toFixed(2)}
            </Text>
          </Block>
          <Block row>
            <Text
              style={[
                style.text,
                { marginLeft: 20, marginBottom: 20, fontSize: 17 }
              ]}
            >
              Tax
            </Text>
            <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
              {"$" + order.tax.toFixed(2)}
            </Text>
          </Block>
          <Block row>
            <Text
              style={[
                style.text,
                { marginLeft: 20, marginBottom: 20, fontSize: 17 }
              ]}
            >
              Delivery
            </Text>
            <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
              {"$" + order.deliveryFee.toFixed(2)}
            </Text>
          </Block>
          <Block row>
            <Text
              style={[
                style.text,
                {
                  marginLeft: 20,
                  marginBottom: 20,
                  fontSize: 17,
                  fontWeight: "bold"
                }
              ]}
            >
              Total
            </Text>
            <Text
              style={{
                position: "absolute",
                right: 33,
                fontSize: 17,
                fontWeight: "bold"
              }}
            >
              ${order.subtotal + order.tax + order.deliveryFee + order.tip}
            </Text>
          </Block>
        </View>
      );
    });
    return (
      <ScrollView>
        <Text style={[style.title, { marginTop: 70 }]}>Past Orders</Text>
        {orderList}
      </ScrollView>
    );
  }
}
