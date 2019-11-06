import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Button, Block, Icon } from "galio-framework";
const { width, height} = Dimensions.get("window");

export default class Checkout extends React.Component {
  static defaultProps = {
    draggableRange: { top: height - 60, bottom: 250 }
  };

  _draggedValue = new Animated.Value(180);

  render() {
    return (
      <View style={styles.container}>
      <Image source={require("../assets/emorymap.png")} style={{
            alignSelf: 'center'}}
          />
      <SlidingUpPanel
        ref={c => (this._panel = c)}
        draggableRange={this.props.draggableRange}
        animatedValue={this._draggedValue}
        height={height + 180}
        friction={0.5}>
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.textHeader}>Twisted Taco</Text>
            <Text style={[styles.textHeader, {marginTop: 5, marginBottom: 8, fontSize: 17}]}>Cox Hall: 569 Asbury Cir, Atlanta, GA 30322</Text>
            <Button style={{width: 150}}>Directions</Button>
            <Text>Customer</Text>
            <Text>John J.</Text>
            <Text>Order Details</Text>
            <Text>2 Items</Text>
          </View>
          <View style={styles.container}>
            <Text>Order Details</Text>
          </View>
        </View>
      </SlidingUpPanel>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('AfterArrival')} style={styles.button}>
        {/* <Block row> */}
          {/* <Icon name="right" family="AntDesign" size={20} color="white" /> */}
          <Text style={{color:"white", fontSize: 25}}>After arrival</Text>
        {/* </Block> */}
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  panelHeader: {
    height: 180,
    backgroundColor: "white",
    padding: 24,
  },
  textHeader: {
    fontSize: 28,
    color: "#466199"
  },
  progBar:{
    marginTop: 20
  },
  button:{
    position: 'absolute',
    bottom: 0,
    height: 80,
    backgroundColor: "#5E72E4",
    width: width,
    alignItems: 'center',
    paddingTop: 20
  }
});
