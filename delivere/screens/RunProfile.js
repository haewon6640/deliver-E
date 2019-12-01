import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Block, Icon } from "galio-framework";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default class RunProfile extends React.Component {
  // queryProfileInfo = () => {
  //     const loggedIn = firebase.auth().onAuthStateChanged(
  //       function(user) {
  //         if (user) {
  //           const name = "";
  //           db.collection("Eater")
  //             .doc(user.uid)
  //             .get()
  //             .then(
  //               function(doc) {
  //                 if (doc.exists) {
  //                   const curUser = {
  //                     uid: doc.data().uid,
  //                     email: doc.data().email,
  //                     name: doc.data().name,
  //                     phoneNumber: doc.data().phoneNumber
  //                   };
  //                   this.props.navigation.navigate("Profile", {
  //                     user: curUser
  //                   });
  //                 } else {
  //                   alert("There was an issue fetching data from the server.");
  //                 }
  //               }.bind(this)
  //             );
  //         } else {
  //           alert("You are not signed in.");
  //           // No user is signed in.
  //           return;
  //         }
  //       }.bind(this)
  //     );
  //   };
  render() {
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    if (user.email.length > 8) {
      user.email = user.email.substring(0, 6) + "...";
    }
    if (user.name.length > 8) {
      user.name = user.name.substring(0, 6) + "...";
    }
    return (
      <Block style={styles.container}>
        <Block style={styles.subCont}>
          <Block row style={styles.entry}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.right}>{user.name}</Text>
          </Block>
          <Block row style={styles.entry}>
            <Text style={styles.text}>Phone Number</Text>
            <Text style={styles.right}>{user.phoneNumber}</Text>
          </Block>
          <Block row style={styles.entry}>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.right}>{user.email}</Text>
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
  }
});
