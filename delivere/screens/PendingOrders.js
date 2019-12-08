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
import Popup from "../components/Popup";
import AcceptPopup from "../components/AcceptPopup";
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
    this.state = {orders: this.props.navigation.getParam("orders"), acceptedOrders: [], ids: [], acceptCount: 0,
      order: {}, key: null, acceptVisible: false};
    this.editList = this.editList.bind(this);
    this.checkToAccept = this.checkToAccept.bind(this);
    this.acceptPopup = this.acceptPopup.bind(this);
  }

  setIds = (Ids) => {
    this.setState({ids: Ids})
  }

  acceptPopup = () => {
    this.setState({ acceptVisible: !this.state.acceptVisible });
  };

  checkToAccept = (order, key) => {
    this.setState({acceptCount: ++this.state.acceptCount})
    if (this.state.acceptCount > 4){
      alert("Limit of 4 orders at a time");
      return;
    }
    dbh.collection("Order").doc(order.oid).get()
      .then(doc => {
        if (doc.data().isAccepted){
          alert("Order taken by another runner");
          let array = [...this.state.orders];
          array.splice(key, 1)
          this.setState({orders: array});
          navCheck = false;
        }
        else{
          this.acceptPopup();
          this.setState({order: order});
          this.setState({key: key});
        }
          // this.props.navigation.navigate("AcceptPopup", { order: order, key: key})
      })
      .catch(err =>{
        alert(err.toString());
      })
  }

  editList = (order, key) => {
    this.state.acceptedOrders.push(order);
    var orderRef = dbh.collection("Order").doc(order.oid);
    // orderRef.update({
    //   isAccepted: true
    // })
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
            if (!order.isAccepted)
              return (
                <TouchableOpacity
                  key = {i}
                  style={style.listItem}
                  onPress={() => {
                    this.checkToAccept(order, i);
                    }}
                >
                  <Text style={style.category}>{order.rName}</Text>
                  {/* <Text style={style.text}>{order.location}</Text> */}
                </TouchableOpacity>
              );
           })
          }
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
          <Popup
            visible = {this.state.acceptVisible}
            style = "small"
          >
            <AcceptPopup order={this.state.order} id={this.state.key} 
              acceptPopup={this.acceptPopup} editList={this.editList}/>
          </Popup>
        </Block>    
      </View>  
    );
  }
}