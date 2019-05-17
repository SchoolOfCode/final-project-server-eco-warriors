import React from "react";
import Footer from "./components/Footer";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Text, TabBar, TabItem, Icon } from "@99xt/first-born";

export default class BusinessInfo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <ImageBackground
            style={styles.image}
            source={require("../assets/cleankilo.jpeg")}
          >
            <Ionicons
              name="md-arrow-back"
              size={25}
              color="white"
              marginLeft={20}
              onPress={() => this.props.navigation.navigate("Places")}
            />
            <Text style={styles.mainTitle}>The Clean Kilo</Text>
          </ImageBackground>
          <View style={styles.description}>
            <Text style={styles.title}>Description</Text>
            <Text>0 waste plastic reduction shop</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.description}>
            <Text style={styles.title}>Opening Times </Text>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>Monday</Text>
                <Text style={{ marginRight: 10 }}>Closed</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>Tuesday</Text>
                <Text style={{ marginRight: 10 }}>10am -7pm</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>Wednesday</Text>
                <Text style={{ marginRight: 10 }}>10am -7pm</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>Thursday</Text>
                <Text style={{ marginRight: 10 }}>10am -7pm</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>Friday</Text>
                <Text style={{ marginRight: 10 }}>10am -7pm</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>Saturday</Text>
                <Text style={{ marginRight: 10 }}>9am - 6:30pm</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>Sunday</Text>
                <Text style={{ marginRight: 10 }}>Closed</Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.description}>
            <Text style={styles.title}>Website</Text>
            <Text
            // onPress={() => Linking.openURL("https://thecleankilo.co.uk/")}
            >
              www.thecleankilo.co.uk/
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.description}>
            <Text style={styles.title}>Address</Text>
            <Text>1 Gibb St, Birmingham B9 4BF</Text>
          </View>
          <Image
            style={styles.image2}
            source={require("../assets/cleankilomap.png")}
          />
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
    // marginLeft: 10,
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
    paddingLeft: 10,
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
