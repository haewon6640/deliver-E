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
import Order from "../backend/Order";
const dbh = firebase.firestore();

export default class MyOrders extends React.Component {
  state = {
    valid: false,
    ids: this.props.navigation.getParam("ids"),
    orders: [
      // {
      //   oid: "",
      //   rName: "",
      //   progress: 0
      // }
    ]
  };

  componentDidMount() {}

  componentWillUnmount() {}

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerLeft: (
        <HeaderBackButton
          tintColor="#5E72E4"
          backTitleVisible={true}
          {...params}
          onPress={() => {
            navigation.state.params.onGoBack(navigation.getParam("idsArr"));
            navigation.goBack();
          }}
        />
      )
    };
  };

  async queryPickupInfo(oid) {
    let order = await new Order().queryOrder(oid);
    let restaurant = await new Restaurant().queryRestaurant(order.rName);
    let eater = await new Eater().getEaterfromEmail(order.eaterEmail);
    const nav = this.props.navigation;
    if (order.progress == 0.25) {
      nav.navigate("PickingUp", {
        id: order.oid,
        eater: eater,
        restaurant: restaurant,
        order: order
      });
    } else if (order.progress == 0.5) {
      nav.navigate("AfterArrival", {
        id: order.oid,
        eater: eater,
        restaurant: restaurant,
        order: order
      });
    } else if (order.progress == 0.75) {
      nav.navigate("Delivering", {
        id: order.oid,
        eater: eater,
        restaurant: restaurant,
        order: order
      });
    } else if (order.progress == 1) {
    }
  }

  queryOrder = async () => {
    newOrders = await new Order().queryMyOrders();
    this.setState({ orders: newOrders, valid: true });
  };

  render() {
    if (!this.state.valid) {
      this.queryOrder();
    }
    const state = this.state;
    const nav = this.props.navigation;
    const navI = nav.getParam("navIndex");
    const id = nav.getParam("id");
    let orderList = state.orders.map(order => {
      const count = order["items"].reduce((total, item) => {
        return total + item.count;
      }, 0);
      var Items = "items";
      if (count == 1) Items = "item";
      const countString = count + " " + Items;
      return (
        <TouchableOpacity
          key={order.oid}
          style={style.listItem}
          onPress={() => this.queryPickupInfo(order.oid)}
        >
          <Text style={[style.category, { paddingBottom: 4 }]}>
            {order.cName}
          </Text>
          <Text style={style.category}>{order.rName}</Text>
          <Text style={style.text}>{order.building}</Text>
          <Text style={style.text}>{countString}</Text>
          <Text style={style.text}>
            ${(order.subtotal + order.tax).toFixed(2)}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView>
        <Text style={style.title}>My Orders</Text>
        {orderList}
        <Block style={{ height: 100 }} />
      </ScrollView>
    );
  }
}
