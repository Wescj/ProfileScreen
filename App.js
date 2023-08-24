import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


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
      images: [],
      flist: [1],
    },
    {
      username: "Lance",
      profilePic: 'https://picsum.photos/200/300?random=1',
      images: [],
      flist: [0],
    },
  ]);
  
  console.log(users)




  const renderSmallPf = ({ item }) => (
    <View style= {styles.subPFContainer}>
      <Image
      source={{ uri: users[item].profilePic }}
      style={styles.subPFPic}
      />
      <Text style={styles.subPFText}>{users[item].username}
      </Text>
    </View>
  );

  const renderPhoto = ({ item }) => (
    
    <Image 
      source={{ uri: item.url }} 
      style={{ height: tileSize, width: tileSize }} 
      // style={styles.gridPhoto}
    />


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
            keyExtractor={item => item.id.toString()}
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
