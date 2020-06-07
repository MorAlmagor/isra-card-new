import React, { useState } from "react";
import * as TMDb from '../utilities/srtings/theMovieDB';
import { Text, StyleSheet, View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Rating } from 'react-native-ratings';
import AddListButton from '../components/Buttons/addToFavorite'; 
import * as Device from '../utilities/styles/general';
import * as Colors from '../utilities/styles/colors';
import { MDTbPosterBaseUrl } from '../utilities/srtings/theMovieDB';


const MovieScreen = ({navigation}) => {
  
  const [addButton, setaddButton] = useState(false);
  const SelectedMovieDATA = navigation.state.params.item;
  const fullReleaseDate = SelectedMovieDATA.item.release_date;
  const yearReleaseDate = fullReleaseDate.substring(0, 4);
  
  return (
    <View>
      <LinearGradient
            colors={['rgba(0,0,0,0.1)', Colors.background ]}
            style={{
              position: 'absolute',
              zIndex: 2,
              left: 0,
              right: 0,
              top:0,
              height: Device.Height * 0.41,
            }}
          />
    <Image
      source={{ uri: MDTbPosterBaseUrl + SelectedMovieDATA.item.backdrop_path}}
      style={styles.backgroundImg}
     />
     <Image
      source={{ uri: TMDb.MDTbPosterBaseUrl + SelectedMovieDATA.item.poster_path }}
      style={styles.posterImg}
     />
    <View style={styles.container}>
      <View style={styles.textContainer} >
      <Text style={styles.title}>{SelectedMovieDATA.item.title} ({yearReleaseDate})</Text>
      <View style={styles.ratingContainer}>
        <Rating
          type='custom'
          ratingCount={5}
          imageSize={60}
          ratingColor={Colors.background}
          ratingBackgroundColor='white'
          imageSize={15}
          readonly={true}
          startingValue={SelectedMovieDATA.item.vote_average/2}
        />
        <Text style={styles.ratingText}>{SelectedMovieDATA.item.vote_average} / 10 TMDb</Text>
        <AddListButton data={SelectedMovieDATA} navigation={navigation} />
      </View>
      <Text style={styles.headerStotyLine}>Storyline</Text>
      <Text style={styles.storylineText}>{SelectedMovieDATA.item.overview}</Text>
      </View>
    </View>
    </View>
  )
};

const styles = StyleSheet.create({
  backgroundImg: {
    width: Device.Width + 2,
    height: Device.Height * 0.4
  },
  posterImg: {
    width: Device.Width * 0.27,
    height: Device.Height * 0.25,
    marginTop: Device.Height * 0.172,
    marginLeft: Device.Height * 0.035,
    zIndex: 6,
    position: 'absolute'
  },
  container: {
    backgroundColor: Colors.background,
    height: Device.Height,
    width: Device.Width + 5
  },
  textContainer: {
    height: 0,
    width: Device.Width + 5,
    zIndex: 3,
    flex: 1
  },
  title: {
    fontSize: 25,
    color: 'white',
    paddingLeft: 25,
    marginTop: 20
  },
  ratingContainer: {
    flexDirection:"row",
    marginLeft: 25,
    marginTop: 7
  },
  ratingText: {
    fontSize: 14,
    color: 'white',
    paddingLeft: 25,
    fontWeight: 'bold',
    position: 'absolute',
    marginLeft: 60,
    bottom: 0
  },
  headerStotyLine: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 25,
    marginTop: 25,
    fontWeight: 'bold'
  },
  storylineText: {
    fontSize: 15,
    color: 'white',
    paddingLeft: 25,
    marginTop: 15,
    paddingRight: 15
  } 
});


export default MovieScreen;
