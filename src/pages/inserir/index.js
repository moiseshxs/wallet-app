import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native';
import sqLiteJogadores from './src/sqlite/sqLiteTeclas';

export default function App() {
  const [posicao, setPosicao] = useState("");
  const [jogador, setJogador] = useState([]);

  const salvar = () => {
    sqLiteJogadores.create({
      posicao: posicao,
    })
    console.log('okay')
  };

  const userAll = async () => {
    const jogadores = await sqLiteJogadores.all();
    if(jogadores !== false) {
      setJogador(jogadores);
    }else {
      return false;
    }
  };

  useEffect(() => {
    userAll();
  }, [jogador]);



  return (
    <View style={styles.container}>
      <View style={styles.areaInputs}>
        <TextInput
          style={styles.input}
          placeholder='posicao'
          onChangeText={setPosicao}
          value={posicao}
        />

        <Pressable style={styles.btn} onPress={salvar}>
          <Text style={styles.textbtn}>Salvar</Text>
        </Pressable>
      </View>

      <View style={styles.areaResposta}>
        <FlatList 
          data={jogador}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.id}</Text>
              <Text>{item.posicao}</Text>
            </View>
          )}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});
