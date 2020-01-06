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
import Popup from "../components/Popup";
import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();
import Eater from "../backend/Eater";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const { width, height } = Dimensions.get("window");
let map;

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.locationPopup = this.locationPopup.bind(this);
  }

  state = {
    showInstructions: false,
    location: null,
    errorMessage: null,
    locationVisible: false
  };

  locationPopup = () => {
    this.setState({ locationVisible: !this.state.locationVisible });
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

  async addOrder(order, location) {
    const x = new Eater();
    const eater = await x.getCurrentEater();
    order["date"] = new Date();
    order["cName"] = eater.name;
    order["eaterEmail"] = eater.email;
    order["eaterLocation"] = eater.currentAddress;
    dbh
      .collection("Order")
      .add(order)
      .then(
        function(docRef) {
          docRef.update({
            oid: docRef.id
          });
          this.props.navigation.navigate("ProgTrack", {
            orderId: docRef.id,
            location: location
          });
        }.bind(this)
      )
      .catch(
        function(error) {
          alert(error.toString());
        }.bind(this)
      );
  }

  addAddress = address => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          db.collection("Eater")
            .doc(user.email)
            .update({
              currentAddress: address
            });
          alert("Location Updated!");
        } else {
          alert("You are not signed in.");
          // No user is signed in.
          return;
        }
      }.bind(this)
    );
  };
  renderGooglePlaceAutocomplete = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder="Enter Location"
        minLength={2}
        autoFocus={false}
        returnKeyType={"search"}
        listViewDisplayed="auto"
        fetchDetails={true}
        renderDescription={row => row.description || row.vicinity}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          alert(JSON.stringify(details.geometry));
          this.addAddress(details.geometry.location);
        }}
        getDefaultValue={() => ""}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: "AIzaSyC_WFbvnxPmeRXf9ZypoddKN5jZ9ZT6B6M",
          language: "en", // language of the results
          types: "address" // default: 'geocode'
        }}
        nearbyPlacesAPI="None"
        styles={{
          textInputContainer: {
            backgroundColor: "rgba(0,0,0,0)",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            height: 60
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 45,
            color: "#5d5d5d",
            fontSize: normalize(16)
          },
          predefinedPlacesDescription: {
            color: "#1faadb"
          }
        }}
        currentLocation={true}
        currentLocationLabel="Current Location"
      ></GooglePlacesAutocomplete>
    );
  };
  render() {
    const { navigation } = this.props;
    var totalPrice = navigation.getParam("totalPrice");
    var order = navigation.getParam("order");
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
    var building = navigation.getParam("building");

    return (
      <View style={{ flex: 1, width: width }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView>
            <Block style={styles.container}>
              <Text style={styles.name}>Checkout</Text>
              <Text style={[styles.category, { marginBottom: 10 }]}>
                Delivery Details
              </Text>
              {map}
              <TouchableOpacity
                onPress={() => this.setState({ locationVisible: true })}
              >
                <Block row>
                  <Text
                    style={{ marginLeft: 30, marginBottom: 20, fontSize: 17 }}
                  >
                    Location
                  </Text>
                  <Text
                    style={{ position: "absolute", right: 50, fontSize: 17 }}
                  >
                    {building}
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
                onPress={() => this.addOrder(order, building)}
                color="#5E72E4"
                shadowless
                style={{ alignSelf: "center", marginTop: 20, marginBottom: 10 }}
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
              backgroundColor: "white"
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

        <Popup
          visible={this.state.locationVisible}
          // addAddress={this.addAddress}
          style="full"
        >
          <TouchableOpacity onPress={this.locationPopup}>
            <Icon
              style={{
                position: "absolute",
                left: width * 0.05,
                marginTop: height * 0.06
              }}
              name="close"
              family="AntDesign"
              size={30}
              color="#466199"
            />
          </TouchableOpacity>
          <Block
            center
            style={{ paddingTop: height * 0.06, marginBottom: height * 0.02 }}
          >
            <Text style={{ fontSize: 20, color: "#466199" }}>Edit Address</Text>
          </Block>
          <Block style={{ backgroundColor: "#ECECEC", height: 10 }} />
          <Block row style={{ alignItems: "center" }}>
            <Icon
              style={{ marginHorizontal: width * 0.05 }}
              name="search1"
              family="AntDesign"
              size={30}
              color="#466199"
            />
            {this.renderGooglePlaceAutocomplete()}
          </Block>
          <Block style={{ backgroundColor: "#ECECEC", height: 10 }} />
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
