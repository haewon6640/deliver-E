import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Button, Block, Icon } from "galio-framework";
const { width, height } = Dimensions.get("window");

export default class OrderList extends React.Component {
  static defaultProps = {
    draggableRange: { top: height - 95, bottom: 180 }
  };

  _draggedValue = new Animated.Value(180);

  render() {
    return (
      <View>
        <ImageBackground source={require("../assets/emorymap.png")} style={styles.container}>
        </ImageBackground>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={this.props.draggableRange}
          animatedValue={this._draggedValue}
          height={height + 180}
          friction={0.5}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Block style={{alignSelf:'center', backgroundColor: '#d3d1d1', height: 8, width: 50, marginBottom: 13, borderRadius: 100}}/>
              <Text style={styles.textHeader}>{this.state.message}</Text>
              <Text style={[styles.textHeader, {fontSize: 20}]}>{this.state.time}</Text>
              <Block row space='around' style={{marginTop: 5}}>
              <TouchableOpacity onPress={()=>this.manualChange(1)}>
                <Icon name="directions-run" family="MaterialIcons" size={35} color="#5E72E4" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.manualChange(2)}>
                <Icon name="store-mall-directory" family="MaterialIcons" size={35} color="#5E72E4" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.manualChange(3)}>  
                <Icon name="doubleright" family="AntDesign" size={35} color="#5E72E4" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.manualChange(4)}>
                <Icon name="home" family="Entypo" size={35} color="#5E72E4" />
              </TouchableOpacity>
              </Block>
            </View>
            <View style={styles.container1}>
              <View style={{borderBottomWidth: 1, borderBottomColor:'#c9bfbf', paddingBottom: 20, marginBottom: 30}}>
                <Block row>
                  <View>
                    <Text style={styles.category}>Sally S.</Text>
                    <Text style={styles.text1}>Your Runner</Text>
                  </View>
                  <Block style={{position:'absolute', right: 20, paddingTop: 16}}row middle>
                    <Icon name="phone" family="Entypo" size={35} color="#5E72E4" />
                    <Icon style={{marginLeft:40, marginRight: 20}}name="chat" family="Entypo" size={35} color="#5E72E4" />
                  </Block>
                </Block>
              </View>
              <View style={{borderBottomWidth: 1, borderBottomColor:'#c9bfbf', paddingBottom: 20, marginBottom: 30}}>
                <Text style={styles.category}>Order Details</Text>
                <Text style={styles.text1}>1 Item:</Text>
                <Text style={styles.text1}>1x Taco Combo</Text>
                <View style={{marginBottom: 20}}>
                  <Text style={[styles.text1,{color: 'grey', position: 'absolute', right: 20}]}>View Receipt</Text>
                </View>
              </View>
              <View style={{paddingBottom: 20, marginBottom: 30}}>
                <Text style={styles.category}>Address</Text>
                <Text style={styles.text1}>White Hall 208</Text>
              </View>
            </View>
          </View>
        </SlidingUpPanel>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    alignSelf: 'center',
    paddingBottom: 15,
    fontSize: 30,
    color: "#1f396e"
  },
  text: {
    fontSize: 17,
    color: "#466199",
    paddingLeft: 30
  },
  category: {
    paddingLeft: 30,
    paddingTop: 15,
    fontSize: 20,
    color: "#1f396e"
  },
  container1:{
    flex: 1,
    padding: 10
  },
  text1: {
    fontSize: 20,
    color: "#466199",
    paddingLeft: 30
  },
  category: {
    paddingLeft: 23,
    paddingTop: 15,
    paddingBottom: 8,
    fontSize: 25,
    color: "#1f396e"
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
    paddingLeft: 13,
    padding: 10,
    marginBottom: 15
  },
  textHeader: {
    marginLeft: 7,
    fontSize: 28,
    color: "#466199"
  },
  progBar:{
    marginTop: 20,
    transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
    marginBottom: 3
  }
});