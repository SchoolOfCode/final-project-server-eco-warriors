import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@99xt/first-born";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// const scale = 10;

export default class Card extends Component {
  render() {
    // const fillValue = (this.props.progress / this.props.target) * scale;
    // console.log(this.props);
    // console.log("fv", fillValue);
    return (
      <View style={styles.card}>
        <View style={{ marginRight: 15 }}>
          {/* {Array(scale)
            .fill(0)
            .map((itm, idx) => (
              <MaterialCommunityIcons
                name={this.props.icon}
                size={this.props.iconSize}
                color={idx < fillValue ? this.props.iconColor : "gray"}
              />
            ))} */}
          <MaterialCommunityIcons
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        </View>
        <View style={{ marginRight: 45 }}>
          <Text style={{ fontSize: 14, fontFamily: "poppins-regular" }}>
            {this.props.title}
          </Text>
          <Text style={{ fontSize: 10, fontFamily: "poppins-light" }}>
            {this.props.des}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "white",
    borderBottomWidth: 0,
    borderLeftWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1.7,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    padding: 10
  }
});
