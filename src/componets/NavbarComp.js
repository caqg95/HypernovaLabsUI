import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
//import Acceso from "../pages/Acceso.js";
import Home from '../pages/Home'
import Gastos from '../pages/Gastos/Gastos.js'
import Empleados from '../pages/Empleados/Empleados.js'
import Conceptos from '../pages/Conceptos/Conceptos.js'
import Cuentas from '../pages/Cuentas/Cuentas.js'
import Departamentos from '../pages/Departamentos/Departamentos.js'
import Puestos from '../pages/Puestos/Puestos.js'
import Usuarios from '../pages/Usuarios/Usuarios.js'
//const user = parseInt(localStorage.getItem("username"));
const NavbarComp = () => {
   
    return (
        <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/Home">HypernovaLabs Gastos</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/Gastos">Gastos</Nav.Link>
                            <Nav.Link as={Link} to="/Empleados">Empleados</Nav.Link>
                            <NavDropdown title="Catalogo" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/Puestos">Puesto</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/Departamentos">Departamento</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/Conceptos">Conceptos</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/Cuentas">Cuentas</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Administracion" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/Usuarios">Usuarios</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#">Bienvenido {localStorage.getItem("username")}</Nav.Link>
                            <Nav.Link  href="http://localhost:3000/">Salir</Nav.Link>
                        </Nav> 
                    </Navbar.Collapse>
                
                </Container>
            </Navbar>
            <Switch>
                <Route path="/Home">
                    <Home/>
                </Route>
                <Route path="/Gastos">
                    <Gastos/>
                </Route>
                <Route path="/Empleados">
                    <Empleados/>
                </Route>
                <Route path="/Conceptos">
                    <Conceptos/>
                </Route>
                <Route path="/Cuentas">
                    <Cuentas/>
                </Route>
                <Route path="/Departamentos">
                    <Departamentos/>
                </Route>
                <Route path="/Puestos">
                    <Puestos/>
                </Route>
                <Route path="/Usuarios">
                    <Usuarios/>
                </Route>
            </Switch>
        </Router>
    );
}

export default NavbarComp;