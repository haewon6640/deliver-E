import React from "react";
import { WebView } from "react-native-webview";
import { createUser } from "../backend/api";
import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();

export default class RunPayInfo extends React.Component {
  webview = null;

  getAllUrlParams(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split("?")[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split("#")[0];

      // split our query string into its component parts
      var arr = queryString.split("&");

      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split("=");

        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof a[1] === "undefined" ? true : a[1];

        // (optional) keep case consistent
        // paramName = paramName.toLowerCase();
        // if (typeof paramValue === "string")
        //   paramValue = paramValue.toLowerCase();

        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, "");
          if (!obj[key]) obj[key] = [];

          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === "string") {
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }

    return obj;
  }

  handleWebViewNavigationStateChange = navState => {
    var { url } = navState;
    if (!url) {
      return;
    }
    // alert(url);\
    code = this.getAllUrlParams(url).code;
    if (code != undefined) {
      createUser(code).then(function(response) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            dbh
              .collection("Runner")
              .doc(user.email)
              .update({ sellerStripeId: response });
          }
        });
      });
      this.props.navigation.navigate("RunHome");
    }
  };
  render() {
    return (
      <WebView
        ref={ref => (this.webview = ref)}
        source={{
          uri:
            "https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://haewon6640.github.io/Portfolio_website/dist/index.html&client_id=ca_GH87Pw3jWZzE6qaGRMoptlpAX3X9y1h1"
        }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }
}
