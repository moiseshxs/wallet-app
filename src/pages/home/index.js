import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StatusBar, FlatList, Modal, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles.js';
import sqLiteSaldo from '../../sqlite/sqLiteSaldo.js';
import sqLiteTransacoes from '../../sqlite/sqLiteTransacoes.js';

export default function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [saldo, setSaldo] = useState(0.0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const saldoId = async () => {
    try {
      const saldoV = await sqLiteSaldo.byId();
      setSaldo(saldoV);
    } catch (error) {
      console.error("Erro ao recuperar o saldo:", error);
    }
  };

  useEffect(() => {
    saldoId();
  }, []);

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

  const Atividade = ({ tipo, valor }) => (
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
          <Text style={styles.diaAtiv}>28 MAI</Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.areaHeader}>
        <View style={styles.areaProfile}>
          <View style={styles.areaFoto}></View>
          <Text style={styles.textNome}>Moises Henry</Text>
        </View>

        <View style={styles.areaValores}>
          <View>
            <Text style={styles.textValor}>R$ {saldo}</Text>
          </View>
          <View style={styles.areaEntSai}>
            <View style={styles.areaGastos}>
              <Feather name="trending-up" size={18} color="white" />
              <Text style={styles.textGastos}>R$ 74,90</Text>
            </View>

            <View style={styles.areaGastos}>
              <Feather name="trending-down" size={18} color="white" />
              <Text style={styles.textGastos}>R$ -13,00</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.areaBody}>
        <Text style={styles.textTitulo}>Atividades</Text>
        <FlatList
          data={transacoes}
          renderItem={({ item }) => <Atividade tipo={item.tipo} valor={item.valor} />}
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