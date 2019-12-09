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
import { style } from "../constants/Styles";
const { width, height } = Dimensions.get("window");
import Popup from "../components/Popup";
import AcceptPopup from "../components/AcceptPopup";
import Restaurant from "../backend/Restaurant";
import Eater from "../backend/Eater";
import firebase from "../components/firebase";
import "@firebase/firestore";
import Order from "../backend/Order";
import Runner from "../backend/Runner";
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
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      orders: [
        // {
        //   oid: "",
        //   rName: ""
        // }
      ],
      acceptedOrders: [],
      ids: [],
      acceptCount: 0,
      order: {},
      key: null,
      acceptVisible: false,
      runEmail: ""
    };
    this.editList = this.editList.bind(this);
    this.checkToAccept = this.checkToAccept.bind(this);
    this.acceptPopup = this.acceptPopup.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  setIds = Ids => {
    this.setState({ ids: Ids });
  };

  acceptPopup = () => {
    this.setState({ acceptVisible: !this.state.acceptVisible });
  };

  resetOrderState = async () => {
    newOrders = await new Order().queryUnpickedOrders();
    this.setState({ orders: newOrders, valid: true });
  };
  checkToAccept = async (order, key) => {
    this.setState({ acceptCount: ++this.state.acceptCount });
    if (this.state.acceptCount > 4) {
      alert("Limit of 4 orders at a time");
      return;
    }
    dbh
      .collection("Order")
      .doc(order.oid)
      .get()
      .then(
        function(doc) {
          if (doc.data().isAccepted) {
            this.resetOrderState();
            navCheck = false;
            alert("Order taken by another runner");
          } else {
            this.setState({ order: order, key: key });
            this.acceptPopup();
          }
          // this.props.navigation.navigate("AcceptPopup", { order: order, key: key})
        }.bind(this)
      )
      .catch(err => {
        alert(err.toString());
      });
  };

  editList = async (order, key) => {
    this.state.acceptedOrders.push(order);
    var orderRef = dbh.collection("Order").doc(order.oid);

    const runEmail = await new Runner().getCurrentRunnerEmail();
    orderRef.update({
      isAccepted: true,
      runnerEmail: runEmail
    });

    const runnerName = await new Runner().getCurrentRunner();
    orderRef.update({
      runName: runnerName.name
    });

    this.resetOrderState();
  };

  render() {
    const nav = this.props.navigation;
    if (!this.state.valid) {
      this.resetOrderState();
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text style={style.title}>Pending Orders</Text>
          {this.state.orders.map((order, i) => {
            const count = order["items"].reduce((total, item) => {
              return total + item.count;
            }, 0);
            var Items = "items";
            if (count == 1) Items = "item";
            const countString = count + " " + Items;
            if (!order.isAccepted)
              return (
                <TouchableOpacity
                  key={i}
                  style={style.listItem}
                  onPress={() => {
                    this.checkToAccept(order, i);
                  }}
                >
                  <Text style={style.category}>{order.rName}</Text>
                  <Text style={style.text}>{order.building}</Text>
                  <Text style={style.text}>{countString}</Text>
                  <Text style={style.text}>
                    ${(order.subtotal + order.tax).toFixed(2)}
                  </Text>
                </TouchableOpacity>
              );
          })}
          <Block style={{ height: 100 }} />
        </ScrollView>
        <Block
          style={{
            position: "absolute",
            bottom: 20,
            left: "20%",
            right: "20%"
          }}
        >
          <TouchableOpacity
            onPress={() =>
              nav.navigate("MyOrders", {
                onGoBack: this.setIds,
                ident: 0,
                ids: this.state.ids,
                acceptedOrders: this.state.acceptedOrders
              })
            }
          >
            <Block middle style={style.button}>
              <Text style={style.whiteText}>View Accepted Orders</Text>
            </Block>
          </TouchableOpacity>
          <Popup visible={this.state.acceptVisible} style="small">
            <AcceptPopup
              order={this.state.order}
              id={this.state.key}
              acceptPopup={this.acceptPopup}
              editList={this.editList}
            />
          </Popup>
        </Block>
      </View>
    );
  }
}
