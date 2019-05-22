import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { LinearGradient } from "expo";
import { Button, Text } from "@99xt/first-born";
import firebase from "firebase";
// import RadioForm, {
//   RadioButton,
//   RadioButtonInput,
//   RadioButtonLabel
// } from "react-native-simple-radio-button";

// when a user Registers firebase takes in Email and Password and saves in the "Auth" tab
// After it is saved in the auth tab (in firebase) to save the rest of the fields in the
//users database (firebase)
// and then redirect user to Home Page

// import firebaseConfig from "../firebase.config";

export default class SignUp extends React.Component {
  state = {
    name: "",
    userType: "personal",
    surname: "",
    location: "",
    email: "",
    password: "",
    errorMessage: null
  };
  navigateToLogin = () => {
    this.props.navigation.navigate("Login");
  };
  handleSignUp = () => {
    // console.log(this.state);
    // firebase.initializeApp(firebaseConfig);
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(currentUser => {
        console.log(currentUser.user.uid);
        console.log(this.state.userType);

        //here we would create the QR code with the USER uid?

        firebase
          .database()
          .ref("users/" + currentUser.user.uid)
          .set({
            userType: this.state.userType,
            firstName: this.state.name,
            surname: this.state.surname,
            location: this.state.location,
            points: 0
            //insert QR code
          })
          .then(() => {
            console.log("inserted");
            this.props.navigation.navigate("Profile");
          })
          .catch(error => this.setState({ errorMessage: error.message }));
      });
  };

  // 0. set up fake gmail
  // 0.1 add to firebase
  // 0.2 try adding a new user
  // 1. find out if you can have multiple collections in real time
  // look at firebase through post man
  //   figure it out at home?
  // 2. we need another route to add and subtract points
  //   2.1 `post /points/${userId}?add=true&points=${point}`
  // 3. QR codes - generate with url
  //    3.1 text: userId
  // 4. business schema's
  // 5. import json for business's
  // 6. 'get' route from db
  //

  // supertest to check api calls

  render() {
    return (
      <LinearGradient
        colors={["#B7DD63", "#90BC00", "#398900"]}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {this.state.errorMessage && (
            <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          )}
          <Text
            color="white"
            style={{
              fontSize: 20,
              marginBottom: "7%",
              marginTop: -30,
              fontFamily: "dosis-medium"
            }}
          >
            Personal Registration
          </Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="white"
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1,
              fontFamily: "dosis-medium"
            }}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Surname"
            placeholderTextColor="white"
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1,
              fontFamily: "dosis-medium"
            }}
            onChangeText={surname => this.setState({ surname })}
            value={this.state.surname}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="white"
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1,
              fontFamily: "dosis-medium"
            }}
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1,
              fontFamily: "dosis-medium"
            }}
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TextInput
            placeholder="Location"
            placeholderTextColor="white"
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1,
              marginBottom: "8%",
              fontFamily: "dosis-medium"
            }}
            autoCapitalize="none"
            onChangeText={location => this.setState({ location })}
            value={this.state.location}
          />
          <Button
            style={{
              backgroundColor: "white",
              width: "73%",
              height: "8%",
              borderRadius: 30
            }}
            onPress={() => this.handleSignUp()}
          >
            <Text style={{ color: "black", fontFamily: "dosis-medium" }}>
              Register
            </Text>
          </Button>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white", fontFamily: "dosis-medium" }}>
              Already have an account?{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "white",
                  fontFamily: "dosis-medium"
                }}
              >
                Login
              </Text>
            </Text>
          </Button>
          <Button
            transparent
            style={{ marginTop: -15 }}
            onPress={() => this.props.navigation.navigate("RegisterBus")}
          >
            <Text style={{ color: "white", fontFamily: "dosis-medium" }}>
              Business Owner?{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "white",
                  fontFamily: "dosis-medium"
                }}
              >
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
    justifyContent: "center",
    alignItems: "center"
  }
});
