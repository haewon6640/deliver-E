import { StyleSheet, Dimensions } from 'react-native';
import normalize from "react-native-normalize";
const { width, height } = Dimensions.get("window");
  
 const style = StyleSheet.create({
   container: {                       
     marginTop: 150,
     backgroundColor: '#ededed',
     height: 700,
     width: 300,
     flexWrap: 'wrap'
   },
   button: {
    backgroundColor: "#5E72E4",
    borderRadius: 80,
    height: normalize(60),
    width: width * 0.6,
    marginTop: normalize(20),
    marginBottom: normalize(20)
  },
  whiteText: {
    fontSize: 20,
    color: "white"
  },
   title: {
    alignSelf: "center",
    paddingBottom: 15,
    fontSize: 30,
    color: "#1f396e",
    marginBottom: 20
  },
   text: {
    fontSize: 20,
    color: "#466199",
    paddingLeft: 15
  },
  category: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 8,
    fontSize: 25,
    color: "#1f396e"
  },
  listItem: {
    width: width,
    borderBottomWidth: 1,
    borderBottomColor: "#c9bfbf",
    paddingBottom: 20
  },
  smallPopup: {
    height: 0.4 * height,
    width: 0.8 * width,
    backgroundColor: "white",
    borderWidth: 1,
  },
  smallPopupCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
 })
  
//  const buttons = StyleSheet.create({  
//    primary: {                         
//      flex: 1,
//      height: 70,
//      backgroundColor: 'red',
//      justifyContent: 'center',
//      alignItems: 'center',
//      marginLeft: 20,
//      marginRight: 20
//    }
//  })
  
 export { style }  