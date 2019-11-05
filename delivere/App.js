import React from "react";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Menu from "./screens/Menu";
import Customize from "./screens/Customize";
import Register from "./screens/Register";
import Sign from "./screens/Sign";
import RunSign from "./screens/RunSign";
import Intro from "./screens/Intro";
import Runner from "./screens/Runner";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";
import ProgTrack from "./screens/ProgTrack";
import RunHome from "./screens/RunHome";
import AcceptOrders from "./screens/AcceptOrders";
import OrderList from "./screens/OrderList";
import { GalioProvider } from "galio-framework";
import { argonTheme } from "./constants";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator(
  {
    Intro: Intro,
    Sign: Sign,
    RunSign: RunSign,
    Register: Register,
    Runner: Runner,
    Home: Home,
    Profile: Profile,
    Menu: Menu,
    Customize: Customize,
    Cart: Cart,
    Checkout: Checkout,
    ProgTrack: ProgTrack,
    RunHome: RunHome,
    AcceptOrders: AcceptOrders,
    OrderList: OrderList
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

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <GalioProvider theme={argonTheme}>
        <AppContainer />
      </GalioProvider>
    );
  }
}
