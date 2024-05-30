import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';

export default function App() {

  return (
    <View style={styles.container}>
     
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
