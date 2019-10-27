import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

import firebase from "../components/firebase";
import * as firestore from "@firebase/firestore";
const dbh = firestore;

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      curUser: null
    };
  }
  
  signUpUser = (email, password, name, phoneNumber) => {
    try {
      if (password.length < 6) {
        alert("Please enter at least 6 characters");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var curUser = new Eater(
            (uid = user.uid),
            (email = user.email),
            (name = name),
            (phoneNumber = phoneNumber)
          );
          dbh
            .collection("Eater")
            .doc(user.uid)
            .set(curUser);
        } else {
          // No user is signed in.
        }
      });
    } catch (error) {
      console.log(error.toString());
    }
  };

  render() {
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Sign up with your Emory email
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Name"
                        onChangeText={name => this.setState({ name })}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Phone Number"
                        onChangeText={phoneNumber =>
                          this.setState({ phoneNumber })
                        }
                        iconContent={
                          <Icon
                            size={16}
                            theme="filled"
                            color={argonTheme.COLORS.ICON}
                            name="phone"
                            family="AntDesign"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
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
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
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
                        onPress={
                          (() =>
                            this.signUpUser(
                              this.state.email,
                              this.state.password,
                              this.state.name,
                              this.state.phoneNumber
                            ),
                          () => this.props.navigation.navigate("Home"))
                        }
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </Button>
                    </Block>
                    <Block middle>
                      <Button
                        title="Sign In"
                        onPress={() => this.props.navigation.navigate("Sign")}
                        style={styles.createButton}
                      >
                        <Text size={12} color={argonTheme.COLORS.WHITE}>
                          Already have an account? Sign in!
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

export default Register;
