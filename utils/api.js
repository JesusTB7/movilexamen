import axios from 'axios';

// Crear una instancia de axios con la URL base
const api = axios.create({
    baseURL: 'http://3.17.81.51', // La URL base de la API
    headers: {
        'Content-Type': 'application/json',
    }
});

// Función para obtener el token de localStorage y actualizar los headers
const setAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
};

// Función para hacer login
export const loginUsuario = async (email, password) => {
    try {
        const response = await axios.post('http://3.17.81.51/users/login', {
            email,
            password
        });
        return response.data;  // Devuelve la respuesta completa (como el token)
    } catch (error) {
        console.error("Error de login:", error);
        throw error;
    }
};

// Función para obtener todos los usuarios
export const obtenerUsuarios = async () => {
    try {
        setAuthHeader(); // Asegurarse de que el token esté actualizado en los headers
        const response = await api.get('/users/usuarios');
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};

// Función para obtener un usuario por ID
export const obtenerUsuario = async (id) => {
    try {
        setAuthHeader(); // Asegurarse de que el token esté actualizado en los headers
        const response = await api.get(`/users/usuario/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener detalle del usuario:', error);
        throw error;
    }
};

// Función para crear un nuevo usuario
export const crearUsuario = async (usuarioData) => {
    try {
        setAuthHeader(); // Asegurarse de que el token esté actualizado en los headers
        const response = await api.post('/users/crearusuario', usuarioData);
        return response.data;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};

// Exportar todo el archivo para usar las funciones
export default {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario
};
