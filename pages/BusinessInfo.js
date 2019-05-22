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
    const {
      name,
      description,
      website,
      address,
      google,
      openings,
      mainImage
    } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <ImageBackground style={styles.image} source={{ uri: mainImage }}>
            <TouchableOpacity>
              <Ionicons
                style={{ marginLeft: 15 }}
                name="md-arrow-back"
                size={30}
                color="white"
                onPress={() => this.props.navigation.navigate("Places")}
              />
            </TouchableOpacity>
            <Text style={styles.mainTitle}>{name}</Text>
          </ImageBackground>
          <View style={styles.description}>
            <Text style={styles.title}>Description</Text>
            <Text>{description}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.description}>
            <Text style={styles.title}>Opening Times </Text>
            <View>
              {openings.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text>{item.day}</Text>
                  <Text style={{ marginRight: 10 }}>{item.open}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.description}>
            <Text style={styles.title}>Website</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`http://${website}`)}
            >
              <Text
                style={{
                  textDecorationLine: "underline",
                  textDecorationColor: "red",
                  fontSize: 15
                }}
              >
                {website}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.description}>
            <Text style={styles.title}>Address</Text>
            <Text>{address}</Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(google)}>
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
              onPress={() => Linking.openURL(google)}
            >
              <Text style={{ color: "white" }}>Directions</Text>
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
