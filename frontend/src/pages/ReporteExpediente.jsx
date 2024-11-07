import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MenuLateral from "../components/MenuLateral";
import axios from "axios";
import { useAuth } from "../providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import * as XLSX from 'xlsx';  // Importar la librería xlsx
//import XlsxPopulate from 'xlsx-populate'; // Asegúrate de importar la librería
import ExcelJS from 'exceljs';
//import XLSXPopulate from 'xlsx-populate';
import { Buffer } from 'buffer';
import { saveAs } from 'file-saver';







const ReporteExpediente = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Configuración de Axios
    const axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `${user.type} ${user.token}`,
        },
    });

    // Estado del componente
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingReportes, setLoadingReportes] = useState(false);
    const [reporteList, setReporteList] = useState([]);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [estadoExpedientes, setEstadoExpedientes] = useState([]);
    const [idDepartamento, setIdDepartamento] = useState(0);
    const [idMunicipio, setIdMunicipio] = useState(0);
    const [idEstadoExpediente, setIdEstadoExpediente] = useState(0);

    // Función para buscar reportes
    const buscarReportes = async () => {
        setMensaje("");
        setError("");
        setLoadingReportes(true);

        try {
            const response = await axiosInstance.post(`/expedientes/reporteExpediente`, {
                usuario_id: user?.user?.id,
                fechaInicio,
                fechaFin,
                departamento_id: idDepartamento,
                municipio_id: idMunicipio,
                expediente_estado_id: idEstadoExpediente,
            });

            if (response.status === 200) {
                setReporteList(response.data);
                setMensaje("Reportes obtenidos con éxito.");
            } else {
                setError("No se encontraron reportes.");
            }
        } catch (error) {
            setError("Error al obtener los reportes!");
            toast.error("Error al obtener los reportes!");
            console.error("Error al obtener reportes:", error);
        } finally {
            setLoadingReportes(false);
        }
    };


    const handleBuscar = () => {
        if (fechaInicio && fechaFin) {
            buscarReportes();
        } else {
            toast.error("Ingrese todos los campos, por favor.");
        }
    };

    // Función para convertir timestamps a fecha
    /*const convertirFecha = (fechaISO) => {
        console.log("Convirtiendo fecha:", fechaISO); // Log de la fecha recibida
        if (!fechaISO) {
            return "Fecha inválida"; // Retorna un mensaje de error
        }

        const fecha = new Date(fechaISO);
        if (isNaN(fecha.getTime())) {
            return "Fecha inválida"; // Retorna si la fecha no es válida
        }

        const dia = String(fecha.getDate()).padStart(2, '0'); // Obtiene el día
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (0-11)
        const año = fecha.getFullYear(); // Obtiene el año

        return `${dia}/${mes}/${año}`; // Devuelve la fecha en formato "dd/mm/yyyy"
    };
    */

    const convertirFecha = (timestamp) => {
        if (!timestamp) {
            return "Fecha no disponible";
        }

        const fecha = new Date(timestamp);
        if (isNaN(fecha.getTime())) {
            return "Fecha no válida";
        }

        // Ajustar el día si es necesario
        fecha.setUTCDate(fecha.getUTCDate() + 1);

        return fecha.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };


    // Funciones para obtener departamentos y municipios
    const getDepartamentos = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/departamentos`,
                {
                    headers: {
                        Authorization: `${user.type} ${user.token}`,
                    },
                }
            );
            setDepartamentos(response.data);

            setLoading(false);
        } catch (error) {
            console.error(" failed:", error);
            if (error.status >= 400 && error.status < 500) {
                setError("No se puede.");
            }
            //setError(error.message);
            setLoading(false);
            //console.log(error.response.status);
        }
    };

    const getMunicipiosPorDepartamento = async () => {
        setLoading(true);
        setIdMunicipio(0)
        setMunicipios([])
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/municipios?departamento_id=${idDepartamento}`,
                {
                    headers: {
                        Authorization: `${user.type} ${user.token}`,
                    },
                }
            );
            setMunicipios(response.data);

            setLoading(false);
        } catch (error) {
            console.error(" failed:", error);
            if (error.status >= 400 && error.status < 500) {
                setError("No se puede.");
            }
            //setError(error.message);
            setLoading(false);
            //console.log(error.response.status);
        }
    };


    const getEstadosExpedientes = async () => {
        setLoading(true);
    
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/estadoExpedientes`,
            {
              headers: {
                Authorization: `${user.type} ${user.token}`,
              },
            }
          );
          setEstadoExpedientes(response.data);
    
          setLoading(false);
        } catch (error) {
          console.error(" failed:", error);
          if (error.status >= 400 && error.status < 500) {
            setError("No se puede.");
          }
          //setError(error.message);
          setLoading(false);
          //console.log(error.response.status);
        }
      };



    // Efectos para cargar datos iniciales
    useEffect(() => {
        getDepartamentos();
        getEstadosExpedientes();
    }, []);

    useEffect(() => {
        if (idDepartamento > 0) {
            getMunicipiosPorDepartamento();
        }
    }, [idDepartamento]);





    // Función para exportar Excel con logo
    // Función para exportar Excel con logo
    const exportarExcel = async () => {
        if (reporteList.length === 0) {
            toast.error("No hay datos para exportar");
            return;
        }

        // Imprimir la lista para verificar que contiene datos
        console.log(reporteList);

        const worksheetData = reporteList.map(expediente => ({
            "Nombre": expediente.usuario_nombre,
            "Rol": expediente.rol_nombre,
            "Departamento": expediente.departamento_id,
            "Municipio": expediente.municipio_id,
            "Polígono": expediente.poligono,
            "Predio": expediente.predio,
            "Fecha de Ingreso": convertirFecha(expediente.fechainicio),
            "Nombre Departamento": expediente.departamento_nombre,
            "Nombre Municipio": expediente.municipio_nombre,
            "Estado": expediente.estado_nombre,
        }));

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Reportes");

        // Cargar y agregar imagen
        const imagePath = '/img/ric.jpeg';
        const response = await fetch(imagePath);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64data = reader.result.split(',')[1];
            const imageId = workbook.addImage({
                buffer: Buffer.from(base64data, 'base64'),
                extension: 'jpeg',
            });

            // Agregar imagen que abarca filas 3 a 6
            worksheet.addImage(imageId, {
                tl: { col: 1, row: 2 }, // Comienza en A3 (2)
                br: { col: 5, row: 6 }, // Termina en E6 (6)
            });

            // Celdas de configuración
            worksheet.getCell('C1').value = "REPORTE DE INGRESO DE EXPEDIENTES CASTRALES POR USUARIO";
            worksheet.getCell('C1').font = { bold: true, color: { argb: '000000' }, size: 20 }; // Negrita, color negro, tamaño 20
            worksheet.getRow(1).height = 30; // Ajustar la altura de la fila 1

            // Configurar el ancho de cada columna a 20
            worksheet.columns = [
                { width: 20 }, // Nombre
                { width: 20 }, // Rol
                { width: 20 }, // Departamento
                { width: 20 }, // Municipio
                { width: 20 }, // Polígono
                { width: 20 }, // Predio
                { width: 20 }, // Fecha de Ingreso
                { width: 20 }, // Nombre Departamento
                { width: 20 },  // Nombre Municipio
                { width: 20 }  // Nombre Estado
            ];

            // Definir encabezados
            const headers = [
                'Nombre',
                'Rol',
                'Departamento',
                'Municipio',
                'Polígono',
                'Predio',
                'Fecha de Ingreso',
                'Nombre Departamento',
                'Nombre Municipio',
                'Estado'
            ];

            // Agregar encabezados en la fila 8 (índice 7)
            const headerRow = worksheet.addRow(headers);
            headerRow.font = { bold: true };
            worksheet.getRow(8).height = 20; // Ajustar altura de fila de encabezados

            // Agregar los datos a partir de la fila 9
            const dataRowStartIndex = 9; // fila 9 para los datos
            worksheet.addRows(worksheetData.map(data => Object.values(data)));

            // Agregar "FECHA INICIO" y "FECHA FINAL" en F3 y F4
            worksheet.getCell('F3').value = "FECHA INICIO";
            worksheet.getCell('F3').font = { bold: true };
            worksheet.getCell('G3').value = fechaInicio;
            worksheet.getCell('G3').font = { bold: true };

            worksheet.getCell('F4').value = "FECHA FINAL";
            worksheet.getCell('F4').font = { bold: true, color: { argb: 'FF0000' } };
            worksheet.getCell('G4').value = fechaFin;
            worksheet.getCell('G4').font = { bold: true, color: { argb: 'FF0000' } };

            


            // Definir el rango de la tabla, comenzando desde la fila 8 hasta el final de los datos
            const startRow = 8; // Fila de encabezados
            const endRow = worksheet.lastRow.number; // Última fila con datos

            // Crear una tabla
            worksheet.addTable({
                name: 'TablaReportes',
                ref: `A${startRow}:I${endRow}`, // Rango de la tabla
                headerRow: true,
                totalsRow: false,
                style: {
                    theme: 'TableStyleMedium9', // Estilo de tabla (puedes elegir otro)
                    showRowStripes: true
                },
                columns: [
                    { name: 'Nombre' },
                    { name: 'Rol' },
                    { name: 'Departamento' },
                    { name: 'Municipio' },
                    { name: 'Polígono' },
                    { name: 'Predio' },
                    { name: 'Fecha de Ingreso' },
                    { name: 'Nombre Departamento' },
                    { name: 'Nombre Municipio' },
                    { name: 'Estado' }
                ],
                rows: worksheetData.map(data => Object.values(data)), // Asegúrate de agregar las filas aquí
            });

            const xlsxBuffer = await workbook.xlsx.writeBuffer();
            const fileName = `reporte_expedientes_${fechaInicio}_al_${fechaFin}.xlsx`;
            const blobFile = new Blob([xlsxBuffer], { type: 'application/octet-stream' });
            saveAs(blobFile, fileName);
        };

        reader.readAsDataURL(blob);
    };










    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <MenuLateral />
                <div className="layout-page">
                    <NavBar />
                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="row">
                                <div className="col-xxl">
                                    <div className="card mb-4">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0">
                                                <span className="text-muted fw-light">Reportes/</span>Expedientes Ingresados
                                            </h5>

                                        </div>
                                        <div className="card-header d-flex justify-content-start align-items-center">
                                            <button
                                                type="button"
                                                className="mdi mdi-magnify btn btn-warning waves-effect waves-light me-2" // Cambiado 'ms-2' a 'me-2'
                                                onClick={handleBuscar}
                                            >
                                                Buscar
                                            </button>
                                            <button
                                                type="button"
                                                className="mdi mdi-download-multiple btn btn-danger waves-effect waves-light"
                                                onClick={exportarExcel}
                                            >
                                                Excel
                                            </button>
                                        </div>
                                        <div className="card-body">
                                            {mensaje && (
                                                <div className="alert alert-success" role="alert">
                                                    {mensaje}!
                                                </div>
                                            )}
                                            {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {error}!
                                                </div>
                                            )}
                                            <form>
                                                <div className="input-group">
                                                    <div className="form-floating form-floating-outline mb-4">
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            value={fechaInicio}
                                                            onChange={(e) => setFechaInicio(e.target.value)}
                                                        />
                                                        <label>Fecha de Inicio</label>
                                                    </div>
                                                    <div className="form-floating form-floating-outline mb-4">
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            value={fechaFin}
                                                            onChange={(e) => setFechaFin(e.target.value)}
                                                        />
                                                        <label>Fecha de Fin</label>
                                                    </div>
                                                    <div className="form-floating form-floating-outline mb-4">
                                                        <select
                                                            disabled={departamentos.length <= 0}
                                                            id="departamento"
                                                            className="form-select form-select-lg"
                                                            value={idDepartamento}
                                                            onChange={(e) => setIdDepartamento(e.target.value)}
                                                        >
                                                            <option value={0}>--- SELECCIONE ---</option>
                                                            {departamentos.map((item) => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.nombre}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <label htmlFor="departamento">Departamento</label>
                                                    </div>
                                                    <div className="form-floating form-floating-outline mb-4">
                                                        <select
                                                            disabled={idDepartamento <= 0}
                                                            id="municipio"
                                                            className="form-select form-select-lg"
                                                            value={idMunicipio}
                                                            onChange={(e) => setIdMunicipio(e.target.value)}
                                                        >
                                                            <option value={0}>--- SELECCIONE ---</option>
                                                            {idDepartamento > 0 && municipios.map((item) => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.nombre}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <label htmlFor="municipio">Municipio</label>
                                                    </div>

                                                    <div className="form-floating form-floating-outline mb-4">
                                                        <select
                                                            disabled={estadoExpedientes.length <= 0}
                                                            id="estado"
                                                            className="form-select form-select-lg"
                                                            value={idEstadoExpediente}
                                                            onChange={(e) => setIdEstadoExpediente(e.target.value)}
                                                        >
                                                            <option value={0}>--- SELECCIONE ---</option>
                                                            {estadoExpedientes.map((item) => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.nombre}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <label htmlFor="departamento">Estado</label>
                                                    </div>



                                                </div>
                                            </form>
                                            <div className="row my-4 text-center">
                                                {["GERENTE", "TECNICO-ARCHIVO", "ADMINISTRADOR"].includes(user.user.rol.nombre) && (
                                                    <div className="col-12">
                                                        {loadingReportes ? (
                                                            <div className="spinner-grow text-success" role="status"></div>
                                                        ) : (
                                                            <div className="table-responsive">
                                                                <table className="table table-bordered table-custom">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Nombre</th>
                                                                            <th scope="col">Rol</th>
                                                                            <th scope="col">Departamento</th>
                                                                            <th scope="col">Municipio</th>
                                                                            <th scope="col">Polígono</th>
                                                                            <th scope="col">Predio</th>
                                                                            <th scope="col">Fecha de Ingreso</th>
                                                                            <th scope="col">Nombre Departamento</th>
                                                                            <th scope="col">Nombre Municipio</th>
                                                                            <th scope="col">Estado</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {reporteList.length === 0 ? (
                                                                            <tr>
                                                                                <td colSpan="9" className="text-center">
                                                                                    No se encontraron expedientes para el rango de fechas seleccionado.
                                                                                </td>
                                                                            </tr>
                                                                        ) : (
                                                                            reporteList.map((expediente, index) => (
                                                                                <tr key={index}>
                                                                                    <td>{expediente.usuario_nombre}</td>
                                                                                    <td>{expediente.rol_nombre}</td>
                                                                                    <td>{expediente.departamento_id}</td>
                                                                                    <td>{expediente.municipio_id}</td>
                                                                                    <td>{expediente.poligono}</td>
                                                                                    <td>{expediente.predio}</td>
                                                                                    <td>{convertirFecha(expediente.fechainicio)}</td>
                                                                                    <td>{expediente.departamento_nombre}</td>
                                                                                    <td>{expediente.municipio_nombre}</td>
                                                                                    <td>{expediente.estado_nombre}</td>
                                                                                </tr>
                                                                            ))
                                                                        )}
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
            <div className="layout-overlay layout-menu-toggle" />
        </div>
    );
};

export default ReporteExpediente;
