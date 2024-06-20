
import { Link, NavLink, useParams, select, useHistory, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState,useRef } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import Select from 'react-select'
import { auditortypes, auditorcategory, auditortype, auditorappointmentat, typeofaddress, identfiertype, lpersontypeofaddress, persontypeofkmpaddress } from "../constants/defaualtvalues";
import { SelectField, InputText,  DatePicker  } from '../ui/index';
import { FileUploadUi as FileUpload  } from '../ui/template';

import { DeleteConfirm } from '../hook/useConfirm';
import { getNormalHeaders } from '../utility/utility';
import { persontypeofaddress,shareholdercategory,nationalitylistSCH  } from "../constants/defaualtvalues";
import AsyncSelects from '../utility/select_field/selectSearch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const TableGenerate = (props) => {
    const SecurityHolder = useRef('');

useEffect(() => {

    const data = {
        target: {
            name: '',
            value: ''
        }
    };
    data['target']['name'] = props?.name
    data['target']['value'] = SecurityHolder?.current?.outerHTML;
    props?.onChange(data)

}, [SecurityHolder])
    return (<>
    {props?.label && <Col xs={12}>
        <h4 className="sectionheader my-0 mt-2">
            {props?.label}</h4>
    </Col>}

    <Col xs={12}><div className="graybottomborder my-2"></div></Col>

        <Col xs={12}>
            <div className="sectioninnerbox mt-2 p-3">
                <Table responsive className="tabletyp1 " boarder={'1'} ref={SecurityHolder}>
                    <thead>
                        <tr>
                          <th>Name of the Investor</th >
                          <th>Folio No/Demat Number, if any</th >
                          <th>Fathers/ Spouse's Name</th>
                          <th>Address</th >
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
                        {props?.value && Array.isArray(props?.value) && props?.value?.map((formvaluedata, formvalueindex) => {
                        console.log('formvaluedata', formvaluedata)
                        return (
                                <>
                                    <tr>
                                        <td>{formvaluedata?.name}</td>
                                        <td>{formvaluedata?.folio_number}</td>
                                        <td>{formvaluedata?.relative_name}</td>
                                        <td>{formvaluedata?.address[0]?.address}</td>
                                        {/* <td>{nationality[0]?.label}</td> */}
                                        <td>{formvaluedata?.email_address}</td>
                                        <td>{formvaluedata?.mobile_no}</td>
                                        <td>{formvaluedata?.occupation}</td>
                                        {/* <td>{category[0]?.label}</td> */}
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
    </>)
}

export default TableGenerate;
