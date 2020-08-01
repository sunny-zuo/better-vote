import { StyleSheet } from "react-native";
var {vw, vh, vmin, vmax} = require('react-native-expo-viewport-units');

const formStyling = StyleSheet.create({
    formTitle: {
		fontWeight: "bold",
		color: "white",
        fontSize: 50,
        textAlign: "center",
        marginBottom: vh(2),
    },
    formTitleRegister: {
		fontWeight: "bold",
		color: "white",
        fontSize: 40,
        textAlign: "center",
    },

	formText: {
		fontWeight: "bold",
		color: "white",
		fontSize: 20,
	},
	formTextRegister: {
		fontWeight: "bold",
		color: "white",
		fontSize: 15,
	},
    
	formContainer: {
		fontWeight: "bold",
		color: "white",
		position: "absolute", // child
		top: vh(15),
		marginLeft: vw(3),
    },
    formContainerRegister: {
		fontWeight: "bold",
		color: "white",
		position: "absolute", // child
		top: vh(10),
		marginLeft: vw(3),
    },

    textbox: {
        borderWidth: 1,
        borderColor: "white",
        color: "white",
        padding: 10,
        marginBottom: 3,
    },
    
	formComponent: {
		marginBottom: vh(1),
	},



});

export default formStyling;