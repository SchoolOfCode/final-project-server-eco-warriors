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

export default class Places extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [
        (plastic = [
          {
            name: "The Clean Kilo",
            address: "1 Gibb Street, Birmingham, B9 4BF"
          },
          {
            name: "Nature's Intention",
            address: "2 High Street, Bromsgrove, B61 8HQ"
          },
          {
            name: "Indigo Wholefoods",
            address: "50-52 St Mary's Row, Birmingham, B13 8JG"
          }
        ]),
        (meat = [
          {
            name: "BA-HA",
            address: "The Mailbox, 171-172 Wharfside St, Birmingham, B1 1RL"
          },
          {
            name: "Natural Bar and Kitchen",
            address:
              "1 Sirius (The Orion Building), 24 Suffolk St, Queensway, Birmingham, B1 1LT"
          },
          {
            name: "3 Three's Coffee Lounge",
            address: "17 Martineau Way, Birmingham, B2 4UW"
          },
          {
            name: "Not Dogs",
            address: "LinkStreet, Bullring, Birmingham, B5 4BS"
          },
          {
            name: "The Warehouse Cafe",
            address: "54-57 Allison St, Birmingham, B5 5TH"
          }
        ]),
        (cosmetics = [
          {
            name: "Lush",
            address: "143-144 New St, Birmingham, B2 4NY"
          },
          {
            name: "The Body Shop",
            address:
              "Unit Su518, The Bullring Shopping Centre, Birmingham, B5 4BE"
          },
          {
            name: "The Body Shop",
            address: "Birmingham Station, Unit 14/15 The Concourse, B2 4XJ "
          }
        ]),
        (energy = [
          {
            name: "Green Tech Hub",
            address:
              "Office 1, Izabella House, 24-26 Regent Place, Birmingham, B1 3NJ"
          }
        ]),
        (clothes = [
          {
            name: "H&M",
            address: "Smallbrook Queensway, Birmingham, B5 4BG"
          },
          {
            name: "Oxfam",
            address: "34 St Mary's Row, Birmingham, B13 8JG"
          }
        ])
      ],
      currentCategory: null,
      currentPage: 1
    };
  }

  updateCurrentCategory = category => {
    this.setState(() => ({ currentCategory: [category] }));
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
              onPress={() => this.updateCurrentCategory(plastic)}
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
                  onPress={() => this.updateCurrentCategory(plastic)}
                >
                  <Text style={{ color: "#FFFFFF" }}>Reduce Plastic</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.updateCurrentCategory(meat)}>
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
                  <Text style={{ color: "#FFFFFF" }}>Reduce Meat</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateCurrentCategory(energy)}
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
                  <Text style={{ color: "#FFFFFF" }}>Green Energy</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateCurrentCategory(clothes)}
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
                  <Text style={{ color: "#FFFFFF" }}>Recycle Clothes</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateCurrentCategory(cosmetics)}
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
                  <Text style={{ color: "#FFFFFF" }}>Eco Cosmetics</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Carousel>
        </View>
        <ScrollView style={styles.mainContent}>
          <View style={{ padding: 5 }}>
            {this.state.currentCategory ? (
              this.state.currentCategory[0].map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => this.props.navigation.navigate("BusinessInfo")}
                >
                  <Card title={item.name} key={idx} des={item.address} />
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={{
                  color: "#bababa",
                  fontSize: 15,
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
