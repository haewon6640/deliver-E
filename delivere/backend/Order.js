class Restaurant {
  queryRestaurant = async rName => {
    var resta = "";
    await dbh
      .collection("Restaurant")
      .doc(rName)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          resta = doc.data();
        }
      })
      .catch(error => alert(error.toString()));
    return resta;
  };
}

export default Restaurant;
