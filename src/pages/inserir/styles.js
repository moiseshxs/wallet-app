import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#980BDA",
    justifyContent: 'center',
  }, 
  areaHeader: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: 'center',
  }, 
  inputValor: {
   height: '100%',
   width: '100%',
   fontSize: 70,
   fontWeight: 'bold',
   textAlign: 'right',
   color: '#FFF',
   paddingHorizontal: 20,
  },

  areaBody: {
    flex: 4,
    backgroundColor: "#272727",
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  areaOpcoes: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  btnTipo: {
    backgroundColor: '#9b9b9b',
    height: 40,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTipoSelected: {
    backgroundColor: '#980BDA',
  },
  textTipo: {
    color: '#2b2b2b',
    fontWeight: 'bold',
  },
  textTipoSelected: {
    color: '#FFF',
  },

  areaForm: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaInput: {
    width: '100%',
  },
  textTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
  inputForm: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#A7A5A6',
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#FFF',
  },

  areaSalvar: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 10,
  },
  btnSalvar: {
    height: 70,
    width: 70,
    backgroundColor: '#980BDA',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  areaVazia: {
    flex: 4,
  }
})