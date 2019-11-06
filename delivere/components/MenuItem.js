import React from "react";
import { StyleSheet } from "react-native";
import { Radio } from "galio-framework";

export default class MenuItem extends React.Component {
  render() {
    return (
      // Use onChange={} for when selected
      <Radio
        onChange={() => {
          this.props.addCart, this.props.addList;
        }}
        color="#466199"
        label={this.props.name + "   " + this.props.pricecal}
        labelStyle={styles.text}
        containerStyle={styles.item}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 80,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: "#d6d7da"
  },
  text: {
    fontSize: 17,
    color: "#466199"
  },
  button: {
    backgroundColor: "#5E72E4",
    borderRadius: 80,
    height: 50,
    width: 200,
    margin: 20
  }
});
