import firebase from "../components/firebase";
import "@firebase/firestore";
import Runner from "./Runner";
const dbh = firebase.firestore();

export default class Order {
  queryOrder = async oid => {
    var resta = "";
    await dbh
      .collection("Order")
      .doc(oid)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          resta = doc.data();
        }
      })
      .catch(error => alert(error.toString()));
    return resta;
  };
  queryUnpickedOrders = async () => {
    return await dbh
      .collection("Order")
      .where("isAccepted", "==", false)
      .orderBy("date", "desc")
      .get()
      .then(function(querySnapshot) {
        orders = [];
        querySnapshot.forEach(function(doc) {
          orders.push(doc.data());
        });
        return orders;
      });
  };
  queryMyOrders = async () => {
    email = await new Runner().getCurrentRunnerEmail();
    return await dbh
      .collection("Order")
      .where("runnerEmail", "==", email)
      .orderBy("date", "desc")
      .get()
      .then(function(querySnapshot) {
        orders = [];
        querySnapshot.forEach(function(doc) {
          orders.push(doc.data());
        });
        return orders;
      });
  };
}
