import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';


export default function App() {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 3000);})

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <FontAwesome name="google-wallet" size={120} color="white" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#980BDA',
        justifyContent: 'center',
        alignItems: 'center',
    },

});