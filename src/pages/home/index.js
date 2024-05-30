import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles.js';
import sqLiteSaldo from '../../sqlite/sqLiteSaldo.js';

export default function App() {
  const [saldo, setSaldo] = useState(0.0);

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
            <Text style={styles.textValor}>{saldo}</Text>
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
        <View style={styles.areaAtividade}>
          <View style={styles.areaFotoAtividade}>
            <Feather name="trending-down" size={24} color="white" />
          </View>

          <View style={styles.areaInfoAtividade}>
            <Text style={styles.tituloAtiv}>Saida</Text>
            <Text style={styles.valorAtiv}>R$ 13,00</Text>
          </View>
          <View>
            <Text style={styles.diaAtiv}>28 MAI</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}