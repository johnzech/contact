import React, { useState, useEffect, setState, Component } from 'react';
import { Image, Platform, StyleSheet,TouchableOpacity, View, AsyncStorage, Dimensions } from 'react-native';
import { Tooltip, Text, Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import PlusIcon from '../assets/icons/plus.svg'
import MinusIcon from '../assets/icons/minus.svg'
import { MonoText } from './StyledText';

let width = Dimensions.get('window').width; //full width

export default class ContactCounter extends Component {
    state = {
        count: 0,
        name: this.props.name
    }
    render() {
        // set up dynamic styles for the text (based on name)
        let dynamic_styles = [styles.counterText]
        if (this.state.name == 'in_person') {
          dynamic_styles.push(styles.red)
        } else if (this.state.name == 'digital') {
          dynamic_styles.push(styles.green)
        }
        return (
          
            <View style={styles.buttonGroup}>
                <MinusIcon
                  style={styles.icon}
                  onPress= {() => this.handleDecrease()}
                />
                <Text style={dynamic_styles}>{this.state.count}</Text>
                <PlusIcon
                  style={styles.icon} 
                  onPress= {() => this.handleIncrease()}
                />
            </View>
        );
    }

    componentDidMount() {
        this._retrieveData()
    }

    handleDecrease() {
        if (this.state.count > 0){
          this.setState({count: this.state.count - 1 }, this.storeCount)
        }
    }
 
    handleIncrease() {
        this.setState({count: this.state.count + 1 }, this.storeCount)
    }

    getStorageKey() {
      let today = new Date();
      let date = today.getDate() + "_" + parseInt(today.getMonth()+1, 10) + "_" + today.getFullYear()
      return '@' + this.state.name + '_' + date;
    }

    async storeCount() {
        try {
          await AsyncStorage.setItem(this.getStorageKey(), this.state.count.toString())
          console.log('data stored: ' + this.state.count)
        } catch (e) {
          // saving error
          console.log(e);
        }
    }

    async _retrieveData() {
        try {
          const value = await AsyncStorage.getItem(this.getStorageKey());
          console.log('data retrieved: ' + value)
    
          if (value !== null) {
            // We have data!!
            this.setState({count: parseInt(value, 10)});
            console.log(value);
          } else {
            console.log("No " + this.getStorageKey() + " key stored");
          }
        } catch (error) {
          // Error retrieving data
        }
      }
}

const styles = StyleSheet.create({
    counterText: {
        fontSize: 60,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        width: width - 230
      },
    red: {
      color: '#CF3150'
    },
    green: {
      color: '#25BE9A'
    },
    icon: {
      borderRadius: 50,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 6,
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
      }
});