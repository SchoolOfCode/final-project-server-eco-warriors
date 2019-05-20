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
import { Text } from "@99xt/first-born";

export default class BusinessInfo extends React.Component {
  render() {
    const openingTimes = [
      { day: "Monday", open: "Closed" },
      { day: "Tuesday", open: "10am -7pm" },
      { day: "Wednesday", open: "10am -7pm" },
      { day: "Thursday", open: "10am -7pm" },
      { day: "Friday", open: "10am -7pm" },
      { day: "Saturday", open: "9am -6:30pm" },
      { day: "Sunday", open: "12pm -6pm" }
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
            <Text>Zero waste plastic reduction shop</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.description}>
            <Text style={styles.title}>Opening Times </Text>
            <View>
              {openingTimes.map((selection, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text>{selection.day}</Text>
                  <Text style={{ marginRight: 10 }}>{selection.open}</Text>
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
              <Text>www.thecleankilo.co.uk</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.description}>
            <Text style={styles.title}>Address</Text>
            <Text>1 Gibb St, Birmingham, B9 4BF</Text>
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
    fontSize: 30,
    marginLeft: 15,
    fontWeight: "bold",
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
    marginLeft: 10
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
    fontWeight: "bold",
    marginBottom: 7
    // padding: 5
  },
  divider: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
    margin: 20
  }
});
