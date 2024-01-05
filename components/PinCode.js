import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState } from "react";
import Feather from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");
const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];
const dialPadSize = width * 0.2;
const dialPadSizetext = dialPadSize * 0.4;
const _spacing = 20;
const pinSize = 4;

export default function DialPad(item) {
  const [code, setCode] = useState([]);
  return (
    <FlatList
      numColumns={3}
      data={dialPad}
      style={{ flexGrow: 0 }}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: _spacing }}
      contentContainerStyle={{ gap: _spacing }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity disabled={item === ""}
          onPress={() => {
            if (typeof(item) === 'number') {
            setCode([...code, item])
            console.log(code)
            } 
            else if (typeof(item)  === "string") {
              console.log(code)
              setCode((code) => code.slice(0, code.length - 1));
            }
          }}>
            <View
              style={{
                width: dialPadSize,
                height: dialPadSize,
                borderRadius: dialPadSize,
                borderWidth: typeof item !== "number" ? 0 : 1,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item === "del" ? (
                <Feather name="delete" size={dialPadSizetext} color="white"/>
              ) : (
                <Text style={{ fontSize: dialPadSizetext, color: "white" }}>
                  {item}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

function App() {
  return (
    <View>
      <DialPad
      />
    </View>
  );
}

const styles = StyleSheet.create({});
