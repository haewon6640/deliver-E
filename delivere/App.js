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
import OrderList from "./screens/OrderList";
import PickingUp from "./screens/PickingUp";
import AfterArrival from "./screens/AfterArrival";
import Delivering from "./screens/Delivering";
import AcceptPopup from "./components/AcceptPopup";
import Test1 from "./screens/Test1";
import Test2 from "./screens/Test2";
import { GalioProvider } from "galio-framework";
import { argonTheme } from "./constants";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

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
    OrderList: OrderList,
    AcceptOrders: AcceptOrders,
    PickingUp: PickingUp,
    AfterArrival: AfterArrival,
    Delivering: Delivering,
    AddSubscription: AddSubscription,
    Test1: Test1,
    Test2: Test2
  },
  {
    initialRouteName: "RunHome",
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

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    AcceptPopup: AcceptPopup
  },
  {
    mode: "modal",
    headerMode: "none",
    transparentCard: true,
  }
);

// const BottomTabs = createBottomTabNavigator(
//   {
//     Home: {
//       screen: RootStack,
//       navigationOptions: 
//     }

//     Profile: Profile
//   },
//   {

//   }
// )

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
