import React from "react";
import { View, Button, Dimensions } from "react-native";
import stripe from "tipsi-stripe";
const { width, height } = Dimensions.get("window");
import { doPayment } from "../backend/api.js";
import firebase from "../components/firebase";

stripe.setOptions({
  publishableKey: "pk_test_9EtgxmI85cmO82XDCYolGppU00PJd3REII"
});

export default class AddSubscription extends React.Component {
  static navigationOptions = {
    title: "AddSubscription"
  };
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null
    };
  }
  requestPayment = email => {
    this.setState({ isPaymentPending: true });
    return stripe
      .paymentRequestWithCardForm()
      .then(stripeTokenInfo => {
        return doPayment(100, stripeTokenInfo.tokenId, email);
      })
      .then(() => {
        alert("Payment succeeded!");
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        this.setState({ isPaymentPending: false });
      });
  };
  requestUserPayment = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          this.requestPayment(user.email);
        } else {
          alert("You are not signed in.");
          // No user is signed in.
          return;
        }
      }.bind(this)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Make a payment"
          onPress={this.requestUserPayment}
          disabled={this.state.isPaymentPending}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width: width,
    alignItems: "center",
    justifyContent: "center"
  }
};
