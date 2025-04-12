import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const UsuarioFormScreen = () => {
    const [usuario, setUsuario] = useState({
        name: "",
        email: "",
        last_name: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigation = useNavigation();

    const handleSubmit = () => {
        setLoading(true);

        axios
            .post("http://3.17.81.51/users/crearusuario", usuario)
            .then(() => {
                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    navigation.navigate("LoginScreen");
                }, 2000);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Registro de Usuario</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : success ? (
                <View style={styles.successContainer}>
                    <Text>Registro exitoso. Redirigiendo...</Text>
                </View>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        value={usuario.name}
                        onChangeText={(text) => setUsuario({ ...usuario, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo"
                        value={usuario.email}
                        onChangeText={(text) => setUsuario({ ...usuario, email: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido"
                        value={usuario.last_name}
                        onChangeText={(text) => setUsuario({ ...usuario, last_name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry
                        value={usuario.password}
                        onChangeText={(text) => setUsuario({ ...usuario, password: text })}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Registrar Usuario</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => navigation.navigate("LoginScreen")}
                    >
                        <Text style={styles.buttonText}>Regresar al Login</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: "90%",
        maxWidth: 500,
        marginTop: 30,
        marginHorizontal: "auto",
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 10,
        elevation: 5,
        alignSelf: "center",
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        marginBottom: 20,
        color: "#333",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#dc3545",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    successContainer: {
        alignItems: "center",
        padding: 20,
    },
});

export default UsuarioFormScreen;
