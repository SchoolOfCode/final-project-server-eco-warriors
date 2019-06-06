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
      totalPoints: "",
      plasticPoints: 35,
      meatPoints: 30,
      energyPoints: 0,
      clothingPoints: 0,
      cosmeticsPoints: 0,
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

    // let totals = {};

    // this.state.transactions &&
    //   this.state.transactions.forEach(item => {
    //     if (!totals[item.category]) {
    //       totals[item.category] = 0;
    //       totals[item.category] += item.points;
    //     } else {
    //       return (totals[item.category] += Number(item.points));
    //     }
    //   });

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
    console.log(this.state);
    console.log("Totals", totals);

    let plastic = (totals.zeroWaste * 3.64).toFixed(0);
    let straws = (plastic / 0.4).toFixed(0);

    let meat = (totals.vegan * 1.9).toFixed(0);
    let miles = (meat * 2.32).toFixed(0);

    const { currentUser } = this.state;
    let sampleData = [
      {
        value: totals.zeroWaste,
        label: "Plastic",
        color: "#c7ea46"
      },
      {
        value: totals.vegan,
        label: "Meat",
        color: "#A9BA9D"
      },
      {
        value: totals.energy,
        label: "Energy",
        color: "#708238"
      },
      {
        value: totals.clothes,
        label: "Clothing",
        color: "#0b6623"
      },
      {
        value: totals.cosmetics,
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
                fontFamily: "dosis-semi-bold",
                padding: 10
              }}
            >
              Hello {this.state.name}
            </Text>
            <PureChart data={sampleData} type="pie" />
            <View style={styles.points}>
              <Roller value={newPoints} />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "dosis-semi-bold",
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
