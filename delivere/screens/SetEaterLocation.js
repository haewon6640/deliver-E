import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Text,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { Block } from "galio-framework";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");

import firebase from "../components/firebase";
import "@firebase/firestore";

const dbh = firebase.firestore();
class SetEaterLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: ""
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <Block width={width * 0.8} style={{ marginBottom: 15 }}></Block>
          <Block width={width * 0.8} style={{ marginBottom: 15 }}>
            <Input
              borderless
              placeholder="Location"
              onChangeText={email => this.setState({ location })}
              iconContent={
                <Icon
                  size={16}
                  color={argonTheme.COLORS.ICON}
                  name="ic_mail_24px"
                  family="ArgonExtra"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block middle>
            <Button
              color="primary"
              style={styles.createButton}
              onPress={() =>
                this.changeLocation(this.state.email, this.state.password)
              }
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: argonTheme.COLORS.WHITE
                }}
              >
                Change Curre
              </Text>
            </Button>
          </Block>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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

export default SetEaterLocation;
