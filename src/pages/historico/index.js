import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Switch,
  Dimensions,
} from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function App() {
  

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    entrada: [
      3000, 4500, 3500, 5000, 6000, 7000, 8000, 5500, 6500, 7500, 8500, 9000,
    ],
    saida: [
      2000, 3000, 2500, 4000, 4500, 5000, 5500, 4000, 5000, 6000, 6500, 7000,
    ],
  };
  
  const [isEntrada, setIsEntrada] = useState(true);

  const toggleeSwitch = () => setIsEntrada((previousState) => !previousState);

  const chartConfig = {
    backgroundGradientFrom: "#2d2d2d",
    backgroundGradientTo: "#2d2d2d",
    color: () => (isEntrada ? `rgb(0, 255, 0)` : `rgb(255, 0, 0)`),
    barPercentage: 0.5,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
    withHorizontalLines: false,
    withVerticalLines: false,
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: isEntrada ? data.entrada : data.saida,
      },
    ],
  };

  const [grafico, setGrafico] = useState(false);

  const toggleSwitch = () => setGrafico((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Todos os lançamentos</Text>
      </View>
      <View style={styles.historico}>
        <View style={styles.opcao}>
          <Text style={styles.opcaoTitle}>Gráfico</Text>
          <Switch
            trackColor={{ false: "#gray", true: "white" }}
            thumbColor={grafico ? "#980BDA" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={grafico}
          />
        </View>
        {grafico ? (
          <View style={styles.grafico}>
            <View style={styles.tituloGrafico}>
              <Text style={styles.titlee}>Entradas e Saídas Mensais</Text>
            </View>
            <View style={styles.contentGrafico}>
              <View style={styles.switchContainer}>
                <Text style={styles.textES}>Saída</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#767577" }}
                  thumbColor={isEntrada ? `rgb(0, 255, 0)` : `rgb(255, 0, 0)`}
                  onValueChange={toggleeSwitch}
                  value={isEntrada}
                />
                <Text style={styles.textES}>Entrada</Text>
              </View>
              <View style={styles.graficos}>
                <BarChart
                  data={chartData}
                  width={screenWidth - 10}
                  height={screenHeight/3.5}
                  chartConfig={chartConfig}
                  fromZero={true}
                  showBarTops={false}
                  showValuesOnTopOfBars={true}
                  withInnerLines={false}
                  style={{
                    borderRadius: 16,
                  }}
                />
                <View style={styles.pizza}>

                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.dados}>
            <View style={styles.itemRecebido}>
              <View style={styles.dataItem}>
                <Text style={styles.textDataItem}>5 de Junho</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.icon}>
                  <View style={styles.iconn}></View>
                </View>
                <View style={styles.desc}>
                  <View style={styles.linha}>
                    <Text style={styles.textDesc}>FGTS</Text>
                    <Text style={styles.textValor}>R$ 9.000,00</Text>
                  </View>
                  <View style={styles.linha}>
                    <Text style={styles.textInfos}>Conta incial</Text>
                    <Text style={styles.textInfos}>recebido</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.itemPago}>
              <View style={styles.dataItem}>
                <Text style={styles.textDataItem}>5 de Junho</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.icon}>
                  <View style={styles.iconnR}></View>
                </View>
                <View style={styles.desc}>
                  <View style={styles.linha}>
                    <Text style={styles.textDesc}>IPVA</Text>
                    <Text style={styles.textValorPago}>- R$ 8.100,00</Text>
                  </View>
                  <View style={styles.linha}>
                    <Text style={styles.textInfos}>Conta incial</Text>
                    <Text style={styles.textInfos}>pago</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={styles.total}>
        <View style={styles.totalP1}></View>
        <View style={styles.totalP1}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>R$ 900</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  item: {
    padding: 20,
    margin: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: "red",
  },
  itemText: {
    fontSize: 18,
  },
  incorrectText: {
    color: "red",
  },
  title: {
    flex: 1,
    backgroundColor: "#980BDA",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 23,
    color: "white",
    fontWeight: "bold",
    marginTop: 30,
  },
  historico: {
    flex: 8,
    backgroundColor: "#1F1F1F",
    width: "100%",
  },
  total: {
    flex: 0.4,
    backgroundColor: "blue",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#272727",
    borderBottomWidth: 0.7,
    borderTopWidth: 0.7,
    borderColor: "#66487A",
  },
  totalP1: {
    flex: 1,
    backgroundColor: "#272727",
    width: "100%",
    flexDirection: "row",
    gap: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  totalText: {
    fontSize: 20,
    color: "#980BDA",
    fontWeight: "500",
  },
  opcao: {
    width: "100%",
    height: "10%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: "#323232",
    borderBottomWidth: 0.7,
    borderColor: "#66487A",
  },
  opcaoTitle: {
    fontSize: 25,
    color: "gray",
    fontWeight: "600",
  },
  dados: {
    width: "100%",
    height: "90%",
  },
  grafico: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  tituloGrafico: {
    flex: 0.7,
  },
  contentGrafico: {
    flex: 10,
  },
  graficos: {
    flex: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom:30,
    alignItems: 'center'
  },
  itemRecebido: {
    width: "100%",
    height: "15%",
    flexDirection: "column",
    backgroundColor: "#323232",
  },
  dataItem: {
    width: "100%",
    height: "25%",
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  textDataItem: {
    fontWeight: "600",
    color: "#A9A9A9",
  },
  content: {
    width: "100%",
    height: "75%",
    flexDirection: "row",
  },
  icon: {
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconn: {
    width: 70,
    height: 70,
    backgroundColor: "green",
    borderRadius: 50,
  },
  iconnR: {
    width: 70,
    height: 70,
    backgroundColor: "#AA3535",
    borderRadius: 50,
  },
  desc: {
    width: "80%",
    height: "100%",
    flexDirection: "column",
  },
  linha: {
    height: "50%",
    width: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  textDesc: {
    fontSize: 20,
    color: "white",
    textTransform: "capitalize",
    fontWeight: "600",
  },
  textValor: {
    fontSize: 20,
    color: "green",
    fontWeight: "600",
  },
  textValorPago: {
    fontSize: 20,
    color: "#AA3535",
    fontWeight: "600",
  },
  textInfos: {
    fontSize: 15,
    color: "gray",
    textTransform: "capitalize",
    fontWeight: "600",
  },
  itemPago: {
    width: "100%",
    height: "15%",
    flexDirection: "column",
    backgroundColor: "#323232",
  },
  titlee: {
    fontSize: 22,
    marginBottom: 10,
    color: "gray",
    marginTop: 10,
    fontWeight: "bold",
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
    flex: 0.5
  },
  textES: {
    color: "white",
    fontSize: 20,
  },
  pizza: {
    width: screenWidth - 10,
    backgroundColor:'#2d2d2d',
    height: screenHeight/3.5,
    borderRadius: 16
  }
});
