import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Block, Icon } from "galio-framework";
import Restaurant from "../components/Restaurant";
import SafeAreaView from "react-native-safe-area-view";
const { width } = Dimensions.get("window");
import normalize from "react-native-normalize";

import firebase from "../components/firebase";
import "@firebase/firestore";
const db = firebase.firestore();

class Header extends React.Component {
  render() {
    return (
      <Block style={styles.header}>
        <Text style={styles.text}>Delivering to</Text>
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
      </Block>
    );
  }
}

export default class Home extends React.Component {
  static navigationOptions = {
    headerTitle: () => <Header />,
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    }
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

  queryProfileInfo = () => {
    const loggedIn = firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          const name = "";
          db.collection("User")
            .doc(user.uid)
            .get()
            .then(
              function(doc) {
                if (doc.exists) {
                  const curUser = {
                    uid: doc.data().uid,
                    email: doc.data().email,
                    name: doc.data().name,
                    phoneNumber: doc.data().phoneNumber
                  };
                  this.props.navigation.navigate("Profile", {
                    user: curUser
                  });
                } else {
                  alert("There was an issue fetching data from the server.");
                }
              }.bind(this)
            );
        } else {
          alert("You are not signed in.");
          // No user is signed in.
          return;
        }
      }.bind(this)
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <Block row space="evenly" width={width}>
            <TouchableOpacity
              onPress={() => this.queryRestaurantInfo("Twisted Taco")}
            >
              <Restaurant name="Twisted Taco" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.queryRestaurantInfo("Maru")}>
              <Restaurant name="Maru" />
            </TouchableOpacity>
          </Block>

          <Block row space="evenly" width={width}>
            <TouchableOpacity onPress={() => this.queryProfileInfo()}>
              <Restaurant name="Blue Donkey" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Menu", {
                  restaurant: "Kaldi's: ESC"
                })
              }
            ></TouchableOpacity>
            <Restaurant name="Kaldi's: ESC" />
          </Block>
          <Block row space="evenly" width={width}>
            <Restaurant name="Highland Bakery" />
            <Restaurant name="Kaldi's: Depot" />
          </Block>
        </ScrollView>
        <Block row space="around" style={styles.footer}>
          <Icon name="home" family="AntDesign" size={35} color="#5E72E4" />
          <Icon name="search1" family="AntDesign" size={35} color="#5E72E4" />
          <Icon name="profile" family="AntDesign" size={35} color="#5E72E4" />
          <TouchableOpacity onPress={() => this.queryProfileInfo()}>
            <Icon name="user" family="AntDesign" size={35} color="#5E72E4" />
          </TouchableOpacity>
        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    backgroundColor: "#F8F9FE",
    flex: 1,
    paddingTop: normalize(85)
  },
  location: {
    fontSize: 25,
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
    height: normalize(100),
    paddingTop: normalize(15),
    borderTopWidth: 1,
    borderColor: "#d6d7da"
  },
  text: {
    textAlign: "center",
    fontSize: normalize(17),
    color: "#1f396e"
  }
});
