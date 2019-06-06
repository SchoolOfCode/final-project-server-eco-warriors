import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { Svg } from "expo";
const { Circle } = Svg;

import Roller from "./Roller";
import PureChart from "react-native-pure-chart";

export default class Pie extends Component {
  render() {
    let sampleData = [
      {
        value: this.props.plasticPoints,
        label: "Plastic",
        color: "#c7ea46"
      },
      {
        value: this.props.meatPoints,
        label: "Meat",
        color: "#A9BA9D"
      },
      {
        value: this.props.energyPoints,
        label: "Energy",
        color: "#708238"
      },
      {
        value: this.props.clothingPoints,
        label: "Clothing",
        color: "#0b6623"
      },
      {
        value: this.props.cosmeticsPoints,
        label: "Cosmetics",
        color: "#4B5320"
      }
    ];
    return (
      <View style={styles.piechart}>
        <View style={styles.innerCirlce}>
          <Svg height="90%" width="90%" viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke="white"
              strokeWidth="2.5"
              fill="white"
            />
          </Svg>
        </View>
        <View style={styles.chart}>
          <PureChart data={sampleData} type="pie" />
        </View>
        <View style={styles.points}>
          <Roller value={this.props.points} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  piechart: {
    flex: 1,
    position: "relative",
    top: -230
  },
  points: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    bottom: 240,
    zIndex: 2
  },
  chart: {
    justifyContent: "center",
    alignItems: "center"
  },
  innerCirlce: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 225,
    zIndex: 1
  }
});
