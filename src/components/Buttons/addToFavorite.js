import React, { useState } from "react";
import { Text, View } from "react-native";
import { connect } from 'react-redux';
import { MaterialIcons,  MaterialCommunityIcons } from '@expo/vector-icons'; 
import {addMovieToFavorite, removeMovieToFavorite} from '../../store/actions/MoviesActions';

const AddListButton = ({data, FavoriteMoviesArr, OnAddToFavorite, OnRemoveFavorite}) => {

  const [bool, setBool] = useState(false);
  let favoriteMovieArrLength = FavoriteMoviesArr.length
  for(let i = 0; i < favoriteMovieArrLength; i++) {
    if (favoriteMovieArrLength > 0) {
      if (data.item.id === FavoriteMoviesArr[i].item.id && bool === false) {
        setBool(true);
      }
    }
  };

  const addMovieToFavorite = (movieData) => {
    OnAddToFavorite(movieData);
    setBool(true);
  }

  const removeMovieToFavorite = (movieId) => {
    OnRemoveFavorite(movieId);
    setBool(false);
  }
  
  let buttonColor = 'white';
  let buttonText = 'Add to Favorite';
  let icon = (
    <MaterialIcons
    name="playlist-add"
    size={48} color="white"
    onPress={() => addMovieToFavorite(data)}
    />
  );

  if (bool === true) {
    buttonColor = 'green'
    buttonText = 'Favorite Movie' 
    icon = (
      <MaterialCommunityIcons
      onPress={() => removeMovieToFavorite(data.item.id)}
      name="playlist-check" size={48} color="green"
      />
    );
  }
  return (
    <View style={{fontSize: 25, color: buttonColor, paddingLeft: 25, fontWeight: 'bold', position: 'absolute', marginLeft: 290, bottom: 0, color: 'black' }}>
        {icon}
        <Text style={{color: buttonColor, position: 'absolute',marginLeft: 20, top: 43 , right: 0, width: 95}} >{buttonText}</Text>
    </View>
  )
};

const mapStateToProps = (state) => {
  return {
    FavoriteMoviesArr: state.movie.favoriteMovies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnAddToFavorite: (movie) => dispatch(addMovieToFavorite(movie)),
    OnRemoveFavorite: (movieID) => dispatch(removeMovieToFavorite(movieID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddListButton);
