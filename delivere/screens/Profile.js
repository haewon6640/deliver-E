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

export default class Profile extends React.Component {
  state = {
    image: null
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
      alowsEditing: falseo
    });
    if (!cancelled) this.setState({ image: uri });
  };

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    if (user.email.length > 8) {
      user.email = user.email.substring(0, 6) + "...";
    }
    if (user.name.length > 8) {
      user.name = user.name.substring(0, 6) + "...";
    }
    let { image } = this.state;

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
