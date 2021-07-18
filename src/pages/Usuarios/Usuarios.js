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
} from "devextreme-react/data-grid";

const Usuarios = () => {
    const [listadoUsuarios, setListadoUsuarios] = useState([]);
    //const user = parseInt(localStorage.getItem("username"));
    useEffect(() => {
        //const user = parseInt(localStorage.getItem("username"));
        ObtenerListadoUsuarios();
    }, []);
    const allowedPageSizes = [5, 10, 20, 50, 100];
    const ObtenerListadoUsuarios = async () => {
        await axios({
            method: "get",
            url: "/Usuarios/ObtenerUsuarios/",
        })
            .then((result) => {
                //console.log(result);
                if (result.status === 200) {
                    toast.dismiss();
                    console.log(result.data)
                    setListadoUsuarios(result.data);
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
    return (
        <Fragment>
            <div className="panel">
                <Toaster />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Listado de Usuarios</h1>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 30 }}>
                        <div className="col-md-12" style={{ marginTop: 30 }}>
                            <DataGrid
                                dataSource={listadoUsuarios}
                                allowColumnReordering={true}
                                showBorders={true}
                            >
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
                                    dataField="userName"
                                    caption="Usuario"
                                    alignment="center"
                                />
                                <Column
                                    dataField="email"
                                    caption="Email"
                                    alignment="center"
                                />
                            </DataGrid>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}
export default Usuarios;