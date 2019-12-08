import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();

class Restaurant {
  queryRestaurant = async rName => {
    return await dbh
      .collection("Restaurant")
      .doc(rName)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data();
        }
      })
      .catch(error => alert(error.toString()));
  };
}

export default Restaurant;
