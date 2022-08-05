import { StyleSheet, Text, View, TextInput,Button } from "react-native";
import React from "react";

const Input = (props) => {

  return (
    <View style={styles.container}>
    
    <TextInput
        placeholder="Enter new todo"
        style={styles.input}
        value={props.value}
        onChangeText={props.onChange}
        onSubmitEditing={props.submit}
      />
      <Button title="Add Todo" onPress={props.submit} />
    </View>
   
    
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginTop:35,
    marginBottom:10,
    marginLeft:37,
    width: "85%",
    alignSelf: "center",
  },
  input: {
    padding: 8,
    backgroundColor: "lightgrey",
    color: "#000",
    fontSize: 18,
  }
});
