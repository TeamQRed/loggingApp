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

export default class App extends Component {
  
  constructor() {
    super()
    this.state = {
      isLoading: true,
      carId: '0000',
      carType: 'Car',
      currTime: '0'
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
          isLoading: false,
        })
      }
      else {
        this.setState({
          log: [],
          isLoading: false,
        })
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
      console.log(logArr)
    } catch (error) {
      // Error saving data
    }
  }

  _resetData = async () => {
    try {
      await AsyncStorage.removeItem('LOGS');
      await Alert.alert("Reset successfull!")
    } catch (error) {
      // Error saving data
    }
  }

  saveTimeToState = () => {
    const currTime = new Date().toLocaleTimeString()
    this.setState({
      currTime: currTime
    })
  }

  insertInLog = () => {
    this.setState((prevState) => ({
      log: [...prevState.log, {'id': this.state.carId, 'type': this.state.carType, 'time':this.state.currTime}]
    }))

  }
  

  render() {
    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    }
    if (this.state.log == []) {
      return <View><Text>Nothing to show :D</Text></View>
    }
    return (
      <View style={styles.container}>
        <View style={{flex: 0.5, padding: 20}}>
          <Text>QRED LOGGING APP</Text>
          <View style={styles.formBar}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 80}}
              placeholder="Enter Car Id"
              onChangeText={(carId) => this.setState({carId})}
              value={this.state.carId}
              keyboardType={"decimal-pad"}
            />
            <Picker
              selectedValue={this.state.carType}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({carType: itemValue})}>
              <Picker.Item label="Car" value="Car" />
              <Picker.Item label="Auto" value="Auto" />
              <Picker.Item label="Etc" value="Etc" />
            </Picker>
            <Button
              title="Set Time"
              onPress={() => this.saveTimeToState()} 
            />
          </View>
          <View style={styles.formBar}>
            <Text>{this.state.carId}</Text>
            <Text>{this.state.carType}</Text>
            <Text>{this.state.currTime}</Text>
          </View>
          <Button 
            title="Insert"
            style={{paddingTop: 40}}
            onPress={() => this.insertInLog()}/>
          <Button 
            onPress={() => this._storeData()} 
            title="Save Data"/>
          <Button 
            onPress={() => this._resetData()} 
            title="Reset" />
        </View>
        <View style={styles.displayArea}>
          <Text>Today's Log</Text>
          <FlatList
          data={this.state.log}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={styles.flatview}>
            <Text style={styles.carId}>{item.id}</Text>
            <Text style={styles.carType}>{item.type}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          }
          keyExtractor={item => item.email}
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
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  carId: {
    fontFamily: 'Verdana',
    fontSize: 18
  },
  carType: {
    color: 'red'
  }
});
