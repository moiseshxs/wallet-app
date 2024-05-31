import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, TextInput, Pressable, FlatList } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import sqLiteTransacoes from '../../sqlite/sqLiteTransacoes';

export default function App() {
  const [tipo, setTipo] = useState(null);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [transacoes, setTransacoes] = useState([]);

  const handleSelecionarTipo = (tipoSelecionado) => {
    setTipo(tipoSelecionado);
  };

  const salvar = () => {
    sqLiteTransacoes.create({
      tipo: tipo,
      valor: valor,
      descricao: descricao,
    })
    setTipo(null);
    setValor("");
    setDescricao("");
    console.log('Informações salvas com sucesso!')
  };

  const transacaoAll = async () => {
    const transacao = await sqLiteTransacoes.all();
    setTransacoes(transacao);
  };

  useEffect(() => {
    transacaoAll();
  }, [transacoes]);



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container1}>
        <View style={styles.areaInputs}>

        <Pressable
            style={[styles.btnTipo, tipo === 'Entrada' ? styles.btnTipoSelected : null]}
            onPress={() => handleSelecionarTipo('Entrada')}
          >
            <Text style={[styles.textTipo, tipo === 'Entrada' ? styles.textTipoSelected : null]}>Entrada</Text>
          </Pressable>

          <Pressable
            style={[styles.btnTipo, tipo === 'Saida' ? styles.btnTipoSelected : null]}
            onPress={() => handleSelecionarTipo('Saida')}
          >
            <Text style={[styles.textTipo, tipo === 'Saida' ? styles.textTipoSelected : null]}>Saída</Text>
          </Pressable>

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