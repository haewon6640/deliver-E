export default class Profile extends React.Component {
  render() {
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    if (user.email.length > 8) {
      user.email = user.email.substring(0, 6) + "...";
    }
    if (user.name.length > 8) {
      user.name = user.name.substring(0, 6) + "...";
    }
    return (
      <Block style={styles.container}>
        <Block style={styles.subCont}>
          <Block row style={styles.entry}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.right}>{user.name}</Text>
          </Block>
          <Block row style={styles.entry}>
            <Text style={styles.text}>Phone Number</Text>
            <Text style={styles.right}>{user.phoneNumber}</Text>
          </Block>
          <Block row style={styles.entry}>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.right}>{user.email}</Text>
          </Block>
        </Block>
        <Block style={styles.subCont}>
          <Block row style={styles.entry}>
            <Text style={styles.text}>Change password</Text>
          </Block>
        </Block>
        <TouchableOpacity onPress={() => signOut()}>
          <Block style={styles.subCont}>
            <Block row style={styles.entry}>
              <Text style={styles.text}>Sign Out</Text>
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FE",
    height: height
  },
  subCont: {
    marginTop: 30
  },
  entry: {
    height: 60,
    paddingLeft: 30,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F8F9FE"
  },
  right: {
    position: "absolute",
    left: 200,
    fontSize: 17,
    color: "#1f396e"
  },
  text: {
    fontSize: 17,
    color: "#1f396e"
  }
});