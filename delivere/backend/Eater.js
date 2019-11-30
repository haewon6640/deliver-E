import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();

class Eater {
  callEater() {
    return new Promise(function(resolve, reject) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user.email);
        } else {
          reject(Error("It broke"));
        }
      });
    });
  }

  async getCurrentEater() {
    var currUser = "";
    await this.callEater().then(email => {
      currUser = email;
    });
    return currUser;
  }

  getEaterfromEmail = async email => {
    var eater = {};
    await dbh
      .collection("Eater")
      .doc(email)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          eater = doc.data();
        }
      })
      .catch(error => alert(error.toString()));
    return eater;
  };
}
export default Eater;
