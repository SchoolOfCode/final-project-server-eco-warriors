import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { StyleSheet, View, ScrollView } from "react-native";
import firebase from "firebase";
import Card from "./components/Card";
import Roller from "./components/Tcker";

import { Text } from "@99xt/first-born";
import PureChart from "react-native-pure-chart";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      points: "",
      plasticPoints: 35,
      meatPoints: 30,
      energyPoints: 0,
      clothingPoints: 0,
      cosmeticsPoints: 0
    };
  }

  componentDidMount = () => {
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        if (snapshot.val()) {
          this.setState({
            name: snapshot.val().firstName,
            points: snapshot.val().points
          });
        }
      });
  };

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
    let newPoints = this.state.points * 10;
    let plastic = (this.state.plasticPoints * 3.64).toFixed(0);
    let straws = (plastic / 0.4).toFixed(0);

    let meat = (this.state.meatPoints * 1.9).toFixed(0);
    let miles = (meat * 2.32).toFixed(0);
    const { currentUser } = this.state;
    let sampleData = [
      {
        value: this.state.plasticPoints,
        label: "Plastic",
        color: "#c7ea46"
      },
      {
        value: this.state.meatPoints,
        label: "Meat",
        color: "#A9BA9D"
      },
      {
        value: this.state.energyPoints,
        label: "Energy",
        color: "#708238"
      },
      {
        value: this.state.clothingPoints,
        label: "Clothing",
        color: "#0b6623"
      },
      {
        value: this.state.cosmeticsPoints,
        label: "Cosmetics",
        color: "#4B5320"
      }
    ];
    return (
      <View style={styles.container}>
        <Header title="Profile" isLoggedIn />
        <ScrollView style={styles.mainContent}>
          <View style={styles.body}>
            <Text
              style={{
                fontSize: 28,
                fontFamily: "poppins-bold",
                padding: 10
              }}
            >
              Hello {this.state.name}
            </Text>
            <PureChart data={sampleData} type="pie" />
            <View style={styles.points}>
              {/* <Text
                style={{
                  color: "white",
                  zIndex: 1,
                  fontSize: 65,
                  fontFamily: "dosis-bold"
                }}
              >
                {this.state.points}
              </Text> */}
              <Roller value={newPoints} />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "poppins-medium",
                padding: 5
              }}
            >
              So far you have prevented:
            </Text>
          </View>
          <View style={styles.body2}>
            <Card
              icon="bottle-wine"
              iconSize={35}
              iconColor="#c7ea46"
              title={`Plastic Waste - ${plastic}g`}
              des={` Of plastic waste from entering the ocean thats the same as ${straws} plastic straws!`}
            />
            <Card
              icon="food"
              iconSize={35}
              iconColor="#A9BA9D"
              title={`Reduce Meat - ${meat}kg`}
              des={` Of C02 from entering the atmosphere, equal to driving ${miles} miles!`}
            />
            <Card
              icon="lightbulb-on"
              iconSize={35}
              iconColor="#708238"
              title="Green Energy"
              des="you have not yet started using renewable energy"
            />
            <Card
              icon="tshirt-crew"
              iconSize={35}
              iconColor="#0b6623"
              title="Recycle Clothes"
              des="you have not yet started recycling clothes "
            />
            <Card
              icon="brush"
              iconSize={35}
              iconColor="#4B5320"
              title="Eco Cosmetics"
              des="you have not yet started using enviromentaly friendly products"
            />
          </View>
        </ScrollView>
        <Footer {...this.props} active="Profile" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  container2: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    borderTopColor: "lightgrey",
    borderTopWidth: 1
  },
  mainContent: {
    height: "80%",
    width: "100%"
  },
  body: {
    flexDirection: "column",
    alignItems: "center"
  },
  body2: {
    flexDirection: "column",
    paddingBottom: 10
  },
  points: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 120
  }
});
