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



const ReporteCombustible = () => {
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
    const [placa, setPlaca] = useState("");
    const [combustible, setCombustible] = useState();



    // Función para buscar reportes
    const buscarReportes = async () => {
        setMensaje("");
        setError("");
        setLoadingReportes(true);

        try {
            const response = await axiosInstance.post(`/combustible/reporteCombustible`, {
                usuario_id: user?.user?.id,
                fechaInicio,
                fechaFin,
                placa,
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

    /*
    // Función para convertir timestamps a fecha
    const convertirFecha = (fechaISO) => {
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

    /*

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
    

    */

/*
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
    const getCombustible = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/combustible`,
                {
                    headers: {
                        Authorization: `${user.type} ${user.token}`,
                    },
                }
            );
            setCombustible(response.data);

            setLoading(false);
        } catch (error) {
            console.error(" failed:", error);
            if (error.status >= 400 && error.status < 500) {
                //setError("No se puede.");
            }
            //setError(error.message);
            setLoading(false);
            //console.log(error.response.status);
        }
    };







    // Efectos para cargar datos iniciales
    useEffect(() => {
        getCombustible();

    }, []);




    // Función para exportar Excel con logo
    const exportarExcel = async () => {
        if (reporteList.length === 0) {
            toast.error("No hay datos para exportar");
            return;
        }

        // Imprimir la lista para verificar que contiene datos
        console.log(reporteList);

        const worksheetData = reporteList.map(combustible => ({
            "Nombre": combustible.usuario_nombre,
            "Rol": combustible.rol_nombre,
            "Fecha de Asignacion": convertirFecha(combustible.fechainicio),
            "Chofer": combustible.chofer,
            "Placa": combustible.placa,
            "Kilometraje Inicial": combustible.kilometraje_inicial,
            "Kilometraje Final": combustible.kilometraje_final,
            "KMS Recorridos": combustible.kilometros_recorridos,
            "Cupón Desde": combustible.cupon_desde,
            "Cupón Hasta": combustible.cupon_hasta,
            "Total de Cupones": combustible.total_cupones,
            "Denominación (Q.)": combustible.denominación,
            "Monto Final": combustible.monto,
            "PDF": combustible.pdf,
            "Observaciones": combustible.observacion_cupon,
            "Saldo Inicio": combustible.saldo_inicio,
            "Saldo Final": combustible.saldo_fin,
            "Galones Asignados": combustible.galones_asignados,
            "Consumo": combustible.consumo,
            "Rendimiento": combustible.rendimiento,
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
            worksheet.getCell('C1').value = "REPORTE DE CUPONES DE COMBUSTIBLE ASIGNADOS A LOS VEHÍCULOS";
            worksheet.getCell('C1').font = { bold: true, color: { argb: '000000' }, size: 20 }; // Negrita, color negro, tamaño 20
            worksheet.getRow(1).height = 30; // Ajustar la altura de la fila 1

            // Configurar el ancho de cada columna a 20
            worksheet.columns = [
                { width: 20 }, // NOMBRE
                { width: 20 }, // ROL
                { width: 20 }, // FECHA
                { width: 20 }, // CHOFER
                { width: 20 }, // PLACA
                { width: 20 }, // KILOMETRAJE INICIAL
                { width: 20 }, // KILOMETRAJE FINAL
                { width: 20 }, // KILOMETROS RECORRIDOS
                { width: 20 }, // CUPON DESDE
                { width: 20 }, // CUPON HASTA
                { width: 20 }, // TOTAL DE CUPONES
                { width: 20 }, // denominación (Q.)
                { width: 20 }, // MONTO FINAL
                { width: 20 }, // PDF
                { width: 20 }, // OBSERVACIONES
                { width: 20 }, // SALDO INICIO
                { width: 20 }, // SALDO FINAL
                { width: 20 }, // GALONES ASIGNADOS
                { width: 20 }, // CONSUMO
                { width: 20 }, // RENDIMIENTO

            ];

            // Definir encabezados
            const headers = [
                'Nombre',
                'Rol',
                'Fecha de Asignacion',
                'Chofer',
                'Placa',
                'Kilometraje Inicial',
                'Kilometraje Final',
                'KMS Recorridos',
                'Cupón Desde',
                'Cupón Hasta',
                'Total de Cupones',
                'Denominación (Q.)',
                'Monto Final',
                'PDF',
                'Observaciones',
                'Saldo Inicio',
                'Saldo Final',
                'Galones Asignados',
                'Consumo',
                'Rendimiento'
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
                    { name: 'Fecha de Asignacion' },
                    { name: 'Chofer' },
                    { name: 'Placa' },
                    { name: 'Kilometraje Inicial' },
                    { name: 'Kilometraje Final' },
                    { name: 'KMS Recorridos' },
                    { name: 'Cupón Desde' },
                    { name: 'Cupón Hasta' },
                    { name: 'Total de Cupones' },
                    { name: 'Denominación (Q.)' },
                    { name: 'Monto Final' },
                    { name: 'PDF' },
                    { name: 'Observaciones' },
                    { name: 'Saldo Inicio' },
                    { name: 'Saldo Final' },
                    { name: 'Galones Asignados' },
                    { name: 'Consumo' },
                    { name: 'Rendimiento' }

                ],
                rows: worksheetData.map(data => Object.values(data)), // Asegúrate de agregar las filas aquí
            });

            const xlsxBuffer = await workbook.xlsx.writeBuffer();
            const fileName = `reporte_rendimiento_combustible_${fechaInicio}_al_${fechaFin}.xlsx`;
            const blobFile = new Blob([xlsxBuffer], { type: 'application/octet-stream' });
            saveAs(blobFile, fileName);
        };

        reader.readAsDataURL(blob);
    };




    const verPDF = (pdfBase64) => {
        // Decodificar Base64 y convertir a un Blob
        const pdfBlob = new Blob([new Uint8Array(atob(pdfBase64.pdf).split('').map(c => c.charCodeAt(0)))], { type: 'application/pdf' });

        // Crear una URL temporal para el Blob
        const url = URL.createObjectURL(pdfBlob);

        // Abrir el PDF en una nueva pestaña
        window.open(url, '_blank');

        // Liberar la URL cuando ya no sea necesaria
        URL.revokeObjectURL(url);
    };




    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPdf(reader.result.split(',')[1]); // Eliminar el prefijo "data:application/pdf;base64,"
        };

        if (file) {
            reader.readAsDataURL(file);
        }
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
                                                <span className="text-muted fw-light">Reportes/</span>Combustible
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

                                                    <div class="form-floating form-floating-outline mb-4" >
                                                        <input
                                                            type="text"
                                                            maxLength={7}
                                                            className="form-control"
                                                            id="placa"
                                                            placeholder="Matrícula"
                                                            value={placa}
                                                            onChange={(e) => setPlaca(e.target.value)}
                                                        />
                                                        <label for="exampleFormControlSelect1">
                                                            Placa del vehículo
                                                        </label>
                                                    </div>

                                                </div>

                                            </form>
                                            <div className="row my-4 text-center">
                                                {["GERENTE", "ASISTENTE-ADMINISTRATIVO"].includes(user.user.rol.nombre) && (
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
                                                                            <th scope="col">Fecha de Asignacion</th>
                                                                            <th scope="col">Chofer</th>
                                                                            <th scope="col">Placa</th>
                                                                            <th scope="col">Kilometraje Inicial</th>
                                                                            <th scope="col">Kilometraje Final</th>
                                                                            <th scope="col">KMS Recorridos</th>
                                                                            <th scope="col">Cupón Desde</th>
                                                                            <th scope="col">Cupón Hasta</th>
                                                                            <th scope="col">Total de Cupones</th>
                                                                            <th scope="col">Denominación (Q.)</th>
                                                                            <th scope="col">Monto Final</th>
                                                                            <th scope="col">PDF</th>
                                                                            <th scope="col">Observaciones</th>
                                                                            <th scope="col">Saldo Inicio</th>
                                                                            <th scope="col">Saldo Final</th>
                                                                            <th scope="col">Galones Asignados</th>
                                                                            <th scope="col">Consumo</th>
                                                                            <th scope="col">Rendimiento</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {reporteList.length === 0 ? (
                                                                            <tr>
                                                                                <td colSpan="9" className="text-center">
                                                                                    No se encontraron Asignaciones para el rango de fechas seleccionado.
                                                                                </td>
                                                                            </tr>
                                                                        ) : (
                                                                            reporteList.map((combustible, index) => (

                                                                                <tr key={index}>
                                                                                    <td>{combustible.usuario_nombre}</td>
                                                                                    <td>{combustible.rol_nombre}</td>
                                                                                    <td>{convertirFecha(combustible.fechainicio)}</td>  {/* Fecha de Asignación */}
                                                                                    <td>{combustible.chofer}</td>                       {/* Chofer */}
                                                                                    <td>{combustible.placa}</td>                       {/* Placa */}
                                                                                    <td>{combustible.kilometraje_inicial}</td>     {/* Kilometraje Inicial */}
                                                                                    <td>{combustible.kilometraje_final}</td>     {/* Kilometraje Final */}
                                                                                    <td>{combustible.kilometros_recorridos}</td>     {/* KMS Recorridos */}
                                                                                    <td>{combustible.cupon_desde}</td>                 {/* Cupón Desde */}
                                                                                    <td>{combustible.cupon_hasta}</td>                 {/* Cupón Hasta */}
                                                                                    <td>{combustible.total_cupones}</td>               {/* Total de Cupones */}
                                                                                    <td>{combustible.denominación}</td>                {/* Denominación (Q.) */}
                                                                                    <td>{combustible.monto}</td>                       {/* Monto Final */}
                                                                                    <td>
                                                                                        {combustible.pdf && <button
                                                                                            onClick={() => {
                                                                                                verPDF(combustible)
                                                                                            }}
                                                                                            className="btn rounded-pill btn-success m-1"
                                                                                        >
                                                                                            <i className="bx bx-download"></i>
                                                                                        </button>}

                                                                                    </td>                                                                                    
                                                                                    <td>{combustible.observacion_cupon}</td>          {/* Observaciones */}
                                                                                    <td>{combustible.saldo_inicio}</td>                {/* Saldo Inicio */}
                                                                                    <td>{combustible.saldo_fin}</td>                   {/* Saldo Final */}
                                                                                    <td>{combustible.galones_asignados}</td>          {/* Galones Asignados */}
                                                                                    <td>{combustible.consumo}</td>                     {/* Consumo */}
                                                                                    <td>{combustible.rendimiento}</td>                 {/* Rendimiento */}
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
            </div >
            <div className="layout-overlay layout-menu-toggle" />
        </div >
    );
};
export default ReporteCombustible;
