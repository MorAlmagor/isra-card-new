import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList, Dimensions, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addMovieToFavorite } from '../store/actions/MoviesActions'
import { Rating } from 'react-native-ratings';
import * as Device from '../utilities/styles/general';
import * as Colors from '../utilities/styles/colors';
import { MDTbPosterBaseUrl } from '../utilities/srtings/theMovieDB';


const FavoritesScreen = ({ FavoriteMoviesArr, navigation }) => {
  const [favoriteMoviesState, setFavoriteMovies] = useState(FavoriteMoviesArr);
  const [textValue, onChangeText] = useState('');

  navigation.addListener('didFocus', () => {
    setFavoriteMovies(FavoriteMoviesArr);
  });
  
  const searchMode = (text) => {
    const tempMoviesSearchArr = [];

    FavoriteMoviesArr.forEach((movie) => {
      if (movie.item.title.toLowerCase().includes(text.toLowerCase())) {
        tempMoviesSearchArr.push(movie);
      }
    });

    setFavoriteMovies(tempMoviesSearchArr);
  }

  const noMoviesAdd = (
    <View style={styles.noMoviesAddContainer} >
      <Text style={styles.noMoviesAddHeader}>Oops... 😶</Text>
      <Text style={styles.noMoviesAddText}>You Don't Seem To Have Found Any Movies</Text>
      <Text style={styles.noMoviesAddText}>Go Back And Find Some Movies</Text>
    </View>
  )


  return (
    <View style={styles.screenContainer}>
      <Text style={styles.headerContainer}>Favorite Movies</Text>
      <View style={styles.inputContainer}>
        <TextInput
          clearTextOnFocus={true}
          style={styles.inputStyle}
          onChangeText={text => {
            onChangeText(text)
            searchMode(text)
          }}
          value={textValue}
          placeholder={'Look for your movie?'}
        />
        <AntDesign
          name="search1"
          size={22}
          color="white"
          style={styles.inputLogo}
        />
      </View>
      {FavoriteMoviesArr.length === 0 && noMoviesAdd}
      <View style={styles.listContainer} >
        <FlatList
          data={favoriteMoviesState}
          horizontal={false}
          inverted
          renderItem={(item) => {
            let yearReleaseDate = item.item.item.release_date.substring(0, 4);
            return (
              <View style={styles.container2}>
                <TouchableOpacity onPress={() => navigation.navigate('Movie', { item: item.item })}>
                  <View>
                    <Image
                      source={{ uri: MDTbPosterBaseUrl + item.item.item.poster_path }}
                      style={styles.imgStyle}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.cardTextCon}>
                  <Text style={styles.cardTitle}>{item.item.item.title}</Text>
                  <View style={styles.cardTextContainer2}>
                    <Text style={styles.cardYearText}>Year ({yearReleaseDate})</Text>
                    <Text style={styles.cardText}>Popularity - {item.item.item.popularity}</Text>
                    <Text style={styles.cardText}>Voted - {item.item.item.vote_count}</Text>
                    <View style={styles.ratingContainer}>
                      <Rating
                        type='custom'
                        ratingCount={5}
                        imageSize={60}
                        ratingColor={Colors.background}
                        ratingBackgroundColor='white'
                        imageSize={15}
                        readonly={true}
                        startingValue={item.item.item.vote_average / 2}
                      />
                      <Text style={styles.ratingText}>{item.item.item.vote_average} / 10 TMDb</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  cardTextCon: {
    height: Device.Height * 0.25,
    width: Device.Width * 0.43,
    marginLeft: Device.Width * 0.03
  },
  container2: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    width: Device.Width * 0.80,
    borderRadius: 1,
    margin: Device.Width * 0.003,
    height: Device.Height * 0.251,
    marginTop: Device.Height * 0.03,
    marginBottom: Device.Height * 0.018
    },
  ratingText: {
    fontSize: Device.Width * 0.031,
    color: 'white',
    paddingLeft: Device.Width * 0.06,
    fontWeight: 'bold',
    position: 'absolute',
    marginLeft: Device.Width * 0.15,
    bottom: 0
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: Device.Height * 0.009
  },
  cardText: {
    color: 'white',
    fontSize: Device.Width * 0.034
  },
  cardYearText: {
    color: 'white',
    fontSize: Device.Width * 0.034,
    marginTop: Device.Height * 0.08
  },
  cardTextContainer2: {
    position: 'absolute',
    top: Device.Height * 0.06
  },
  cardTitle: {
    color: 'white',
    fontSize: Device.Width * 0.05
  },
  cardTextContainer: {
    height: Device.Height * 0.25,
    width: Device.Width * 0.43,
    marginLeft: Device.Width * 0.034
  },
  imgStyle: {
    width: Device.Width * 0.35,
    height: Device.Height * 0.27,
    borderRadius: 1
  },
  listContainer: {
    marginTop: Device.Height * 0.020,
    marginLeft: Device.Width * 0.05,
    paddingBottom: Device.Height * 0.16
  },
  headerContainer: {
    color: 'white',
    fontSize: Device.Width * 0.07,
    marginBottom: Device.Height * 0.015,
    marginLeft: Device.Width * 0.045
  },
  screenContainer: {
    backgroundColor: Colors.background,
    width: '100%',
    height: '100%',
    paddingTop: Device.Height * 0.07
  },
  noMoviesAddContainer: {
    alignItems: 'center',
    marginTop: Device.Height * 0.28
  },
  noMoviesAddHeader: {
    color: 'white',
    fontSize: Device.Width * 0.07,
    fontWeight: 'bold'
  },
  noMoviesAddText: {
    color: 'white',
    fontSize: Device.Width * 0.047
  },
  inputStyle: {
    height: Device.Height * 0.06,
    paddingLeft: Device.Width * 0.11,
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: '#2D3850',
    borderRadius: 10,
    width: Device.Width * 0.8,
    fontSize: Device.Width * 0.042,
    textAlignVertical: 'center',
    color: 'white',
  },
  inputLogo: {
    position: 'absolute',
    top: Device.Height * 0.015,
    left: Device.Width * 0.13
  },
  inputContainer: {
    alignItems: 'center'
  },
});

const mapStateToProps = (state) => {
  return {
    FavoriteMoviesArr: state.movie.favoriteMovies,
  };
};

export default connect(mapStateToProps, null)(FavoritesScreen);