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
import { style } from "../constants/Styles"
const { width, height } = Dimensions.get("window");
import Restaurant from "../backend/Restaurant";
import Eater from "../backend/Eater";
import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();
let orderList;

// class Header extends React.Component {
//   render() {
//     return (
//       <View>
//         <Block style={styles.header}>
          
//         </Block>
//       </View>
//     );
//   }
// }

export default class PendingOrders extends React.Component {

  constructor(props){
    super(props);
    this.state = {orders: this.props.navigation.getParam("orders"), acceptedOrders: [], ids: []};
    this.editList = this.editList.bind(this);
  }

  setIds = (Ids) => {
    this.setState({ids: Ids})
  }

  editList = (order, key) => {
    this.state.acceptedOrders.push(order);
    let array = [...this.state.orders];
    array.splice(key, 1)
    this.setState({orders: array});
  }

  render() {
    const nav = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text style={style.title}>Pending Orders</Text>
          {this.state.orders.map((order, i) => {
            return (
              <TouchableOpacity
                key = {i}
                style={style.listItem}
                onPress={() => nav.navigate("AcceptPopup", {onGoBack: this.editList, order: order, key: i})}
              >
                <Text style={style.category}>{order.rName}</Text>
                {/* <Text style={style.text}>{order.location}</Text> */}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Block
          style={{ position: "absolute", bottom: 20, left: "20%", right: "20%" }}
        >
          <TouchableOpacity
            onPress={() => nav.navigate("MyOrders", {onGoBack: this.setIds, ident: 0, ids: this.state.ids, acceptedOrders: this.state.acceptedOrders})}
          >
            <Block middle style={style.button}>
              <Text style={style.whiteText}>View Accepted Orders</Text>
            </Block>
          </TouchableOpacity>
        </Block>    
      </View>  
    );
  }
}