import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import axios from 'axios';
import LoadingMovies from './LoadingMovies';
import * as Device from '../../utilities/styles/general';
import * as Colors from '../../utilities/styles/colors';
import { MDTbPosterBaseUrl, theMovieDbKey } from '../../utilities/srtings/theMovieDB';

const TopRated = ({ navigation }) => {
  const [movies, setMoviesData] = useState(false);

  if (movies === false) {
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${theMovieDbKey}&language=en-US&page=1`)
      .then((res) => {
        if (movies === false) {
        setMoviesData(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err);
        navigation.navigate('Login');
      });
  }

  if(movies === false) {
    return <LoadingMovies />
 } else {
   return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Top Rated</Text>
        <View >
          <FlatList
            data={movies}
            horizontal={true}
            renderItem={(item) => {
              return (
                <View style={styles.movieBlank}>
                  <TouchableOpacity onPress={() => navigation.navigate('Movie', {item})}>
                    <View>
                      <Image
                        source={{ uri: MDTbPosterBaseUrl + item.item.poster_path }}
                        style={styles.imgStyle}
                      />
                    </View>
                  </TouchableOpacity>            
                </View>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
 }

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingTop: Device.Height * 0.02,
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
  },
  imgStyle: {
    width: Device.Width * 0.35,
    height: Device.Height * 0.25,
    borderRadius: 1
  }
});

export default TopRated;


