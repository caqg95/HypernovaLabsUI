import React, { useState, useEffect, Fragment } from "react";
import toast, { Toaster } from "react-hot-toast";
import swal from 'sweetalert';
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
  RequiredRule,
  Summary,
  TotalItem
} from "devextreme-react/data-grid";
import { Link ,BrowserRouter} from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Gastos = () => {

  const [listadoGastos, setListadoGastos] = useState([]);
  const [listadoGastoDetalle, setListadoGastoDetalle] = useState([]);
  const [listadoConceptos, setListadoConceptos] = useState([]);
  const [listadoCuentas, setListadoCuentas] = useState([]);
  const [listadoEmpleadoGasto, setListadoEmpleadoGasto] = useState([]);
  const [listadoEmpleadoSupervisor, setListadoEmpleadoSupervisor] = useState([]);
  const [listadoEmpleadoAprueba, setListadoEmpleadoAprueba] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString().substr(0, 10);
  const [gasto, setGasto] = useState({
    idempleadoG: null,
    departamento: "",
    posicion: "",
    idConcepto: null,
    fechaDesde: date,
    fechaHasta: date,
    idempleadoSupervisa: null,
    idempleadoAprueba: null,
  });
  //const user = parseInt(localStorage.getItem("username"));
  useEffect(() => {
    //const user = parseInt(localStorage.getItem("username"));
    ObtenerListadoGastos();
    ObtenerListadoConceptos();
    ObtenerListadoCuentas();
    ObtenerListadoEmpleado();
    ObtenerListadoEmpleadoSupervisor();
    ObtenerListadoEmpleadoAprueba();
  }, []);
  const allowedPageSizes = [5, 10, 20, 50, 100];
  
  function cellRender(e) {
    return (
      <div>

        {/* <Button variant="warning" size="sm" onClick={() => setModalShow(false)}>
          Editar
        </Button>| */}
        <BrowserRouter>
         <Link to={"/ReporteGasto/"+e.data.id_Gasto} target='_blank' className="btn btn-success"
         onClick={()=>{localStorage.setItem("id_Gasto", e.data.id_Gasto);localStorage.setItem("id_Empleado_Gasto", e.data.id_Empleado_Gasto)}}
         >Emprimir</Link>
        </BrowserRouter>|
        <Button variant="danger" size="sm" onClick={() => MostrarAlertaEliminarGasto(e.data.id_Gasto)}>
          Eliminar
        </Button>
      </div>
    );
  }
  function MostrarAlertaEliminarGasto(id_Gasto) {
    swal({
      title: "Esta Seguro?",
      text: "Esta seguro que desea Eliminar este Gasto?",
      icon: "warning",
      dangerMode: true,
      buttons: ["No", "Si"]
    })
      .then(willDelete => {
        if (willDelete) {
          axios
            .delete("/Gasto/EliminarGasto/" + id_Gasto)
            .then((result) => {
              swal("Eliminado!", "Se Elimino con Exito el Gasto", "success");
              setListadoGastos(listadoGastos.filter(item => item.id_Gasto !== id_Gasto));
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
      });
  }
  const ObtenerListadoGastos = async () => {
    await axios({
      method: "get",
      url: "/Gasto/ObtenerGastos/",
    })
      .then((result) => {
        //console.log(result);
        if (result.status === 200) {
          toast.dismiss();
          console.log(result.data)
          setListadoGastos(result.data);
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
  const ObtenerListadoConceptos = async () => {
    await axios({
      method: "get",
      url: "/Concepto/ObtenerConceptos",
    })
      .then((result) => {
        //console.log(result);
        if (result.status === 200) {
          toast.dismiss();
          console.log(result.data)
          // var data = new ArrayStore({
          //   data: result.data,
          //   key: 'idConcepto'
          // })
          //setListadoConceptosSelect(data);
          setListadoConceptos(result.data);
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
  const ObtenerListadoCuentas = async () => {
    await axios({
      method: "get",
      url: "/Cuenta/ObtenerCuentas",
    })
      .then((result) => {
        //console.log(result);
        if (result.status === 200) {
          toast.dismiss();
          console.log(result.data)
          // var data = new ArrayStore({
          //   data: result.data,
          //   key: 'idConcepto'
          // })
          //setListadoConceptosSelect(data);
          setListadoCuentas(result.data);
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
          setListadoEmpleadoGasto(result.data);
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
  const ObtenerListadoEmpleadoSupervisor = async () => {
    await axios({
      method: "get",
      url: "/Empleado/ObtenerEmpleadosSupervisor/",
    })
      .then((result) => {
        //console.log(result);
        if (result.status === 200) {
          toast.dismiss();
          console.log(result.data)
          setListadoEmpleadoSupervisor(result.data);
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
  const ObtenerListadoEmpleadoAprueba = async () => {
    await axios({
      method: "get",
      url: "/Empleado/ObtenerEmpleadosAprueba/",
    })
      .then((result) => {
        //console.log(result);
        if (result.status === 200) {
          toast.dismiss();
          console.log(result.data)
          setListadoEmpleadoAprueba(result.data);
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
  const handleChangeFechaDesde = (e) => {
    console.log(e.target.value);
    setGasto({ ...gasto, fechaDesde: e.target.value });
  };
  const handleChangeFechaHasta = (e) => {
    console.log(e.target.value);
    setGasto({ ...gasto, fechaHasta: e.target.value });
  };
  const handleChangeConcepto = (e) => {
    console.log(e.target.value);
    setGasto({ ...gasto, idConcepto: e.target.value });
  };
  const handleChangeEmpleadoGasto = (e) => {
    var id_empleado = parseInt(e.target.value);
    var empleadoSelect = listadoEmpleadoGasto.find((i) => i.id_Empleado === id_empleado);
    console.log(empleadoSelect)
    setGasto({
      ...gasto,
      idempleadoG: id_empleado,
      departamento: empleadoSelect.departamento,
      posicion: empleadoSelect.puesto
    });
  };
  const handleChangeEmpleadoSupervisa = (e) => {
    console.log(e.target.value);
    setGasto({ ...gasto, idempleadoSupervisa: e.target.value });
  };
  const handleChangeEmpleadoAprueba = (e) => {
    console.log(e.target.value);
    setGasto({ ...gasto, idempleadoAprueba: e.target.value });
  };
  function closeModal() {
    setModalShow(false);
    setGasto({
      idempleadoG: null,
      departamento: "",
      posicion: "",
      idConcepto: null,
      fechaDesde: date,
      fechaHasta: date,
      idempleadoSupervisa: null,
      idempleadoAprueba: null,
    });
    setListadoGastoDetalle([]);
  }
  function guardarGasto() {

    let guardargasto = {
      IdEmpleado: gasto.idempleadoG,
      IdConcepto: gasto.idConcepto,
      FechaDesde: gasto.fechaDesde,
      FechaHasta: gasto.fechaHasta,
      IdEmpleadoSuperviso: gasto.idempleadoSupervisa,
      IdEmpleadoAprueba: gasto.idempleadoAprueba,
      UsuarioRegistro: localStorage.getItem("username"),
      GastoDetalles: listadoGastoDetalle
    };
    axios
      .post("/Gasto/CrearGasto", guardargasto)
      .then((result) => {
        if (result.status === 200) {
          toast.success("Guardado con Exito !!", {
            duration: 4000,
          });
          ObtenerListadoGastos();
          closeModal();
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
  return (
    <Fragment>
      <div className="panel">
        <Toaster />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1>Listado de Gastos</h1>
            </div>
          </div>
          <div className="row" style={{ marginTop: 30 }}>
            <div className="col-md-12">
              <button className="btn btn-primary btn-l" onClick={() => setModalShow(true)}>
                Agregar Gasto
              </button>
            </div>
            <div className="col-md-12" style={{ marginTop: 30 }}>
              <DataGrid
                dataSource={listadoGastos}
                allowColumnReordering={true}
                showBorders={true}
              >
                <Paging pageSize={5} defaultPageSize={5} />
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
                  dataField="id_Gasto"
                  caption="Cod"
                  alignment="center"
                />
                <Column
                  dataField="nombre_Empleado_Gasto"
                  caption="Emplado G"
                  minWidth="180"
                  alignment="center"
                />
                <Column
                  dataField="id_Concepto"
                  caption="Concepto"
                  alignment="center"
                  minWidth="150"
                >
                  <Lookup
                    dataSource={listadoConceptos}
                    valueExpr="idConcepto"
                    displayExpr="descripcion"
                  />
                </Column>
                <Column
                  dataField="cantidad_Item"
                  caption="Cantidad"
                  alignment="center"
                />
                <Column
                  dataField="monto_Total"
                  caption="Monto Total"
                  dataType="number"
                  alignment="center"
                />

                <Column
                  dataField="fecha_Desde"
                  caption="Fecha Desde"
                  dataType="date"
                />
                <Column
                  dataField="fecha_Hasta"
                  caption="Fecha Hasta"
                  dataType="date"
                />
                <Column
                  dataField="nombre_Empleado_Superviso"
                  caption="Empleado Superviso"
                  minWidth="150"
                />
                <Column
                  dataField="nombre_Empleado_Aprueba"
                  caption="Empleado Aprobo"
                  minWidth="150"
                />
                <Column
                  dataField="identificador"
                  caption="Acceso"
                  alignment="center"
                  minWidth="250"
                  cellRender={cellRender}
                />
              </DataGrid>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header clo>
          <Modal.Title id="contained-modal-title-vcenter">
            Agregando Gasto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>

            <div className="form-group row mt-4">
              <label htmlFor="concepto" className="col-sm-2 col-form-label">Concepto</label>
              <div className="col-sm-10">
                <select className="form-select"
                  id="concepto"
                  name="concepto"
                  onChange={(e) => {
                    handleChangeConcepto(e);
                  }}
                >
                  <option hidden selected>
                    Seleccione el Concepto
                  </option>
                  {listadoConceptos.map((item, index) => {
                    return (
                      <option key={index} value={item.idConcepto}>
                        {item.descripcion}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="form-group row">
                  <label htmlFor="FechaDesde" className="col-sm-4 col-form-label">Fecha Desde:</label>
                  <div className="col-sm-8">
                    <input type="date" id="FechaDesde" name="FechaDesde"
                      value={gasto.fechaDesde}
                      onChange={(e) => {
                        handleChangeFechaDesde(e);
                      }} />
                  </div>
                </div>

              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label htmlFor="FechaDesde" className="col-sm-4 col-form-label ">Fecha Hasta:</label>
                  <div className="col-sm-8">
                    <input type="date" id="FechaHasta" name="FechaHasta"
                      value={gasto.fechaHasta}
                      min={gasto.fechaDesde}
                      onChange={(e) => {
                        handleChangeFechaHasta(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group row mt-4">
              <label htmlFor="empleadoG" className="col-sm-2 col-form-label">Empleado</label>
              <div className="col-sm-10">
                <select className="form-select"
                  id="empleadoG"
                  name="empleadoG"
                  onChange={(e) => {
                    handleChangeEmpleadoGasto(e);
                  }}
                >
                  <option hidden selected>
                    Seleccione el Empleado
                  </option>
                  {listadoEmpleadoGasto.map((item, index) => {
                    return (
                      <option key={index} value={item.id_Empleado}>
                        {item.id_Empleado + "-" + item.nombre + " " + item.apellido}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>


            <div className="row mt-4">
              <div className="col-md-6">
                <div className="form-group row">
                  <label htmlFor="FechaDesde" className="col-sm-4 col-form-label">Departamento:</label>
                  <div className="col-sm-8">
                    <input type="text" id="departamento" name="departamento" value={gasto.departamento} disabled />
                  </div>
                </div>

              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label htmlFor="FechaDesde" className="col-sm-4 col-form-label ">Posicion:</label>
                  <div className="col-sm-8">
                    <input type="text" id="posiscion" value={gasto.posicion} name="posicion" disabled />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <div className="form-group row">
                  <label htmlFor="empleadoSupervisa" className="col-sm-3 col-form-label">Supervisor:</label>
                  <div className="col-sm-8">
                    <select className="form-select" id="empleadoSupervisa" name="empleadoSupervisa"
                      onChange={(e) => {
                        handleChangeEmpleadoSupervisa(e);
                      }}
                    >
                      <option hidden selected>
                        Seleccione el Supervisor
                      </option>
                      {listadoEmpleadoSupervisor.map((item, index) => {
                        return (
                          <option key={index} value={item.id_Empleado}>
                            {item.id_Empleado + "-" + item.nombre + " " + item.apellido}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label htmlFor="empleadoAprueba" className="col-sm-3 col-form-label">Aprobado:</label>
                  <div className="col-sm-8">
                    <select className="form-select" id="empleadoAprueba" name="empleadoAprueba"
                      onChange={(e) => {
                        handleChangeEmpleadoAprueba(e);
                      }}
                    >
                      <option hidden selected>
                        Seleccione
                      </option>
                      {listadoEmpleadoAprueba.map((item, index) => {
                        return (
                          <option key={index} value={item.id_Empleado}
                            onChange={(e) => {
                              handleChangeEmpleadoAprueba(e);
                            }}
                          >
                            {item.id_Empleado + "-" + item.nombre + " " + item.apellido}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4 mb-4">
              <h4>Detalle:</h4>
              <div className="col-md-12">
                <DataGrid
                  dataSource={listadoGastoDetalle}
                  allowColumnReordering={true}
                  showBorders={true}
                >
                  <Editing
                    mode="row"
                    confirmDelete={false}
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                  />
                  <Paging pageSize={10} defaultPageSize={10} />
                  <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={allowedPageSizes}
                    showNavigationButtons={true}
                  />
                  <GroupPanel visible={false} />
                  <FilterRow visible={false} />
                  <SearchPanel visible={false} highlightCaseSensitive={true} />
                  <Grouping autoExpandAll={false} />

                  <Column
                    dataField="FechaCompra"
                    caption="Fecha"
                    alignment="center"
                    dataType="date"
                    minWidth="120"
                  >
                    <RequiredRule />
                  </Column>
                  <Column
                    dataField="idCuenta"
                    caption="Cuenta"
                    alignment="center"
                    minWidth="170"
                  >
                    <Lookup
                      dataSource={listadoCuentas}
                      valueExpr="idCuenta"
                      displayExpr="descripcion"
                    />
                    <RequiredRule />
                  </Column>
                  <Column
                    dataField="Descripcion"
                    caption="Descripcion"
                    alignment="center"
                    minWidth="180"
                  >
                    <RequiredRule />
                  </Column>
                  <Column
                    dataField="Cantidad"
                    caption="Cantidad"
                    dataType="number"
                    alignment="center"
                  >
                    <RequiredRule />
                  </Column>
                  <Column
                    dataField="Precio"
                    caption="Precio"
                    dataType="number"
                    alignment="center"
                  >
                    <RequiredRule />
                  </Column>
                  <Column
                    dataField="Total"
                    caption="Total"
                    dataType="number"
                    minWidth="90"
                  />
                  <Summary>
                    <TotalItem
                      column="idCuenta"
                      summaryType="count"
                    />
                    <TotalItem
                      column="Total"
                      summaryType="sum"
                    />
                  </Summary>
                </DataGrid>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={()=>setModalShow(false)}>Close</Button> */}
          <Button variant="danger" onClick={() => closeModal()}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => guardarGasto()}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default Gastos;