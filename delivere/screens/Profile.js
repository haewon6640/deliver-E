import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  Button,
  Image
} from "react-native";
import { Block, Icon } from "galio-framework";
import { ImagePicker, Permissions } from "expo";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
import firebase from "../components/firebase";
// let user;

import "@firebase/firestore";
const db = firebase.firestore();

export default class Profile extends React.Component {
  state = {
    image: null,
    valid: false,
    email: "",
    phone: "",
    name: ""
  };

  queryProfileInfo = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          db.collection("Eater")
            .doc(user.email)
            .get()
            .then(
              function(doc) {
                if (doc.exists) {
                  const curUser = {
                    uid: doc.data().uid,
                    email: doc.data().email,
                    name: doc.data().name,
                    phoneNumber: doc.data().phoneNumber
                  };
                  return curUser;
                } else {
                  alert("There was an issue fetching data from the server.");
                }
              }.bind(this)
            );
        } else {
          alert("You are not signed in.");
          // No user is signed in.
          return;
        }
      }.bind(this)
    );
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          // Sign-out successful.
          this.props.navigation.navigate("Intro");
        }.bind(this)
      )
      .catch(
        function(error) {
          // An error happened.
          alert(error.code);
          alert(error.message);
        }.bind(this)
      );
  };

  selectPicture = async () => {
    const x = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    alert(x);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true
    });
    if (!cancelled) this.setState({ image: uri }); //if image cancelled, won't set new image
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      alowsEditing: false
    });
    if (!cancelled) this.setState({ image: uri });
  };

  queryProfileInfo = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          db.collection("Eater")
            .doc(user.email)
            .get()
            .then(
              function(doc) {
                if (doc.exists) {
                  var uEmail = doc.data().email;
                  var uName = doc.data().name;
                  if (uEmail.length > 8) {
                    uEmail = uEmail.substring(0, 6) + "...";
                  }
                  if (uName.length > 8) {
                    uName = uName.substring(0, 6) + "...";
                  }
                  this.setState({
                    valid: true,
                    email: uEmail,
                    name: uName,
                    phone: doc.data().phoneNumber
                  });
                } else {
                  alert("There was an issue fetching data from the server.");
                }
              }.bind(this)
            );
        } else {
          alert("You are not signed in.");
          // No user is signed in.
          return;
        }
      }.bind(this)
    );
  };

  render() {
    const { navigation } = this.props;
    if (!this.state.valid) {
      this.queryProfileInfo();
    }

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.image }} />
        <View style={styles.row}>
          <Button title="Gallery" onPress={this.selectPicture} />
          <Button title="Camera" onPress={this.takePicture}></Button>
        </View>

        <Block style={styles.container}>
          <Block style={styles.subCont}>
            <Block row style={styles.entry}>
              <Text style={styles.text}>Name</Text>
              <Text style={styles.right}>{this.state.name}</Text>
            </Block>
            <Block row style={styles.entry}>
              <Text style={styles.text}>Phone Number</Text>
              <Text style={styles.right}>{this.state.phone}</Text>
            </Block>
            <Block row style={styles.entry}>
              <Text style={styles.text}>Email</Text>
              <Text style={styles.right}>{this.state.email}</Text>
            </Block>
          </Block>
          <Block style={styles.subCont}>
            <Block row style={styles.entry}>
              <Text style={styles.text}>Change password</Text>
            </Block>
          </Block>
          <TouchableOpacity onPress={() => signOut()}>
            <Block style={styles.subCont}>
              <Block row style={styles.entry}>
                <Text style={styles.text}>Sign Out</Text>
              </Block>
            </Block>
          </TouchableOpacity>
        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FE",
    height: height
  },
  subCont: {
    marginTop: 30
  },
  entry: {
    height: 60,
    paddingLeft: 30,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F8F9FE"
  },
  right: {
    position: "absolute",
    left: 200,
    fontSize: 17,
    color: "#1f396e"
  },
  text: {
    fontSize: 17,
    color: "#1f396e"
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#333",
    textAlign: "center",
    maxWidth: 150
  }
});
