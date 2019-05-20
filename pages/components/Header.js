import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import { LinearGradient } from "expo";

export default class Header extends React.Component {
  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  render() {
    return (
      // <View style={styles.header}>
      <LinearGradient
        colors={["#B7DD63", "#90BC00", "#398900"]}
        style={styles.header}
      >
        <View style={styles.header2}>
          {this.props.back ? (
            <Ionicons
              name="md-arrow-back"
              size={28}
              color="white"
              marginLeft={20}
              onPress={this.props.onBack}
            />
          ) : (
            <Feather
              name="log-out"
              size={1}
              color="#669335"
              style={{ marginRight: 28 }}
            />
          )}
          <Text style={{ color: "white", fontSize: 20 }}>
            {this.props.title}
          </Text>
          {this.props.isLoggedIn ? (
            <MaterialCommunityIcons
              name="exit-run"
              size={30}
              color="white"
              onPress={this.handleSignOut}
            />
          ) : (
            <Feather
              name="log-out"
              size={1}
              color="#669335"
              style={{ marginLeft: 28 }}
            />
          )}
        </View>
      </LinearGradient>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: "15%",
    width: "100%",
    justifyContent: "center"
  },
  header2: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 30,
    margin: 10
  }
});
