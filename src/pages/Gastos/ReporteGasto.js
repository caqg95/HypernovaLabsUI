import React, { useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import logo from '../../static/images/logo_hypernova.jpg'


const ReporteGasto = () => {
    let id_Gasto = localStorage.getItem("id_Gasto");
    let id_Empleado = localStorage.getItem("id_Empleado_Gasto");
    const [gasto, setGasto] = useState("");
    const [gastoDetalle, setGastoDetalle] = useState([]);
    const [empleado, setEmpleado] = useState("");
    axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("tok");
    useEffect(() => {
        ObtenerGasto();
        ObtenerEmpleado();
        ObtenerGastoDetalle();
        // eslint-disable-next-line
    }, []);

    const ObtenerGasto = async () => {
        await axios({
            method: "get",
            url: `/Gasto/ObtenerGastoId/${id_Gasto}`,
        })
            .then((result) => {
                if (result.status === 200) {
                    toast.dismiss();
                    console.log(result.data);
                    setGasto(result.data);

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
    }
    const ObtenerEmpleado = async () => {
        await axios({
            method: "get",
            url: `/Empleado/ObtenerEmpleadoId/${id_Empleado}`,
        })
            .then((result) => {
                if (result.status === 200) {
                    toast.dismiss();
                    console.log(result.data);
                    setEmpleado(result.data);
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
    }
    const ObtenerGastoDetalle = async () => {
        await axios({
            method: "get",
            url: `/Gasto/ObtenerGastoDetalleId/${id_Gasto}`,
        })
            .then((result) => {
                if (result.status === 200) {
                    toast.dismiss();
                    console.log(result.data);
                    setGastoDetalle(...gastoDetalle,result.data);
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
    }
    return (
        <div className="container mt-2">
            <Toaster />
            <div className="row mt-5">
                <div className="col-md-1">
                    <div class="text-center">
                        <img src={logo} className="img-fluid" alt="HypernovaLabs" />
                    </div>
                </div>
                <div className="col-md-11">
                    <h1>REPORTE DE GASTOS</h1>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-3">
                            <h5>CONCEPTO:</h5>
                        </div>
                        <div className="col-md-6 text-right">
                            <p className="text-right">{gasto.concepto}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-2">
                            <h5>FECHA</h5>
                        </div>
                        <div className="col-md-5">
                            <p>DESDE: {new Date(gasto.fecha_Desde).toLocaleDateString()}</p>
                        </div>
                        <div className="col-md-5">
                            <p>HASTA: {new Date(gasto.fecha_Hasta).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-12">
                    <h4>INFORMACIÓN DEL EMPLEADO:</h4>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <p>NOMBRE: {gasto.nombre_Empleado_Gasto}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <p>POSICIÓN: {empleado.puesto}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <p>DEPARTMENTO: {empleado.departamento}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <p>SUPERVISOR: {gasto.nombre_Empleado_Superviso}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center alig-items-center mt-4">
                <div className="col-md-10">
                    <table class="table">
                        <thead>
                            <tr className="bg-warning">
                                <th scope="col">FECHA</th>
                                <th scope="col">CUENTA</th>
                                <th scope="col">DESCRIPCIÓN</th>
                                <th scope="col">CANTIDAD</th>
                                <th scope="col">PRECIO</th>
                                <th scope="col">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gastoDetalle.map((item, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{new Date(item.detalle.fechaCompra).toLocaleDateString()}</th>
                                        <td>{item.cuenta.descripcion}</td>
                                        <td>{item.detalle.descripcion}</td>    
                                        <td>{item.detalle.cantidad}</td>
                                        <td>{item.detalle.precio}</td>
                                        <td>{item.detalle.total}</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colspan="5" style={{ textAlign: "right" }}>MONTO A CANCELAR AL EMPLEADO</td>
                                <td className="bg-warning">{gasto.monto_Total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>


            <div className="row mt-4">
                <div className="col-md-1">
                    <h6>APROBADO POR:</h6>
                </div>
                <div className="col-md-9">
                    <p>{gasto.nombre_Empleado_Aprueba}</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-12">
                    <h6>FIRMA _________________________________________</h6>
                </div>
            </div>
        </div>
    );
}

export default ReporteGasto;