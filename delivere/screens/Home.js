import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput
} from "react-native";
import { Block, Icon } from "galio-framework";
import Restaurant from "../components/Restaurant";
const { width, height } = Dimensions.get("window");
import normalize from "react-native-normalize";
import Popup from "../components/Popup";
import firebase from "../components/firebase";
import "@firebase/firestore";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const db = firebase.firestore();

class Header extends React.Component {
  render() {
    return (
      <View>
        <Block style={styles.header}>
          <StatusBar />
          <Text style={styles.text}>Delivering to</Text>
          <TouchableOpacity onPress={this.props.locationPopup}>
            <Block row middle width={width}>
              <Text style={styles.location}>White Hall</Text>
              <Icon
                style={{ marginTop: 7 }}
                name="down"
                family="AntDesign"
                size={30}
                color="#5E72E4"
              />
            </Block>
          </TouchableOpacity>
        </Block>
      </View>
    );
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showViewCart: false, locationVisible: false };
    this.locationPopup = this.locationPopup.bind(this);
    this.addAddress = this.addAddress.bind(this);
  }

  locationPopup = () => {
    this.setState({ locationVisible: !this.state.locationVisible });
  };

  componentDidMount() {
    this.props.navigation.setParams({
      locationPopup: this.locationPopup
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: (
        <Header
          {...params}
          locationPopup={navigation.getParam("locationPopup")}
        />
      ),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      }
    };
  };

  // createMenu(name, category, rating, ratecount) {
  //   alert("adfsafd");
  // var foodMap = new Map();
  // db.collection(name)
  //   .get()
  //   .then(function(querySnapshot) {
  //     alert("afdsf");
  //     querySnapshot.forEach(function(doc) {
  //       var items = [];
  //       const data = doc.data();
  //       for (const key in data) {
  //         const value = data[key];
  //         const item = {
  //           name: key,
  //           cal: value.cal,
  //           price: value.price
  //         };
  //         items.push(item);
  //       }
  //       foodMap[doc.id] = items;
  //     });
  //     this.props.navigation.navigate("Menu", {
  //       rName: name,
  //       rCategory: category,
  //       rRating: rating,
  //       rRateCount: ratecount,
  //       foodMap: foodMap
  //     });
  //   });
  // }
  // funFcn() {
  //   alert("fund");
  // }

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

  queryRestaurantInfo = name => {
    const rRef = db.collection("Restaurant").doc(name);
    rRef.get().then(
      function(doc) {
        if (doc.exists) {
          category = doc.data().Category;
          rating = doc.data().Rating;
          ratecount = doc.data().rate_count;

          var foodMap = new Map();
          db.collection(name)
            .get()
            .then(
              function(querySnapshot) {
                querySnapshot.forEach(
                  function(doc) {
                    var items = [];
                    const data = doc.data();
                    for (const key in data) {
                      const value = data[key];
                      const item = {
                        name: key,
                        cal: value.cal,
                        price: value.price
                      };
                      items.push(item);
                    }
                    foodMap[doc.id] = items;
                  }.bind(this)
                );
                this.props.navigation.navigate("Menu", {
                  rName: name,
                  rCategory: category,
                  rRating: rating,
                  rRateCount: ratecount,
                  foodMap: foodMap
                });
              }.bind(this)
            );
        } else {
          alert("OOPS. There was an issue fetching data from the server.");
          // not working
        }
      }.bind(this)
    );
    // this.props.navigation.navigate("Menu");
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between"
          }}
        >
          <View style={styles.content}>
            <Block row space="evenly" width={width}>
              <TouchableOpacity
                onPress={() => this.queryRestaurantInfo("Twisted Taco")}
              >
                <Restaurant name="Twisted Taco" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.queryRestaurantInfo("Maru")}
              >
                <Restaurant name="Maru" />
              </TouchableOpacity>
            </Block>

            <Block row space="evenly" width={width}>
              <Restaurant name="Blue Donkey" />
              <Restaurant name="Kaldi's: ESC" />
            </Block>
            <Block row space="evenly" width={width}>
              <Restaurant name="Highland Bakery" />
              <Restaurant name="Kaldi's: Depot" />
            </Block>
          </View>
        </ScrollView>
        {/* {this.state.showViewCart ? vCart : null} */}
        {/* <Block row space="around" style={styles.footer}>
          <TouchableOpacity onPress={() => this.console()}>
            <Icon name="home" family="AntDesign" size={35} color="#5E72E4" />
          </TouchableOpacity>
          <Icon name="search1" family="AntDesign" size={35} color="#5E72E4" />
          <Icon name="profile" family="AntDesign" size={35} color="#5E72E4" />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SetEaterLocation")}
          >
            <Icon name="user" family="AntDesign" size={35} color="#5E72E4" />
          </TouchableOpacity>
        </Block> */}
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
            />
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
  content: {
    backgroundColor: "#F8F9FE",
    flex: 1,
    paddingTop: height * 0.08
  },
  location: {
    fontSize: normalize(25),
    color: "#5E72E4"
  },
  header: {
    height: normalize(115),
    paddingTop: normalize(40),
    borderBottomWidth: 1,
    borderColor: "#d6d7da",
    width: width,
    backgroundColor: "white"
  },
  footer: {
    width: width,
    paddingTop: normalize(13),
    height: normalize(77),
    borderTopWidth: 1,
    borderColor: "#d6d7da"
  },
  text: {
    textAlign: "center",
    fontSize: normalize(17),
    color: "#1f396e"
  },
  button: {
    backgroundColor: "#5E72E4",
    borderRadius: 80,
    height: 50,
    width: width * 0.5,
    marginTop: 20,
    marginBottom: 95
  }
});
