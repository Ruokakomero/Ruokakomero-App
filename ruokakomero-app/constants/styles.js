import { StyleSheet } from "react-native";

export default StyleSheet.create({

    // MAIN

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 100,
    },
    textInputs: {
      marginBottom: 20,
    },
    input: {
      borderColor: '#000',
      borderWidth: 0.5,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      width: 200,
    },
    buttons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '50%',
    },
    listSection: {
      marginTop: 20,
      width: '80%',
    },
    locationHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      width: 300,
    },
     

    // DROPDOWN

    dropdown: {
      margin: 16,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },

    // BUTTON

    buttonContainer: {
        backgroundColor: '#009688',
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 5,
        borderRadius: 10,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 700,
        textAlign: 'center',
      },

    /// DELETE BUTTON
    
    delButtonContainer: {
      padding: 10,
      margin: 5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
})