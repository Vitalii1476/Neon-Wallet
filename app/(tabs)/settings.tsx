import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import logOut from '@/components/services/logOut';

export default function Settings() {

  const handleLogOut = async () => {
    await logOut();
    console.log('Logged out');
  };

    return (
        <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Qr scanner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Change language</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleLogOut}>
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    option: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    optionText: {
        fontSize: 18,
        color: '#333',
    },
    optionIcon: {
        marginRight: 10,
        color: '#333',
        fontSize: 24,
    }})