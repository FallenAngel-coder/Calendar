import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';

const TaskScreen = ({ route, navigation }) => {
    const { date } = route.params;
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        loadTasks();
    }, [date]);

    const loadTasks = async () => {
        try {
            const currentUser = await AsyncStorage.getItem('currentUser');
            if (currentUser) {
                const storedTasks = await AsyncStorage.getItem(`tasks_${currentUser}`);
                if (storedTasks) {
                    const allTasks = JSON.parse(storedTasks);
                    setTasks(allTasks[date.toDateString()] || []);
                }
            }
        } catch (error) {
            console.error('Помилка завантаження задач:', error);
        }
    };

    const saveTasks = async (updatedTasks) => {
        try {
            const currentUser = await AsyncStorage.getItem('currentUser');
            if (currentUser) {
                const storedTasks = await AsyncStorage.getItem(`tasks_${currentUser}`);
                const allTasks = storedTasks ? JSON.parse(storedTasks) : {};
                allTasks[date.toDateString()] = updatedTasks;
                await AsyncStorage.setItem(`tasks_${currentUser}`, JSON.stringify(allTasks));
                setTasks(updatedTasks);
            }
        } catch (error) {
            console.error('Помилка збереження задач:', error);
        }
    };

    const addTask = () => {
        if (newTask.trim()) {
            const updatedTasks = [...tasks, { id: Date.now().toString(), title: newTask, description: '' }];
            saveTasks(updatedTasks);
            setNewTask('');
        }
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        saveTasks(updatedTasks);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? '#333' : '#fff'}
            />
            <Text style={[styles.header, isDarkMode && styles.darkText]}>Завдання на {date.toDateString()}</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.task, isDarkMode && styles.darkTask]}
                        onPress={() => navigation.navigate('Редагувати задачу', { task: item, onSave: (updatedTask) => {
                                const updatedTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
                                saveTasks(updatedTasks);
                            }})}
                    >
                        <Text style={[styles.taskText, isDarkMode && styles.darkText]}>{item.title}</Text>
                        {item.description && <Text style={[styles.taskDescription, isDarkMode && styles.darkText]}>{item.description}</Text>}
                        <TouchableOpacity onPress={() => deleteTask(item.id)}>
                            <Text style={styles.deleteButton}>Видалити</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={isDarkMode && styles.darkText}>Немає задач</Text>}
            />
            <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                placeholder="Нове завдання"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                value={newTask}
                onChangeText={setNewTask}
            />
            <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={addTask}>
                <Text style={styles.buttonText}>Додати</Text>
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
    task: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    darkTask: { borderBottomColor: '#555' },
    taskText: { fontSize: 16, color: '#000' },
    taskDescription: { fontSize: 14, color: '#666', marginTop: 5 },
    deleteButton: { color: 'red', marginTop: 10 },
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

export default TaskScreen;