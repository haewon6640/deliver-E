import React from "react";
import { StyleSheet, Text } from "react-native";
import { Block } from "galio-framework";

export default class MenuItem extends React.Component {
  render() {
    return (
      <Block style={styles.item}>
        <Text style={styles.text1}>{this.props.name}</Text>
        <Text style={styles.text}>{this.props.pricecal}</Text>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 80,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#d6d7da"
  },
  text1: {
    fontSize: 17,
    color: "#466199",
    paddingLeft: 30,
    paddingBottom: 8
  },
  text: {
    fontSize: 17,
    color: "#466199",
    paddingLeft: 30
  }
});
