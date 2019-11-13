import firebase from "../components/firebase";
class Eater {
  postCallEater() {
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
    await this.postCallEater().then(email => {
      currUser = email;
    });
    return currUser;
  }
}
export default Eater;
