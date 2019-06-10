import React from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
// import the different screens
import Loading from "./pages/Loading";
import SignUp from "./pages/Register";
import Login from "./pages/Login";
import Places from "./pages/Places";
import Profile from "./pages/Profile";
import RegisterBus from "./pages/RegisterBus";
import BusinessPointsPage from "./pages/BusinessPointsPage";
import BusinessInfo from "./pages/BusinessInfo";
import QR from "./pages/QR";
import { Font } from "expo";

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    {
      Loading,
      Login,
      SignUp,
      Profile,
      Places,
      RegisterBus,
      BusinessPointsPage,
      BusinessInfo,
      QR
    },
    {
      initialRouteName: "Loading"
    }
  )
);

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      "overlock-bold": require("./assets/fonts/Overlock-Bold.ttf"),
      "poppins-black": require("./assets/fonts/Poppins-Black.ttf"),
      "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "poppins-italic": require("./assets/fonts/Poppins-Italic.ttf"),
      "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
      "poppins-light": require("./assets/fonts/Poppins-Light.ttf"),
      "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
      "poppins-thin": require("./assets/fonts/Poppins-Thin.ttf"),
      "poppins-black-italic": require("./assets/fonts/Poppins-BlackItalic.ttf"),
      "poppins-bold-italic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
      "poppins-extra-bold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
      "poppins-extra-bold-italic": require("./assets/fonts/Poppins-ExtraBoldItalic.ttf"),
      "poppins-extra-light": require("./assets/fonts/Poppins-ExtraLight.ttf"),
      "poppins-extra-light-italic": require("./assets/fonts/Poppins-ExtraLightItalic.ttf"),
      "poppins-light-italic": require("./assets/fonts/Poppins-LightItalic.ttf"),
      "poppins-medium-italic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
      "poppins-semi-bold": require("./assets/fonts/Poppins-SemiBold.ttf"),
      "poppins-semi-bold-italic": require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
      "poppins-thin-italic": require("./assets/fonts/Poppins-ThinItalic.ttf")
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    );
  }
}
