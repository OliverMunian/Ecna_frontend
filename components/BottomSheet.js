import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";
import { useRef } from "react";

export default function BottomSheet() {
  const BottomSheetModalRef = useRef(null);
  const snapPoints = ["50%"];

  function handlePressModal() {
    BottomSheetModalRef.current?.present();
  }
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text> Bonjour </Text>
        </TouchableOpacity>
        <StatusBar style='auto' />
        <BottomSheetModal ref={BottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}>
            <View>
                <Text> Hello </Text>
            </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles  = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'gray',
    }
})
