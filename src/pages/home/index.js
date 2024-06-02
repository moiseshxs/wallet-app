import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StatusBar, FlatList, Modal, Pressable, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles.js';
import sqLiteSaldo from '../../sqlite/sqLiteSaldo.js';
import sqLiteTransacoes from '../../sqlite/sqLiteTransacoes.js';

export default function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [saldo, setSaldo] = useState(0.0);
  const [entradaSoma, setEntradaSoma] = useState("");
  const [saidaSoma, setSaidaSoma] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const saldoId = async () => {
    try {
      const saldoV = await sqLiteSaldo.byId();
      setSaldo(saldoV);
    } catch (error) {
      console.error("Erro ao recuperar o saldo:", error);
    }
  };

  const transacaoAll = async () => {
    const transacao = await sqLiteTransacoes.all();
    if (transacao !== false) {
      setTransacoes(transacao);
    } else {
      return false;
    }
  };

  const somarEntrada = async () => {
    const somaEntrada = await sqLiteTransacoes.somarEntradas();
    setEntradaSoma(somaEntrada);
  };

  const somarSaida = async () => {
    const somaSaida = await sqLiteTransacoes.somarSaidas();
    setSaidaSoma(somaSaida);
  };

  useEffect(() => {
    transacaoAll();
    saldoId();
    somarEntrada();
    somarSaida();
  }, [transacoes, , ,]);

  const Atividade = ({ tipo, valor, dia }) => (
    <View>
      <Pressable
        style={styles.areaAtividade}
        onPress={() => setIsModalVisible(false)}
      >
        <View style={styles.areaFotoAtividade}>
          <Feather name="trending-down" size={24} color="white" />
        </View>

        <View style={styles.areaInfoAtividade}>
          <Text style={styles.tituloAtiv}>{tipo}</Text>
          <Text style={styles.valorAtiv}>R$ {valor}</Text>
        </View>
        <View>
          <Text style={styles.diaAtiv}>{dia}</Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.areaHeader}>
        <View style={styles.areaProfile}>
          <View style={styles.areaFoto}>
            <Image
              source={require('../../../assets/images/profile/samuel.jpeg')}
              style={styles.imgPerfil}
            />
          </View>
          <Text style={styles.textNome}>Samuel Lopes</Text>
        </View>

        <View style={styles.areaValores}>
          <View>
            <Text style={styles.textValor}>R$ {saldo}</Text>
          </View>
          <View style={styles.areaEntSai}>
            <View style={styles.areaGastos}>
              <Feather name="trending-up" size={18} color="white" />
              <Text style={styles.textGastos}>R$ {entradaSoma}</Text>
            </View>

            <View style={styles.areaGastos}>
              <Feather name="trending-down" size={18} color="white" />
              <Text style={styles.textGastos}>R$ -{saidaSoma}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.areaBody}>
        <Text style={styles.textTitulo}>Atividades</Text>
        <FlatList
          data={transacoes}
          renderItem={({ item }) => <Atividade tipo={item.tipo} valor={item.valor} dia={item.dia} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>

          <View>
            <Text>Tipo: </Text>
            <Text>Valor: R$ </Text>
          </View>

          <Pressable onPress={() => setIsModalVisible(false)}>
            <Text>Fechar</Text>
          </Pressable>
        </View>
      </Modal>

    </SafeAreaView>
  );
}