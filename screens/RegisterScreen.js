import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isDarkMode } = useContext(ThemeContext);

    const handleRegister = async () => {
        try {
            await AsyncStorage.setItem(username, JSON.stringify({ username, password }));
            alert('Реєстрація успішна!');
            navigation.navigate('Вхід');
        } catch (error) {
            console.error('Помилка реєстрації:', error);
        }
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            {/* Змінюємо колір тексту статусу */}
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? '#333' : '#fff'}
            />
            <Text style={[styles.header, isDarkMode && styles.darkText]}>Реєстрація</Text>
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
            <Button title="Зареєструватися" onPress={handleRegister} />
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
});

export default RegisterScreen;