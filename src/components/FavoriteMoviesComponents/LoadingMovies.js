import React from "react";
import { Text, StyleSheet, View, FlatList, Dimensions, Image, TouchableOpacity, ScrollView } from "react-native";
import * as Device from '../../utilities/styles/general';
import * as Colors from '../../utilities/styles/colors';

const LoadingMovies = () => {

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
        <View >
        <FlatList
          data={[1,2,3,4]}
          horizontal={true}
          renderItem={(item) => {
            return (
              <View style={styles.movieBlank} />              
            );
          }}
          keyExtractor={ item => item + ''}
        />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingBottom: Device.Height * 0.01,
    paddingTop: Device.Height * 0.05,
    paddingLeft: Device.Width * 0.025
  },
  header: {
    fontSize: Device.Width * 0.055,
    color: 'white'
  },
  movieBlank: {
    backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: Device.Width * 0.35,
    borderRadius: 1,
    margin: 3,
    height: Device.Height * 0.25,
    marginTop: Device.Height * 0.022
  }
});

export default LoadingMovies;

