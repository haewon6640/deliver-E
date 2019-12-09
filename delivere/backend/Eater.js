import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();

class Eater {
  callEater() {
    return new Promise(function(resolve, reject) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          dbh
            .collection("Eater")
            .doc(user.email)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                resolve(doc.data());
              }
            });
        } else {
          reject(Error("It broke"));
        }
      });
    });
  }

  async getCurrentEater() {
    return await this.callEater().then(user => {
      return user;
    });
  }
  async getCurrentEaterEmail() {
    return await this.callEater().then(user => {
      return user.email;
    });
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
