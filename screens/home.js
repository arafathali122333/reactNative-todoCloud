import React, { useEffect, useState } from "react";
import { StyleSheet, Platform, View, FlatList, Alert,Text,TouchableOpacity } from "react-native";
import { db, collection, getDocs, addDoc } from "../config";
import ToDoItem from "../components/ToDoItem";
import Input from "../components/Input";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home=({navigation})=> {
  const [todos, setToDos] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [shouldShow, setShouldShow] = useState(true);
  const exit = () => {
    AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  }
  // get todo list
  const getToDos = async () => {
    setShouldShow(false);
    const currentUser = await  AsyncStorage.getItem('user');
    const todosCol = collection(db, currentUser);
    const todosSnapshot = await getDocs(todosCol);
    setToDos(todosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setShouldShow(true);
  };

  // add new item
  const addToDo = async () => {
    try {
      if(newItem.trim()!=''){
      setShouldShow(false);
      const currentUser = await  AsyncStorage.getItem('user');
      const docRef = await addDoc(collection(db, currentUser), {
        title: newItem.trim(),
        isChecked: false,
      });
      setShouldShow(true);
      getToDos();
      setNewItem("");
      }
      else{
        (Platform.OS=='web') ? alert("Please Fill Todo") : Alert.alert("Please Fill Todo");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    getToDos();
  }, []);

  return (
      <View style={styles.container}>
      <TouchableOpacity onPress={exit}>
    <Text style={{position: "absolute",top: 55,left: 5,fontSize:32}}>⬅️</Text>
    </TouchableOpacity>
      <Input
      value={newItem}
      onChange={(text) => setNewItem(text)}
      submit={addToDo}
    />
    <Text style={{fontWeight: "bold",textAlign: "center"}}>{shouldShow ? "":"Please Wait..."}</Text>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <ToDoItem
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              refetch={getToDos}
            />
          )}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
export default Home;