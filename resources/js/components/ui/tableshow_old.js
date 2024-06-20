
import { Link, NavLink, useParams, select, useHistory, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import Select from 'react-select'
import { auditortypes, auditorcategory, auditortype, auditorappointmentat, typeofaddress, identfiertype, lpersontypeofaddress, persontypeofkmpaddress } from "../constants/defaualtvalues";
import { SelectField, InputText,  DatePicker  } from '../ui/index';
import { FileUploadUi as FileUpload  } from '../ui/template';

import { DeleteConfirm } from '../hook/useConfirm';
import { getNormalHeaders } from '../utility/utility';
import { persontypeofaddress } from "../constants/defaualtvalues";
import AsyncSelects from '../utility/select_field/selectSearch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const TableGenerate = (props) => {
    console.log('propspropspropsprops', props?.value)
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();

    const [initialstate, setinitialstate] = useState([]);
    const [formvalue, setFormvalue] = useState([]);
    const [status, setstatus] = useState(true);
let initialstatedata = [];
let initialstatevalue = [];

    useEffect(() => {
     initialstatedata = props?.table
        if (props?.table && status) {
            if (typeof props?.table == 'string') {
                initialstatedata = JSON.parse(props?.table)
            }
           setinitialstate(initialstatedata)
           setstatus(false)

        }


    }, [initialstate,props?.table]);

    useEffect(() => {
        initialstatevalue = props?.value
           if (props?.value && status) {
               if (typeof props?.table == 'string') {
                initialstatevalue = JSON.parse(props?.value)
               }
               console.log('initialstatevalue', initialstatevalue)
               setFormvalue(initialstatevalue)
               setstatus(false)
           }


       }, [initialstate,props?.value]);


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {

            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target.result);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);
            //reader.readAsArrayBuffer(file);
        });
    };

    const savedata = (savedata) => {
        let payload = {
            target: {
                name: '',
                value: ''
            }
        };
        payload['target']['name'] = props?.name
        payload['target']['value'] = JSON.stringify(savedata)
        props?.onChange(payload)
    }

    const handleOnInputChange = async (event, index, optionindex, obj) => {
        const { name, files, data, value } = event.target
        const list = [...formvalue];
        console.log('formvalueformvalueformvalueformvalue', list[index][optionindex])
        if (obj?.cat_type == 6) {
            console.log('obj?.cat_type', obj?.cat_type)
            const base64 = await convertToBase64(files[0]);
            list[index][optionindex]['value'] = files[0]?.name;
            list[index][optionindex]['document'] = base64;
            console.log(' obj?.cat_type base64', list)
            setFormvalue(list)
            savedata(list)
        } else {
            list[index][optionindex]['value'] = value.toString();
            setFormvalue(list)
            savedata(list)
        }
    };

    let componets = {
        3: InputText,
        7: DatePicker,
        6: FileUpload,
        4: SelectField,
        18: YesNoChecked,
    };

    const companydirduration = [];
    var i = 0;
    var shares = [];
    var faceVal = [];
    var totalamt = [];
    formvalue && formvalue?.map((data, dataindex) => {
        data && data?.map((value, valueindex) => {
            i++;
            shares[i] = (value?.nameattr == 'NumberofShares') ? value?.value: 0;
            faceVal[i] = (value?.nameattr == 'FaceValue') ? value?.value: 0;
            totalamt[i] = (value?.nameattr == 'TotalAmount') ? value?.value: 0;
        })
    })
    let totalshares = shares.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    let total_face_val = faceVal.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    let total_amount = totalamt.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    console.log('formvalueformvalueformvalue', formvalue, props?.value, totalshares)
    useEffect(() => {
        if(totalshares || total_face_val || total_amount) {
            console.log("shares++---",totalshares);
            totalshares = (!isNaN(totalshares)) ? totalshares : 0;
            total_face_val = (!isNaN(total_face_val)) ? total_face_val : 0;
            total_amount = (!isNaN(total_amount)) ? total_amount : 0;
            props?.setaddClassTotal({...props?.addClassTotal,'shares':totalshares,'face_value':total_face_val,'total_amount':total_amount});
        }
    },[totalshares,total_face_val, total_amount])

    return (<>
    {props?.label && <Col xs={12}>
        <h4 className="sectionheader my-0 mt-2">
            {props?.label}</h4>
    </Col>}

    <Col xs={12}><div className="graybottomborder my-2"></div></Col>

        <Col xs={12}>
            <div className="sectioninnerbox mt-2 p-3">
                <Table responsiveclassName="tabletyp1 " boarder={'1'}>
                    <thead>
                        <tr>
                            {initialstate && initialstate?.map((data, initialstateindex) => {
                                return (
                                    <><th>{data?.header}</th ></>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {props?.value && props?.value?.map((formvaluedata, formvalueindex) => {
                        return (
                                <>
                                    <tr>
                                    {initialstate && initialstate?.map((data, initialstateindex) => {
                                        console.log('firstfirstfirstfirst', data)
                                        return (
                                            <><th>{formvaluedata[data?.nameattr]}</th ></>
                                        )
                                    })}
                                    </tr >
                                </>
                            )
                        })}
                    </tbody >
                </Table >
            </div >
        </Col >
    </>)
}
export const YesNoChecked = (props) => {
    const id = uuidv4();
    const handleonchange = (value) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = value;
        props?.onChange(data);
    }
    console.log('props YesNoChecked', props);
    return (
        <>
            {props?.label && <Form.Label>{props?.label} </Form.Label>}
            {props?.required && (<sup>*</sup>)}
            <div className="justify-content-end mb-2">
                <ButtonGroup role="group" className="btn-grouptype2">
                    <input type="radio" class="btn-check" onChange={(e) => handleonchange('yes')} name={id} id={id + '1'} autocomplete="off" checked={props?.value == 'yes' ? true : ''} />
                    <Form.Label class="btn btn-light mb-0" for={id + '1'}> Yes </Form.Label>

                    <input type="radio" class="btn-check" onChange={(e) => handleonchange('no')} name={id} id={id + '2'} autocomplete="off" checked={props?.value == 'no' ? true : ''} />
                    <Form.Label class="btn btn-light mb-0" for={id + '2'}> No </Form.Label>
                </ButtonGroup>

            </div>
            {props?.validated === true && (props?.values == null || props?.values == '') ?
                <span className="error_show">
                    Please select {props?.label}
                </span>
                : ""
            }
        </>)
}
export default TableGenerate;
