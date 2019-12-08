import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Button, Block, Icon } from "galio-framework";
import normalize from "react-native-normalize";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();
const { width, height } = Dimensions.get("window");
let map;

export default class Checkout extends React.Component {
  state = {
    showInstructions: false,
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let loc = await Location.getCurrentPositionAsync({});
    this.setState({ location: loc });
  };

  render() {
    const { navigation } = this.props;
    var totalPrice = navigation.getParam("totalPrice");
    var orderId = navigation.getParam("orderId");
    if (this.state.location != null) {
      map = (
        <MapView
          style={{
            height: height * 0.25,
            width: 0.8 * width,
            marginBottom: 5,
            alignSelf: "center"
          }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
          }}
        />
      );
    }
    var instructions = navigation.getParam("instructions");

    return (
      <View style={{ flex: 1, width: width }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView>
            <Block style={styles.container}>
              <Text style={styles.name}>Checkout</Text>
              <Text style={styles.category}>Delivery Details</Text>
              {/* <Image source={require("../assets/map.png")} style={{
            alignSelf: 'center',
            flex: 1,
            aspectRatio: 1.2, 
            resizeMode: 'contain'}}
          /> */}
              {map}
              <Block row>
                <Text
                  style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}
                >
                  Location
                </Text>
                <Text style={{ position: "absolute", right: 50, fontSize: 17 }}>
                  White Hall
                </Text>
                <Icon
                  style={{ position: "absolute", right: 30 }}
                  name="right"
                  family="AntDesign"
                  size={20}
                  color="#5E72E4"
                />
              </Block>
              <TouchableOpacity
                onPress={() => this.setState({ showInstructions: true })}
              >
                <Block row>
                  <Text
                    style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}
                  >
                    Delivery Instructions
                  </Text>
                  <Icon
                    style={{ position: "absolute", right: 30 }}
                    name="right"
                    family="AntDesign"
                    size={20}
                    color="#5E72E4"
                  />
                </Block>
              </TouchableOpacity>
              <Block row>
                <Text
                  style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}
                >
                  ETA
                </Text>
                <Text style={{ position: "absolute", right: 50, fontSize: 17 }}>
                  5-10 Min
                </Text>
                <Icon
                  style={{ position: "absolute", right: 30 }}
                  name="right"
                  family="AntDesign"
                  size={20}
                  color="#5E72E4"
                />
              </Block>
              <Text
                style={{
                  paddingLeft: 25,
                  marginTop: 20,
                  paddingBottom: 20,
                  fontSize: 20,
                  color: "#1f396e"
                }}
              >
                Payment
              </Text>

              <Block row>
                <Text
                  style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}
                >
                  Total
                </Text>
                <Text style={{ position: "absolute", right: 33, fontSize: 17 }}>
                  {"$ " + totalPrice}
                </Text>
              </Block>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("AddSubscription")
                }
              >
                <Block row>
                  <Text
                    style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}
                  >
                    Payment
                  </Text>
                  <Text
                    style={{ position: "absolute", right: 33, fontSize: 17 }}
                  >
                    Visa ... 1234
                  </Text>
                </Block>
              </TouchableOpacity>

              <Button
                onPress={() =>
                  this.props.navigation.navigate("ProgTrack", {
                    orderId: orderId
                  })
                }
                color="#5E72E4"
                shadowless
                style={{ alignSelf: "center", marginTop: 20 }}
              >
                Place Order
              </Button>
            </Block>
          </ScrollView>
        </TouchableWithoutFeedback>

        <Popup visible={this.state.showInstructions} style="small">
          <Block
            style={{
              height: 0.5 * height,
              width: 0.8 * width,
              backgroundColor: "white",
              borderWidth: 1
            }}
          >
            <Block row>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    showInstructions: !this.state.showInstructions
                  })
                }
              >
                <Icon
                  style={{
                    marginLeft: width * 0.02,
                    marginVertical: height * 0.02
                  }}
                  name="close"
                  family="AntDesign"
                  size={30}
                  color="#5E72E4"
                />
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
            </Block>

            <Text
              style={{
                alignSelf: "center",
                height: 0.3 * height,
                width: 0.7 * width,
                padding: width * 0.05,
                borderColor: "gray",
                borderWidth: 1
              }}
            >
              {instructions}
            </Text>
          </Block>
        </Popup>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  name: {
    alignSelf: "center",
    paddingBottom: normalize(15),
    fontSize: normalize(30),
    color: "#1f396e"
  },
  text: {
    fontSize: 17,
    color: "#466199",
    paddingLeft: 30
  },
  category: {
    paddingLeft: normalize(30),
    paddingTop: normalize(15),
    fontSize: 20,
    color: "#1f396e"
  }
});
