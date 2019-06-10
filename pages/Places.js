import React from "react";
import { Text } from "@99xt/first-born";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Card from "./components/Card";
import Carousel from "react-native-carousel-control";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import firebase from "firebase";

export default class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      currentCategory: null,
      currentPage: 1
    };
  }

  componentDidMount = () => {
    firebase
      .database()
      .ref("users/")
      .orderByChild("userType")
      .equalTo("business")
      .on("value", snapshot => {
        if (snapshot.val()) {
          this.setState({
            businesses: Object.values(snapshot.val())
          });
        }
      });
  };

  updateCurrentCategory = category => {
    // let current = this.state.businesses.filter(item => {
    //   return item.category && item.category === category;
    // });
    this.setState(state => ({
      ...state,
      currentCategory: this.state.businesses.filter(item => {
        return item.category === category;
      })
    }));
    console.log(this.state.currentCategory);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Places" />
        <View style={styles.carousel}>
          <Carousel
            pageStyle={{
              height: 130,
              marginLeft: 6,
              marginRight: 6,
              marginTop: 10
            }}
            pageWidth={130}
            swipeThreshold={0.2}
            currentPage={this.state.currentPage}
            sneak={65}
          >
            <TouchableOpacity
              onPress={() => this.updateCurrentCategory("zeroWaste")}
            >
              <ImageBackground
                style={{ height: 130, width: 130 }}
                source={require("../assets/530878d8-gp0stt3fm.jpg")}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 110,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#90BC00"
                  }}
                >
                  <Text
                    style={{ color: "#FFFFFF", fontFamily: "poppins-regular" }}
                  >
                    Reduce Plastic
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateCurrentCategory("vegan")}
            >
              <ImageBackground
                style={{ height: 130, width: 130 }}
                source={require("../assets/Black-Bean-Burgers-4-600x600.jpg")}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 110,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#90BC00"
                  }}
                >
                  <Text
                    style={{ color: "#FFFFFF", fontFamily: "poppins-regular" }}
                  >
                    Reduce Meat
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateCurrentCategory("energy")}
            >
              <ImageBackground
                style={{ height: 130, width: 130 }}
                source={require("../assets/energy.jpg")}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 110,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#90BC00"
                  }}
                >
                  <Text
                    style={{ color: "#FFFFFF", fontFamily: "poppins-regular" }}
                  >
                    Green Energy
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateCurrentCategory("clothes")}
            >
              <ImageBackground
                style={{ height: 130, width: 130 }}
                source={require("../assets/clothes.jpg")}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 110,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#90BC00"
                  }}
                >
                  <Text
                    style={{ color: "#FFFFFF", fontFamily: "poppins-regular" }}
                  >
                    Recycle Clothes
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateCurrentCategory("cosmetics")}
            >
              <ImageBackground
                style={{ height: 130, width: 130 }}
                source={require("../assets/lush.png")}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 110,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#90BC00"
                  }}
                >
                  <Text
                    style={{ color: "#FFFFFF", fontFamily: "poppins-regular" }}
                  >
                    Eco Cosmetics
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Carousel>
        </View>
        <ScrollView style={styles.mainContent}>
          <View style={{ padding: 5 }}>
            {this.state.currentCategory ? (
              this.state.currentCategory.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() =>
                    this.props.navigation.navigate("BusinessInfo", {
                      name: item.businessName,
                      description: item.businessDescription,
                      website: item.website,
                      address: item.street + "," + " " + item.postcode,
                      google: item.googlePos,
                      openings: item.openingTimes,
                      mainImage: item.imageURL,
                      mapRegion: item.mapRegion
                    })
                  }
                >
                  <Card
                    title={item.businessName}
                    key={idx}
                    des={item.street + "," + " " + item.postcode}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={{
                  color: "#bababa",
                  fontSize: 13,
                  fontFamily: "poppins-light",
                  paddingTop: "35%",
                  paddingLeft: "5%"
                }}
              >
                Please select a category from above to view relevant businesses
              </Text>
            )}
          </View>
        </ScrollView>
        <Footer {...this.props} active="Places" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  carousel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "-25%",
    marginRight: "-25%"
  },
  mainContent: {
    height: "100%",
    width: "100%",
    paddingBottom: 10
  }
});
