import React from "react";
import Header from "./components/Header";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import firebase from "firebase";
import Footer from "./components/Footer";
import QRCode from "react-native-qrcode";

export default class QR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Collect Points" />
        <Text style={styles.description}>
          Show this at the till to collect points
        </Text>
        <ScrollView style={styles.mainContent}>
          <QRCode value={this.state.user.uid} size={300} />
        </ScrollView>
        <Footer {...this.props} active="QR" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  mainContent: {
    height: "68%",
    width: "100%",
    paddingTop: "8%",
    paddingLeft: "8%"
  },
  description: {
    fontFamily: "dosis-bold",
    fontSize: 20,
    paddingTop: "6%"
  }
});
