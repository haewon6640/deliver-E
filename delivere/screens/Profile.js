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
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();
const default_image =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
export default class Profile extends React.Component {
  state = {
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
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

    const imageRef = firebase
      .storage()
      .ref("Eater")
      .child(email);
    await imageRef.put(blob).then(function() {
      imageRef
        .getDownloadURL()
        .then(function(downloadURL) {
          dbh
            .collection("Eater")
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
    const user = navigation.getParam("user");
    var eName = user.name;
    var eEmail = user.email;
    if (eEmail.length > 8) {
      eEmail = eEmail.substring(0, 6) + "...";
    }
    if (user.name.length > 8) {
      eName = eName.substring(0, 6) + "...";
    }

    if (this.state.image == default_image) {
      if (user.profileImage != undefined) {
        image = user.profileImage;
      } else {
        image = default_image;
      }
    } else {
      image = this.state.image;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image
              source={{ uri: image }}
              style={
                styles.profileImage
              }
            />
            <View style={{flexDirection: 'row'}}>
            <Button
              title="Gallery"
              onPress={() => this.selectPicture(user.email)}
            ></Button>
            <Button
              title="Camera"
              onPress={() => this.takePicture(user.email)}
            ></Button>
            </View>
          </View>
          <Block style={styles.container}>
            <Block style={styles.subCont}>
              <Block row style={styles.entry}>
                <Text style={styles.text}>Name</Text>
                <Text style={styles.right}>{eName}</Text>
              </Block>
              <Block row style={styles.entry}>
                <Text style={styles.text}>Phone Number</Text>
                <Text style={styles.right}>{user.phoneNumber}</Text>
              </Block>
              <Block row style={styles.entry}>
                <Text style={styles.text}>Email</Text>
                <Text style={styles.right}>{eEmail}</Text>
              </Block>
            </Block>
            <Block style={styles.subCont}>
              <Block row style={styles.entry}>
                <Text style={styles.text}>Change password</Text>
              </Block>
            </Block>
            <TouchableOpacity onPress={() => this.signOut()}>
              <Block style={styles.subCont}>
                <Block row style={styles.entry}>
                  <Text style={styles.text}>Sign Out</Text>
                </Block>
              </Block>
            </TouchableOpacity>
          </Block>
        </View>
      </ScrollView>
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent"
  },

  // button: {
  //   padding: 10,
  //   borderWidth: 1,
  //   borderColor: "#333",
  //   textAlign: "center",
  //   maxWidth: 150
  // },

});