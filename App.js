import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CalendarScreen from './screens/CalendarScreen';
import TaskScreen from './screens/TaskScreen';
import EditTaskScreen from './screens/EditTaskScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <ThemeProvider>
            <ThemeContext.Consumer>
                {({ isDarkMode }) => (
                    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
                        <StatusBar
                            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                            backgroundColor={isDarkMode ? '#333' : '#fff'}
                        />
                        <Stack.Navigator initialRouteName="Вхід">
                            <Stack.Screen name="Вхід" component={LoginScreen} />
                            <Stack.Screen name="Реєстрація" component={RegisterScreen} />
                            <Stack.Screen name="Календар" component={CalendarScreen} />
                            <Stack.Screen name="Завдання" component={TaskScreen} />
                            <Stack.Screen name="Редагувати задачу" component={EditTaskScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                )}
            </ThemeContext.Consumer>
        </ThemeProvider>
    );
};

export default App;