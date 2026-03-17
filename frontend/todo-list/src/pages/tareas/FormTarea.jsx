import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormCheck, FormControl, FormGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarTarea, crearTarea, getTareaById } from "../../../services/TareaService";
import Header from "../components/Header";
import HeaderTareas from "../components/Header";

const FormTarea = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [validated, setValidated] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [completado, setCompletado] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }

        getTareaById(id)
            .then((tarea) => {
                setTitulo(tarea.titulo || "");
                setCompletado(!!tarea.completado);
            })
            .catch((error) => {
                console.error(error);
                alert("Error al cargar la tarea");
                navigate("/");
            });
    }, [id, navigate]);

    const onGuardarTarea = (event) => {
        const form = event.currentTarget;
        let tieneErrores = false;

        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
            tieneErrores = true;
        }

        setValidated(true);

        if (tieneErrores) {
            return;
        }

        const tarea = {
            titulo,
            completado
        };

        if (id) {
            actualizarTarea(id, tarea)
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    console.error(error);
                    alert("Error al actualizar la tarea");
                });
        } else {
            crearTarea(tarea)
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    console.error(error);
                    alert("Error al crear la tarea");
                });
        }
    };

    const onClickCancelar = () => {
        navigate("/");
    };

    return (
        <>
            <HeaderTareas />
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="mb-3">
                                    {id ? "Editar Tarea" : "Crear Tarea"}
                                </Card.Title>

                                <Form noValidate validated={validated} onSubmit={onGuardarTarea}>
                                    <FormGroup className="mb-3">
                                        <Form.Label htmlFor="txtTitulo">
                                            Título <span className="text-danger">*</span>
                                        </Form.Label>
                                        <FormControl
                                            id="txtTitulo"
                                            required
                                            type="text"
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                            placeholder="Ingrese el título de la tarea"
                                        />
                                        <FormControl.Feedback type="invalid">
                                            El título es obligatorio
                                        </FormControl.Feedback>
                                    </FormGroup>

                                    <div className="d-flex gap-2">
                                        <Button variant="success" type="submit">
                                            Guardar
                                        </Button>
                                        <Button variant="secondary" type="button" onClick={onClickCancelar}>
                                            Cancelar
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormTarea;