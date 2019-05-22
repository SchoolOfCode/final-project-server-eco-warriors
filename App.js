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
      "dosis-regular": require("./assets/fonts/Dosis-Regular.ttf"),
      "dosis-bold": require("./assets/fonts/Dosis-Bold.ttf"),
      "dosis-extra-bold": require("./assets/fonts/Dosis-ExtraBold.ttf"),
      "dosis-light": require("./assets/fonts/Dosis-Light.ttf"),
      "dosis-extra-light": require("./assets/fonts/Dosis-ExtraLight.ttf"),
      "dosis-medium": require("./assets/fonts/Dosis-Medium.ttf"),
      "dosis-semi-bold": require("./assets/fonts/Dosis-SemiBold.ttf")
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
