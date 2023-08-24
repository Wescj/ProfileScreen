import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';



const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function App() {
  const numColumns = 3;
  const tileSize = screenWidth / numColumns;
  const [currUser, setCurrUser] = useState(0);
  const [users, setUsers] = useState([
    {
      username: "Wesley",
      profilePic: 'https://picsum.photos/200/300',
      images: ["Default"],
      flist: [1],
    },
    {
      username: "Lance",
      profilePic: 'https://picsum.photos/200/300?random=1',
      images: ["Default"],
      flist: [0],
    },
  ]);
  
  const renderSmallPf = ({ item }) => (
    <TouchableOpacity 
      style= {styles.subPFContainer}
      onPress={() => setCurrUser(item)}
    >
      <Image
      source={{ uri: users[item].profilePic }}
      style={styles.subPFPic}
      />
      <Text style={styles.subPFText}>{users[item].username}
      </Text>
    </TouchableOpacity>
  );

  const addPhoto = () => {
    // Launch the image picker
    ImagePicker.launchImageLibrary(response => {
      if (!response.didCancel && !response.error) {
        const newImage = {
          url: response.uri,
        };

        const temp = users
        temp[currUser].images.unshift(newImage)
        setUsers(temp)
      }
    }).catch(error => {
      console.error("Error occurred while selecting an image:", error);
    });
  };

  const renderPhoto = ({ item }) => (
    item === "default" ? (
      <Image 
        source={{ uri: item.url }} 
        style={{ height: tileSize, width: tileSize }} 
        // style={styles.gridPhoto}
      />
    ) : (
      <TouchableOpacity 
      onPress={() => addPhoto()}
      >
        <Image 
          source={require("./assets/dottedButton.webp")} 
          style={{ height: tileSize, width: tileSize }} 
        />
      </TouchableOpacity>
    )
  );
  

  const renderHeader = () => (
    <View style={{alignItems: 'center'}}>
      <Image
        source={{ uri: users[currUser].profilePic }}
        style = {styles.profilePic}
      />
      <Text style={styles.pfText}>{users[currUser].username}</Text>
      <Text style={styles.pfText}>Printing: {users[0].username}</Text>
      <View style = {styles.friendsContainer}>
        <Text style={styles.pfText}>Your Friends</Text>
        <FlatList
          data={users[currUser].flist}
          renderItem={renderSmallPf}
          keyExtractor={item => item}
          horizontal
        />
      </View>
    </View>
  );

  return (

    <View style={styles.container}>
        <FlatList
            data={users[currUser].images}
            renderItem={renderPhoto}
            keyExtractor={item => item}
            numColumns={numColumns}
            ListHeaderComponent={renderHeader}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '20%'
  },
  profilePic: {
    width: undefined,
    height: screenHeight*0.25,
    aspectRatio: 1, 
    borderRadius: 1000,
  },

  pfText:{
    fontWeight: 'bold', // Make text bold
    fontSize: 25, // Adjust font size as needed
    marginVertical: 10, // Add spacing after the FlatList
    marginHorizontal: 20
  },

  subPFContainer:{
    alignItems: 'center',
    marginHorizontal: 10,
  },

  subPFPic: {
    height: '60%',
    aspectRatio: 1, 
    borderRadius: 1000,
  },

  subPFText:{
    // fontWeight: 'bold', // Make text bold
    fontSize: 15, // Adjust font size as needed
    marginTop: 10, // Add spacing after the FlatList
  },

  friendsContainer: {
    height: screenHeight*0.30,
    width: screenWidth,
    // flexDirection: 'row', // Display items in a row
    // alignItems: 'center', // Center items vertically
    backgroundColor: '#eeeeee',
    borderRadius: 25,
    // paddingHorizontal:10, 
  },
  imageContainer:{
    flex: 1,
    // width: '100%',
    // alignItems: 'row',
  },
  gridPhoto:{
    height: undefined,
    width: '33%',
    aspectRatio: 1, 
  }

});
