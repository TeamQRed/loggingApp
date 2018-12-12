/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, Button, Alert, TextInput, Picker, FlatList} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class MyListItem extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class App extends Component {
  
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this._retrieveData()
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('LOGS');
      if (value !== null) {
        // We have data!!
        console.log(value);
        this.setState({
          log: value,
          isLoading: false
        })
      }
      else {
        return "empty"
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  _storeData = async (dataToSave) => {
    let logArr = this.state.log
    try {
      await AsyncStorage.setItem('LOGS', JSON.stringify(logArr));
      await Alert.alert("Data saved successfully!")
    } catch (error) {
      // Error saving data
    }
  }

  saveTimeToState = () => {

  }
  

  render() {
    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    }
    return (
      <View style={styles.container}>
        <View style={{flex: 0.4, padding: 20}}>
          <Text>QRED LOGGING APP</Text>
          <View style={styles.formBar}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 80}}
              placeholder="Enter Car Id"
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              keyboardType={"decimal-pad"}
            />
            <Picker
              selectedValue={this.state.vehicleType}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({vehicleType: itemValue})}>
              <Picker.Item label="Car" value="Car" />
              <Picker.Item label="Auto" value="Auto" />
              <Picker.Item label="Etc" value="Etc" />
            </Picker>
            <Button
              title="Set Time"
              onPress={() => this.saveTimeToState()} 
            />
      
          </View>
          <Button 
            title="Insert"
            style={{paddingTop: 40}}
            onPress={() => this.insertInLog()}/>
          <Button 
            onPress={() => this._storeData()} 
            title="Save Data"/>
        </View>
        <View style={styles.displayArea}>
          <Text>Today's Log</Text>
          <FlatList
          style={{flex: 0.9}} 
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  formBar: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  displayArea: {
    backgroundColor: "#eee",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
