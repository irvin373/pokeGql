import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import { COLOR, ThemeContext, getTheme, Button } from 'react-native-material-ui';
import {fetchOnePokemon} from './apiPokemons';
// you can set your style right here, it'll be propagated to application
const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

const HomeScreen = props => {
  fetchOnePokemon(25).then(data => {
    console.log('--->', data);
  })

  return (
    <ThemeContext.Provider value={getTheme(uiTheme)}>
      <View style={styles.root}>
        <Text>Home Screen</Text>
        <Button primary text="Primary" />
        <Button accent text="Accent" />
        <Button raised primary text="Primary" />
        <Button disabled text="Disabled" />
      </View>
    </ThemeContext.Provider>
  );
};

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
};

Navigation.registerComponent('App', () => HomeScreen);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'App',
            },
          },
        ],
      },
    },
  });
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});