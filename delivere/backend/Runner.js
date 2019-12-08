import firebase from "../components/firebase";
import "@firebase/firestore";
const dbh = firebase.firestore();

class Runner {
  callRunner() {
    return new Promise(function(resolve, reject) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          dbh
            .collection("Runner")
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

  async getCurrentRunner() {
    return await this.callRunner().then(user => {
      return user;
    });
  }
  async getCurrentRunnerEmail() {
    return await this.callRunner().then(user => {
      return user.email;
    });
  }

  getRunnerfromEmail = async email => {
    var runner = {};
    await dbh
      .collection("Runner")
      .doc(email)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          runner = doc.data();
        }
      })
      .catch(error => alert(error.toString()));
    return runner;
  };
}
export default Runner;
