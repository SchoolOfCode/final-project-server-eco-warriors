import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { StyleSheet, View, ScrollView } from "react-native";
import firebase from "firebase";
import Card from "./components/Card";
import Pie from "./components/Pie";

import { Text } from "@99xt/first-born";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      totalPoints: "",
      transactions: []
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
            totalPoints: snapshot.val().totalPoints,
            transactions: snapshot.val().transactions
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
    let newPoints = this.state.totalPoints * 10;

    const totals = this.state.transactions.reduce(
      (total, item) => {
        if (typeof item === "string") return total;
        if (!total[item.category]) {
          total[item.category] = Number(item.points);
          return total;
        }
        total[item.category] += Number(item.points);
        return total;
      },
      {
        zeroWaste: 1,
        vegan: 0,
        energy: 0,
        clothes: 0,
        cosmetics: 0
      }
    );
    console.log(totals);
    console.log(this.state);
    console.log(firebase.auth().currentUser.uid);

    let plastic = (totals.zeroWaste * 3.64).toFixed(0);
    let straws = (plastic / 0.4).toFixed(0);

    let meat = (totals.vegan * 1.9).toFixed(0);
    let miles = (meat * 2.32).toFixed(0);
    const { currentUser } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Profile" isLoggedIn />
        <ScrollView style={styles.mainContent}>
          <View style={styles.body}>
            <Text
              style={{
                fontSize: 28,
                fontFamily: "dosis-semi-bold"
              }}
            >
              Hello {this.state.name}
            </Text>
            <Pie points={this.state.totalPoints} totals={totals} />
            <Text
              style={{
                fontSize: 18,
                fontFamily: "dosis-semi-bold",
                paddingBottom: 5
              }}
            >
              So far you have prevented:
            </Text>
          </View>
          <View style={styles.body2}>
            <Card
              icon="bottle-wine"
              progress={plastic}
              target={1000}
              iconSize={35}
              iconColor="#00FF00"
              title={`Plastic Waste - ${plastic}g`}
              des={`Of plastic waste from entering the ocean thats the same as ${straws} plastic straws!`}
            />
            <Card
              icon="food"
              progress={meat}
              target={100}
              iconSize={35}
              iconColor="#29AB87"
              title={`Reduce Meat - ${meat}kg of C02`}
              des={`From entering the atmosphere, this is equal to driving ${miles} miles!`}
            />
            <Card
              icon="lightbulb-on"
              iconSize={35}
              iconColor="#BFFF00"
              title="Green Energy"
              des="You have not started using renewable energy"
            />
            <Card
              icon="tshirt-crew"
              iconSize={35}
              iconColor="#8DB600"
              title="Recycle Clothes"
              des="You have not started recycling clothes "
            />
            <Card
              icon="brush"
              iconSize={35}
              iconColor="#008080"
              title="Eco Cosmetics"
              des="You have not started using eco friendly products"
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
    flexDirection: "column",
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
