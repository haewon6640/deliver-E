import React from "react";
import { StyleSheet, Text } from "react-native";
import { Block } from "galio-framework";

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
        height: 150,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        borderRadius: 10,
        backgroundColor: 'white',
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          shadowOpacity: 0.1,
          elevation: 2
      },
      text:{
        textAlign: 'center',
        fontSize: 17,
        color: '#1f396e'
      },
});