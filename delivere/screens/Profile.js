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
import firebase from "../components/firebase";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        // Sign-out successful.
        this.props.navigation.navigate("Intro");
      }.bind(this)
    )
    .catch(
      function (error) {
        // An error happened.
        alert(error.code);
        alert(error.message);
      }.bind(this)
    );
};


export default class Profile extends React.Component {
  state = {
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!cancelled){
      this.setState({ image: uri }) //if image cancelled, won't set new image
      this.uploadImage(uri, "Profile-Image")
      .then(() => {
  
      })
      .catch((error) => {
        alert(error.message)
      });
    };
  };

  takePicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      alowsEditing: false,
    });
    if (!cancelled){
      this.setState({ image: uri });
      this.uploadImage(uri, "Profile-Image")
      .then(() => {
  
      })
      .catch((error) => {
        alert(error.message)
      });
    };
  };
  

  uploadImage = async (uri, imageName) =>{
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    const imageRef = firebase.storage().ref('images').child(imageName);
    imageRef.put(blob).then(function() {
      imageRef.getDownloadURL().then(function(downloadURL) {
        
      });
    });
    return ref.put(blob);
  }



  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
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
    const { image } = this.state;  
    
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={{ uri: image }} 
            style={{ 
            width: 150, 
            height: 150, 
            }} />  
          <Button title="Gallery" onPress={this.selectPicture}></Button>
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
  button: { 
    padding: 10, 
    borderWidth: 1, 
    borderColor: "#333", 
    textAlign: "center", 
    maxWidth: 150 
  }

});
