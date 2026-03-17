import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actualizarTareaParcial, eliminarTarea, getAllTareas } from "../../../services/TareaService";
import { Button, Card, Col, Container, FormCheck, Row } from "react-bootstrap";
import HeaderTareas from "../components/Header";

const ListaTareas = () => {
    const navigate = useNavigate();

    const [listaTareas, setListaTareas] = useState([]);
    const [tareasFiltradas, setTareasFiltradas] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const cargarTareas = () => {
        getAllTareas()
            .then((tareas) => {
                setListaTareas(tareas);
                setTareasFiltradas(tareas);
            })
            .catch((error) => {
                console.error(error);
                alert("Error al cargar las tareas");
            });
    };

    useEffect(() => {
        cargarTareas();
    }, []);

    useEffect(() => {
        const texto = textoBusqueda.trim().toLowerCase();

        if (texto === "") {
            // eslint-disable-next-line
            setTareasFiltradas(listaTareas);
            return;
        }

        const filtradas = listaTareas.filter((tarea) =>
            tarea.titulo.toLowerCase().includes(texto)
        );

        setTareasFiltradas(filtradas);
    }, [textoBusqueda, listaTareas]);

    const onClickEditar = (id) => () => {
        navigate(`/tareas/${id}/edit`);
    };

    const onClickEliminar = (id) => () => {
        if (!window.confirm("¿Estás seguro de eliminar esta tarea?")) {
            return;
        }

        eliminarTarea(id)
            .then(() => {
                setListaTareas((prev) => prev.filter((item) => item.id !== id));
                setTareasFiltradas((prev) => prev.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.error(error);
                alert("Error al eliminar la tarea");
            });
    };

    const onCambioBusqueda = (event) => {
        setTextoBusqueda(event.target.value);
    };

    const onCambiarCompletado = (tarea) => async (event) => {
        const nuevoEstado = event.target.checked;

        try {
            await actualizarTareaParcial(tarea.id, {
                completado: nuevoEstado
            });

            setListaTareas((prev) =>
                prev.map((item) =>
                    item.id === tarea.id
                        ? { ...item, completado: nuevoEstado }
                        : item
                )
            );

            setTareasFiltradas((prev) =>
                prev.map((item) =>
                    item.id === tarea.id
                        ? { ...item, completado: nuevoEstado }
                        : item
                )
            );
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el estado de la tarea");
        }
    };

    return (
        <>
            <HeaderTareas
                textoBusqueda={textoBusqueda}
                onCambioBusqueda={onCambioBusqueda}
                mostrarBuscador={true}
            />

            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col md={9}>
                        {tareasFiltradas.length === 0 ? (
                            <Card className="mb-3">
                                <Card.Body className="text-center py-3">
                                    <h6>No hay tareas registradas</h6>
                                    <p className="mb-0">Crea una nueva tarea para comenzar.</p>
                                </Card.Body>
                            </Card>
                        ) : (
                            tareasFiltradas.map((tarea) => (
                                <Card
                                    className={`mb-3 ${tarea.completado ? "bg-light" : ""}`}
                                    key={tarea.id}
                                >
                                    <Card.Body className="py-2">
                                        <Row className="align-items-center">
                                            <Col xs="auto">
                                                <FormCheck
                                                    type="checkbox"
                                                    checked={!!tarea.completado}
                                                    onChange={onCambiarCompletado(tarea)}
                                                />
                                            </Col>

                                            <Col>
                                                <h6 className={`mb-0 ${tarea.completado ? "text-decoration-line-through text-muted" : ""}`}>
                                                    {tarea.titulo}
                                                </h6>
                                            </Col>

                                            <Col xs="auto" className="d-flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    onClick={onClickEditar(tarea.id)}
                                                >
                                                    Editar
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    onClick={onClickEliminar(tarea.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListaTareas;