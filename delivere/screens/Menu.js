import React from 'react';
import { ScrollView, View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Block, Icon} from 'galio-framework';
import MenuItem from '../components/MenuItem'
import SafeAreaView from 'react-native-safe-area-view'
const { width } = Dimensions.get('window');

export default class Menu extends React.Component{
    render(){
    return(
      <ScrollView>
      <Image source={require('../assets/twistedtaco.jpg')} style={{ width: width, height: 180 }}/>
        <Block style={styles.header}>
          <Text style={styles.name}>Twisted Taco</Text>
          <Block row>
            <Text style={styles.text}>Tex-Mex</Text>
            <Text style={styles.rating}>4.7</Text>
            <Icon name="star" family="AntDesign" size={20} color='#5E72E4'/>
            <Text style={{fontSize: 17, color: '#466199', paddingLeft: 5}}>(45 ratings)</Text>
          </Block>
          <Text style={styles.text}>5-10 Min</Text>
        </Block>
        <Text style={styles.category}>Featured Items</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Customize')}>
          <MenuItem name='Taco Combo' pricecal='$7.49'/>
        </TouchableOpacity>
        <MenuItem name='Chips and Salsa' pricecal='$2.19 - 450 cal'/>
        <Text style={styles.category}>Chicken</Text>
        <MenuItem name='Buffalo Bill' pricecal='$3.49 - 330 cal'/>
        <MenuItem name='Tombstone Chicken' pricecal='$3.49 - 240 cal'/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    height: 140,
    width: width,
    borderBottomWidth: 1,
    borderBottomColor: '#8e8383'
  },
  name: {
    paddingLeft: 25,
    paddingTop: 20,
    paddingBottom: 15,
    fontSize: 30,
    color: '#1f396e'
  },
  text:{
    fontSize: 17,
    color: '#466199',
    paddingLeft: 30,
  },
  rating:{
    paddingLeft: 60,
    paddingRight: 5,
    paddingBottom: 8,
    fontSize: 17,
    color: '#466199'
  },
  category:{
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 8,
    fontSize: 20,
    color: '#1f396e'
  }
});