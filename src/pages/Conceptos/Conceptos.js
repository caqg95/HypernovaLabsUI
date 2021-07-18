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

const Conceptos = () => {
  const [listadoConceptos, setListadoConceptos] = useState([]);
  useEffect(() => {
    ObtenerListadoConceptos();
  }, []);
  const allowedPageSizes = [5, 10, 20, 50, 100];
  const ObtenerListadoConceptos = async () => {
    await axios({
      method: "get",
      url: "/Concepto/ObtenerConceptos/",
    })
      .then((result) => {
        //console.log(result);
        if (result.status === 200) {
          toast.dismiss();
          console.log(result.data)
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
  function guardarConcepto(e) {
    let concepto = {
      descripcion: e.data.descripcion,
      UsuarioRegistro: localStorage.getItem("username")
    };
    axios
      .post("/Concepto/CrearConcepto", concepto)
      .then((result) => {
        if (result.status === 200) {
          toast.success("Guardado con Exito !!", {
            duration: 4000,
          });
          ObtenerListadoConceptos();
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
  function editarConcepto(e) {
    console.log(e.data)
    let concepto = {
      idConcepto: e.data.idConcepto,
      descripcion: e.data.descripcion,
      UsuarioRegistro: e.data.UsuarioRegistro,
      fechaRegistro: e.data.fechaRegistro,
      UsuarioActualizo: localStorage.getItem("username")
    };
    axios
      .put("/Concepto/ActualizarConcepto/" + e.data.idConcepto, concepto)
      .then((result) => {
        if (result.status === 200) {
          toast.success("Actualizacion exitosa !!", {
            duration: 50000,
          });
          ObtenerListadoConceptos();
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
  function eliminarConcepto(e) {
    axios
      .delete("/Concepto/EliminarConcepto/" + e.data.idConcepto)
      .then((result) => {
        if (result.status === 200) {
          toast.success("Se Elimino con Exito", {
            duration: 4000,
          });
          ObtenerListadoConceptos();
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
              <h1>Listado de Conceptos</h1>
            </div>
          </div>
          <div className="row" style={{ marginTop: 30 }}>
            <div className="col-md-12" style={{ marginTop: 30 }}>
              <DataGrid
                dataSource={listadoConceptos}
                allowColumnReordering={true}
                showBorders={true}
                onRowInserted={guardarConcepto}
                onRowUpdated={editarConcepto}
                onRowRemoved={eliminarConcepto}
              >
                <Editing
                  mode="popup"
                  confirmDelete={true}
                  allowUpdating={true}
                  allowDeleting={true}
                  allowAdding={true}
                >
                  <Popup title="Concepto" showTitle={true} width={500} height={250} />
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
                  dataField="idConcepto"
                  caption="Cod"
                  alignment="center"
                  formItem={{ visible: false }}
                />
                <Column
                  dataField="descripcion"
                  caption="Concepto"
                  alignment="center"
                >
                  <RequiredRule />
                </Column>
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
export default Conceptos;