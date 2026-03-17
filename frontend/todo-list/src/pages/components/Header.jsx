import { Container, FormControl, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeaderTareas = ({ textoBusqueda, onCambioBusqueda, mostrarBuscador = false }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Todo List
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-tareas" />

                <Navbar.Collapse id="navbar-tareas">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Lista de tareas
                        </Nav.Link>
                        <Nav.Link as={Link} to="/tareas/create">
                            Crear tarea
                        </Nav.Link>
                    </Nav>

                    {mostrarBuscador && (
                        <FormControl
                            type="text"
                            placeholder="Buscar tarea"
                            value={textoBusqueda}
                            onChange={onCambioBusqueda}
                            style={{ maxWidth: "260px" }}
                        />
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderTareas;