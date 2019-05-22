import React from "react";
import firebase from "firebase";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import Header from "./components/Header";
import {
  Button,
  Text,
  SnackManager,
  NotificationBarManager,
  Notification
} from "@99xt/first-born";
import { Ionicons } from "@expo/vector-icons";
import { Constants, Permissions, BarCodeScanner } from "expo";

export default class BusinessPointsPage extends React.Component {
  componentDidMount() {
    NotificationBarManager.registerMessageBar(this.refs.alert);
  }
  constructor(props) {
    super(props);
    this.state = {
      points: "",
      hasCameraPermission: true,
      scanned: false,
      userID: "",
      currentPoints: 0,
      usersName: ""
    };
  }

  //   componentDidMount() {
  //     SnackManager.registerMessageBar(this.refs.alert);
  //   }
  handleBack = () => {
    this.setState({ scanned: false });
  };

  handleSubmit = () => {
    let newPoints =
      Number(this.state.points) + Number(this.state.currentPoints);
    firebase
      .database()
      .ref("users/" + this.state.userID)
      .update({ points: newPoints })
      .then(() => {
        console.log("here are the points");
        console.log(NotificationBarManager);
        NotificationBarManager.showAlert({
          message: "Your points have been added"
          // required
        });
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
            currentPoints: Number(snapshot.val().points),
            userID: data
          });
        }
      });
  };
  componentWillUnmount() {
    SnackManager.unregisterMessageBar();
  }
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
          {scanned ? (
            <>
              <Text
                style={{
                  fontSize: 25,
                  marginBottom: "20%",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                How much has {this.state.usersName} spent today?
              </Text>
              <TextInput
                style={{
                  marginBottom: 40,
                  borderRadius: 4,
                  //   borderWidth: 0.5,
                  //   borderBottomColor: "#FFFFFF",
                  //   borderColor: "#d6d7da",
                  textAlign: "center",
                  borderBottomColor: "#398900",
                  height: "11%",
                  borderBottomWidth: 1
                }}
                placeholder="Please enter points here"
                placeholderTextColor="green"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={points => this.setState({ points })}
                value={String(this.state.points)}
              />
              <Notification ref={"alert"} />
              <Button
                style={{ backgroundColor: "#398900" }}
                onPress={() => this.handleSubmit()}
              >
                <Text>Submit points</Text>
              </Button>
            </>
          ) : (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleScan}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
              style={{ height: 300, width: 300 }}
            />
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
    // justifyContent: "center",
    // alignItems: "center",
    height: "85%",
    padding: "10%",
    fontSize: 100
  }
});
