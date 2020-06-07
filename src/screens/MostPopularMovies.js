import React from 'react';
import { ScrollView } from "react-native";
import MostPopular from '../components/FavoriteMoviesComponents/MostPopular';
import TopRated from '../components/FavoriteMoviesComponents/TopRated';
import UpComing from '../components/FavoriteMoviesComponents/UpComing';

const MostPopularMovies = ({navigation}) => {
  return (
    <ScrollView> 
      <MostPopular navigation={navigation} />
      <TopRated navigation={navigation}/>
      <UpComing navigation={navigation} />
    </ScrollView>
  );
};

export default MostPopularMovies;


