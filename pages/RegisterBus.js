import React from "react";
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View,
  Picker,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo";
import { Button, Text } from "@99xt/first-born";
import firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class SignUp extends React.Component {
  state = {
    businessName: "",
    businessAddress: "",
    street: "",
    postcode: "",
    email: "",
    businessDescription: "",
    userType: "business",
    email: "",
    category: "",
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
        firebase
          .database()
          .ref("users/" + currentUser.user.uid)
          .set({
            userType: this.state.userType,
            street: this.state.street,
            postcode: this.state.postcode,
            category: this.state.category,
            businessName: this.state.businessName,
            businessAddress: this.state.businessAddress,
            businessDescription: this.state.businessDescription
            //insert QR code
          })
          .then(() => {
            currentUser.user.uid
              .sendEmailVerification()
              .then(() => {
                console.log("this business has been registered ");
              })
              .catch(error => {
                console.log(error);
              });
          })
          .then(() => {
            console.log("inserted business");
            this.props.navigation.navigate("BusinessPointsPage");
          })
          .catch(error => this.setState({ errorMessage: error.message }));
      });
  };
  render() {
    return (
      <LinearGradient
        colors={["#B7DD63", "#90BC00", "#398900"]}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          contentContainerStyle={styles.container}
          style={{ backgroundColor: ["#B7DD63", "#90BC00", "#398900"] }}
        >
          {this.state.errorMessage && (
            <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          )}
          <Text
            color="white"
            style={{
              fontSize: 20,
              marginBottom: "2%",
              fontFamily: "dosis-medium"
            }}
          >
            Business Registration
          </Text>
          <TextInput
            placeholder="Business Name"
            placeholderTextColor="white"
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1,
              fontFamily: "dosis-medium"
            }}
            onChangeText={businessName => this.setState({ businessName })}
            value={this.state.businessName}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Business Email"
            placeholderTextColor="white"
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1,
              fontFamily: "dosis-medium"
            }}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoCapitalize="none"
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
            placeholder="Street"
            placeholderTextColor="white"
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1,
              fontFamily: "dosis-medium"
            }}
            autoCapitalize="none"
            onChangeText={street => this.setState({ street })}
            value={this.state.street}
          />
          <TextInput
            placeholder="Postcode"
            placeholderTextColor="white"
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1,
              fontFamily: "dosis-medium"
            }}
            onChangeText={postcode => this.setState({ postcode })}
            value={this.state.postcode}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Business Description"
            placeholderTextColor="white"
            style={{
              width: "73%",
              height: "7%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1,
              fontFamily: "dosis-medium"
            }}
            onChangeText={businessDescription =>
              this.setState({ businessDescription })
            }
            value={this.state.businessDescription}
            autoCapitalize="none"
          />
          <Picker
            selectedValue={this.state.category}
            style={{
              height: 45,
              width: 280,
              color: "white",
              fontFamily: "dosis-medium"
            }}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemIndex, itemValue);
              this.setState({ category: itemValue });
            }}
          >
            <Picker.Item label="Choose a category" value="cat" />
            <Picker.Item label="Zero Waste" value="zeroWaste" />
            <Picker.Item label="Clothes" value="clothes" />
            <Picker.Item label="Energy" value="energy" />
            <Picker.Item label="Cosmetics" value="cosmetics" />
            <Picker.Item label="Vegan" value="vegan" />
          </Picker>
          {/* <TextInput
            placeholder="Business Category"kl
            placeholderTextColor="white"
            style={{
              width: "73%",
              height: "7%",
              marginBottom: "8%",
              borderBottomColor: "#FFFFFF",
              borderBottomWidth: 1
            }}
            onChangeText={category => this.setState({ category })}
            value={this.state.category}
            autoCapitalize="none"
          /> */}

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
            style={{ marginTop: -15 }}
            transparent
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={{ color: "white", fontFamily: "dosis-medium" }}>
              Not a business?{" "}
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
        </ScrollView>
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
