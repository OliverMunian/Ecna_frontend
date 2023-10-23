import { StyleSheet, Text, View , TextInput} from 'react-native';

export default function Formulaire_interventions() {

    return (
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="firstName"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="lastName"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="adress"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="lastName"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="lastName"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="lastName"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        autoCompleteType="password"
        placeholder="Password"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} style={styles.submitButton} />
      {isRegistered && <Text style={styles.successText}>Registration successful!</Text>}

      </View> 
      );
   }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height:'100%',
      backgroundColor:'black',
    },
})