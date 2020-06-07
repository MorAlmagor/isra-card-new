import React from "react";
import { View, Text, StyleSheet, Image, Button, AsyncStorage } from "react-native";
import * as Device from '../utilities/styles/general';
import * as Colors from '../utilities/styles/colors';
import { removeUserDetail } from '../store/actions/userActions';
import { connect } from 'react-redux';

const DashboardScreen = ({ navigation, user, LogoutUser }) => {
  
  const reNameUser = (str) => {  
    let res = str.toLowerCase();
    return res.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  } 

  const logOutUser = () => {
    LogoutUser();
    AsyncStorage.setItem('loginUserAutoLocal', JSON.stringify(false));
    navigation.navigate('Login')
  }

  let userName = 'User'
  if (user.userName) {
    userName = reNameUser(user.userName)
  } else {

  } 

  return (

    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.hellowText}>Hello!</Text>
      <Text style={styles.userNameText}>{userName}</Text>
      </View>
        <View style={styles.imageDiv}>
        <Image
            style={styles.imageStyle}
            source={{ uri: user.photoURL }}
          />
        </View>
      <View style={styles.flexContainer}>
          <View>
            <Button
              onPress={() => navigation.navigate('MostPopular')}
              title="Most Popular"
              color={Colors.primery}
            />
          </View>
          <View  >
            <Button
              onPress={() => navigation.navigate('Favorite')}
              title="Favorite Movies"
              color={Colors.darkGreen}
            />
          </View>
          <View  >
            <Button
              onPress={() => logOutUser()}
              title="Logout"
              color={Colors.red}
            />
          </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1818',
    width: '100%',
    height: '100%',
    paddingTop: 50
  },
  hellowText: {
    fontSize: Device.Height * 0.038,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: Device.Height * 0.18
  },
  userNameText: {
    fontSize: Device.Height * 0.048,
    textAlign: 'center',
    color: 'white',
    marginTop: Device.Height * 0.009,
  },
  header: {
    flex: 1.2
  },
  imageDiv: {
    flex: 2.5,
    alignItems: 'center'
  },
  flexContainer: {
    flex: 1
  },
  imageStyle: {
    borderColor: 'white',
    borderWidth: Device.Height * 0.013,
    borderRadius: 150,
    width: 190,
    height: 190,
    marginTop: Device.Height * 0.12
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LogoutUser: () => dispatch(removeUserDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);

