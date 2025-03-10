import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isDarkMode } = useContext(ThemeContext);

    const handleLogin = async () => {
        try {
            const user = await AsyncStorage.getItem(username);
            if (user && JSON.parse(user).password === password) {
                await AsyncStorage.setItem('currentUser', username);
                navigation.navigate('Календар');
            } else {
                alert('Невірний логін або пароль');
            }
        } catch (error) {
            console.error('Помилка входу:', error);
        }
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? '#333' : '#fff'}
            />
            <Text style={[styles.header, isDarkMode && styles.darkText]}>Вхід</Text>
            <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                placeholder="Логін"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                placeholder="Пароль"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={handleLogin}>
                <Text style={styles.buttonText}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => navigation.navigate('Реєстрація')}>
                <Text style={styles.buttonText}>Реєстрація</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    darkContainer: { backgroundColor: '#333' },
    header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#000' },
    darkText: { color: '#fff' },
    input: { borderWidth: 1, padding: 8, marginBottom: 10, borderColor: '#ccc', color: '#000' },
    darkInput: { borderColor: '#555', color: '#fff' },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    darkButton: { backgroundColor: '#555' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default LoginScreen;