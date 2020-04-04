import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform
} from "react-native";
import { Divider, Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import InsetShadow from '../assets/UI/InsetShadow';
import { LinearGradient } from 'expo-linear-gradient';

export default function FirstTimeModal (props) {
  let linearColor = Platform.OS === 'android' ? '#e8e8e8' : '#e4e4e4'
  
  return (
    <InsetShadow size={0.02}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
            <LinearGradient 
            style={styles.firstTimeContainer}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
              <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={require('../assets/images/P31_Square.png')}
                  />
              </View>
              <Text style={styles.titleText}>Patient 31</Text>
              <Text style={styles.conversationText}>Thanks for downloading Patient 31!</Text>
              <Text style={styles.conversationText}>We built app for social distancing... as an easy way to keep track of the daily number of other humans you come in contact with.</Text>
              <Text style={styles.conversationText}>It might be a little rough around the edges. We wanted to get it in your hands as quickly as possible. Please send suggestions to patient31@phxdevs.com.</Text>
              <Text style={styles.conversationText}>Head over to the info tab to learn how to use the app and the story behind the name.</Text>
              <Text style={styles.conversationText}>Stay healthy.</Text>
              <Divider style={styles.divider}/>

              <View style={styles.firstTimeExitContainer}>
                <TouchableHighlight
                  onPress={() => {
                    props.setModalVisible(false);
                  }}
                >
                  <View style={styles.firstTimeExitButtonContainer}>
                    <Text style={styles.firstTimeExitButtonText}>OK</Text>
                  </View>
                </TouchableHighlight>
              </View>
          </LinearGradient>
        </ScrollView>
      </InsetShadow>
  );
}

  const styles = StyleSheet.create({
        outerContainer: {
          width: '90%',
          marginVertical: 20,
          marginHorizontal: 'auto',
          textAlign: 'center',
        },
        lineartop: {
          backgroundColor: '#eafcff',
        },
        firstTimeContainer:{
            flex:1,
            paddingHorizontal: 8,
            marginVertical:22,
            marginHorizontal:25,
            borderRadius:17,
            shadowColor: '#e4e4e4',
            shadowOffset: {
              width: 8,
              height: 8,
            },
            shadowOpacity: 0.5,
            shadowRadius: 12,
            elevation: 8,
        },
        firstTimeExitContainer:{
            flex:2,
            justifyContent:'flex-start',
            alignItems:'center',
        },
        firstTimeExitButtonContainer:{
            width:100,
            height:40,
            borderRadius:10,
            justifyContent:'center',
            marginVertical: 10
        },
        firstTimeExitButtonText:{
            color:'#25BE9A',
            fontSize:20,
            fontWeight:'bold',
            textAlign:'center'
        },
        imageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
        },
        image: {
            height: 150,
            width: 150
        },
        container: {
            // backgroundColor: '#ececec',
            // boxShadow: 'inset 3px 3px 15px rgba(0, 0, 0, 0.25)',
            flex: 1,
            borderRadius: 23,
        },
        contentContainer: {
        },
        titleText: {
          fontFamily: 'Raleway-Medium',
          textAlign: 'center',
          fontSize: 28,
          color: "#4d4d4d",
        },
        conversationText: {
          fontSize: 17,
          paddingHorizontal: 15,
          color: "#4d4d4d",
          fontFamily: 'Roboto-Regular',
          paddingHorizontal: 15,
          paddingVertical: 10
        },
        headerText: {
            fontSize: 29,
            paddingHorizontal: 15,
            textDecorationLine: 'underline',
        },
        divider: {
            marginTop: 7,
            marginBottom: 5,
        },
        optionIconContainer: {
            marginRight: 12,
        },
        option: {
            backgroundColor: '#fdfdfd',
            paddingHorizontal: 15,
            paddingVertical: 15,
            // borderWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: 0,
            // borderColor: '#ededed',
        },
        lastOption: {
            // borderBottomWidth: StyleSheet.hairlineWidth,
        },
        optionText: {
            fontSize: 15,
            alignSelf: 'flex-start',
            marginTop: 1,
        },
    });