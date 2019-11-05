import React from "react";
import { Text, View, Dimensions, Animated, ProgressViewIOS } from "react-native";
import { Block, Icon } from "galio-framework";
import SlidingUpPanel from "rn-sliding-up-panel";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

const styles = {
  container:{
    flex: 1,
    alignItems: 'center',
    padding: 20
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
  }
};

class BottomSheet extends React.Component {
  constructor(props){
    super(props);
    this.state={status: 0.25};
    this.changeStatus=this.changeStatus.bind(this);
  }

  changeStatus = (percent) => {
    this.setState({status: percent});
  }

  static defaultProps = {
    draggableRange: { top: height - 60, bottom: 180 }
  };

  _draggedValue = new Animated.Value(180);

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
            <Text style={styles.textHeader}>Runner picking up order</Text>
            <Text style={[styles.textHeader, {fontSize: 20}]}>Arrives in 5-10 min</Text>
            <ProgressViewIOS style={styles.progBar} progress={this.state.status} progressTintColor={"#5E72E4"}/>
            <Block row space='between' style={{marginTop: 5}}>
              <TouchableOpacity onPress={() => this.changeStatus(0.25)}>
                <Icon name="directions-run" family="MaterialIcons" size={30} color="#5E72E4" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.changeStatus(0.50)}>
                <Icon name="store-mall-directory" family="MaterialIcons" size={30} color="#5E72E4" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.changeStatus(0.75)}>
                <Icon name="doubleright" family="AntDesign" size={30} color="#5E72E4" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.changeStatus(1)}>
               <Icon name="home" family="Entypo" size={30} color="#5E72E4" />
              </TouchableOpacity>
            </Block>
          </View>
          <View style={styles.container}>
            <Text>Order Details</Text>
          </View>
        </View>
      </SlidingUpPanel>
    );
  }
}

export default BottomSheet;
