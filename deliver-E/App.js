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
import Eater from "./components/model/Eater";

//Initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyD95ZlnAl58mSDsv16KSNJ0VKr4CYpJG2w",
  authDomain: "deliver-e-e34da.firebaseapp.com",
  databaseURL: "https://deliver-e-e34da.firebaseio.com",
  projectId: "deliver-e-e34da",
  storageBucket: "deliver-e-e34da.appspot.com",
  messagingSenderId: "874425813575",
  appId: "1:874425813575:web:3dea7471636414ff09bf62",
  measurementId: "G-MR8W3SLHYT"
};

firebase.initializeApp(firebaseConfig);

const dbh = firebase.firestore();
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  }

  signUpUser = (email, password, firstName, lastName) => {
    try {
      if (password.length < 6) {
        alert("Please enter at least 6 characters");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          console.log(error.code);
          console.log(error.message);
          // ...
        });
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(email, password)
      //   .catch(function(error) {
      //     // Handle Errors here.
      //     console.log(error.code);
      //     console.log(error.message);
      //     // ...
      //   });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var curUser = {
            uid: user.uid,
            email: user.email,
            firstName: firstName,
            lastName: lastName
          };
          console.log(curUser);
          dbh
            .collection("User")
            .doc(user.uid)
            .set(curUser);
          // ...
        } else {
          // User is signed out.
          // ...
        }
      });

      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     var curUser = new Eater(user.uid, user.email, firstName, lastName);
      //     console.log(user);
      //     dbh
      //       .collection("Eater")
      //       .doc(user.uid)
      //       .set(curUser);
      //   } else {
      //     console.log("No user is signed in");
      //     // No user is signed in.
      //   }
      // });
    } catch (error) {
      console.log(error.toString());
    }
  };

  loginUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
          console.log(user);
        });
    } catch (error) {
      console.log(error.toString());
    }
  };

  render() {
    return (
      <Container style={styles.container}>
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
              this.loginUser(this.state.email, this.state.password)
            }
          >
            <Text style={{ color: "white" }}> Login</Text>
          </Button>

          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() =>
              this.signUpUser(
                this.state.email,
                this.state.password,
                this.state.firstName,
                this.state.lastName
              )
            }
          >
            <Text style={{ color: "white" }}> Sign Up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10
  }
});
