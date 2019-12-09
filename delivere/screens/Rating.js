import React from "react";
import StarRating from "react-native-star-rating";
import { Button as GaButton, theme, Block } from "galio-framework";
import Modal from "react-native-modal";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Image
} from "react-native";
import Order from "../backend/Order";
import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();
import { Button, Icon, Input } from "../components";
import { argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");

class Rating extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      tip: "",
      starCount: 5.0,
      TextHolder: "Tip : 0.00",
      isModalVisible: false,
      buttonColor1: "secondary",
      buttonColor2: "secondary",
      buttonColor3: "secondary",
      buttonColor4: "secondary"
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  ChangeTextFunction1 = () => {
    this.setState({
      TextHolder: "Tip : 1.00",
      tip: "1.00",
      buttonColor1: "primary",
      buttonColor2: "secondary",
      buttonColor3: "secondary"
    });
  };
  ChangeTextFunction2 = () => {
    this.setState({
      TextHolder: "Tip : 2.00",
      tip: "2.00",
      buttonColor2: "primary",
      buttonColor1: "secondary",
      buttonColor3: "secondary"
    });
  };
  ChangeTextFunction3 = () => {
    this.setState({
      TextHolder: "Tip : 3.00",
      tip: "3.00",
      buttonColor3: "primary",
      buttonColor2: "secondary",
      buttonColor1: "secondary"
    });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  customTip = () => {
    this.setState({
      TextHolder: this.state.tip,
      isModalVisible: !this.state.isModalVisible
    });
  };
  finishOrder = async oid => {
    var order = await new Order().queryOrder(oid);
    dbh.collection("Order").update({ tip: tip });
  };

  render() {
    const oid = this.props.navigation.getParam("orderId");
    return (
      <ScrollView>
        <Block middle style={{ marginTop: 200 }}>
          <Text style={{ color: "#8898AA", fontSize: 20 }}>
            Rate your experience:
          </Text>
          <StarRating
            fullStarColor="#5E72E4"
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={rating => this.onStarRatingPress(rating)}
          />

          <Block center style={{ marginTop: 50 }}>
            <Text style={{ color: "#8898AA", fontSize: 20 }}>
              Tip your runner!
            </Text>

            <Block
              row
              style={{
                margin: 20
                // flex: 1,
                // flexDirection: 'row',
                // justifyContent: 'center'
              }}
            >
              <Button
                color={this.state.buttonColor1}
                textStyle={{ color: "black", fontSize: 12, fontWeight: "700" }}
                style={{ width: 70 }}
                onPress={this.ChangeTextFunction1}
              >
                $1
              </Button>
              <Button
                color={this.state.buttonColor2}
                textStyle={{ color: "black", fontSize: 12, fontWeight: "700" }}
                style={{ width: 70 }}
                onPress={this.ChangeTextFunction2}
              >
                $2
              </Button>
              <Button
                color={this.state.buttonColor3}
                textStyle={{ color: "black", fontSize: 12, fontWeight: "700" }}
                style={{ width: 70 }}
                onPress={this.ChangeTextFunction3}
              >
                $3
              </Button>
              <Button
                color="secondary"
                textStyle={{ color: "black", fontSize: 12, fontWeight: "700" }}
                style={{ width: 70 }}
                onPress={this.toggleModal}
              >
                Custom
              </Button>
              <Modal
                isVisible={this.state.isModalVisible}
                onBackdropPress={() => this.setState({ isModalVisible: false })}
              >
                <View>
                  <Block>
                    <Input
                      name="tipBox"
                      borderless
                      placeholder="0.00"
                      onChangeText={tip => this.setState({ tip })}
                    />
                    <Button onPress={this.customTip}>Custom Tip</Button>
                  </Block>
                </View>
              </Modal>
            </Block>

            <Block middle>
              <Text style={{ marginBottom: 20, fontSize: 20 }}>
                {this.state.TextHolder}
              </Text>
              <Block middle style={{ marginTop: 50 }}>
                <Button
                  color="primary"
                  style={styles.createButton}
                  onPress={() => this.finishOrder(oid)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: argonTheme.COLORS.WHITE
                    }}
                  >
                    Submit
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  },
  inputIcons: {
    marginRight: 12
  },
  createButton: {
    width: width * 0.5,
    marginTop: height * 0.02,
    marginBottom: height * 0.02
  },
  container: {
    backgroundColor: "#FF00FF",
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 25,
    height: 25
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center"
  }
});
export default Rating;
