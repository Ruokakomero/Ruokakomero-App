import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
    gap: 10,
    marginTop: 40,
  },
  listContainer: {
    width: '90%',
    marginBottom: 20,
    padding: 25,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    elevation: 3,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addIcon: {
    padding: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#009688',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#009688',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
  },
  clearButton: {
    backgroundColor: '#D32F2F',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
