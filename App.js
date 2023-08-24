import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';


export default function App() {
  const [images, setImages] = useState([]);

  const addImage = () => {
    const newImage = {
      id: images.length + 1,
      url: `https://picsum.photos/200/300?random=${images.length + 1}`,
      username: `user`,
    };

    setImages([...images, newImage]);
  };

  useEffect(() => {
    // Load initial images when the component mounts
    setImages([]);
    addImage();
    console.log("Ran image additionsss")
  }, []);

  const renderSmallPf = ({ item }) => (
    <View style= {styles.subPFContainer}>
      <Image
      source={{ uri: item.url }}
      style={styles.subPFPic}
      />
      <Text style={styles.subPFText}>username {item.username}
      </Text>
    </View>
  );

  const renderPhoto = ({ item }) => (
    <View>
      <Image
        source={{ uri: item.url }}
        style={styles.gridPhoto}
      />
    </View>

  );

  return (
    <View style={styles.container}>
      
      <Image
        source={{ uri: 'https://picsum.photos/200/300' }}
        style = {styles.profilePic}
      />
      <Text style={styles.pfText}>Username</Text>
      <View style = {styles.friendsContainer}>
        <Text style={styles.pfText}>Your Friends</Text>
        <FlatList
          data={images}
          renderItem={renderSmallPf}
          keyExtractor={item => item.id.toString()}
          horizontal
        />
      </View>

      <View style={styles.imageContainer}>
        <FlatList
            data={images}
            renderItem={renderPhoto}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
        />
        <Text>safsaffs</Text>
      </View>
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
    height: "25%",
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
    height: '30%',
    // flexDirection: 'row', // Display items in a row
    // alignItems: 'center', // Center items vertically
    backgroundColor: '#eeeeee',
    borderRadius: 25,
    // paddingHorizontal:10, 
  },
  imageContainer:{
    width: '100%',
    alignItems:'center',
  },

  gridPhoto:{
    height: undefined,
    width: '50%',
    aspectRatio: 1, 
  }
});
