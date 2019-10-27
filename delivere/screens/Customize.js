import React from 'react';
import { ScrollView, View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Block, Radio } from 'galio-framework';
import MenuItem from '../components/MenuItem'
import SafeAreaView from 'react-native-safe-area-view'
const { width } = Dimensions.get('window');

export default class Customize extends React.Component{
    render(){
    return(
        <ScrollView>
        <Block style={styles.header}>
          <Text style={styles.name}>Taco Combo</Text>
          <Text style={styles.text}>Any 2 tacos with Rice and Beans or
            Chips and Salsa or Chips and Queso for $7.49</Text>
        </Block>
          <Text style={styles.category}>Pick 2</Text>
          <Block style={styles.divider}></Block>
          <Text style={styles.category}>Chicken</Text>
          <Block row>
            <Radio label='' color='#466199' containerStyle={styles.radio}/>
            <MenuItem name='Buffalo Bill - 330 cal'/>
          </Block>
          <Block row>
            <Radio label='' color='#466199' containerStyle={styles.radio}/>
            <MenuItem name='Tombstone Chicken - 240 cal'/>
          </Block>
          <Text style={styles.category}>Pick 1</Text>
          <Block style={styles.divider}></Block>
          <Text style={styles.category}>Side</Text>
          <Block row>
            <Radio label='' color='#466199' containerStyle={styles.radio}/>
            <MenuItem name='Rice and Beans - 250 cal' />
          </Block>
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
  category:{
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 8,
    fontSize: 20,
    color: '#1f396e'
  },
  divider:{
    marginLeft: 25,
    height: 10,
    width: 50,
    borderRadius: 100,
    backgroundColor: '#5E72E4'
  },
  radio:{
    paddingBottom: 20,
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderColor: '#d6d7da'
  }
});
