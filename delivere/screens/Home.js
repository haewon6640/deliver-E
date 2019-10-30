import React from 'react';
import { ScrollView, View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import { Block, Icon } from 'galio-framework';
import Restaurant from '../components/Restaurant';
import normalize from 'react-native-normalize';
const { width } = Dimensions.get('window');

class Header extends React.Component{
  render(){
    return(
      <Block style={styles.header}>
        <Text style={styles.text}>Delivering to</Text>
        <Block row middle width={width}>
          <Text style={styles.location}>White Hall</Text>
          <Icon style={{marginTop: 7}} name="down" family="AntDesign" size={30} color='#5E72E4'/>
        </Block>
      </Block>
    );
  }
}

export default class Home extends React.Component {
  static navigationOptions = {
    headerTitle: () => <Header />,
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    }
  };
  render(){
    return (
        <View style={styles.container}>
          <ScrollView style={styles.content}>
              <Block row space="evenly" width={width}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')}>
                <Restaurant name='Twisted Taco'/>
              </TouchableOpacity>
              <Restaurant name="Maru" />
              </Block>
              <Block row space="evenly" width={width}>
              <Restaurant name='Blue Donkey'/>
              <Restaurant name="Kaldi's: ESC" />
              </Block>
              <Block row space="evenly" width={width}>
              <Restaurant name='Highland Bakery'/>
              <Restaurant name="Kaldi's: Depot" />
              </Block>
          </ScrollView>
          <Block row space="around" style={styles.footer}>
              <Icon name="home" family="AntDesign" size={35} color='#5E72E4' />
              <Icon name="search1" family="AntDesign" size={35} color='#5E72E4' />
              <Icon name="profile" family="AntDesign" size={35} color='#5E72E4' />
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                <Icon name="user" family="AntDesign" size={35} color='#5E72E4' />
              </TouchableOpacity>
          </Block>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    backgroundColor:'#F8F9FE',
    flex: 1,
    paddingTop: normalize(85)
  },
  location:{
    fontSize: 25,
    color: '#5E72E4'
  },
  header:{
    height: normalize(115),
    paddingTop: normalize(40),
    borderBottomWidth: 1,
    borderColor: '#d6d7da',
    width: width,
    backgroundColor: 'white'
  },
  footer: {
    width: width,
    height: normalize(100),
    paddingTop: normalize(15),
    borderTopWidth: 1,
    borderColor: '#d6d7da'
  },
  text:{
    textAlign: 'center',
    fontSize: normalize(17),
    color: '#1f396e'
  }
});