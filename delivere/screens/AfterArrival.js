import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  FlatList
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Button, Block, Icon } from "galio-framework";
const { width, height} = Dimensions.get("window");
const DATA =[{text1: "Pickup By", text2: "3:22PM", key: '1'}, {text1: "Customer", text2: "John J.", key: '2'}];

export default class AfterArrival extends React.Component {
  static defaultProps = {
    draggableRange: { top: height - 60, bottom: 250 }
  };

  _draggedValue = new Animated.Value(180);

  render() {
    return (
        <View style={styles.container}>
          <ScrollView
          // contentContainerStylecontentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
          >
            <FlatList
              data={DATA}
              renderItem={({item}) => (
              <View style={{width: width, borderBottomWidth: 1, borderBottomColor: 'light grey'}}>
                <Text>{item.text1}</Text>
                <Text>{item.text2}</Text>
              </View>) 
    }
            />
          </ScrollView>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Delivering')} style={styles.button}>
          {/* <Block row> */}
            {/* <Icon name="right" family="AntDesign" size={20} color="white" /> */}
            <Text style={{color:"white", fontSize: 25}}>After pickup</Text>
          {/* </Block> */}
        </TouchableOpacity>  
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  panelHeader: {
    height: 180,
    backgroundColor: "white",
    padding: 24,
  },
  textHeader: {
    fontSize: 28,
    color: "#466199"
  },
  progBar:{
    marginTop: 20
  },
  button:{
    position: 'absolute',
    bottom: 0,
    height: 80,
    backgroundColor: "#5E72E4",
    width: width,
    alignItems: 'center',
    paddingTop: 20
  }
});
