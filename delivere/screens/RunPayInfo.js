import React from "react";
import { WebView } from "react-native";

export default class RunPayInfo extends React.Component {
  render() {
    return (
      <WebView
        source={{
          uri:
            "https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://haewon6640.github.io/Portfolio_website/dist/index.html&client_id=ca_GH87Pw3jWZzE6qaGRMoptlpAX3X9y1h1"
        }}
        onNavigationStateChange={navState => {
          const url = new URL(navState.url);
          alert(url);
          const lastSegment = url.pathname.substr(
            url.pathname.lastIndexOf("/") + 1
          );
          this.canGoBack = navState.canGoBack;
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}
