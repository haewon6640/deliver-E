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
import { Block, Icon } from "galio-framework";
import MenuItem from "../components/MenuItem";
const { width } = Dimensions.get("window");
import normalize from "react-native-normalize";

import firebase from "../components/firebase";
import "@firebase/firestore";
const db = firebase.firestore();

export default class Menu extends React.Component {
  render() {
    const { navigation } = this.props;
    const rName = navigation.getParam("rName");
    const rCategory = navigation.getParam("rCategory");
    const rRating = navigation.getParam("rRating");
    const rRateCount = navigation.getParam("rRateCount");
    const foodMap = navigation.getParam("foodMap");
    var fCategories = [];

    // Object.keys(foodMap).forEach(function(key) {
    //   foodMap[key].map(item => {
    //     alert(item.name);
    //     return (
    //       <MenuItem
    //         name={item.name}
    //         pricecal={"$" + item.price + " - " + item.cal}
    //       />
    //     );
    //   });
    //   fCategories.push(key);
    // });

    const List = Object.keys(foodMap).map(data => {
      return (
        <Block>
          <Text style={styles.category} >{data}</Text>
          {foodMap[data].map(item => {
            return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Cart")}>
              <MenuItem
                name={item.name}
                pricecal={"$" + item.price + " - " + item.cal + " cal"}
              />
              </TouchableOpacity>
            );
          })}
        </Block>
      );
    });

    const categoriesArray = fCategories.map(data => {
      return (
        <Block>
          <Text style={styles.category}>{data}</Text>
        </Block>
      );
    });
    return (
      <ScrollView>
        <Image
          source={require("../assets/twistedtaco.jpg")}
          style={{ width: width, height: normalize(190) }}
        />
        <Block style={styles.header}>
          <Text style={styles.name}>{rName}</Text>
          <Block row>
            <Text style={styles.text}>{rCategory}</Text>
            <Text style={styles.rating}>{rRating}</Text>
            <Icon name="star" family="AntDesign" size={20} color="#5E72E4" />
            <Text style={{ fontSize: 17, color: "#466199", paddingLeft: 5 }}>
              ({rRateCount} ratings)
            </Text>
          </Block>
          <Text style={styles.text}>5-10 Min</Text>
        </Block>
        {/* <Text style={styles.category}>Featured Items</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Customize")}
        > */}
        {/* <MenuItem name="Taco Combo" pricecal="$7.49" />
        </TouchableOpacity>
        <MenuItem name="Chips and Salsa" pricecal="$2.19 - 450 cal" /> */}
        <Block>{List}</Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 140,
    width: width,
    borderBottomWidth: 1,
    borderBottomColor: "#8e8383"
  },
  name: {
    paddingLeft: 25,
    paddingTop: 20,
    paddingBottom: 15,
    fontSize: 30,
    color: "#1f396e"
  },
  text: {
    fontSize: 17,
    color: "#466199",
    paddingLeft: 30
  },
  rating: {
    paddingLeft: 60,
    paddingRight: 5,
    paddingBottom: 8,
    fontSize: 17,
    color: "#466199"
  },
  category: {
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 8,
    fontSize: 20,
    color: "#1f396e"
  }
});
