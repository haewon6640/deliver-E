import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Button
} from "react-native";
import { RNSlidingButton, SlideDirection } from "rn-sliding-button";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Block, Icon } from "galio-framework";
import { style } from "../constants/Styles";
import normalize from "react-native-normalize";
const { width, height } = Dimensions.get("window");
import firebase from "../components/firebase";
import "@firebase/firestore";
import { Linking } from "expo";

const dbh = firebase.firestore();

export default class Delivering extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dragPanel: true };

    this._onGrant = this._onGrant.bind(this);
    this._onRelease = this._onRelease.bind(this);

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this._onGrant,
      onPanResponderRelease: this._onRelease,
      onPanResponderTerminate: this._onRelease
    });
  }

  static defaultProps = {
    draggableRange: { top: 0.7 * height + normalize(80), bottom: 380 }
  };

  _draggedValue = new Animated.Value(180);

  _onGrant() {
    this.setState({ dragPanel: false });
    return true;
  }

  _onRelease() {
    this.setState({ dragPanel: true });
  }

  updateOrder(order) {
    var orderRef = dbh.collection("Order").doc(order.oid);
    orderRef.update({
      progress: 1
    });
  }

  afterDelivery = order => {
    this.updateOrder(order);
    this.props.navigation.navigate("MyOrders", {
      // eater: eater,
      // restaurant: restaurant,
      // order: order,
      // id: id
    });
  };

  render() {
    const { navigation } = this.props;
    var restaurant = navigation.getParam("restaurant");
    var eater = navigation.getParam("eater");
    var order = navigation.getParam("order");
    var instruct = order.instructions;
    const id = this.props.navigation.getParam("id");
    const itemList = order["items"].map((item, j) => {
      return (
        <Text key={j} style={styles.text}>
          {item.count +
            " " +
            item.name +
            " " +
            item.type +
            ": $" +
            item.price.toFixed(2)}
        </Text>
      );
    });

    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/emorymap.png")}
          style={{
            alignSelf: "center"
          }}
        />
        <SlidingUpPanel
          allowDragging={this.state.dragPanel}
          ref={c => (this._panel = c)}
          draggableRange={this.props.draggableRange}
          animatedValue={this._draggedValue}
          height={height + 180}
          friction={0.5}
        >
          <View style={styles.panel}>
            <Block
              style={{
                alignSelf: "center",
                backgroundColor: "#d3d1d1",
                height: 8,
                width: 50,
                marginTop: 15,
                marginBottom: 2,
                borderRadius: 100
              }}
            />
            <ScrollView {...this._panResponder.panHandlers}>
              <View style={styles.panelHeader}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#c9bfbf",
                    paddingBottom: 30,
                    marginBottom: 15
                  }}
                >
                  <Text style={styles.textHeader}>{eater.name}</Text>
                  <Text
                    style={[
                      styles.textHeader,
                      { marginTop: 5, marginBottom: 20, fontSize: 17 }
                    ]}
                  >
                    White Hall: 301 Dowman Dr, Atlanta, GA 30307
                  </Text>
                  <Block row>
                    <TouchableOpacity>
                      <Block
                        style={{
                          width: 0.4 * width,
                          height: 50,
                          backgroundColor: "#5E72E4",
                          borderRadius: 100
                        }}
                        row
                        middle
                      >
                        <Icon
                          name="directions"
                          family="FontAwesome5"
                          size={30}
                          color="white"
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            color: "white",
                            marginLeft: 10
                          }}
                        >
                          Directions
                        </Text>
                      </Block>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 20 }}>
                      <Block
                        style={{
                          width: 60,
                          height: 50,
                          borderRadius: 100,
                          borderWidth: 1,
                          borderColor: "#c9bfbf"
                        }}
                        row
                        middle
                      >
                        <Icon
                          name="phone"
                          family="Entypo"
                          size={30}
                          color="#5E72E4"
                        />
                      </Block>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 20 }}>
                      <Block
                        style={{
                          width: 60,
                          height: 50,
                          borderRadius: 100,
                          borderWidth: 1,
                          borderColor: "#c9bfbf"
                        }}
                        row
                        middle
                      >
                        <Icon
                          name="chat"
                          family="Entypo"
                          size={30}
                          color="#5E72E4"
                        />
                      </Block>
                    </TouchableOpacity>
                  </Block>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#c9bfbf",
                    paddingBottom: 15,
                    marginBottom: 15
                  }}
                >
                  <Text style={styles.category}>Upon Arrival</Text>
                  <Text style={styles.text}>{instruct}</Text>
                  <Block
                    row
                    style={{
                      alignItems: "center",
                      paddingLeft: 15,
                      paddingTop: 20
                    }}
                  ></Block>
                </View>
                <View>
                  <Text style={styles.category}>Order</Text>
                  {itemList}
                </View>
              </View>
            </ScrollView>
          </View>
        </SlidingUpPanel>
        <TouchableOpacity
          // onSlidingSuccess={() =>
          onPress={() => this.afterDelivery(order)}
          style={styles.button}
          // height={normalize(80)}
          // slideDirection={SlideDirection.RIGHT}
        >
          {/* <View> */}
          {/* <Block row> */}
          {/* <Icon name="right" family="AntDesign" size={20} color="white" /> */}
          <Text style={{ color: "white", fontSize: 25 }}>After delivery</Text>
          {/* </Block> */}
          {/* </View> */}
          {/* </RNSlidingButton> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "absolute", right: 15, top: 4 }}
          onPress={() => {
            this.props.navigation.navigate("MyOrders", {
              navIndex: 2,
              id: id,
              ident: 1
            });
          }}
        >
          <Block
            middle
            style={{
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              shadowOpacity: 0.1,
              elevation: 2,
              borderRadius: 10,
              height: 85,
              aspectRatio: 0.8,
              backgroundColor: "white"
            }}
          >
            <Icon
              name="text-document"
              family="Entypo"
              size={50}
              color="#5E72E4"
            />
            <Text style={[style.text, { paddingLeft: 0, fontSize: 14 }]}>
              Orders
            </Text>
          </Block>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center"
  },
  panel: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 0.7 * height,
    backgroundColor: "white"
  },
  panelHeader: {
    borderRadius: 20,
    backgroundColor: "white",
    paddingLeft: normalize(20),
    padding: 10
  },
  textHeader: {
    fontSize: 28,
    color: "#466199"
  },
  progBar: {
    marginTop: 20
  },
  button: {
    position: "absolute",
    bottom: 0,
    height: normalize(80),
    backgroundColor: "#5E72E4",
    width: width,
    alignItems: "center",
    paddingTop: 20
  },
  text: {
    fontSize: 20,
    color: "#466199",
    paddingLeft: 15
  },
  category: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 8,
    fontSize: 25,
    color: "#1f396e"
  }
});
