import React from 'react';
import { View,StyleSheet, StatusBar } from 'react-native';

import Home from './src/views/Home';
const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
        <Home />
    </View>
  )
};


export default App;


const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:"#222831"

  },
  maincontainer:{
      flex:1,
      alignItems:"center",
      justifyContent:"center"

  },
})


