import React, { useState, useEffect, Fragment } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
    FilterRow,
    Lookup,
    Editing,
    Popup,
    RequiredRule
} from "devextreme-react/data-grid";

const Empleados = () => {
    const [listadoEmpleado, setListadoEmpleado] = useState([]);
    const [listadoPuestoEmpleado, setListadoPuestoEmpleado] = useState([]);
    const [listadoDepartamentos, setListadoDepartamentos] = useState([]);
    useEffect(() => {
        ObtenerListadoEmpleado();
        ObtenerListadoPuesto();
        ObtenerListadoDepartamentos();

    }, []);
    const allowedPageSizes = [5, 10, 20, 50, 100];
    const ObtenerListadoEmpleado = async () => {
        await axios({
            method: "get",
            url: "/Empleado/ObtenerEmpleados/",
        })
            .then((result) => {
                //console.log(result);
                if (result.status === 200) {
                    toast.dismiss();
                    console.log(result.data)
                    setListadoEmpleado(result.data);
                } else if (result.status === 400) {
                    toast.error(result.message);
                } else toast.error(result.message);
            })
            .catch((e) => {
                console.log(e);
                if (e.message === "Network Error") {
                    return toast.error("Error de Conexión", {
                        duration: 6000,
                    });
                }
                if (!e.response.status) {
                    toast.error(e.response.statusText, { duration: 10000 });
                } else {
                    toast.error(e.response.statusText, {
                        duration: 6000,
                    });
                }
            });
    };
    const ObtenerListadoPuesto = async () => {
        await axios({
            method: "get",
            url: "/Puesto/ObtenerPuestos/",
        })
            .then((result) => {
                //console.log(result);
                if (result.status === 200) {
                    toast.dismiss();
                    console.log(result.data)
                    setListadoPuestoEmpleado(result.data);
                } else if (result.status === 400) {
                    toast.error(result.message);
                } else toast.error(result.message);
            })
            .catch((e) => {
                console.log(e);
                if (e.message === "Network Error") {
                    return toast.error("Error de Conexión", {
                        duration: 6000,
                    });
                }
                if (!e.response.status) {
                    toast.error(e.response.statusText, { duration: 10000 });
                } else {
                    toast.error(e.response.statusText, {
                        duration: 6000,
                    });
                }
            });
    };
    const ObtenerListadoDepartamentos = async () => {
        await axios({
            method: "get",
            url: "/Departamento/ObtenerDepartamentos/",
        })
            .then((result) => {
                //console.log(result);
                if (result.status === 200) {
                    toast.dismiss();
                    console.log(result.data)
                    setListadoDepartamentos(result.data);
                } else if (result.status === 400) {
                    toast.error(result.message);
                } else toast.error(result.message);
            })
            .catch((e) => {
                console.log(e);
                if (e.message === "Network Error") {
                    return toast.error("Error de Conexión", {
                        duration: 6000,
                    });
                }
                if (!e.response.status) {
                    toast.error(e.response.statusText, { duration: 10000 });
                } else {
                    toast.error(e.response.statusText, {
                        duration: 6000,
                    });
                }
            });
    };

    function guardarEmpleado(e) {
        let empleado = {
            nombre: e.data.nombre,
            apellido:e.data.apellido,
            IdPuesto:e.data.id_Puesto,
            UsuarioRegistro: localStorage.getItem("username")
        };
        axios
            .post("/Empleado/CrearEmpleado", empleado)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Guardado con Exito !!", {
                        duration: 4000,
                    });
                    ObtenerListadoEmpleado();
                }
            })
            .catch(function (error) {
                console.log(error);
                if (!error.status) {
                    toast.error(
                        "Problemas para conectarse al servidor, favor verifique su conexion e intentelo nuevamente",
                        { duration: 50000 }
                    );
                } else if (error.response.status === 400) {
                    toast.error(error.response.data.message);

                } else if (error.request) {

                    console.log(error.request);
                }
            });

    }
    function editarEmpleado(e) {
        let empleado = {
            IdEmpleado: e.data.id_Empleado,
            nombre: e.data.nombre,
            apellido:e.data.apellido,
            IdPuesto:e.data.id_Puesto,
            UsuarioRegistro: e.data.UsuarioRegistro,
            fechaRegistro: e.data.fechaRegistro,
            UsuarioActualizo: localStorage.getItem("username")
        };
        axios
            .put("/Empleado/ActualizarEmpleado/" + e.data.id_Empleado, empleado)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Actualizacion exitosa !!", {
                        duration: 50000,
                    });
                    ObtenerListadoEmpleado();
                }
            })
            .catch(function (error) {
                console.log(error);
                if (!error.status) {
                    toast.error(
                        "Problemas para conectarse al servidor, favor verifique su conexion e intentelo nuevamente",
                        { duration: 50000 }
                    );
                } else if (error.response.status === 400) {
                    toast.error(error.response.data.message);

                } else if (error.request) {

                    console.log(error.request);
                }
            });
    }
    function eliminarEmpleado(e) {
        axios
            .delete("/Empleado/EliminarEmpleado/" + e.data.id_Empleado)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Se Elimino con Exito", {
                        duration: 4000,
                    });
                    ObtenerListadoEmpleado();
                }
            })
            .catch(function (error) {
                console.log(error);
                if (!error.status) {
                    toast.error(
                        "Problemas para conectarse al servidor, favor verifique su conexion e intentelo nuevamente",
                        { duration: 5000 }
                    );
                } else if (error.response.status === 400) {
                    toast.error(error.response.data.message);

                } else if (error.request) {

                    console.log(error.request);
                }
            });
    }
    return (
        <Fragment>
            <div className="panel">
                <Toaster />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Listado de Empleados</h1>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 30 }}>
                        <div className="col-md-12" style={{ marginTop: 30 }}>
                            <DataGrid
                                dataSource={listadoEmpleado}
                                showBorders={true}
                                onRowInserted={guardarEmpleado}
                                onRowUpdated={editarEmpleado}
                                onRowRemoved={eliminarEmpleado}
                            >
                                <Editing
                                    mode="popup"
                                    confirmDelete={true}
                                    allowUpdating={true}
                                    allowDeleting={true}
                                    allowAdding={true}
                                >
                                    <Popup title="Empleado" showTitle={true} width={600} height={300} />
                                </Editing>
                                <Paging pageSize={10} defaultPageSize={10} />
                                <Pager
                                    showPageSizeSelector={true}
                                    allowedPageSizes={allowedPageSizes}
                                    showNavigationButtons={true}
                                />
                                <GroupPanel visible={true} />
                                <FilterRow visible={true} />
                                <SearchPanel visible={true} highlightCaseSensitive={true} />
                                <Grouping autoExpandAll={true} />

                                <Column
                                    dataField="id_Empleado"
                                    caption="Cod Empleado"
                                    alignment="center"
                                    formItem={{ visible: false }}
                                />
                                <Column
                                    dataField="nombre"
                                    caption="Nombre"
                                    alignment="center"
                                >
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="apellido"
                                    caption="Apellidos"
                                    alignment="center"
                                >
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="id_Puesto"
                                    caption="Puesto"
                                    alignment="center"
                                >
                                    <Lookup
                                        dataSource={listadoPuestoEmpleado}
                                        valueExpr="idPuesto"
                                        displayExpr="descripcion"
                                    />
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="id_Departamento"
                                    caption="Departamento"
                                    alignment="center"
                                    formItem={{ visible: false }}
                                >
                                    <Lookup
                                        dataSource={listadoDepartamentos}
                                        valueExpr="idDepartamento"
                                        displayExpr="descripcion"
                                    />
                                </Column>
                            </DataGrid>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default Empleados;