import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';


export default function App() {
  const [images, setImages] = useState([]);

  const addImage = () => {
    const newImage = {
      id: images.length + 1,
      url: `https://picsum.photos/200/300?random=${images.length + 1}`,
    };

    setImages([...images, newImage]);
  };

  useEffect(() => {
    // Load initial images when the component mounts
    addImage();
    addImage();
    addImage();
  }, []);

  const renderSmallPf = ({ item }) => (
    <View style= {styles.subPFContainer}>
      <Image
      source={{ uri: item.url }}
      style={styles.subPFPic}
      />
      <Text>Name</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text>{toString(data[0])+"   dagga"}</Text> */}
      <Image
        source={{ uri: 'https://picsum.photos/200/300' }}
        style = {styles.profilePic}
      />

      <View style = {styles.friendsContainer}>
        <FlatList
          data={images}
          renderItem={renderSmallPf}
          keyExtractor={item => item.id.toString()}
          horizontal
        />
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
    // borderWidth: 1,
  },
  subPFPic: {
    height: '75%',
    aspectRatio: 1, 
    borderRadius: 1000,
    // borderWidth: 1,
  },

  subPFContainer:{
    alignItems: 'center',
    marginHorizontal: 10,
  },

  // subPFText:{

  // }

  friendsContainer: {
    height: '30%',
    flexDirection: 'row', // Display items in a row
    alignItems: 'center', // Center items vertically
  }
});
