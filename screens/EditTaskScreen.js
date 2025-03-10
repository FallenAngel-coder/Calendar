import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const EditTaskScreen = ({ route, navigation }) => {
    const { task, onSave } = route.params;
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const { isDarkMode } = useContext(ThemeContext);

    const handleSave = () => {
        onSave({ ...task, title, description });
        navigation.goBack();
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? '#333' : '#fff'}
            />
            <Text style={[styles.header, isDarkMode && styles.darkText]}>Редагувати завдання</Text>
            <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                placeholder="Назва завдання"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                placeholder="Опис завдання"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={handleSave}>
                <Text style={styles.buttonText}>Зберегти</Text>
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

export default EditTaskScreen;