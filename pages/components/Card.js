import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@99xt/first-born";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class Card extends Component {
  render() {
    return (
      <View style={styles.card}>
        <View style={{ marginRight: 17 }}>
          <MaterialCommunityIcons
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        </View>
        <View style={{ marginRight: 45 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {this.props.title}
          </Text>
          <Text style={{ color: "#bababa", fontSize: 13 }}>
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
