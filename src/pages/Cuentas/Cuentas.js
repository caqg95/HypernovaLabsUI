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
  Popup,
  Editing,
  RequiredRule
} from "devextreme-react/data-grid";

const Cuentas = () => {
  const [listadoCuentas, setListadoCuentas] = useState([]);
  useEffect(() => {
    ObtenerListadoCuentas();
  }, []);
  const allowedPageSizes = [5, 10, 20, 50, 100];
  const ObtenerListadoCuentas = async () => {
    await axios({
      method: "get",
      url: "/Cuenta/ObtenerCuentas/",
    })
      .then((result) => {
        //console.log(result);
        if (result.status === 200) {
          toast.dismiss();
          console.log(result.data)
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
  function guardarCuenta(e) {
    let cuenta = {
      descripcion: e.data.descripcion,
      UsuarioRegistro: localStorage.getItem("username")
    };
    axios
      .post("/Cuenta/CrearCuenta", cuenta)
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.data.message, {
            duration: 4000,
          });
          ObtenerListadoCuentas();
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
  function editarCuenta(e) {

    let cuenta = {
      idCuenta: e.data.idCuenta,
      descripcion: e.data.descripcion,
      UsuarioRegistro: e.data.UsuarioRegistro,
      fechaRegistro: e.data.fechaRegistro,
      UsuarioActualizo: localStorage.getItem("username")
    };
    axios
      .put("/Cuenta/ActualizarCuenta/" + e.data.idCuenta, cuenta)
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.data.message, {
            duration: 4000,
          });
          ObtenerListadoCuentas();
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
  function eliminarCuenta(e) {
    axios
      .delete("/Cuenta/EliminarCuenta/" + e.data.idCuenta)
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.data.message, {
            duration: 4000,
          });
          ObtenerListadoCuentas();
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
              <h1>Listado de Cuentas</h1>
            </div>
          </div>
          <div className="row" style={{ marginTop: 30 }}>
            <div className="col-md-12" style={{ marginTop: 30 }}>
              <DataGrid
                dataSource={listadoCuentas}
                allowColumnReordering={true}
                showBorders={true}
                confirmDelete={true}
                onRowInserted={guardarCuenta}
                onRowUpdated={editarCuenta}
                onRowRemoved={eliminarCuenta}
              >
                <Editing
                  mode="popup"
                  allowUpdating={true}
                  allowDeleting={true}
                  allowAdding={true}
                  confirmDelete={true}

                >
                  <Popup title="Cuenta" showTitle={true} width={500} height={250} />
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
                  dataField="idCuenta"
                  caption="Cod"
                  alignment="center"
                  formItem={{ visible: false }}
                />
                <Column
                  dataField="descripcion"
                  caption="Cuenta"
                  alignment="center"
                >
                  <RequiredRule />
                </Column>
                <Column
                  dataField="activo"
                  caption="Activo"
                  alignment="center"
                  dataType="boolean"
                  allowEditing={false}
                  formItem={{ visible: false }}
                />
                <Column
                  dataField="fechaRegistro"
                  caption="Fecha Registro"
                  alignment="center"
                  dataType="date"
                  allowEditing={false}
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
export default Cuentas;