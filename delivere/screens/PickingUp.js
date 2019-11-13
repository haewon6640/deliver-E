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
  PanResponder
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Button, Block, Icon } from "galio-framework";
const { width, height } = Dimensions.get("window");
import normalize from "react-native-normalize";

export default class PickingUp extends React.Component {
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
    draggableRange: { top: 0.7 * height + normalize(80), bottom: 250 }
  };

  _draggedValue = new Animated.Value(180);
  _onGrant() {
    this.setState({ dragPanel: false });
    return true;
  }

  _onRelease() {
    this.setState({ dragPanel: true });
  }

  render() {
    const { navigation } = this.props;
    var restaurant = navigation.getParam("restaurant");
    var eater = navigation.getParam("eater");
    var order = navigation.getParam("order");
    const itemList = order["items"].map((item, j) => {
      return (
        <Text key={j} style={styles.text}>
          {item.name + " " + item.type + " $ " + item.price}
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
                    paddingLeft: 8,
                    marginBottom: 15
                  }}
                >
                  <Text style={styles.textHeader}>{order["rName"]}</Text>
                  <Text
                    style={[
                      styles.textHeader,
                      { marginTop: 5, marginBottom: 10, fontSize: 17 }
                    ]}
                  >
                    {restaurant["location"]}
                  </Text>
                  <TouchableOpacity>
                    <Block
                      style={{
                        width: normalize(180),
                        height: normalize(50),
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
                        style={{ fontSize: 20, color: "white", marginLeft: 10 }}
                      >
                        Directions
                      </Text>
                    </Block>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#c9bfbf",
                    paddingBottom: 25,
                    marginBottom: 15
                  }}
                >
                  <Text style={styles.category}>Customer</Text>
                  <Text style={styles.text}>{eater.name}</Text>
                  <Block
                    row
                    style={{
                      alignItems: "center",
                      paddingLeft: 10,
                      paddingTop: 20
                    }}
                  >
                    <TouchableOpacity>
                      <Block
                        style={{
                          width: 0.27 * width,
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
                          size={normalize(25)}
                          color="#5E72E4"
                        />
                        <Text
                          style={{ fontSize: normalize(17), color: "#5E72E4" }}
                        >
                          Call
                        </Text>
                      </Block>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: normalize(12) }}>
                      <Block
                        style={{
                          width: 0.27 * width,
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
                          size={normalize(25)}
                          color="#5E72E4"
                        />
                        <Text
                          style={{
                            fontSize: normalize(17),
                            color: "#5E72E4",
                            marginLeft: 8
                          }}
                        >
                          Text
                        </Text>
                      </Block>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: normalize(12) }}>
                      <Block
                        style={{
                          width: 0.27 * width,
                          height: 50,
                          borderRadius: 100,
                          borderWidth: 1,
                          borderColor: "#c9bfbf"
                        }}
                        row
                        middle
                      >
                        <Icon
                          name="email"
                          family="MaterialIcons"
                          size={normalize(25)}
                          color="#5E72E4"
                        />
                        <Text
                          style={{
                            fontSize: normalize(17),
                            color: "#5E72E4",
                            marginLeft: 8
                          }}
                        >
                          Email
                        </Text>
                      </Block>
                    </TouchableOpacity>
                  </Block>
                </View>
                <View>
                  <Text style={styles.category}>Order</Text>
                  {/* <Text style={styles.text}>2 Items:</Text> */}
                  {itemList}
                  <Text style={styles.text}>{"$" + order.subtotal}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </SlidingUpPanel>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("AfterArrival", {
              eater: eater,
              restaurant: restaurant,
              order: order
            })
          }
          style={styles.button}
        >
          {/* <Block row> */}
          {/* <Icon name="right" family="AntDesign" size={20} color="white" /> */}
          <Text style={{ color: "white", fontSize: 25 }}>After arrival</Text>
          {/* </Block> */}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  panel: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 0.7 * height,
    backgroundColor: "white",
    width: width
  },
  panelHeader: {
    borderRadius: 20,
    backgroundColor: "white",
    paddingLeft: normalize(13),
    padding: 10
  },
  textHeader: {
    fontSize: 28,
    color: "#466199"
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
