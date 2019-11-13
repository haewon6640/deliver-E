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
  Animated,
  Modal,
  Easing
} from "react-native";
import { Button, Block, Icon } from "galio-framework";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const { width, height } = Dimensions.get("window");
let time;

export default class AcceptOrders extends React.Component {
  constructor(props){
    super(props);
    this.state={fill: 0, seconds: 120}
  }
  componentDidMount(){
      time = setInterval(() => {
        if(this.state.seconds>0)
          this.setState({fill: this.state.fill + 100/120, seconds: this.state.seconds - 1})
      }, 1000);
  }
  componentWillUnmount() {
    clearTimeout(time);
}
  render() {
    return (
      <View style={{flex: 1}}>
        <Image source={require("../assets/emorymap.png")} style={{
            alignSelf: 'center'}}/>
        <Block style={{position: 'absolute', bottom: 100, backgroundColor: 'white', width: width}}>
          <Block row style={{paddingLeft: 30, paddingBottom: 25, paddingTop: 25, marginBottom: 15}}>
          <View>
            <Text style={styles.text}>Deliver by 3:27 PM</Text>
            <Text style={styles.category}>Twisted Taco</Text>
            <Block row>
              <Text style={styles.text}>2 items  •</Text>
              <Text style={styles.text}>0.5 miles</Text>
            </Block>
          </View>
          <View style={{position:'absolute', top: 30, right: 50}}>
            <AnimatedCircularProgress
              size={80}
              width={10}
              fill={this.state.fill}
              tintColor="#c9bfbf"
              backgroundColor="#5E72E4"
              >
              {() => (
                <Text>
                  {this.state.seconds}
                </Text>
              )}
              </AnimatedCircularProgress>
            </View>
          </Block>
          <Block style={{height: 1, width: width, backgroundColor:'#c9bfbf'}}/>
          <View style={{paddingLeft: 30}}>
            <Block row>
              <Block style={{paddingTop: 10}}>
                <Text style={styles.category}>$3.00</Text>
                <Text style={styles.text}>Guaranteed Earnings</Text>
              </Block>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('PickingUp')} style={{height: 100, position:'absolute', right: 30,
                justifyContent: 'center', alignItems: 'center', marginTop:20,
                aspectRatio: 1.2, backgroundColor:"#5E72E4", borderRadius: 15}}>
                <Text style={{fontSize: 23, color: 'white'}}>Accept</Text>
              </TouchableOpacity>
            </Block>
          </View>
        </Block>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#466199",
    paddingLeft: 10
  },
  category: {
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 15,
    fontSize: 23,
    color: "#1f396e"
  },
});