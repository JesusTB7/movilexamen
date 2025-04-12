import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";

const UsuarioDetalleScreen = () => {
    const [usuarioDetalle, setUsuarioDetalle] = useState(null);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const navigation = useNavigation();

    const { userId } = route.params;

    useEffect(() => {
        axios
            .get(`http://3.17.81.51/users/usuario/${userId}`)
            .then((response) => {
                setUsuarioDetalle(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [userId]);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : usuarioDetalle ? (
                <View style={styles.detailContainer}>
                    <Text style={styles.title}>Detalle del Usuario</Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>ID:</Text> {usuarioDetalle.id}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Nombre:</Text> {usuarioDetalle.name}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Apellido:</Text> {usuarioDetalle.last_name}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Correo:</Text> {usuarioDetalle.email}
                    </Text>

                    <TouchableOpacity
                        style={styles.blueButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>Regresar a la lista</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text>No se encontraron detalles para este usuario.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    detailContainer: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    title: {
        textAlign: "center",
        marginBottom: 15,
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    text: {
        fontSize: 14,
        marginBottom: 8,
        color: "#333",
    },
    bold: {
        fontWeight: "bold",
    },
    blueButton: {
        backgroundColor: "#4f84d9",
        padding: 10,
        borderRadius: 4,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default UsuarioDetalleScreen;
