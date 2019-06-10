import React from "react";
import Ticker, { Tick } from "react-native-ticker";
import { StyleSheet, View } from "react-native";

// function getRandom(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const currencies = ["$", "¥", "€"];

export default class Roller extends React.Component {
  state = {
    // currency: "",
    value: "000"
    // .repeat(this.props.value.length)
  };

  componentDidMount() {
    this.rollNumber();
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.rollNumber();
    }
  }

  rollNumber = () => {
    setInterval(() => {
      this.setState({
        // currency: currencies[getRandom(0, 2)],
        value: this.props.value + ""
      });
    }, 1000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Ticker textStyle={styles.text}>
          {/* <Tick rotateItems={currencies}>{this.state.currency}</Tick> */}
          {this.state.value.split("").map((char, i) => {
            return (
              <Tick key={i} rotateItems={numbers}>
                {char}
              </Tick>
            );
          })}
        </Ticker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 60,
    color: "black",
    fontFamily: "overlock-bold"
  }
});
