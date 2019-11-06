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

export default class PickingUp extends React.Component {
  static defaultProps = {
    draggableRange: { top: height - 100, bottom: 250 }
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
            <Block style={{alignSelf:'center', backgroundColor: '#d3d1d1', height: 8, width: 50, marginBottom: 13, borderRadius: 100}}/>
            <View style={{borderBottomWidth: 1, borderBottomColor:'#c9bfbf', paddingBottom: 30, marginBottom: 15}}>
              <Text style={styles.textHeader}>Twisted Taco</Text>
              <Text style={[styles.textHeader, {marginTop: 5, marginBottom: 20, fontSize: 17}]}>Cox Hall: 569 Asbury Cir, Atlanta, GA 30322</Text>
              <TouchableOpacity>
                <Block style={{width: 180, height: 50, backgroundColor: '#5E72E4', borderRadius: 100}} row middle>
                  <Icon name="directions" family="FontAwesome5" size={30} color="white" />
                  <Text style={{fontSize: 20, color:'white', marginLeft: 10}}>Directions</Text>
                </Block>
              </TouchableOpacity>
            </View>
            <View style={{borderBottomWidth: 1, borderBottomColor:'#c9bfbf', paddingBottom: 25, marginBottom: 15}}>
              <Text style={styles.category}>Customer</Text>
              <Text style={styles.text}>John J.</Text>
              <Block row style={{alignItems:'center', paddingLeft: 15, paddingTop: 20}}>
                <TouchableOpacity>
                  <Block style={{width: 120, height: 50, borderRadius: 100, borderWidth: 1, borderColor: '#c9bfbf'}} row middle>
                    <Icon name="phone" family="Entypo" size={30} color='#5E72E4' />
                    <Text style={{fontSize: 20, color:'#5E72E4', marginLeft: 10}}>Call</Text>
                  </Block>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:30}}>
                  <Block style={{width: 120, height: 50, borderRadius: 100, borderWidth: 1, borderColor: '#c9bfbf'}} row middle>
                    <Icon name="chat" family="Entypo" size={30} color='#5E72E4'/>
                    <Text style={{fontSize: 20, color:'#5E72E4', marginLeft: 10}}>Text</Text>
                  </Block>
                </TouchableOpacity>
              </Block>
            </View>
            <View>
              <Text style={styles.category}>Order</Text>
              <Text style={styles.text}>2 Items:</Text>
              <Text style={styles.text}> 1 Buffalo Bill</Text>
              <Text style={styles.text}> 1 Tombstone Chicken</Text>
              <Text style={styles.text}>$8.01</Text>
            </View>
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
    paddingTop: 20,
    alignItems: 'center'
  },
  panel: {
    borderRadius: 20,
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  panelHeader: {
    borderRadius: 20,
    height: 180,
    backgroundColor: "white",
    paddingLeft: 20,
    padding: 10,
    marginBottom: 15
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
    paddingTop: 20,
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
  },
});
