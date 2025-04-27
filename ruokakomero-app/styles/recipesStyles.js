import { StyleSheet } from "react-native";
import MainTheme from "./MainTheme";

export default StyleSheet.create({

  // Modal content containers
  modalContentList: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    padding: 20,
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, }
  },
  modalContentCreate: {
    width: "90%",
    padding: 20,
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, }
  },
  modalContentEdit: {
    padding: 20,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, }
  },
  modalContentRecipe: {
    width: "90%",
    height: "75%",
    padding: 24,
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, }
  },

  // Modal overlay
  modalOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },

  // Headers & text
  header: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  subHeader: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  paragraph: {
    marginBottom: 10,
    fontSize: 14,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  tabText: {
    color: "#000",
    fontWeight: "bold",
  },
  unitText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },

  // Recipe items & layout
  recipeCard: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  recipeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  recipeItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: MainTheme.colors.dark20,
    borderRadius: 8,
    backgroundColor: MainTheme.colors.textLight,
  },
  recipeList: {
    marginVertical: 16,
    gap: 8,
  },
  selectedRecipe: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: MainTheme.colors.highlightBlue,
    borderRadius: 8,
    backgroundColor: MainTheme.colors.blueMuted,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },

  servingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    justifyContent: "space-between",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: MainTheme.colors.dark20,
    borderRadius: 8,
  },
  stepperButton: {
    fontSize: 24,
    paddingHorizontal: 12,
    color: MainTheme.colors.highlightBlue,
  },
  stepperValue: {
    fontSize: 18,
    marginHorizontal: 8,
    minWidth: 32,
    textAlign: "center",
  },

  // Buttons
  closeButton: {
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#8a3633",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  editButton: {
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#FFA500",
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  saveButton: {
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  circleButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: MainTheme.colors.highlightBlue,
  },
  circleButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
    marginHorizontal: 10,
    gap: 24,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeTab: {
    backgroundColor: "#007BFF",
  },
  tabText: {
    color: "#000",
    fontWeight: "bold",
  },
  unitButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },

  // Inputs & ingredient rows
  searchInput: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  fullInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },
  ingredientNameInput: {
    flex: 2,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
  },
  quantityWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  ingredientQuantityInput: {
    width: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
    textAlign: "center",
  },
  ingredientListItem: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: MainTheme.colors.dark20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "space-between"

  },

  // Collections & menu
  collectionHeader: {
    flexDirection: "row",
  },
  collectionItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: MainTheme.colors.dark20,
  },
  collectionWrapper: {
    gap: 8,
  },
  menuOptions: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },

 
});