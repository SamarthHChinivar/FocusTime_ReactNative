import { React, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from '../utils/color';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/size';

/* Here destructuring is used for Focus = ({addSubject}) */

/*Without destructuring
export const Focus = (props) => {
  const [subject, setSubject] = useState(null);
  const addSubject = props.addSubject; // Access the prop this way
  
};*/

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);

  return (
    /*SafeAreaView component only works for iOS as similar to 
    StatusBar.currentHeight*/
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          selectionColor={colors.lightBlue}
          mode="flat"
          label="What would you like to work on ?"
          //onChangeText={(subject) => setSubject(subject)}
          // works only for the function of useState hook
          onChangeText={setSubject}
        />
        <RoundedButton
          style={styles.button}
          title="+"
          size={64}
          onPress={() => addSubject(subject)}
          //arrow function is used in onPress , as the addSubject function is called with subject argument
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  inputContainer: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});
