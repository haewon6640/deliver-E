import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Button, Block, Icon } from "galio-framework";
const { width, height } = Dimensions.get("window");
import firebase from "../components/firebase";
import normalize from "react-native-normalize";
import "@firebase/firestore";
import Eater from "../backend/Eater";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rName: "",
      items: null,
      subtotal: 0,
      tax: 0,
      deliveryFee: 0,
      curUserEmail: "",
      tip: 0,
      building: "",
      instructions: ""
    };
  }
  concatString = str => {
    if (str.length > 20) {
      str = str.substring(0, 17) + "...";
    }
    return str;
  };

  render() {
    const { navigation } = this.props;
    var rName = navigation.getParam("rName");
    var items = navigation.getParam("items");
    this.state.rName = rName;
    this.state.items = items;
    // this.setState((items = items));
    const List = items.map(
      function(element, i) {
        return (
          <Block key={i}>
            <Block row>
              <Text style={styles.text}>{element.count}</Text>
              <Text style={[styles.text, { position: "absolute", left: 27 }]}>
                {this.concatString(element.type + ": " + element.name)}
              </Text>
              <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
                {"$" + element.price.toFixed(2)}
              </Text>
            </Block>
            <Text
              style={[
                styles.text,
                {
                  marginLeft: 39,
                  marginBottom: 10,
                  color: "gray",
                  width: 0.5 * width
                }
              ]}
            >
              {element.instruction}
            </Text>
          </Block>
        );
      }.bind(this)
    );
    this.state.subtotal = 0;
    items.forEach(element => {
      this.state.subtotal =
        this.state.subtotal + parseFloat(element.price.toFixed(2));
    });
    this.state.subtotal = parseFloat(this.state.subtotal.toFixed(2));
    this.state.tax = parseFloat((this.state.subtotal * 0.04).toFixed(2));
    this.state.deliveryFee = 3.0;
    total = (
      this.state.subtotal +
      this.state.tax +
      this.state.deliveryFee +
      this.state.tip
    ).toFixed(2);
    return (
      <Block style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView>
            <Text style={styles.name}>{rName}</Text>
            <Text style={styles.category}>Items</Text>
            {List}
            {/* <Text
              style={{
                paddingLeft: 25,
                marginTop: 40,
                paddingBottom: 20,
                fontSize: 20,
                color: "#1f396e"
              }}
            >
              Total
            </Text> */}
            <Block
              rows
              style={{
                marginTop: 15
              }}
            >
              <Text style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}>
                Subtotal
              </Text>
              <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
                {"$" + this.state.subtotal.toFixed(2)}
              </Text>
            </Block>
            <Block row>
              <Text style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}>
                Tax
              </Text>
              <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
                {"$" + this.state.tax.toFixed(2)}
              </Text>
            </Block>
            <Block row>
              <Text style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}>
                Delivery
              </Text>
              <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
                {"$" + this.state.deliveryFee.toFixed(2)}
              </Text>
            </Block>
            <Block row>
              <Text
                style={{
                  marginLeft: 30,
                  marginBottom: 25,
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#1f396e"
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  position: "absolute",
                  right: 33,
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#1f396e"
                }}
              >
                {"$" + total}
              </Text>
            </Block>
            <Block style={{ marginBottom: 20 }}>
              <Text
                style={{
                  color: "#1f396e",
                  marginLeft: 30,
                  marginBottom: 5,
                  fontSize: 20
                }}
              >
                Specific Location
              </Text>
              <TextInput
                blurOnSubmit={true}
                multiline={true}
                style={{
                  alignSelf: "center",
                  height: 0.07 * height,
                  width: 0.7 * width,
                  padding: width * 0.05,
                  borderColor: "gray",
                  borderWidth: 1
                }}
                placeholder="MANDATORY: Please input your building and room number."
                onSubmitEditing={event => {
                  this.setState({ building: event.nativeEvent.text });
                }}
              />
            </Block>
            <Block row>
              <Text
                style={{
                  color: "#1f396e",
                  marginLeft: 30,
                  marginBottom: 5,
                  fontSize: 20
                }}
              >
                Delivery Instructions
              </Text>
            </Block>
            <TextInput
              blurOnSubmit={true}
              multiline={true}
              style={{
                alignSelf: "center",
                height: 0.19 * height,
                width: 0.7 * width,
                padding: width * 0.05,
                paddingTop: width * 0.04,
                borderColor: "gray",
                borderWidth: 1
              }}
              placeholder="Provide any extra information that is needed/helpful for the runner's delivery process."
              onSubmitEditing={event => {
                // this.state.subtotal = 0;
                this.setState({ instructions: event.nativeEvent.text });
              }}
            />
            <Button
              onPress={() =>
                this.props.navigation.navigate("Checkout", {
                  instructions: this.state.instructions,
                  building: this.state.building,
                  totalPrice: total,
                  order: {
                    rName: this.state.rName,
                    items: this.state.items,
                    subtotal: this.state.subtotal,
                    tax: this.state.tax,
                    total: total,
                    deliveryFee: this.state.deliveryFee,
                    progress: 0.25,
                    tip: this.state.tip,
                    instructions: this.state.instructions,
                    building: this.state.building,
                    isAccepted: false,
                    runnerEmail: ""
                  }
                })
              }
              color="#5E72E4"
              shadowless
              style={{
                alignSelf: "center",
                marginTop: normalize(20),
                marginBottom: normalize(15)
              }}
            >
              Checkout
            </Button>
          </ScrollView>
        </TouchableWithoutFeedback>
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
