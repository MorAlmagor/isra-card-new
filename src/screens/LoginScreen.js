import React, { useState ,useEffect } from "react";
import { View, Text, StyleSheet, Image, Button, AsyncStorage } from "react-native";
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import * as firebaseUtils from '../utilities/firebase';
import { CheckBox } from 'react-native-elements'
import { addUserDetails } from '../store/actions/userActions';
import * as Device from '../utilities/styles/general';
import * as Colors from '../utilities/styles/colors';

const LoginScreen = ({ navigation, OnAddUserDetails }) => {
  const [loginAuto, setLoginAuto] = useState(false)
  const [click, setClick] = useState(false)
  
  AsyncStorage.getItem('loginUserAutoLocal').then((loginBool) => {
    const bool = JSON.parse(loginBool);

    if(bool && !click){
    setLoginAuto(bool)
      checkIfLoggedIn()
    };
    if (!bool) {
      if(bool !== loginAuto){
        setLoginAuto(bool)
      }
    }
    if(bool && click) {
      if(bool !== loginAuto){
        setLoginAuto(bool)
      }
    }
  })

  const handleSignInWithGoogle = () => {
    firebaseUtils.signInWithGoogle();
    checkIfLoggedIn();
  };

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((result) => {
      const userData = result.providerData[0];
      OnAddUserDetails({
        userName: userData.displayName,
        photoURL: userData.photoURL
      })
      navigation.navigate('Home')
    });
  };

  const autologinHandler = () => {
    if (!loginAuto) {
      AsyncStorage.setItem('loginUserAutoLocal', JSON.stringify(true));
    } else {
      AsyncStorage.setItem('loginUserAutoLocal', JSON.stringify(false));
    }
    let tempBool = loginAuto;
    setLoginAuto(!tempBool);
    setClick(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hellowText}>Welcome Stranger!</Text>
        <Text style={styles.userNameText}>Please log in to continue</Text>
        <Text style={styles.userNameText}>to the awesomness</Text>
      </View>
      <View style={styles.imageDiv}>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/unValiduser.png')}
        />
      </View>
      <View style={styles.text3}>
        <View style={{}}>
          <View style={styles.flex1}>
            <Button
              onPress={() => alert('Coming soon')}
              title="Connect with FaceBook"
              color="#3A63BF"
            />
          </View>
          <View style={styles.flex2} >
            <Button
              onPress={() => handleSignInWithGoogle()}
              title="Sign in with Google+"
              color='#C94131'
            />
          </View>
          <View style={styles.flex2} >
            <CheckBox
              center
              title={!loginAuto? 'Remember Me ?': 'Auto Login Active'}
              textStyle={{color: 'white'}}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={loginAuto}
              containerStyle={styles.autologinStyle}
              onPress={() => autologinHandler()}
            />
          </View> 
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    width: '100%',
    height: '100%',
    paddingTop: Device.Height * 0.07
  },
  hellowText: {
    fontSize: Device.Width * 0.08,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: Device.Height * 0.15
  },
  userNameText: {
    fontSize: Device.Width * 0.051,
    textAlign: 'center',
    color: 'white',
    marginTop: Device.Height * 0.01
  },
  header: {
    flex: 1.2
  },
  imageDiv: {
    flex: 2.5,
    alignItems: 'center'
  },
  text3: {
    flex: 1
  },
  imageStyle: {
    borderColor: 'white',
    borderWidth: 10,
    borderRadius: 150,
    width: 190,
    height: 190,
    marginTop: 80
  },
  autologinStyle: {
    backgroundColor: Colors.background,
    borderColor: Colors.background,
    color: 'white'
  }

});

const mapDispatchToProps = (dispatch) => {
  return {
    OnAddUserDetails: (UserDetails) => dispatch(addUserDetails(UserDetails)),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);

