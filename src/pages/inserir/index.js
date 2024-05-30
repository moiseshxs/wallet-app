import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, TextInput, Pressable, FlatList } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import sqLiteTransacoes from '../../sqlite/sqLiteTransacoes';

export default function App() {
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [transacoes, setTransacoes] = useState([]);

  const salvar = () => {
    sqLiteTransacoes.adicionarTransacao({
      tipo: tipo,
      valor: valor,
      descricao: descricao,
    })
    console.log('Informações salvas com sucesso!')
  };

  const transacaoAll = async () => {
    const transacao = await sqLiteTransacoes.all();
    if (transacao !== false) {
      setTransacoes(transacao);
    } else {
      return false;
    }
  };

  useEffect(() => {
    transacaoAll();
  }, [transacoes]);



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container1}>
        <View style={styles.areaInputs}>
          <TextInput
            style={styles.input}
            placeholder='Tipo'
            onChangeText={setTipo}
            value={tipo}
          />
          <TextInput
            style={styles.input}
            placeholder='Valor'
            onChangeText={setValor}
            value={valor}
          />
          <TextInput
            style={styles.input}
            placeholder='Descricao'
            onChangeText={setDescricao}
            value={descricao}
          />

          <Pressable style={styles.btn} onPress={salvar}>
            <Text style={styles.textbtn}>Salvar</Text>
          </Pressable>
        </View>

        <View style={styles.areaResposta}>
          <FlatList
            data={transacoes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.id}</Text>
                <Text>{item.tipo}</Text>
                <Text>{item.valor}</Text>
                <Text>{item.dia}</Text>
                <Text>{item.descricao}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}