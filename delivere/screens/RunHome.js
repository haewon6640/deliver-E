import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
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
  querylatestOrder = async () => {
    var order = {};
    var success = "";
    await dbh
      .collection("Order")
      .orderBy("date")
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          var data = documentSnapshot.data();
          order = data;
          success = "success";
        });
      })
      .catch(error => alert(error.toString()));
    if (success != "") {
      this.props.navigation.navigate("AcceptOrders", { order: order });
    }
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
            this.querylatestOrder();
          }}
        >
          <Text style={styles.text}>Start Delivering</Text>
        </Button>
        <Block style={styles.footer}>
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
            <Icon name="user" family="AntDesign" size={35} color="#5E72E4" />
          </Block>
          <Block row space="around">
            <Text style={{ color: "#5E72E4", marginLeft: 15 }}>Run</Text>
            <Text style={{ color: "#5E72E4", marginLeft: 20 }}>Ratings</Text>
            <Text style={{ color: "#5E72E4", marginLeft: 5 }}>Earnings</Text>
            <Text style={{ color: "#5E72E4" }}>Account</Text>
          </Block>
        </Block>
        <Block row space="around">
          <Text style={{ color: "#5E72E4", marginLeft: 15 }}>Run</Text>
          <Text style={{ color: "#5E72E4", marginLeft: 20 }}>Ratings</Text>
          <Text style={{ color: "#5E72E4", marginLeft: 5 }}>Earnings</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("RunProfile")}
          >
            <Text style={{ color: "#5E72E4" }}>Account</Text>
          </TouchableOpacity>
        </Block>
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
