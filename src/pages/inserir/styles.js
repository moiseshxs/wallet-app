import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#980BDA",
    justifyContent: 'center',
  }, 
  container1: {
    flex: 1,
    backgroundColor: "#272727",
    justifyContent: 'center',
  }, 
  areaInputs: {
    flex: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 20,
    backgroundColor: '#d9d9d9',
  },
  btn: {
    width: '70%',
    height: 40,
    borderRadius: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textbtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  areaResposta: {
    flex: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  fim:{
    marginBottom: 20,
  }
})