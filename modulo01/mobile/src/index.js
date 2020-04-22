import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import api from './services/api';

//  Não possuem valor semântico (significado)
//  Não possuem uma estilização própria
//  Todos os componentes possuem "display:flex"

//  View: div, footer, header, main, asiode, section...
//  Text: p, span, strong, h1, h2, h3...

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        }).catch(function (error) {
            console.log(error);
            console.log(error.request);  
        });
    }, []);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <View style={styles.container}>
                <Text style={styles.title}>Teste 5</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#fff', 
        fontSize: 32,
        fontWeight: 'bold'
    }
});