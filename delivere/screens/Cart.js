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
import MenuItem from "../components/MenuItem";
import SafeAreaView from "react-native-safe-area-view";
const { width } = Dimensions.get("window");

export default class Cart extends React.Component {
  render() {
    return (
      <Block style={styles.container}>
        <Text style={styles.name}>Twisted Taco</Text>
        <Text style={styles.category}>Items</Text>
        <Block row>
          <Text style={styles.text}>1</Text>
          <Text style={{marginLeft: 50, fontSize: 17}}>Taco Combo</Text>
          <Text style={{marginLeft: 150, fontSize: 17}}>$7.49</Text>
        </Block>
        <Text style={{marginLeft: 89, marginTop: 20, fontSize: 17}}>Buffalo Bill, Tombstone</Text>
        <Text style={{marginLeft: 89, fontSize: 17}}>Chicken, Rice and Beans</Text>
        <Text style={{
    paddingLeft: 25,
    marginTop: 50,
    paddingBottom: 20,
    fontSize: 20,
    color: "#1f396e",
  }}>Total</Text>
        <Block row>
          <Text style={{marginLeft: 30, marginBottom:20,fontSize: 17}}>Subtotal</Text>
          <Text style={{position: 'absolute', right:33, fontSize: 17}}>$7.49</Text>
        </Block>
        <Block row>
          <Text style={{marginLeft: 30, marginBottom:20, fontSize: 17}}>Tax</Text>
          <Text style={{position: 'absolute', right:33,  fontSize: 17}}>$0.30</Text>
        </Block>
        <Block row>
          <Text style={{marginLeft: 30, marginBottom:20,fontSize: 17}}>Delivery</Text>
          <Text style={{position: 'absolute', right:33,  fontSize: 17}}>$1.99</Text>
        </Block>
        <Button onPress={() => this.props.navigation.navigate("Checkout")} color="#5E72E4" shadowless style={{alignSelf: 'center', marginTop: 100}}>Checkout</Button>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    alignSelf: 'center',
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