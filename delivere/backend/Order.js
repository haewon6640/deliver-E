class Order {
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
}

export default Restaurant;
