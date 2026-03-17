import axios from "axios";

const API_URL = "http://localhost:3000/tareas";

const getAllTareas = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

const getTareaById = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/${id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

const crearTarea = (tarea) => {
    return new Promise((resolve, reject) => {
        axios.post(API_URL, tarea)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

const actualizarTarea = (id, tarea) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_URL}/${id}`, tarea)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

const actualizarTareaParcial = (id, tarea) => {
    return new Promise((resolve, reject) => {
        axios.patch(`${API_URL}/${id}`, tarea)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

const eliminarTarea = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_URL}/${id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export {
    getAllTareas,
    getTareaById,
    crearTarea,
    actualizarTarea,
    actualizarTareaParcial,
    eliminarTarea
};