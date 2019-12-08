import React from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Button, Block, Icon } from "galio-framework";
const { width, height } = Dimensions.get("window");
import normalize from "react-native-normalize";
import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();

export default class RunHome extends React.Component {
  queryOrders = async () => {
    var orders = [];
    var success = "";
    await dbh
      .collection("Order")
      // .orderBy("date", "desc")
      // .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          var data = documentSnapshot.data();
          orders.push(data);
          success = "success";
        });
      })
      .catch(error => alert(error.toString()));
    if (success != "") {
      this.props.navigation.navigate("PendingOrders", { orders: orders });
    }
  };
  queryProfileInfo = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          dbh
            .collection("Runner")
            .doc(user.email)
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
                  this.props.navigation.navigate("RunProfile", {
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
      <ImageBackground
        source={require("../assets/emorymap.png")}
        style={styles.container}
      >
        <Button
          style={styles.button}
          onPress={() => {
            this.queryOrders();
          }}
        >
          <Text style={styles.text}>Start Delivering</Text>
        </Button>
        {/* <Block style={styles.footer}>
          <Block row space="around">
            <Icon name="compass" family="Feather" size={35} color="#5E72E4" />
            <Icon
              name="star-outlined"
              family="Entypo"
              size={35}
              color="#5E72E4"
            />
            <Icon
              name="dollar-sign"
              family="Feather"
              size={35}
              color="#5E72E4"
            />
            <TouchableOpacity onPress={() => this.queryProfileInfo()}>
              <Icon name="user" family="AntDesign" size={35} color="#5E72E4" />
            </TouchableOpacity>
          </Block>
          <Block row space="around">
            <Text style={{ color: "#5E72E4", marginLeft: 15 }}>Run</Text>
            <Text style={{ color: "#5E72E4", marginLeft: 20 }}>Ratings</Text>
            <Text style={{ color: "#5E72E4", marginLeft: 5 }}>Earnings</Text>
            <TouchableOpacity onPress={() => this.queryProfileInfo()}>
              <Text style={{ color: "#5E72E4" }}>Account</Text>
            </TouchableOpacity>
          </Block>
        </Block> */}
        {/* <Block row space="around">
          <Text style={{ color: "#5E72E4", marginLeft: 15 }}>Run</Text>
          <Text style={{ color: "#5E72E4", marginLeft: 20 }}>Ratings</Text>
          <Text style={{ color: "#5E72E4", marginLeft: 5 }}>Earnings</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("RunProfile")}
          >
            <Text style={{ color: "#5E72E4" }}>Account</Text>
          </TouchableOpacity>
        </Block> */}
      </ImageBackground>
      /* <View style={{alignItems: 'center'}}>
              <Icon name="compass" family="Feather" size={35} color="#5E72E4" />
              <Text style={{color: '#5E72E4'}>Run</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Icon name="star-outlined" family="Entypo" size={35} color="#5E72E4" />
              <Text style={{color: '#5E72E4'}>Ratings</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Icon name="profile" family="AntDesign" size={35} color="#5E72E4" />
              <Text style={{color: '#5E72E4'}>Earnings</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Icon name="dollar-sign" family="Feather" size={35} color="#5E72E4" />
              <Text style={{color: '#5E72E4'}>Account</Text>
            </View>
          </Block> */
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
  button: {
    position: "absolute",
    top: 0.4 * height,
    left: "50%",
    marginLeft: normalize(-150),
    marginTop: normalize(-40),
    height: normalize(80),
    width: normalize(300)
  },
  text: {
    fontSize: normalize(30),
    color: "white"
  },
  footer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: width,
    paddingTop: normalize(13),
    height: normalize(95),
    borderTopWidth: 1,
    borderColor: "#d6d7da"
  }
});
