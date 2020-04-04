import React, { useState, useEffect, setState, Component } from 'react';
import { Image, Platform, StyleSheet,TouchableOpacity, View, AsyncStorage, Dimensions } from 'react-native';
import { Tooltip, Text, Button, Icon, Divider  } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ContactCounter from '../components/ContactCounter';
import InsetShadow from '../assets/UI/InsetShadow';
import Reminders from '../components/Reminders';
import FirstTimeModal from '../components/FirstTimeModal'

let width = Dimensions.get('window').width; //full width
let height = Dimensions.get('window').height; //full height

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      activeInfo: false,
      humanTitle: 'Human',
      digitalTitle: 'Digital',
    };
    // this.setModalVisible = this.setModalVisible.bind(this)
  }

  componentDidMount() {
      AsyncStorage.getItem('home_screen_key', (err, result) => {
        if (err) {
        } else {
          if (result == null) {
            console.log("null value recieved", result);
            this.setModalVisible(true);
          } else {
            console.log("result", result);
          }
        }
      });
      AsyncStorage.setItem('home_screen_key', JSON.stringify({"value":"true"}), (err,result) => {
          console.log("error",err,"result",result);
      });
  }

  setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
  }

  handleHumanIconInfo = () => {
    console.log(this.state.activeInfo)
    if (this.state.activeInfo) {
      console.log('setting to false')
      this.setState({
        humanTitle: `Human`,
        activeInfo: !this.state.activeInfo
      })
    } else {
      console.log('setting to true')
      this.setState({
        humanTitle: `Slow the spread!\nLOWER IS BETTER`,
        activeInfo: !this.state.activeInfo
      })
    }
  }

  handleDigitalIconInfo = () => {
    console.log('human icon pressed')
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.modalVisible ? 
          <FirstTimeModal setModalVisible={this.setModalVisible} modalVisible={this.state.modalVisible}/> 
          :
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.getStartedContainer}>
              <InsetShadow size={0.04}>
                <View style={styles.infoIconContainer}>
                    <Icon
                      name='info-circle'
                      type='font-awesome'
                      size={30}
                      color={this.state.activeInfo ? '#fff' : '#D6D6D6'}
                      onPress={() => this.handleHumanIconInfo()}
                    />
                </View>
                <View style={styles.counterContainer}>
                  <View style={styles.counterView}>
                    <Text style={this.state.activeInfo ? styles.infoHeader : styles.counterHeader}>
                      {this.state.humanTitle}
                    </Text>
                    {/* TODO */}
                    {/* Allow Info Icon to toggle content */}
                    {/* <Text style={styles.getStartedText}>{`Slow the spread!\nLOWER IS BETTER`}</Text> */}
                  </View>
                  <ContactCounter name="in_person"/>
                </View>
              </InsetShadow>

            <Divider style={styles.divider} />

              <InsetShadow size={0.04}>
                <View style={styles.infoIconContainer}>
                    <Icon
                      name='info-circle'
                      type='font-awesome'
                      size={30}
                      color='#D6D6D6'
                    />
                </View>
                <View style={styles.counterContainer}>
                  <View style={styles.counterView}>
                    <Text style={styles.counterHeader}>
                      {this.state.digitalTitle}
                    </Text>
                    {/* TODO */}
                    {/* Allow Info Icon to toggle content */}
                    <Text style={styles.getStartedText}></Text>
                  </View>
                  <ContactCounter name="digital"/>
                </View>
              </InsetShadow>
            </View>
          </ScrollView>
        }
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    // paddingLeft: '5%',
    // paddingRight: '5%',
    marginRight: 'auto',
    marginLeft: 'auto',
    flex: 1,
    backgroundColor: '#ececec'
  },
  contentContainer: {
  },
  getStartedContainer: {
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 20,
    textAlign: 'center'
  },
  divider: {
    marginTop: 20
  },
  counterHeader: {
    fontSize: 24,
    color: '#7A7A7A',
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
    marginTop: -10,
    marginBottom: 15
  },
  infoHeader: {
    fontSize: 18,
    color: '#7A7A7A',
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
    marginTop: -10,
    marginBottom: 0
  },
  counterText: {
    fontSize: 80,
    marginHorizontal: 15
  },
  counterContainer: {
    paddingBottom: 30,
    width: width - 30
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  counterView: {
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  infoIconContainer: {
    width: width - 50,
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});
