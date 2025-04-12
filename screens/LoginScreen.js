import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setError("");

        axios.post("http://3.17.81.51/users/login", { email, password })
            .then((response) => {
                setLoading(false);
                const { token } = response.data;
                AsyncStorage.setItem("token", token);
                navigation.navigate("UsuarioListScreen");
            })
            .catch((error) => {
                setLoading(false);
                setError("Correo o contraseña incorrectos.");
                console.error(error);
            });
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Text style={styles.label}>Correo</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.togglePassword}
                >
                    <Text>{showPassword ? "OCULTAR" : "VER"}</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : (
                <Button title="Iniciar Sesión" color="blue" onPress={handleSubmit} />
            )}

            <Text style={styles.linkText}>
                ¿No tienes cuenta?{" "}
                <Text style={styles.boldLink} onPress={() => navigation.navigate("UsuarioForm")}>
                    Regístrate
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        margin: 30,
        padding: 30,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    label: {
        marginTop: 10,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 15,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
    linkText: {
        marginTop: 15,
        textAlign: "center",
    },
    boldLink: {
        fontWeight: "bold",
        color: "blue",
    },
    passwordContainer: {
        position: "relative",
        justifyContent: "center",
    },
    togglePassword: {
        position: "absolute",
        right: 10,
        top: 15,
    },
});

export default LoginScreen;
