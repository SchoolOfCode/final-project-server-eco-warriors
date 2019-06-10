import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { StyleSheet, View, ScrollView } from "react-native";
import firebase from "firebase";

import { Text } from "@99xt/first-born";

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  componentDidMount = () => {
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        if (snapshot.val()) {
          this.setState({
            transactions: snapshot.val().transactions
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Profile"
          back
          onBack={() => this.props.navigation.navigate("Profile")}
        />
        <View style={styles.body} />
        <Footer {...this.props} active="Profile" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1
  },
  container2: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    borderTopColor: "lightgrey",
    borderTopWidth: 1
  },
  mainContent: {
    height: "80%",
    width: "100%"
  },
  body: {
    flexDirection: "column",
    alignItems: "center"
  },
  body2: {
    flexDirection: "column",
    paddingBottom: 10
  },
  points: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 120
  }
});
