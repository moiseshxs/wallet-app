import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#980BDA",
    justifyContent: 'center',
  },  
  areaHeader: {
    flex: 1,
    paddingHorizontal: 20,
  },
  areaProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
  areaFoto: {
    height: 45,
    width: 45,
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 3,
  },
  imgPerfil: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  textNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },

  areaValores: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textValor: {
    fontSize: 45,
    color: '#FFF',
    fontWeight: 'bold',
  },
  areaEntSai: {
    alignItems: 'center',
    gap: 10,
  },
  areaGastos: {
    gap: 15,
    flexDirection: 'row',
  },
  textGastos: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },

  areaBody: {
    flex: 3,
    backgroundColor: '#272727',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingHorizontal: 20,
  },
  textTitulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 20,
  },
  areaAtividade: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#A7A5A6',
    paddingVertical: 15,
    gap: 10,
  },
  areaFotoAtividade: {
    height: 55,
    width: 55,
    backgroundColor: '#363636',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaInfoAtividade: {
    flex: 1,
    justifyContent: 'center',
    gap: 7,
  },
  tituloAtiv: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  valorAtiv: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#A7A5A6',
  },
  diaAtiv: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#A7A5A6',
    marginTop: 5,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'green',
  },

})