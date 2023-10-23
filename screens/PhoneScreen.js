import { StyleSheet, Text, View } from 'react-native'

export default function PhoneScreen() {


  return (
    <View style={styles.container}>
        <Text>La page répertoire avec le listing des patients</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
  },
});
