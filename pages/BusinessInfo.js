import React from "react";
import Footer from "./components/Footer";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Linking,
  TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Text, Button } from "@99xt/first-born";

export default class BusinessInfo extends React.Component {
  render() {
    const openingTimes = [
      { day: "Monday", open: "Closed" },
      { day: "Tuesday", open: "10:00am -7:00pm" },
      { day: "Wednesday", open: "10:00am -7:00pm" },
      { day: "Thursday", open: "10:00am -7:00pm" },
      { day: "Friday", open: "10:00am -7:00pm" },
      { day: "Saturday", open: "9:00am -6:30pm" },
      { day: "Sunday", open: "12:00pm -6:00pm" }
    ];
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <ImageBackground
            style={styles.image}
            source={require("../assets/cleankilo.jpeg")}
          >
            <TouchableOpacity>
              <Ionicons
                style={{ marginLeft: 15 }}
                name="md-arrow-back"
                size={30}
                color="white"
                onPress={() => this.props.navigation.navigate("Places")}
              />
            </TouchableOpacity>
            <Text style={styles.mainTitle}>The Clean Kilo</Text>
          </ImageBackground>
          <View style={styles.description}>
            <Text style={styles.title}>Description</Text>
            <Text style={{ fontFamily: "dosis-medium" }}>
              Zero waste plastic reduction shop
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.description}>
            <Text style={styles.title}>Opening Times </Text>
            <View>
              {openingTimes.map((selection, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ fontFamily: "dosis-medium" }}>
                    {selection.day}
                  </Text>
                  <Text style={{ marginRight: 10, fontFamily: "dosis-medium" }}>
                    {selection.open}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.description}>
            <Text style={styles.title}>Website</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://thecleankilo.co.uk/")}
            >
              <Text
                style={{
                  textDecorationLine: "underline",
                  textDecorationColor: "red",
                  fontSize: 15,
                  fontFamily: "dosis-medium"
                }}
              >
                www.thecleankilo.co.uk
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.description}>
            <Text style={styles.title}>Address</Text>
            <Text style={{ fontFamily: "dosis-medium" }}>
              1 Gibb St, Birmingham, B9 4BF
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.google.com/maps/place/The+Clean+Kilo/@52.4748512,-1.8861705,17z/data=!3m1!4b1!4m5!3m4!1s0x4870bd0406f6dded:0xaa4ccc7c4af82c40!8m2!3d52.4748512!4d-1.8839818"
              )
            }
          >
            <Image
              style={styles.image2}
              source={require("../assets/cleankilomap.png")}
            />
          </TouchableOpacity>
          <View style={{ alignItems: "center", padding: 10 }}>
            <Button
              style={{
                backgroundColor: "green",
                width: "65%",
                height: "17%",
                borderRadius: 30
              }}
              onPress={() =>
                Linking.openURL(
                  "https://www.google.com/maps/place/The+Clean+Kilo/@52.4748512,-1.8861705,17z/data=!3m1!4b1!4m5!3m4!1s0x4870bd0406f6dded:0xaa4ccc7c4af82c40!8m2!3d52.4748512!4d-1.8839818"
                )
              }
            >
              <Text style={{ color: "white", fontFamily: "dosis-bold" }}>
                Directions
              </Text>
            </Button>
          </View>
        </ScrollView>
        <Footer {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  mainTitle: {
    fontFamily: "dosis-bold",
    fontSize: 35,
    marginLeft: 15,
    color: "#FFFFFF"
  },
  line: {
    color: "lightgrey",
    margin: 10
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 10
  },
  image2: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 20
  },
  description: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 10,
    fontFamily: "dosis-bold"
  },
  openingTimes: {},
  scroll: {
    height: "80%",
    width: "100%"
  },
  websiteContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontFamily: "dosis-bold",
    marginBottom: 7
    // padding: 5
  },
  divider: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
    margin: 20
  }
});
