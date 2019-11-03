import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { Block } from "galio-framework";
const { width, height } = Dimensions.get("window");
import normalize from "react-native-normalize";

export default class Restaurant extends React.Component {
  render() {
    return(
      <Block style={styles.square}>
          <Text style={styles.text}>{this.props.name}</Text>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
    square: {
        height: normalize(150),
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height*0.04,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2
    },
    text: {
      textAlign: 'center',
      fontSize: normalize(17),
      color: '#1f396e'
    }
});