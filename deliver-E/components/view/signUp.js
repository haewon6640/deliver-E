import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label
} from "native-base";
import * as firebase from "firebase";
import "@firebase/firestore";
import Eater from "./components/model/User";
import Runner from "./components/model/User";

const dbh = firebase.firestore();
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      curUser: null
    };
  }
  signUpUser = (email, password, firstName, lastName) => {
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
            (firstName = this.state.firstName),
            (lastName = this.state.lastName)
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
      <Container style={styles.container}>
        <Text style={{ color: "white" }}> Sign Up</Text>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
            />
          </Item>

          <Item floatingLabel>
            <Label>First Name</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={firstName => this.setState({ firstName })}
            />
          </Item>

          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={lastName => this.setState({ lastName })}
            />
          </Item>

          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            success
            onPress={() =>
              this.signUpUser(
                this.state.email,
                this.state.password,
                this.state.firstName,
                this.state.lastName
              )
            }
          >
            <Text style={{ color: "white" }}> Sign Up!</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}
