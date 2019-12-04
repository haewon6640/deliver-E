import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Text
} from "react-native";
import { Block, theme } from "galio-framework";
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const { width, height } = Dimensions.get("screen");

class Intro extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Block flex middle>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
                <Block
                  flex={0.17}
                  middle
                  style={{
                    padding: 20,
                    marginTop: height * 0.03,
                    marginBottom: height * 0.13
                  }}
                >
                  <Text style={{ color: "#8898AA", fontSize: width * 0.075 }}>
                    Welcome to Deliver-E!
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block middle>
                      <Text style={{ color: "#8898AA", fontSize: 18 }}>
                        Would you like to:
                      </Text>
                    </Block>
                    <Block middle>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={() => {
                          this.props.navigation.navigate("Sign");
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            color: argonTheme.COLORS.WHITE
                          }}
                        >
                          Order Food
                        </Text>
                      </Button>
                    </Block>
                    <Block middle>
                      <Button
                        color="primary"
                        title="Runner"
                        onPress={() =>
                          this.props.navigation.navigate("RunSign")
                        }
                        style={styles.createButton}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            color: argonTheme.COLORS.WHITE
                          }}
                        >
                          Deliver Food
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
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
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Intro;
