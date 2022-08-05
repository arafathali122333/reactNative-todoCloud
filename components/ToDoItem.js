import { Pressable, StyleSheet, Text, TextInput, View,Image } from "react-native";
import React, { useState, useEffect } from "react";
import CheckBox from "./CheckBox";
import { db, doc, deleteDoc, updateDoc } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ToDoItem = (props) => {
  
  const [isChecked, setIsChecked] = useState(props.isChecked);
  const [todoTitle, setTodoTitle] = useState(props.title);
  const [shouldShow, setShouldShow] = useState(true);

  // update isChecked property
  const updateIsChecked = async () => {
    if(todoTitle.trim()!=''){
    setShouldShow(false);
    const currentUser = await  AsyncStorage.getItem('user');
    await updateDoc(doc(db, currentUser, props.id), {
      isChecked: isChecked,
      title: todoTitle.trim(),
    });
    setTodoTitle(todoTitle.trim());
    setShouldShow(true);
    }
    else{
      deleteItem();
    }
  };
  // delete specific item
  const deleteItem = async () => {
    setShouldShow(false);
    const currentUser = await  AsyncStorage.getItem('user');
    await deleteDoc(doc(db, currentUser, props.id)).then(() => {
      props.refetch();
    });
    setShouldShow(true);
  };

  // call updateIsChecked function whenever isChecked property change
  useEffect(() => {
    updateIsChecked();
  }, [isChecked]);

  return (    
    <View style={isChecked ? styles.completed: styles.container}>
{shouldShow ? null:
    <Image
        style={{height:30,width:30}}
        source={require('../assets/loading.gif')}
      />
      }
      <CheckBox
        isChecked={isChecked}
        onPress={() => setIsChecked(!isChecked)}
      />
      <TextInput
        placeholder="ToDo"
        value={todoTitle}

        style={isChecked ? styles.striketext: styles.text}
        onChangeText={(text) => setTodoTitle(text)}
        onSubmitEditing={updateIsChecked}
        onBlur={updateIsChecked}
      />

      <Pressable onPress={deleteItem}>
        <Text style={{fontSize:26}}>🗑️</Text>
      </Pressable>
    </View>
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  completed:{
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor:"#4FE34F",
    borderRadius: 20,
    marginBottom:5,
  },
  container: {
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 24,
    width: "80%",
    fontWeight: "500",
    flex: 1,
  },
  striketext: {
    fontSize: 24,
    width: "80%",
    fontWeight: "500",
    flex: 1,
    textDecorationLine: 'line-through',
  },
});
