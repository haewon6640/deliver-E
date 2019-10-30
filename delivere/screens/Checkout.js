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

export default class Checkout extends React.Component {
  render() {
    return (
      <ScrollView>
      <Block style={styles.container}>
        <Text style={styles.name}>Checkout</Text>
        <Text style={styles.category}>Delivery Details</Text>
        <Image source={require("../assets/map.png")} style={{
          alignSelf: 'center',
    flex: 1,
    aspectRatio: 1.2, 
    resizeMode: 'contain'}}
/>
<Block row>
          <Text style={{marginLeft: 30, marginBottom:20,fontSize: 17}}>Location</Text>
          <Text style={{position: 'absolute', right:33, fontSize: 17}}>White Hall  ></Text>
        </Block>
        <Block row>
          <Text style={{marginLeft: 30, marginBottom:20,fontSize: 17}}>Delivery Instructions</Text>
        </Block>
        <Block row>
          <Text style={{marginLeft: 30, marginBottom:20,fontSize: 17}}>ETA</Text>
          <Text style={{position: 'absolute', right:33, fontSize: 17}}>5-10 Min  ></Text>
        </Block>
        <Text style={{
    paddingLeft: 25,
    marginTop: 20,
    paddingBottom: 20,
    fontSize: 20,
    color: "#1f396e",
  }}>Payment</Text>
        <Block row>
          <Text style={{marginLeft: 30, marginBottom:20,fontSize: 17}}>Tip</Text>
          <Text style={{position: 'absolute', right:33, fontSize: 17}}>$1.00</Text>
        </Block>
        <Block row>
          <Text style={{marginLeft: 30, marginBottom:20, fontSize: 17}}>Payment</Text>
          <Text style={{position: 'absolute', right:33,  fontSize: 17}}>Visa ... 1234</Text>
        </Block>

        <Button color="#5E72E4" shadowless style={{alignSelf: 'center', marginTop: 20}}>Place Order</Button>
      </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    fontSize: 20,
    color: "#1f396e"
  }
});