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
//import ArrayStore from 'devextreme/data/array_store';

const Puestas = () => {
    const [listadoPuestos, setListadoPuestos] = useState([]);
    const [listadoDepartamentos, setListadoDepartamentos] = useState([]);
    useEffect(() => {
        ObtenerListadoPuestos();
        ObtenerListadoDepartamentos();
    }, []);
    const allowedPageSizes = [5, 10, 20, 50, 100];
    const ObtenerListadoPuestos = async () => {
        await axios({
            method: "get",
            url: "/Puesto/ObtenerPuestos/",
        })
            .then((result) => {
                //console.log(result);
                if (result.status === 200) {
                    toast.dismiss();
                    console.log(result.data)
                    setListadoPuestos(result.data);
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
    function guardarPuesto(e) {
        let puesto = {
            descripcion: e.data.descripcion,
            idDepartamento:e.data.idDepartamento,
            cantidadPuesto:e.data.cantidadPuesto,
            supervisor:e.data.supervisor,
            aprueba:e.data.aprueba,
            UsuarioRegistro: localStorage.getItem("username")
        };
        axios
            .post("/Puesto/CrearPuesto", puesto)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Guardado con Exito !!", {
                        duration: 4000,
                    });
                    ObtenerListadoPuestos();
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
    function editarPuesto(e) {
        console.log(e.data)
        let puesto = {
            idPuesto: e.data.idPuesto,
            descripcion: e.data.descripcion,
            idDepartamento:e.data.idDepartamento,
            cantidadPuesto:e.data.cantidadPuesto,
            supervisor:e.data.supervisor,
            aprueba:e.data.aprueba,
            UsuarioRegistro: e.data.UsuarioRegistro,
            fechaRegistro: e.data.fechaRegistro,
            UsuarioActualizo: localStorage.getItem("username")
        };
        axios
            .put("/Puesto/ActualizarPuesto/" + e.data.idPuesto, puesto)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Actualizacion exitosa !!", {
                        duration: 50000,
                    });
                    ObtenerListadoPuestos();
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
    function eliminarPuesto(e) {
        axios
            .delete("/Puesto/EliminarPuesto/" + e.data.idPuesto)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Se Elimino con Exito", {
                        duration: 4000,
                    });
                    ObtenerListadoPuestos();
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
                            <h1>Listado de Puestos</h1>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 30 }}>
                        <div className="col-md-12" style={{ marginTop: 30 }}>
                            <DataGrid
                                dataSource={listadoPuestos}
                                allowColumnReordering={true}
                                showBorders={true}
                                onRowInserted={guardarPuesto}
                                onRowUpdated={editarPuesto}
                                onRowRemoved={eliminarPuesto}
                            >
                                <Editing
                                    mode="popup"
                                    confirmDelete={true}
                                    allowUpdating={true}
                                    allowDeleting={true}
                                    allowAdding={true}
                                >
                                    <Popup title="Puesto" showTitle={true} width={600} height={300} />
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
                                    dataField="idPuesto"
                                    caption="Cod"
                                    alignment="center"
                                    dataType="number"
                                    formItem={{ visible: false }}
                                />
                                <Column
                                    dataField="descripcion"
                                    caption="Puesto"
                                    alignment="center"
                                    minWidth="250"
                                >
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="idDepartamento"
                                    caption="Departamento"
                                    alignment="center"
                                    minWidth="200"
                                >
                                    <Lookup
                                        dataSource={listadoDepartamentos}
                                        valueExpr="idDepartamento"
                                        displayExpr="descripcion"
                                    />
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="cantidadPuesto"
                                    caption="Cant Puesto"
                                    alignment="center"
                                >
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="supervisor"
                                    caption="Es Supervisor"
                                    alignment="center"
                                    dataType="boolean"
                                />
                                <Column
                                    dataField="aprueba"
                                    caption="Aprueba"
                                    alignment="center"
                                    dataType="boolean"
                                />
                                <Column
                                    dataField="activo"
                                    caption="Activo"
                                    alignment="center"
                                    dataType="boolean"
                                    formItem={{ visible: false }}
                                />
                                <Column
                                    dataField="fechaRegistro"
                                    caption="Fecha Registro"
                                    alignment="center"
                                    dataType="date"
                                    formItem={{ visible: false }}
                                />
                            </DataGrid>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}
export default Puestas;