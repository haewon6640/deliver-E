import React from "react";
import { Text, View, Dimensions, Animated, ProgressViewIOS } from "react-native";
import { Block, Icon } from "galio-framework";
import SlidingUpPanel from "rn-sliding-up-panel";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

const styles = {
  container:{
    flex: 1,
    padding: 10
  },
  text: {
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
};

let t1;
let t2;
let t3;

class BottomSheet extends React.Component {
  constructor(props){
    super(props);
    this.state={status: 0.25, message: 'Heading to store', time: '10-15 min'};
    this.changeStatus=this.changeStatus.bind(this);
    this.manualChange=this.manualChange.bind(this);
  }

  manualChange = (n) => {
    if (n == 1)
      this.setState({ status: 0.25, message: 'Heading to store', time: '10-15 min'});
    else if (n == 2)
      this.setState({ status: 0.5, message: 'Ordering food', time: '5-10 min'});
    else if (n == 3)
      this.setState({ status: 0.75, message: 'Heading to you', time: '4 min'});
    else
      this.setState({ status: 1, message: 'Runner is nearby', time:'Arriving Now'});
  }

  changeStatus = () => {
    t1 = setTimeout(() => {this.setState({ status: 0.5, message: 'Ordering food', time: '5-10 min'})}, 3200);
    t2 = setTimeout(() => {this.setState({ status: 0.75, message: 'Heading to you', time: '4 min'})}, 5700);
    t3 = setTimeout(() => {this.setState({ status: 1, message: 'Runner is nearby', time:'Arriving Now'})}, 8200);
  }

  static defaultProps = {
    draggableRange: { top: height - 95, bottom: 180 }
  };

  _draggedValue = new Animated.Value(180);

  componentDidMount(){
    this.changeStatus();
  }
  
  componentWillUnmount(){
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
  }  
  render() {
    return (
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
            <ProgressViewIOS style={styles.progBar} progress={this.state.status} progressTintColor={"#5E72E4"}/>
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
          <View style={styles.container}>
            <View style={{borderBottomWidth: 1, borderBottomColor:'#c9bfbf', paddingBottom: 20, marginBottom: 30}}>
              <Block row>
                <View>
                  <Text style={styles.category}>Sally S.</Text>
                  <Text style={styles.text}>Your Runner</Text>
                </View>
                <Block style={{position:'absolute', right: 20, paddingTop: 16}}row middle>
                  <Icon name="phone" family="Entypo" size={35} color="#5E72E4" />
                  <Icon style={{marginLeft:40, marginRight: 20}}name="chat" family="Entypo" size={35} color="#5E72E4" />
                </Block>
              </Block>
            </View>
            <View style={{borderBottomWidth: 1, borderBottomColor:'#c9bfbf', paddingBottom: 20, marginBottom: 30}}>
              <Text style={styles.category}>Order Details</Text>
              <Text style={styles.text}>1 Item:</Text>
              <Text style={styles.text}>1x Taco Combo</Text>
              <View style={{marginBottom: 20}}>
                <Text style={[styles.text,{color: 'grey', position: 'absolute', right: 20}]}>View Receipt</Text>
              </View>
            </View>
            <View style={{paddingBottom: 20, marginBottom: 30}}>
              <Text style={styles.category}>Address</Text>
              <Text style={styles.text}>White Hall 208</Text>
            </View>
          </View>
        </View>
      </SlidingUpPanel>
    );
  }
}

export default BottomSheet;
