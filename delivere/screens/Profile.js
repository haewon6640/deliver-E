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
// import { ImagePicker, Permissions } from "expo";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "../components/firebase";
import Eater from "../backend/Eater";
// let user;

import "@firebase/firestore";
import normalize from "react-native-normalize";
const db = firebase.firestore();
const default_image =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
let type;
let Email;

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    // this.checkUserType = this.checkUserType.bind(this);
  }

  state = {
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    valid: false,
    email: "",
    phone: "",
    name: ""
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
          alert(error.message);
        }.bind(this)
      );
  };

  // checkUserType = async email => {
  //   await db
  //     .collection("Eater")
  //     .doc(email)
  //     .get()
  //     .then(function(doc) {
  //       if (typeof doc.data() === "undefined") {
  //         type = "Runner";
  //       } else {
  //         type = "Eater";
  //       }
  //     });
  // };

  // queryCurrent = async () => {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       Email = user.email;
  //     } else {
  //       alert("You are not signed in.");
  //       // No user is signed in.
  //     }
  //   });
  // };

  queryProfileInfo = async => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          var userRef = db
            .collection("Eater")
            .doc(user.email)
            .get();

          userRef.then(
            function(doc) {
              if (doc.exists) {
                this.setState({
                  uid: doc.data().uid,
                  email: doc.data().email,
                  name: doc.data().name,
                  phone: doc.data().phoneNumber
                });
              } else {
                queryProfileInfo("Runner");
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

  selectPicture = async email => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true
    });
    if (!cancelled) {
      this.uploadImage(uri, email);
      this.setState({ image: uri }); //if image cancelled, won't set new image
    }
  };

  takePicture = async email => {
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      alowsEditing: false
    });
    if (!cancelled) {
      this.uploadImage(uri, email);
      this.setState({ image: uri });
    }
  };
  uploadImage = async (uri, email) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log(email);

    const imageRef = firebase
      .storage()
      .ref("Eater")
      .child(email);
    await imageRef.put(blob).then(function() {
      imageRef
        .getDownloadURL()
        .then(function(downloadURL) {
          db.collection("Eater")
            .doc(email)
            .update({ profileImage: downloadURL })
            .catch(error => alert(JSON.stringify(error)));
        })
        .catch(error => {
          alert("There was error uploading your profile image.");
          return "";
        });
    });
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    const { navigation } = this.props;
    if (!this.state.valid) {
      this.queryProfileInfo();
    }

    var uEmail = this.state.email;
    var uName = this.state.name;
    // if (uEmail.length > 8) {
    //   uEmail = uEmail.substring(0, 6) + "...";
    // }
    // if (uName.length > 8) {
    //   uName = uName.substring(0, 6) + "...";
    // }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={[
              styles.row,
              { alignItems: "center", marginTop: normalize(50) }
            ]}
          >
            <Image
              source={{ uri: this.state.image }}
              style={styles.profileImage}
            />
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Gallery"
                onPress={() => this.selectPicture(this.state.email)}
              ></Button>
              <Button
                title="Camera"
                onPress={() => this.takePicture(this.state.email)}
              ></Button>
            </View>
          </View>

          <Block style={styles.container}>
            <Block style={styles.subCont}>
              <Block row style={styles.entry}>
                <Text style={styles.text}>Name</Text>
                <Text style={styles.right}>{uName}</Text>
              </Block>
              <Block row style={styles.entry}>
                <Text style={styles.text}>Phone</Text>
                <Text style={styles.right}>{this.state.phone}</Text>
              </Block>
              <Block row style={styles.entry}>
                <Text style={styles.text}>Email</Text>
                <Text style={styles.right}>{uEmail}</Text>
              </Block>
            </Block>
            <Block style={styles.subCont}>
              {/* <Block row style={styles.entry}>
                <Text style={styles.text}>Change password</Text>
              </Block> */}
              <TouchableOpacity onPress={() => this.signOut()}>
                <Block style={styles.subCont}>
                  <Block row style={styles.entry}>
                    <Text style={styles.text}>Sign Out</Text>
                  </Block>
                </Block>
              </TouchableOpacity>
            </Block>
          </Block>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FE",
    flex: 1
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
    left: 150,
    fontSize: 17,
    color: "#1f396e"
  },
  text: {
    fontSize: 17,
    color: "#1f396e"
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent"
  }

  // button: {
  //   padding: 10,
  //   borderWidth: 1,
  //   borderColor: "#333",
  //   textAlign: "center",
  //   maxWidth: 150
  // },
});
