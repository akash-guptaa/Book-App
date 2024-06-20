
import { Link, NavLink, useParams, select, useHistory, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import Select from 'react-select'
import { auditortypes, auditorcategory, auditortype, auditorappointmentat, typeofaddress, identfiertype, lpersontypeofaddress, persontypeofkmpaddress } from "../constants/defaualtvalues";
import { SelectField, InputText, DatePicker, FileUpload } from '../ui/index';

import { DeleteConfirm } from '../hook/useConfirm';
import { getNormalHeaders } from '../utility/utility';
import { persontypeofaddress, shareholdercategory } from "../constants/defaualtvalues";
import AsyncSelects from '../utility/select_field/selectSearch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import ReactTooltip from 'react-tooltip';

const ExcelToTable = (props) => {
    console.log('props', props)
    const [isOpen, setIsOpen] = useState(false);

 const [files, updatefiles] = useState('');
 const [data, setdata] = useState([]);
    const sample_file_name = '/img/samplefiles/Untitled spreadsheet.xlsx';
    const [isLoading, setIsLoading] = useState(false);

    var showToastererror = (error) => {
        error && Object.keys(error).length > 0 && (
            Object.entries(error).map(([key, value]) => (
                value && value.map((data, index) => {
                    toast.error(data)
                })
            ))
        )
    }
    const onChange = (e) => {
        updatefiles(e.target.files[0])
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = e.target.files;
        data['target']['files'] = e.target.files;
        data['target']['data'] = e;
        props?.onChange(data)
    }

    const handleClose = () => {
        setIsOpen(false)
        setdata([])
    };
    const handleShow = () => setIsOpen(true);

    const updatefilesapi = async (e) => {
        handleShow();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
        } else {
            e.preventDefault();
            e.stopPropagation();
            try {
                const formData = new FormData();
                formData.append("files",files)
                console.log('files', files)
                const headerPyalod = getNormalHeaders();
                setIsLoading(true);
                const response = axios.post(`/api/v1/importexcel`, formData, headerPyalod)
                .then((response) => {
                    console.log('response', response?.data)
                    if(response?.data?.status ==true){
                        toast.success(response?.data?.message);
                        setdata(response?.data?.data)
                    }else{
                        toast.error(response?.data?.message);
                        showToastererror(response?.data?.error);
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        toast.error(error?.response?.data?.message);
                        console.log("getclassofSec error", error.response);
                    }
                });
            } catch (err) {
                console.log("err", err);
                setIsLoading(false)
            }
        }
    };


    return (<>
    <Modal show={isOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Excel to Table'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Col xs={12}>
            <div className="sectioninnerbox mt-2 p-3">
                <Table responsive className="tabletyp1 " >
                    <thead>
                        <tr>
                          <th>Name of the Investor</th >
                          <th>Folio No/Demat Number, if any</th >
                          <th>Fathers/ Spouse's Name</th>
                          {/* <th>Address</th > */}
                          <th>Nationality</th >
                          <th>Email id</th >
                          <th>Phone No.	</th >
                          <th>Occupation</th >
                          <th>Category</th >
                          <th>Individual</th >
                          <th>Body Corporate</th >
                        </tr>
                    </thead>
                    <tbody>
                        {data && Array.isArray(data) && data?.map((formvaluedata, formvalueindex) => {
                        console.log('formvaluedata', formvaluedata)
                        return (
                                <>
                                    <tr>
                                        <td>{formvaluedata?.name}</td>
                                        <td>{formvaluedata?.folio_number}</td>
                                        <td>{formvaluedata?.relative_name}</td>
                                        {/* <td>{formvaluedata?.address[0]?.address}</td> */}
                                        <td>{formvaluedata?.nationality}</td>
                                        <td>{formvaluedata?.email_address}</td>
                                        <td>{formvaluedata?.mobile_no}</td>
                                        <td>{formvaluedata?.occupation}</td>
                                        <td>{formvaluedata?.category}</td>
                                        <td>{formvaluedata?.individual}</td>
                                        <td>{formvaluedata?.cin_llpin_reg_number}</td>

                                    </tr>
                                </>
                            )
                        })}
                    </tbody >
                </Table >
            </div >
        </Col >
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

       <Col xs={4}>
        <FileUpload
        {...props}
        onChange={onChange}
        value={files}
        document={{
            file_name: props?.value?.file_name,
            file_full_path: props?.value?.file_full_path,
        }}
        />
        <Button className="img-btn" variant="secondary" onClick={updatefilesapi}>
            {/* <img src={"/img/icons/Icon-awesome-save.svg"} /> */}
            {"preview"}
        </Button>
        {sample_file_name && (
            <>
            <Button as={Link} to={sample_file_name}  variant="secondary" data-for={"downloadtip" + props?.document?.file_name} data-tip={"Download sample file"} target="_blank" download>
            {"Sample file  "}
                <img src={"/img/icons/Icon-ionic-md-download.svg"} />
            </Button>
            <ReactTooltip class="secondary" id={"downloadtip" + props?.document?.file_name} effect="solid" place="top" />
            </>
        )}
</Col>

    </>)
}

export default ExcelToTable;
