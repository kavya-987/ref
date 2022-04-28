import React, {Component} from 'react';
import {useState} from 'react';
import {
  AppRegistry,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DocumentPicker from 'react-native-document-picker';

const App = () => {
  const [multipleFile, setMultipleFile] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState({valueArray: [], disabled: false});
  let index = 0;
  const animatedValue = new Animated.Value(0);

  const alert = () => {
    Alert.alert('Alert', 'Post Created', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
        //allowMultiSelection: true,
      });
      for (const res of results) {
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      setMultipleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
  };

  const addMore = () => {
    animatedValue.setValue(0);
    let newlyAddedValue = {index: index};
    setState(
      {
        disabled: false,
        valueArray: [...state.valueArray, newlyAddedValue],
      },
      () => {
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          index = index + 1;
          setState({disabled: false});
        });
      },
    );
  };

  const animationValue = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-59, 0],
  });

  let newArray = state.valueArray.map((item, key) => {
    {
      /* if (key == this.index) {
        return (
          <Animated.View
            key={key}
            style={[
              styles.viewHolder,
              {
                opacity: this.animatedValue,
                transform: [{translateY: animationValue}],
              },
           // ]}>
            <Text style={styles.headerText}>Skills Required </Text>
         // </Animated.View>
       // );
            // } else { */
    }

    return (
      <KeyboardAwareScrollView>
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View key={key} style={styles.viewHolder}>
              <Text
                //style={styles.headerText}
                style={styles.text2}>
                What skills are required?
              </Text>
              <Text style={{color: 'black', top: 5}}>
                Enter 5 Skills that describes your project
              </Text>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  height: 110,
                  textAlignVertical: 'top',
                  //marginTop: 5,
                  margin: 3,
                  top: 7,
                  marginLeft: 3,
                }}
                placeholder="Enter skills"
                multiline={true}></TextInput>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    );
  });

  return (
    <KeyboardAwareScrollView>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <LinearGradient
              colors={['orange', 'blue']}
              style={styles.linear}
              start={{x: 0.7, y: 0}}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  //marginHorizontal: 1,
                  marginLeft: 50,
                  bottom: 27,
                }}
                source={require('./assets/images/logo.png')}
              />

              <View
                style={{
                  //borderWidth: 2,
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 23,
                    fontWeight: 'bold',
                    //fontStyle: 'italic',
                    textAlign: 'center',
                    marginRight: 252,
                    bottom: 5,
                  }}>
                  Scontinent
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 16,
                    //fontWeight: 'bold',
                    marginRight: 56,
                    top: 1,
                    right: 10,
                  }}>
                  Tell us what you need to do
                </Text>

                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 14,
                    marginRight: 50,
                    bottom: 4,
                    right: 12,
                  }}>
                  Pay us only when you are satisfied with our work
                </Text>
              </View>
            </LinearGradient>
            <View>
              <Text style={styles.text2}>Name of your project</Text>
              <TextInput
                style={styles.input1}
                placeholder="e.g. Mobile application"
              />
            </View>
            <Text style={styles.text2}>Tell us more about your project</Text>
            <View>
              <TextInput
                style={styles.input2}
                autoCapitalize="none"
                placeholder="Describe about your project"
                //value={text}
                //onChangeText={newValue => setText(newValue)}
                maxLength={1000}
                multiline={true}
              />
              <Text style={{marginLeft: 233, fontSize: 11, top: 5}}>
                1000 characters are allowed
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button1}
                onPress={selectMultipleFile}>
                <Text style={styles.text}>Upload Files</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {multipleFile.map((item, key) => (
                <View key={key}>
                  <Text style={{top: 5, fontSize: 11}}>
                    File Name: {item.name ? item.name : ''}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <ScrollView>
              <View style={{flex: 1, padding: 4}}>{newArray}</View>
            </ScrollView>

            {state.valueArray.length == 1 ? (
              <View>
                <TouchableOpacity
                  style={styles.buttonDesignPost}
                  onPress={alert}
                  // refreshControl={
                  //   <RefreshControl
                  //     refreshing={refreshing}
                  //     onRefresh={onRefresh}
                  //   />
                  // }
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      letterSpacing: 0.1,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      top: 6,
                    }}>
                    Post
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button2}
                disabled={state.disabled}
                onPress={addMore}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                    letterSpacing: 0.1,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  color1: {
    flex: 0.17,

    //   resizeMode: 'cover',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   width: 20,
  },
  linear: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: 392,
  },

  input1: {
    margin: 3,
    marginLeft: 3,
    borderColor: 'black',
    borderWidth: 1,
    top: 5,
  },
  input2: {
    margin: 3,
    marginLeft: 3,
    borderColor: 'black',
    borderWidth: 1,
    height: 110,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    top: 7,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 18,
    top: 5,
    right: 80,
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    top: 7,
    left: 3,
  },
  button1: {
    width: 120,
    height: 40,
    marginLeft: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    top: 5,
  },
  text: {
    fontSize: 16,
    // lineHeight: 15,
    fontWeight: 'bold',
    letterSpacing: 0.1,
    color: 'white',
  },
  button2: {
    width: 120,
    height: 40,
    marginLeft: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    top: 15,
    marginBottom: 350,
  },
  text3: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginRight: 20,
    fontStyle: 'italic',
  },
  container: {
    flex: 1,
  },
  viewHolder: {
    height: 200,
    //backgroundColor: 'pink',
    //justifyContent: 'center',
    // alignItems: 'center',
    margin: 4,
  },
  headerText: {
    color: 'white',
    fontSize: 25,
  },
  buttonDesign: {
    position: 'absolute',
    right: 25,
    bottom: 40,
    // borderRadius: 30,
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'blue',
  },
  buttonDesignPost: {
    //position: 'absolute',
    right: 133,
    bottom: 10,
    // borderRadius: 30,
    width: 120,
    height: 40,
    //justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'blue',
    alignSelf: 'center',
    borderColor: 'blue',
  },
  buttonImage: {
    resizeMode: 'contain',
    width: '100%',
  },
});

export default App;
