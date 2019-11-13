import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { Button, Block, Icon } from "galio-framework";
const { width } = Dimensions.get("window");
import firebase from "../components/firebase";
import "@firebase/firestore";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rName: "",
      items: null,
      subtotal: 0,
      tax: 0,
      deliveryFee: 0
    };
  }
  async addOrder() {
    const dbh = firebase.firestore();
    var total = (
      this.state.subtotal +
      this.state.tax +
      this.state.deliveryFee
    ).toFixed(2);
    this.props.navigation.navigate("Checkout", { totalPrice: total });
    dbh
      .collection("Order")
      .add({
        rName: this.state.rName,
        items: this.state.items,
        subtotal: this.state.subtotal,
        tax: this.state.tax,
        deliveryFee: this.state.deliveryFee
      })
      .then(function(docRef) {})
      .catch(
        function(error) {
          alert(error.toString());
        }.bind(this)
      );
  }
  render() {
    const { navigation } = this.props;
    var rName = navigation.getParam("rName");
    var items = navigation.getParam("items");
    this.state.rName = rName;
    this.state.items = items;
    // this.setState((items = items));
    const List = items.map(function(element, i) {
      return (
        <Block key={i}>
          <Block row>
            <Text style={styles.text}>1</Text>
            <Text style={styles.text}>{element.name + " " + element.type}</Text>
            <Text style={{ marginRight: 30, fontSize: 17 }}>
              {"$" + element.price}
            </Text>
          </Block>
        </Block>
      );
    });
    items.forEach(element => {
      this.state.subtotal = this.state.subtotal + element.price;
    });
    this.state.tax = (this.state.subtotal * 0.04).toFixed(2);
    this.state.deliveryFee = 1.99;
    return (
      <Block style={styles.container}>
        <ScrollView>
          <Text style={styles.name}>{rName}</Text>
          <Text style={styles.category}>Items</Text>
          {List}
          <Text
            style={{
              paddingLeft: 25,
              marginTop: 50,
              paddingBottom: 20,
              fontSize: 20,
              color: "#1f396e"
            }}
          >
            Total
          </Text>
          <Block row>
            <Text style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}>
              Subtotal
            </Text>
            <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
              {"$" + this.state.subtotal}
            </Text>
          </Block>
          <Block row>
            <Text style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}>
              Tax
            </Text>
            <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
              {"$" + this.state.tax}
            </Text>
          </Block>
          <Block row>
            <Text style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}>
              Delivery
            </Text>
            <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
              {"$" + this.state.deliveryFee}
            </Text>
          </Block>
          <Button
            onPress={() => this.addOrder()}
            color="#5E72E4"
            shadowless
            style={{ alignSelf: "center", marginTop: 100 }}
          >
            Checkout
          </Button>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    alignSelf: "center",
    paddingBottom: 15,
    fontSize: 30,
    color: "#1f396e"
  },
  text: {
    fontSize: 17,
    color: "#466199",
    paddingLeft: 30
  },
  category: {
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 8,
    fontSize: 20,
    color: "#1f396e"
  }
});
