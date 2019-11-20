import React from "react";
import {
  PanResponder,
  ScrollView,
  Text,
  View,
  Dimensions,
  Animated,
  ProgressViewIOS
} from "react-native";
import { Block, Icon } from "galio-framework";
import SlidingUpPanel from "rn-sliding-up-panel";
import { TouchableOpacity } from "react-native-gesture-handler";
import normalize from "react-native-normalize";

const { height, width } = Dimensions.get("window");

const styles = {
  container: {
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
    height: 0.7 * height,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    position: "relative"
  },
  panelHeader: {
    borderRadius: 20,
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
  progBar: {
    marginTop: 20,
    transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
    marginBottom: 3
  }
};

let t1;
let t2;
let t3;

class BottomSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0.25,
      message: "Heading to store",
      time: "10-15 min"
    };
    // this.changeStatus = this.changeStatus.bind(this);
    // this.manualChange = this.manualChange.bind(this);
    this.state = { dragPanel: true };

    this._onGrant = this._onGrant.bind(this);
    this._onRelease = this._onRelease.bind(this);

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this._onGrant,
      onPanResponderRelease: this._onRelease,
      onPanResponderTerminate: this._onRelease
    });
  }

  manualChange = n => {
    if (n == 0.25)
      this.setState({
        status: 0.25,
        message: "Heading to store",
        time: "10-15 min"
      });
    else if (n == 0.5)
      this.setState({
        status: 0.5,
        message: "Ordering food",
        time: "5-10 min"
      });
    else if (n == 0.75)
      this.setState({ status: 0.75, message: "Heading to you", time: "4 min" });
    else
      this.setState({
        status: 1,
        message: "Runner is nearby",
        time: "Arriving Now"
      });
  };

  // changeStatus = () => {
  //   t1 = setTimeout(() => {
  //     this.setState({
  //       status: 0.5,
  //       message: "Ordering food",
  //       time: "5-10 min"
  //     });
  //   }, 3200);
  //   t2 = setTimeout(() => {
  //     this.setState({ status: 0.75, message: "Heading to you", time: "4 min" });
  //   }, 5700);
  //   t3 = setTimeout(() => {
  //     this.setState({
  //       status: 1,
  //       message: "Runner is nearby",
  //       time: "Arriving Now"
  //     });
  //   }, 8200);
  // };

  static defaultProps = {
    draggableRange: { top: 0.7 * height, bottom: 180 }
  };

  _draggedValue = new Animated.Value(180);

  _onGrant() {
    this.setState({ dragPanel: false });
    return true;
  }

  _onRelease() {
    this.setState({ dragPanel: true });
  }
  componentDidMount() {
    // this.changeStatus();
  }
  componentWillUnmount() {
    // this.manualChange(this.props.progress);
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.progress != nextProps.progress;
  }
  render() {
    return (
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
              <Text style={styles.textHeader}>{this.props.message}</Text>
              <Text style={[styles.textHeader, { fontSize: 20 }]}>
                {this.props.time}
              </Text>
              <ProgressViewIOS
                style={styles.progBar}
                progress={this.props.progress}
                progressTintColor={"#5E72E4"}
              />
              <Block row space="around" style={{ marginTop: 5 }}>
                <TouchableOpacity onPress={() => this.manualChange(1)}>
                  <Icon
                    name="directions-run"
                    family="MaterialIcons"
                    size={normalize(35)}
                    color="#5E72E4"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.manualChange(2)}>
                  <Icon
                    name="store-mall-directory"
                    family="MaterialIcons"
                    size={normalize(35)}
                    color="#5E72E4"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.manualChange(3)}>
                  <Icon
                    name="doubleright"
                    family="AntDesign"
                    size={normalize(35)}
                    color="#5E72E4"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.manualChange(4)}>
                  <Icon
                    name="home"
                    family="Entypo"
                    size={normalize(35)}
                    color="#5E72E4"
                  />
                </TouchableOpacity>
              </Block>
            </View>
            <View style={styles.container}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#c9bfbf",
                  paddingBottom: normalize(20),
                  marginBottom: normalize(30)
                }}
              >
                <Block row>
                  <View>
                    <Text style={styles.category}>Sally</Text>
                    <Text style={styles.text}>Your Runner</Text>
                  </View>
                  <Block
                    style={{
                      position: "absolute",
                      right: normalize(20),
                      paddingTop: normalize(16)
                    }}
                    row
                    middle
                  >
                    <Icon
                      name="phone"
                      family="Entypo"
                      size={35}
                      color="#5E72E4"
                    />
                    <Icon
                      style={{
                        marginLeft: normalize(40),
                        marginRight: normalize(20)
                      }}
                      name="chat"
                      family="Entypo"
                      size={35}
                      color="#5E72E4"
                    />
                  </Block>
                </Block>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#c9bfbf",
                  paddingBottom: normalize(20),
                  marginBottom: normalize(20)
                }}
              >
                <Text style={styles.category}>Order Details</Text>
                <Text style={styles.text}>1 Item:</Text>
                <Text style={styles.text}>1x Taco Combo</Text>
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={[
                      styles.text,
                      { color: "grey", position: "absolute", right: 20 }
                    ]}
                  >
                    View Receipt
                  </Text>
                </View>
              </View>
              <View style={{ paddingBottom: 20, marginBottom: 30 }}>
                <Text style={styles.category}>Address</Text>
                <Text style={styles.text}>White Hall 208</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SlidingUpPanel>
    );
  }
}

export default BottomSheet;
