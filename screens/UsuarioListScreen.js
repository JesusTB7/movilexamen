import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsuarioListScreen = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            const token = await AsyncStorage.getItem("token");

            axios
                .get("http://3.17.81.51/users/usuarios", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setUsuarios(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error al obtener usuarios:", error);
                    setLoading(false);
                });
        };

        fetchUsuarios();
    }, []);

    const filteredUsers = usuarios.filter(
        (usuario) =>
            usuario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Usuarios</Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar usuario"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : filteredUsers.length === 0 ? (
                <Text>No se encontraron usuarios.</Text>
            ) : (
                <View style={styles.table}>
                    <View style={styles.headerRow}>
                        <Text style={[styles.headerCell, styles.nameColumn]}>Nombre</Text>
                        <Text style={[styles.headerCell, styles.emailColumn]}>Correo</Text>
                        <Text style={[styles.headerCell, styles.lastNameColumn]}>Apellido</Text>
                        <Text style={[styles.headerCell, styles.actionColumn]}>Acciones</Text>
                    </View>

                    <FlatList
                        data={filteredUsers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => (
                            <View
                                style={[
                                    styles.row,
                                    index % 2 === 0 ? styles.rowEven : {},
                                ]}
                            >
                                <Text style={[styles.cell, styles.nameColumn]}>{item.name}</Text>
                                <Text style={[styles.cell, styles.emailColumn]}>{item.email}</Text>
                                <Text style={[styles.cell, styles.lastNameColumn]}>{item.last_name}</Text>
                                <View style={[styles.cell, styles.actionColumn]}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.greenButton]}
                                        onPress={() =>
                                            navigation.navigate("UsuarioDetalle", {
                                                userId: item.id,
                                            })
                                        }
                                    >
                                        <Text style={styles.buttonText}>Ver</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            )}

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={async () => {
                    await AsyncStorage.removeItem("token");
                    navigation.navigate("LoginScreen");
                }}
            >
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#ffffff",
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 14,
    },
    table: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 6,
        overflow: "hidden",
        elevation: 2,
    },
    headerRow: {
        flexDirection: "row",
        backgroundColor: "#e0e0e0",
        paddingVertical: 8,
        paddingHorizontal: 5,
    },
    headerCell: {
        fontWeight: "bold",
        fontSize: 13,
        color: "#333",
    },
    row: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    rowEven: {
        backgroundColor: "#f9f9f9",
    },
    cell: {
        fontSize: 13,
        color: "#333",
    },
    nameColumn: {
        flex: 2,
    },
    emailColumn: {
        flex: 3,
    },
    lastNameColumn: {
        flex: 2,
    },
    actionColumn: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
    },
    actionButtonsContainer: {
        flexDirection: "row",
        gap: 8,
    },
    button: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    greenButton: {
        backgroundColor: "#4CAF50",
    },
    blueButton: {
        backgroundColor: "#4f84d9",
    },
    buttonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: "#dc3545",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    logoutText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default UsuarioListScreen;
