import React from "react";
import firebase from "firebase";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import Header from "./components/Header";
import {
  Button,
  Text,
  NotificationBarManager,
  Notification
} from "@99xt/first-born";
import { Ionicons } from "@expo/vector-icons";
import { Constants, Permissions, BarCodeScanner } from "expo";

export default class BusinessPointsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPoints: "",
      hasCameraPermission: true,
      scanned: false,
      userID: "",
      currentPoints: 0,
      usersName: "",
      transactions: null,
      business: "",
      category: ""
    };
  }

  componentDidMount() {
    console.log("registerMessageBar");
    console.log("this.refs.alert", this.refs.alert);
    NotificationBarManager.registerMessageBar(this.refs.alert);
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        console.log("I am in this method");
        if (snapshot.val()) {
          console.log(snapshot.val().businessName);
          this.setState({
            business: snapshot.val().businessName,
            category: snapshot.val().category
          });
        }
      });
  }
  componentWillUnmount() {
    console.log("unregisterMessageBar");
    NotificationBarManager.unregisterMessageBar();
  }
  handleShowNotification = () => {
    console.log("handleShowNotification");
    NotificationBarManager.showAlert({
      message: "Your points have been added",
      color: "#398900"
      // required
    });
    this.setState({
      totalPoints: ""
    });
  };

  handleBack = () => {
    this.setState({ scanned: false });
  };

  handleSubmit = () => {
    let newPoints =
      Number(this.state.totalPoints) + Number(this.state.currentPoints);
    let today = new Date();
    let updatedTrans = [
      ...this.state.transactions,
      {
        business: this.state.business,
        category: this.state.category || "none",
        points: this.state.totalPoints,
        date: today
      }
    ];
    firebase
      .database()
      .ref("users/" + this.state.userID)
      .update({ totalPoints: newPoints, transactions: updatedTrans })
      // .update({ transactions: updatedTrans })
      .then(() => {
        console.log("here are the points");
        this.handleShowNotification();
      });
  };

  handleBack = () => {
    this.setState(() => ({
      scanned: false
    }));
  };

  handleScan = ({ data }) => {
    console.log("I have scanned");
    // console.log(firebase.auth().currentUser);
    firebase
      .database()
      .ref("users/" + data)
      .on("value", snapshot => {
        if (snapshot.val()) {
          this.setState({
            scanned: true,
            usersName: snapshot.val().firstName,
            currentPoints: Number(snapshot.val().totalPoints),
            userID: data,
            transactions: snapshot.val().transactions
          });
        }
      });
  };
  render() {
    const { hasCameraPermission, scanned } = this.state;
    return (
      <View style={styles.container}>
        {scanned ? (
          <Header
            title="Points Page"
            isLoggedIn={true}
            back
            onBack={this.handleBack}
          />
        ) : (
          <Header title="Points Page" isLoggedIn={true} />
        )}

        <ScrollView contentContainerStyle={styles.body}>
          <Notification ref={"alert"} />
          {scanned ? (
            <>
              <Text
                style={{
                  fontSize: 25,
                  marginBottom: "20%",
                  fontFamily: "dosis-bold",
                  textAlign: "center"
                }}
              >
                How much has {this.state.usersName} spent today?
              </Text>
              <TextInput
                style={{
                  marginBottom: 40,
                  borderRadius: 4,
                  textAlign: "center",
                  borderBottomColor: "#398900",
                  height: "11%",
                  borderBottomWidth: 1,
                  fontFamily: "dosis-medium",
                  textAlign: "center"
                }}
                placeholder="Please enter points here"
                placeholderTextColor="green"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={totalPoints => this.setState({ totalPoints })}
                value={String(this.state.totalPoints)}
              />
              <Button
                style={{ backgroundColor: "#398900" }}
                onPress={() => this.handleSubmit()}
              >
                <Text style={{ fontFamily: "dosis-medium" }}>
                  Submit points
                </Text>
              </Button>
            </>
          ) : (
            <>
              <Text
                style={{
                  marginBottom: "20%",
                  fontSize: 25,
                  fontFamily: "dosis-bold",
                  textAlign: "center"
                }}
              >
                Please scan QR code
              </Text>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleScan}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                style={{ height: 300, width: 300 }}
              />
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flexDirection: "column"
  },
  body: {
    height: "85%",
    padding: "10%",
    fontSize: 100
  }
});
