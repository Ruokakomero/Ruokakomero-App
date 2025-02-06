import { StyleSheet } from "react-native";

export default StyleSheet.create({

    // MAIN

    container: {
        paddingTop: 300,
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textInputs: {
        marginBottom: 20,
      },
      input: {
        borderColor: '#000',
        borderWidth: 0.5,
        marginBottom: 10,
        padding: 8,
        width: 200,
      },
      buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '25%',
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
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
      },


})