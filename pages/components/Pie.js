import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { Svg } from "expo";
const { Circle } = Svg;

import Roller from "./Roller";
import PureChart from "react-native-pure-chart";

export default class Pie extends Component {
  render() {
    let sampleData = [
      {
        value: this.props.totals.zeroWaste,
        label: "Plastic",
        color: "#00FF00"
      },
      {
        value: this.props.totals.vegan,
        label: "Meat",
        color: "#29AB87"
      },
      {
        value: this.props.totals.energy,
        label: "Energy",
        color: "#BFFF00"
      },
      {
        value: this.props.totals.clothes,
        label: "Clothing",
        color: "#8DB600"
      },
      {
        value: this.props.totals.cosmetics,
        label: "Cosmetics",
        color: "#008080"
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
          <Text style={{ fontSize: 13, position: "relative", bottom: 100 }}>
            Total Points
          </Text>
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
    top: 233,
    zIndex: 1
  }
});
