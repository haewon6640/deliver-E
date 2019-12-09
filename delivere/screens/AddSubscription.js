import React, { PureComponent } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Platform,
  StyleSheet,
  Button
} from "react-native";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import { PaymentCardTextField } from "tipsi-stripe";
import Spoiler from "../components/Spoiler";
import testID from "../components/testID";
import stripe from "tipsi-stripe";
import { doPayment } from "../backend/api";
import { createCustomer } from "../backend/api";
import firebase from "../components/firebase";
import { Block } from "galio-framework";
import Eater from "../backend/Eater";

stripe.setOptions({
  publishableKey: "pk_test_9EtgxmI85cmO82XDCYolGppU00PJd3REII"
});

const ContainerView = Platform.select({
  ios: KeyboardAvoidingView,
  android: View
});

export default class AddSubscription extends PureComponent {
  static title = "Card Text Field";

  state = {
    valid: false,
    params: {
      number: "",
      expMonth: 0,
      expYear: 0,
      cvc: ""
    },
    hasCard: 0,
    prevCard: "None"
  };

  handleFieldParamsChange = (valid, params) => {
    this.setState({
      valid,
      params
    });
  };
  createCus = async (valid, params) => {
    const card = {
      number: params.number || "-",
      expMonth: params.expMonth || "-",
      expYear: params.expYear || "-",
      cvc: params.cvc || "-"
    };
    const eater = await new Eater().getCurrentEater();

    return stripe
      .createTokenWithCard(card)
      .then(stripeTokenInfo => {
        return createCustomer(stripeTokenInfo.tokenId, eater.email);
      })
      .then(() => {
        alert("Your card was successfully added!");
        this.props.navigation.navigate("Checkout", {
          totalPrice: this.props.navigation.getParam("totalPrice"),
          order: this.props.navigation.getParam("order"),
          instructions: this.props.navigation.getParam("instructions")
        });
      })
      .catch(error => {
        alert(error);
      });
  };

  eaterHasCustomerId = async () => {
    const eater = await new Eater().getCurrentEater();
    if (typeof eater.stripeCustomerId === "undefined") {
      this.setState({
        hasCard: true
      });
    } else {
      this.setState({
        hasCard: true,
        prevCard:
          eater.CardInfo.brand +
          "   " +
          "\u2022".repeat(12) +
          eater.CardInfo.last4
      });
    }
  };

  render() {
    const { valid, params } = this.state;
    if (!this.state.hasCard) {
      this.eaterHasCustomerId();
    }
    return (
      <ContainerView
        behavior="padding"
        style={styles.container}
        onResponderGrant={dismissKeyboard}
        onStartShouldSetResponder={() => true}
      >
        <Text>{"Current Card: " + this.state.prevCard}</Text>
        <View>
          <PaymentCardTextField
            accessible={false}
            style={styles.field}
            onParamsChange={this.handleFieldParamsChange}
            numberPlaceholder="XXXX XXXX XXXX XXXX"
            expirationPlaceholder="MM/YY"
            cvcPlaceholder="CVC"
            {...testID("cardTextField")}
          />
          <Button
            padding="top"
            title="Add/Change Card"
            onPress={() => this.createCus(this.state.valid, this.state.params)}
          />
          {/* <View style={styles.params}>
              <Text style={styles.instruction} {...testID("paramValid")}>
                Valid: {String(valid)}
              </Text>
              <Text style={styles.instruction} {...testID("paramNumber")}>
                Number: {params.number || "-"}
              </Text>
              <Text style={styles.instruction} {...testID("paramExpMonth")}>
                Month: {params.expMonth || "-"}
              </Text>
              <Text style={styles.instruction} {...testID("paramExpYear")}>
                Year: {params.expYear || "-"}
              </Text>
              <Text style={styles.instruction} {...testID("paramCVC")}>
                CVC: {params.cvc || "-"}
              </Text>
            </View> */}
        </View>
      </ContainerView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instruction: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  token: {
    height: 20
  },
  spoiler: {
    width: 300
  },
  params: {
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    margin: 5
  },
  field: {
    width: 300,
    color: "#449aeb",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    overflow: "hidden"
  }
});

//   render() {
//     return (
//       <View style={styles.container}>
//         <PaymentCardTextField
//           ref={ref => {
//             this.paymentCardInput = ref;
//           }}
//           style={styles}
//           numberPlaceholder=""
//           expirationPlaceholder=""
//           cvcPlaceholder=""
//           disabled={false}
//           onParamsChange={(valid, params) => this.createCus(valid, params)}
//         />
//         <Button
//           title="Make a payment"
//           onPress={this.requestUserPayment}
//           disabled={this.state.isPaymentPending}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: width,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
