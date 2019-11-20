import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Block, Icon } from "galio-framework";
import MenuItem from "../components/MenuItem";
const { width, height } = Dimensions.get("window");
import normalize from "react-native-normalize";
import Popup from "../components/Popup";
import firebase from "../components/firebase";
import "@firebase/firestore";
import { reset } from "expo/build/AR";
const db = firebase.firestore();

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenItems: [],
      cartVisible: false,
      foodVisible: false,
      count: 1,
      name: "",
      price: "",
      type: "",
      instruction: ""
    };
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
    this.addList = this.addList.bind(this);
    this.foodPopup = this.foodPopup.bind(this);
    this.setInfoAndPopup = this.setInfoAndPopup.bind(this);
  }

  plus = prev => {
    this.setState({ count: prev + 1 });
  };

  minus = prev => {
    if (prev > 1) this.setState({ count: prev - 1 });
  };

  foodPopup = () => {
    this.setState({ foodVisible: !this.state.foodVisible });
  };

  setInfoAndPopup = (name, price, type) => {
    this.setState({
      name: name,
      price: price,
      type: type,
      foodVisible: !this.state.foodVisible
    });
  };

  addList = (name, price, type, count, instruction) => {
    this.state.chosenItems.push({
      name: name,
      price: price,
      type: type,
      count: count,
      instruction: instruction
    });
    this.setState({
      cartVisible: true,
      foodVisible: !this.state.foodVisible,
      count: 1,
      instruction: ""
    });
  };

  render() {
    const { navigation } = this.props;
    const rName = navigation.getParam("rName");
    const rCategory = navigation.getParam("rCategory");
    const rRating = navigation.getParam("rRating");
    const rRateCount = navigation.getParam("rRateCount");
    const foodMap = navigation.getParam("foodMap");

    const List = Object.keys(foodMap).map((data, i) => {
      return (
        <Block key={i}>
          <Text style={styles.category}>{data}</Text>
          {foodMap[data].map((item, j) => {
            return (
              <TouchableOpacity
                key={j}
                onPress={() =>
                  this.setInfoAndPopup(item.name, item.price, data)
                }
              >
                <Block style={styles.item}>
                  <Text style={{ fontSize: 17, color: "#466199" }}>
                    {item.name} ${item.price} - {item.cal} cal
                  </Text>
                </Block>
              </TouchableOpacity>
              // <MenuItem
              //   key={j}
              //   addList={this.addList}
              //   addCart={this.addCartButton}
              //   name={item.name}
              //   price={item.price}
              //   cal={item.cal}
              //   type={data}
              //   pricecal={"$" + item.price + " - " + item.cal + " cal"}
              // />
            );
          })}
        </Block>
      );
    });

    addCart = (
      <TouchableOpacity
        onPress={() => {
          this.addList(
            this.state.name,
            this.state.price,
            this.state.type,
            this.state.count,
            this.state.instruction
          );
        }}
      >
        <Block row middle style={styles.button}>
          <Text style={{ fontSize: 20, color: "white" }}>Add to Cart</Text>
        </Block>
      </TouchableOpacity>
    );

    viewCart = (
      <Block
        style={{ position: "absolute", bottom: 0, left: "25%", right: "25%" }}
      >
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Cart", {
              items: this.state.chosenItems,
              rName: rName
            })
          }
        >
          <Block row middle style={[styles.button, { marginBottom: 40 }]}>
            <Text style={{ fontSize: 20, color: "white" }}>View Cart</Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );

    let pic;

    if (rName == "Twisted Taco") {
      pic = (
        <Image
          source={require("../assets/twistedtaco.jpg")}
          style={{ width: width, height: normalize(190) }}
        />
      );
    } else if (rName == "Maru") {
      pic = (
        <Image
          source={require("../assets/ricebowl.jpg")}
          style={{ width: width, height: normalize(190) }}
        />
      );
    }

    return (
      <View style={{ flex: 1, width: width }}>
        <ScrollView>
          {pic}
          <Block style={styles.header}>
            <Text style={styles.name}>{rName}</Text>
            <Block row>
              <Text style={styles.text}>{rCategory}</Text>
              <Text style={styles.rating}>{rRating}</Text>
              <Icon name="star" family="Entypo" size={20} color="#5E72E4" />
              <Text style={{ fontSize: 17, color: "#466199", paddingLeft: 5 }}>
                ({rRateCount} ratings)
              </Text>
            </Block>
            <Text style={styles.text}>5-10 Min</Text>
          </Block>
          {List}
          <Block style={{ height: 100 }} />
        </ScrollView>
        <Popup visible={this.state.foodVisible} style="small">
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <Block
              style={{
                height: 0.6 * height,
                width: 0.8 * width,
                backgroundColor: "white",
                borderWidth: 1
              }}
            >
              <TouchableOpacity onPress={this.foodPopup}>
                <Icon
                  style={{ marginLeft: width * 0.02, marginTop: height * 0.02 }}
                  name="close"
                  family="AntDesign"
                  size={30}
                  color="#5E72E4"
                />
              </TouchableOpacity>
              <TextInput
                multiline={true}
                style={{
                  alignSelf: "center",
                  height: 0.3 * height,
                  width: 0.7 * width,
                  padding: width * 0.05,
                  borderColor: "gray",
                  borderWidth: 1
                }}
                placeholder="Special instructions"
                onSubmitEditing={event =>
                  this.setState({ instruction: event.nativeEvent.text })
                }
              />
              <Block middle>
                <Block row middle space="around" style={styles.button}>
                  <TouchableOpacity
                    onPress={() => this.minus(this.state.count)}
                  >
                    <Icon
                      name="minus"
                      family="AntDesign"
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 20, color: "white" }}>
                    {this.state.count}
                  </Text>
                  <TouchableOpacity onPress={() => this.plus(this.state.count)}>
                    <Icon
                      name="plus"
                      family="AntDesign"
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                </Block>
                {addCart}
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </Popup>
        {this.state.cartVisible ? viewCart : null}
      </View>
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
  item: {
    flex: 1,
    justifyContent: "center",
    height: 80,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: "#d6d7da"
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
  },
  instrc: {
    flex: 1,
    height: 60,
    paddingTop: 25,
    paddingLeft: 10
  },
  button: {
    backgroundColor: "#5E72E4",
    borderRadius: 80,
    height: 50,
    width: width * 0.5,
    marginTop: 20,
    marginBottom: 20
  }
});
