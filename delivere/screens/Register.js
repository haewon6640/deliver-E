import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Text
} from "react-native";
import { Block } from "galio-framework";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");
import { UserInterfaceIdiom } from "expo-constants";
import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();

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

  showAlert() {
    Alert.alert(
      "Verify your email.",
      "Alert Msg",
      [
        {
          text: "You will be able to proceed after verifying your email."
        },
        {
          text: "",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  signUpUser = (email, password, name, phoneNumber) => {
    try {
      // if (password.length < 6) {
      //   alert("Please enter at least 6 characters");
      //   return;
      // }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userData => {
          userData.user.sendEmailVerification();
        })
        .catch(
          function(error) {
            alert(error.toString());
          }.bind(this)
        );
      firebase.auth().onAuthStateChanged(
        function(user) {
          if (user) {
            const curUser = {
              email: user.email,
              name: name,
              phoneNumber: phoneNumber,
              type: "Eater"
            };
            dbh
              .collection("Eater")
              .doc(email)
              .set(curUser);
            this.props.navigation.navigate("Home");
          } else {
            // No user is signed in.
          }
        }.bind(this)
      );
    } catch (error) {
      alert(error.toString());
    }
  };

  render() {
    return (
      <Block flex middle>
        {/* <StatusBar /> */}
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <ScrollView>
                <Block height={height * 0.1} middle>
                  <Text style={{ color: "#8898AA", fontSize: 16 }}>
                    Sign up with your Emory email
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block
                      width={width * 0.8}
                      style={{ marginBottom: height * 0.01 }}
                    >
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
                    <Block
                      width={width * 0.8}
                      style={{ marginBottom: height * 0.01 }}
                    >
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
                    <Block
                      width={width * 0.8}
                      style={{ marginBottom: height * 0.01 }}
                    >
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
                        onPress={() =>
                          this.signUpUser(
                            this.state.email,
                            this.state.password,
                            this.state.name,
                            this.state.phoneNumber
                          )
                        }
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            color: argonTheme.COLORS.WHITE
                          }}
                        >
                          Create Account
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </ScrollView>
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
    marginTop: height * 0.02,
    marginBottom: height * 0.02
  }
});

export default Register;
