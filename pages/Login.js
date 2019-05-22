import React from "react";
import { StyleSheet, View, Image, TextInput } from "react-native";
import firebase from "firebase";
import { LinearGradient } from "expo";
import { Button, Text } from "@99xt/first-born";

export default class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(currentUser => {
        firebase
          .database()
          .ref("users/" + currentUser.user.uid)
          .once("value")
          .then(snapshot => {
            var userInfo = snapshot.val();
            console.log(userInfo);
            if (userInfo.userType === "personal") {
              console.log("logged in as personal user, should go to home");
              this.props.navigation.navigate("Profile");
            } else {
              console.log(
                "logged in as business user, should go to business page"
              );
              this.props.navigation.navigate("BusinessPointsPage");
            }
          });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({ errorMessage: err.message });
      });
  };

  render() {
    return (
      <LinearGradient
        colors={["#B7DD63", "#90BC00", "#398900"]}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Image
            style={{
              width: 200,
              height: 200,
              marginBottom: 10
            }}
            source={require("../assets/logoeco.png")}
          />
          <TextInput
            placeholder="Email"
            placeholderTextSize-="20"
            placeholderTextColor="#FFFFFF"
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1
            }}
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry
            autoCapitalize="none"
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1,
              marginBottom: "10%",
              paddingTop: 20
            }}
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Text>{this.state.errorMessage}</Text>
          <Button
            onPress={() => this.handleLogin()}
            style={{
              backgroundColor: "white",
              width: "73%",
              height: "7%",
              borderRadius: 30
            }}
          >
            <Text style={{ color: "black" }}>Log In</Text>
          </Button>
          <Button
            style={{ marginTop: 40 }}
            transparent
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={{ color: "white" }}>
              New User?{" "}
              <Text style={{ textDecorationLine: "underline", color: "white" }}>
                Register Here
              </Text>
            </Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("RegisterBus")}
            transparent
            style={{ marginTop: -15 }}
          >
            <Text style={{ color: "white" }}>
              Business Owner?{" "}
              <Text style={{ textDecorationLine: "underline", color: "white" }}>
                Register Here
              </Text>
            </Text>
          </Button>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
