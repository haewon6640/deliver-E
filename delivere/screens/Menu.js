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
  constructor(props){
    super(props);
    this.state={
      displayAddCart: false
    };
    this.addCart=this.addCart.bind(this);
  }

  addCart = () => {
    this.setState({
      displayAddCart: true
    });
  }

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

    // if (this.state.displayAddCart){
    //   return(
    //     <Block middle>
    //       <Block row middle style={[styles.button,{position: 'absolute', bottom: 20}]}>
    //         <Text style={{fontSize: 20, color:"white"}}>Add to Cart</Text>
    //       </Block>
    //     </Block>
    //   );
    // }

    const List = Object.keys(foodMap).map(data => {
      return (
        <Block>
          <Text style={styles.category}>{data}</Text>
          {foodMap[data].map((item, i) => {
            return (
              <MenuItem
                addCart={this.addCart}
                name={item.name}
                pricecal={"$" + item.price + " - " + item.cal + " cal"}
              />
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

    let addCartButton = (
      <Block row middle style={styles.button1}>
        <Text style={{fontSize: 20, color:"white"}}>Add to Cart</Text>
      </Block>
    );

    return (
      <View style={{flex: 1}}>
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
        <TouchableOpacity>
          <Block row style={styles.instrc}>
            <Text style={styles.text}>Special Instructions</Text>
            <Icon style={{position: 'absolute', right: 20, marginTop: 25 }} name="right" family="AntDesign" size={20} color="#5E72E4" />
          </Block>
        </TouchableOpacity>
        <Block middle>
          <Block row middle space='around' style={styles.button}>
            <TouchableOpacity>
              <Icon name="minus" family="AntDesign" size={20} color="white" />
            </TouchableOpacity>
            <Text style={{fontSize: 20, color:"white"}}>1</Text>
            <TouchableOpacity>
              <Icon name="plus" family="AntDesign" size={20} color="white" />
            </TouchableOpacity>
          </Block>
        </Block>
      </ScrollView>
      <Block style={{position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center'}}>
        {this.state.displayAddCart ? addCartButton : null}
      </Block>
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
    paddingLeft: 10,
  },
  button:{
    backgroundColor: "#5E72E4",
    borderRadius: 80,
    height: 50,
    width: 200,
    marginTop: 20,
    marginBottom: 80
  },
  button1:{
    backgroundColor: "#5E72E4",
    borderRadius: 80,
    height: 50,
    width: 200,
    marginTop: 20,
    marginBottom: 20
  }
});
