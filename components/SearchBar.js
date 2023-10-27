import { View , Text , TextInput , StyleSheet } from "react-native"
import { useState } from "react";
import { updateSearchQuery } from "../reducers/searchQuery";
import { useDispatch , useSelector } from "react-redux";

export default function SearchBar () {
const dispatch = useDispatch()
const recherche = useSelector((state)=>state.searchQuery.value)


return (      
    <View styles={styles.search}>
        <TextInput
          style={styles.inputplaceholder}
          placeholder="Recherche..."
          placeholderTextColor="#575757"
          onChangeText={(value) => dispatch(updateSearchQuery(value))}
          value={recherche}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    search: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "green",
        width: "100%",
        zIndex: 2,
      },
      inputplaceholder: {
        width: 300,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: "#a19999",
        color: "black",
        borderColor: "white",
        height: 40,
        top: 60,
        borderWidth: 1,
        borderColor: "white",
      },
})