import React from 'react';
import { ScrollView, View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import { Block, Icon } from 'galio-framework';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class Home extends React.Component {
  render(){
    return(
      <Block style={styles.container}>
        <Block style={styles.subCont}>
          <Block row style={styles.entry}>
            <Text style={styles.text}>First Name</Text>
            <Text style={styles.right}>a</Text>{/* DATA HERE */}
          </Block >
          <Block row style={styles.entry}>
            <Text style={styles.text}>Last Name</Text>
            <Text style={styles.right}>a</Text>{/* DATA HERE */}
          </Block>
          <Block row style={styles.entry}>
            <Text style={styles.text}>Phone Number</Text>
            <Text style={styles.right}>a</Text>{/* DATA HERE */}
          </Block>
          <Block row style={styles.entry}>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.right}>a</Text>{/* DATA HERE */}
          </Block>
        </Block>
        <Block style={styles.subCont}>
          <Block row style={styles.entry}>
            <Text style={styles.text}>Change password</Text>
          </Block>
        </Block>
      </Block>
    );
  }
}
  
  const styles = StyleSheet.create({
    container:{
      backgroundColor:'#F8F9FE',
      height: height,
    },
    subCont:{
      marginTop: 30
    },
    entry:{
      height: 60,
      paddingLeft: 30,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#F8F9FE'
    },
    right:{
      position: 'absolute',
      left: 200,
      fontSize: 17,
      color: '#1f396e'
    },
    text:{
      fontSize: 17,
      color: '#1f396e'
    }
  });
