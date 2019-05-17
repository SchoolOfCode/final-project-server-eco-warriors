import React from "react";
import firebase from "firebase";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import Header from "./components/Header";
import { Button, Text } from "@99xt/first-born";
import { Ionicons } from "@expo/vector-icons";
import { Constants, Permissions, BarCodeScanner } from "expo";

export default class BusinessPointsPage extends React.Component {
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

  //put a back button
  // have a handle back and set the state to false

  handleSubmit = () => {
    let newPoints =
      Number(this.state.points) + Number(this.state.currentPoints);
    firebase
      .database()
      .ref("users/" + this.state.userID)
      .update({ points: newPoints });
    this.setState(() => ({
      currentPoints: newPoints
    }));
  };

  handleScan = ({ data }) => {
    console.log("I have scanned");
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

  render() {
    const { hasCameraPermission, scanned } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Points Page" isLoggedIn={true} />
        <ScrollView style={styles.body}>
          {scanned ? (
            <>
              <Text
                style={{
                  fontSize: "25",
                  marginBottom: "20%",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                How much has {this.state.usersName} spent today?
              </Text>
              {/* <Ionicons
                name="md-arrow-back"
                size={25}
                color="black"
                marginLeft={20}
                onPress={() => this.props.navigation.navigate("")}
              /> */}
              <TextInput
                style={{
                  //   marginTop: "20%",
                  width: "25%",
                  height: "40%",
                  borderBottomColor: "#FFFFFF",
                  borderBottomWidth: 1,
                  zIndex: 1,
                  fontSize: "18",
                  //   textAlign: "center",
                  //   alignItems: "center",
                  //   justifyContent: "center",

                  marginLeft: "7%",
                  borderColor: "green"
                }}
                placeholder="Please enter points here"
                placeholderTextColor="green"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={points => this.setState({ points })}
                value={String(this.state.points)}
              />
              <Button
                style={{
                  backgroundColor: "#398900",
                  width: "73%",
                  height: "20%",
                  borderRadius: 30,
                  marginTop: 80,
                  //   justifyContent: "center",
                  //   alignItems: "center",
                  marginLeft: "8%",
                  color: "#f74923"
                }}
                onPress={() => this.handleSubmit()}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    alignItems: "center",
                    // fontWeight: "bold",
                    marginRight: "16%"
                  }}
                >
                  Submit points
                </Text>
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

    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 2
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    height: "85%",
    padding: "10%",
    fontSize: 100
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 2
  }
});
