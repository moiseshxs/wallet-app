import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import sqLiteJogadores from './src/sqlite/sqLiteTeclas';

export default function App() {
  const [jogadores, setJogadores] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
    fetchJogadores();
  }, []);

  const fetchJogadores = async () => {
    const jogadores = await sqLiteJogadores.all();
    if (jogadores !== false) {
      setJogadores(jogadores);
    } else {
      // Trate o caso em que não há jogadores retornados
      console.log('Não há jogadores retornados');
    }
  };

  const handleSelect = (index) => {
    // Se não houver nenhum jogador selecionado, selecione o jogador atual
    if (selectedItemIndex === null) {
      setSelectedItemIndex(index);
    } else {
      // Se houver um jogador selecionado, troque as posições dos jogadores
      trocarPosicoes(selectedItemIndex, index);
      // Limpe a seleção
      setSelectedItemIndex(null);
    }
  };

  const trocarPosicoes = (index1, index2) => {
    // Crie uma cópia da lista de jogadores
    const novaListaJogadores = [...jogadores];
    // Troque as posições dos jogadores
    const temp = novaListaJogadores[index1];
    novaListaJogadores[index1] = novaListaJogadores[index2];
    novaListaJogadores[index2] = temp;
    // Atualize o estado com a nova ordem dos jogadores
    setJogadores(novaListaJogadores);
  };

  const isCorrectPosition = (index) => {
    // Obtém a posição esperada para o quadrado com base no índice
    const posicaoEsperada = getPositionExpected(index);
  
    // Obtém a posição do jogador na lista de jogadores
    const posicaoJogador = jogadores[index].posicao;
  
    // Verifica se a posição do jogador corresponde à posição esperada para o quadrado
    return posicaoJogador === posicaoEsperada;
  };
  
  const getPositionExpected = (index) => {
    // Implemente a lógica para definir a posição esperada para cada quadrado
    // Por exemplo, se você tiver cinco quadrados e cinco posições diferentes, pode fazer algo como:
    switch (index) {
      case 0:
        return 'pivo';
      case 1:
        return 'ala';
      case 2:
        return 'armador';
      case 3:
        return 'ala-armador';
      case 4:
        return 'ala-pivo';
      default:
        return ''; // Retorne uma string vazia se não houver posição esperada definida
    }
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={jogadores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedItemIndex === index && styles.selectedItem
            ]}
            onPress={() => handleSelect(index)}
          >
            <Text style={[styles.itemText, !isCorrectPosition(index) && styles.incorrectText]}>
              {item.posicao}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 20,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: 'red',
  },
  itemText: {
    fontSize: 18,
  },
  incorrectText: {
    color: 'red',
  },
});
