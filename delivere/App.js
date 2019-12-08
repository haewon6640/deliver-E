// THIS CODE IS OUR OWN WORK, IT WAS WRITTEN WITHOUT CONSULTING
//    A TUTOR OR CODE WRITTEN BY OTHER STUDENTS OUTSIDE OF OUR TEAM.
//    - Gene Lee, Lynda Hu, Jerry Park, Seo Choe, Jonathan To
import React from "react";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Menu from "./screens/Menu";
import Register from "./screens/Register";
import Sign from "./screens/Sign";
import RunSign from "./screens/RunSign";
import Intro from "./screens/Intro";
import Runner from "./screens/Runner";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";
import AddSubscription from "./screens/AddSubscription";
import ProgTrack from "./screens/ProgTrack";
import RunHome from "./screens/RunHome";
import RunProfile from "./screens/RunProfile";
import AcceptOrders from "./screens/AcceptOrders";
import PendingOrders from "./screens/PendingOrders";
import MyOrders from "./screens/MyOrders";
import PickingUp from "./screens/PickingUp";
import AfterArrival from "./screens/AfterArrival";
import Delivering from "./screens/Delivering";
import AcceptPopup from "./components/AcceptPopup";
import PastOrders from "./screens/PastOrders";
import { GalioProvider } from "galio-framework";
import { argonTheme } from "./constants";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Text, Dimensions } from "react-native";
import { Icon } from "galio-framework";
import normalize from "react-native-normalize";
import firebase from "./components/firebase";
import "@firebase/firestore";
const db = firebase.firestore();
const { height, width } = Dimensions.get("window");

const MainStack = createStackNavigator(
  {
    Intro: Intro,
    Sign: Sign,
    RunSign: RunSign,
    Register: Register,
    Runner: Runner,
    Home: Home,
    Profile: Profile,
    Menu: Menu,
    Cart: Cart,
    Checkout: Checkout,
    AddSubscription: AddSubscription,
    ProgTrack: ProgTrack,
    RunHome: RunHome,
    RunProfile: RunProfile,
    AcceptOrders: AcceptOrders,
    PendingOrders: PendingOrders,
    MyOrders: MyOrders,
    PickingUp: PickingUp,
    AfterArrival: AfterArrival,
    Delivering: Delivering,
    AddSubscription: AddSubscription,
    AcceptPopup: AcceptPopup
  },
  {
    initialRouteName: "Intro",
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      },
      headerTintColor: "#5E72E4"
    }
  }
);

MainStack.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (
    routeName != "Home" &&
    routeName != "RunHome" &&
    routeName != "Profile" &&
    routeName != "RunProfile"
  ) {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

const RootStack = createBottomTabNavigator(
  {
    Home: MainStack,
    Orders: PastOrders,
    Profile: Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarVisible: true,
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName, familyName;
        if (routeName === "Home") {
          iconName = "home";
          familyName = "FontAwesome5";
        } else if (routeName === "Orders") {
          iconName = "receipt";
          familyName = "FontAwesome5";
        } else if (routeName === "Profile") {
          iconName = "user";
          familyName = "AntDesign";
        }

        return (
          <Icon
            name={iconName}
            family={familyName}
            size={normalize(35)}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      style: { height: 60, padding: 5 },
      activeTintColor: "#5E72E4",
      inactiveTintColor: "gray"
    }
  }
);

// const HomeStack = createStackNavigator(
//   {
//     Main: MainStack,
//     AcceptPopup: AcceptPopup
//   },
//   {
//     mode: "modal",
//     headerMode: "none",
//     transparentCard: true,
//   }
// );

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <GalioProvider theme={argonTheme}>
        <AppContainer />
      </GalioProvider>
    );
  }
}
