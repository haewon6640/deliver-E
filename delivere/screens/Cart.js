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
    this.state = { rName: "", items: null };
  }
  addOrder = () => {
    const dbh = firebase.firestore();
    dbh
      .collection("Order")
      .doc()
      .set(items)
      .then(
        function() {
          this.props.navigation.navigate("Checkout");
          // Sign-out successful.
        }.bind(this)
      )
      .catch(
        function(error) {
          alert(error.toString());
        }.bind(this)
      );
  };
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
            <Text style={styles.text}>{"$" + element.name}</Text>
          <Block>
            <Text style={{ marginLeft: 89, marginTop: 20, fontSize: 17 }}>
              {element.name}
            </Text>
            </Block>
          </Block>
        </Block>
      );
    });
    var price = 0;
    items.forEach(element => {
      price = price + element.price;
    });
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
              {"$" + price}
            </Text>
          </Block>
          <Block row>
            <Text style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}>
              Tax
            </Text>
            <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
              {"$" + (price * 0.04).toFixed(2)}
            </Text>
          </Block>
          <Block row>
            <Text style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}>
              Delivery
            </Text>
            <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
              $1.99
            </Text>
          </Block>
          <Button
            onPress={() => this.addOrder}
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
