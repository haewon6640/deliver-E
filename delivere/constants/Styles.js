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
  button: {
    position: "absolute",
    bottom: 0,
    height: normalize(80),
    backgroundColor: "#5E72E4",
    width: width,
    alignItems: "center",
    paddingTop: 20
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
    justifyContent: "center",
    alignItems: "center"
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