import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Image,
  ImageBackground
} from "react-native";
import { Button, Block, Icon } from "galio-framework";
import { HeaderBackButton } from "react-navigation";
import { style } from "../constants/Styles";
const { width, height } = Dimensions.get("window");
import Restaurant from "../backend/Restaurant";
import Eater from "../backend/Eater";
import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();

export default class MyOrders extends React.Component {
  state = {
    ids: this.props.navigation.getParam("ids"),
    orders: this.props.navigation.getParam("acceptedOrders")
  };

  setIdsArr = () => {
    if (this.props.navigation.getParam("id"))
      pressed(this.props.navigation.getParam("id"));
    this.props.navigation.setParams({
      idsArr: this.state.ids
    });
    this.props.navigation.setParams({ ident: 0 });
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "didFocus",
      this.setIdsArr
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerLeft: (
        <HeaderBackButton
          {...params}
          onPress={() => {
            navigation.state.params.onGoBack(navigation.getParam("idsArr"));
            navigation.goBack();
          }}
        />
      )
    };
  };

  updateOrder(oid) {
    var orderRef = dbh.collection("Order").doc(oid);
    orderRef.update({
      progress: 0.25
    });
  }

  async queryPickupInfo(order, i) {
    this.updateOrder(order.oid);
    let restaurant = await new Restaurant().queryRestaurant(order.rName);
    let eater = await new Eater().getEaterfromEmail(order.eaterEmail);
    const nav = this.props.navigation;
    const state = this.state;
    switch (state.ids[i].navIndex) {
      case 0:
        nav.navigate("PickingUp", {
          id: order.oid,
          eater: eater,
          restaurant: restaurant,
          order: order
        });
        break;
      case 1:
        nav.navigate("AfterArrival", {
          id: order.oid,
          eater: eater,
          restaurant: restaurant,
          order: order
        });
        break;
      case 2:
        nav.navigate("Delivering", {
          id: order.oid,
          eater: eater,
          restaurant: restaurant,
          order: order
        });
        break;
    }
  }

  render() {
    const state = this.state;
    const nav = this.props.navigation;
    const navI = nav.getParam("navIndex");
    const id = nav.getParam("id");

    let orderList = state.orders.map(order => {
      return (
        <TouchableOpacity
          key={order.oid}
          style={style.listItem}
          onPress={() => pressed(order.oid)}
        >
          <Text style={style.category}>{order.rName}</Text>
          {/* <Text style={styles.text}>{order.location}</Text> */}
        </TouchableOpacity>
      );
    });

    pressed = key => {
      let i;
      for (i = 0; i < state.ids.length; i++) {
        if (state.ids[i].id == key) {
          //find the right order in state.ids array
          if (id == key) {
            let array = state.ids;
            array[i].navIndex = navI;
            this.setState({ ids: array });
          }
          break;
        }
      }

      if (i == state.ids.length) {
        let array = state.ids;
        array.push({ id: key, navIndex: 0 });
        this.setState({ ids: array });
        i = state.ids.length - 1;
      }

      let j;
      for (j = 0; j < state.orders.length; j++) {
        if (state.orders[j].oid == key) {
          //find the right order in state.orders array
          break;
        }
      }

      if (nav.getParam("ident") == 0) this.queryPickupInfo(state.orders[j], i);
    };

    return (
      <ScrollView>
        <Text style={style.title}>My Orders</Text>
        {orderList}
      </ScrollView>
    );
  }
}
