import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { Text, View, TextInput, Pressable, FlatList } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import sqLiteTransacoes from '../../sqlite/sqLiteTransacoes';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const textInputRef = useRef(null);
  const [tipo, setTipo] = useState(null);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSelecionarTipo = (tipoSelecionado) => {
    setTipo(tipoSelecionado);
  };

  const salvar = () => {
    sqLiteTransacoes.adicionarTransacao({
      tipo: tipo,
      valor: parseFloat(valor),
      descricao: descricao,
      dia: new Date().toISOString()
    });
    setTipo(null);
    setValor("");
    setDescricao("");
    console.log('Informações salvas com sucesso!');
  };

  useEffect(() => {
    // Focus the TextInput when the screen is mounted
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.areaHeader}>
        <TextInput
          ref={textInputRef}
          style={styles.inputValor}
          placeholder='R$ 0'
          onChangeText={setValor}
          value={valor}
          keyboardAppearance='dark'
          keyboardType='decimal-pad'
        />
      </View>
      <View style={styles.areaBody}>
        <View style={styles.areaOpcoes}>
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
        </View>

        <View style={styles.areaForm}>
          <View style={styles.areaInput}>
            <Text style={styles.textTitle}>Descricão (opcional)</Text>
            <TextInput
              style={styles.inputForm}
              onChangeText={setDescricao}
              value={descricao}
              keyboardAppearance='dark'
            />
          </View>

        </View>

        <View style={styles.areaSalvar}>
          <Pressable style={styles.btnSalvar} onPress={salvar}>
            <Entypo name="check" size={28} color="#FFF" />
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}