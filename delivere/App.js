import React from "react";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Menu from "./screens/Menu";
import Customize from "./screens/Customize";
import Register from "./screens/Register";
import Sign from "./screens/Sign";
import Intro from "./screens/Intro";
import Runner from "./screens/Runner";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { Images, articles, argonTheme } from "./constants";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator(
  {
    Intro: Intro,
    Register: Register,
    Sign: Sign,
    Runner: Runner,
    Home: Home,
    Profile: Profile,
    Menu: Menu,
    Customize: Customize
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
