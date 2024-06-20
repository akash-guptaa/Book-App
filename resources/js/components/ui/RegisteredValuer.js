
import { Link, NavLink, useParams, select, useHistory, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import Select from 'react-select'
import { auditortypes, auditorcategory, auditortype, auditorappointmentat, typeofaddress, identfiertype, lpersontypeofaddress, persontypeofkmpaddress } from "../constants/defaualtvalues";
import { SelectField, InputText, FileUpload, DatePicker } from '../ui/index';

import { DeleteConfirm } from '../hook/useConfirm';
import { getNormalHeaders } from '../utility/utility';
import { persontypeofaddress } from "../constants/defaualtvalues";
import AsyncSelects from '../utility/select_field/selectSearch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisteredValuer = (props) => {
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();

    console.log('AddressMaster', props)
    const [IsLoading, setIsLoading] = useState(true);
    const [validated , setvalidated ] = useState(true);
    const [isChecktypeOfValue, setisChecktypeOfValue] = useState(null)
    const initialstate = {
                        type: '',
                        name : '',
                        firm_name : '',
                        registration_number : '',
                        address_contact_details  : '',
                        other_details: '',
                        date_Report : '',
                        attachment: '' };
    const [formvalues, setformvalues] = useState([initialstate])
    const onChange =(value) => {

        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = JSON.stringify(value);
        props?.onChange(data);
    }
    const addAddressField = () => {
        setformvalues([...formvalues, initialstate]);
        onChange([...formvalues, initialstate])

    };

    const removeDocumentField = (index) => {
        const rows = [...formvalues];
        rows.splice(index, 1);
        setformvalues(rows);
        onChange(list)

    };

    const handleOnChange = (event, index, id) => {
        const { name, value, data ,files} = event.target
        const list = [...formvalues];
        if(name == 'attachment'){
            list[index][name] = files[0];
        }else{
            list[index][name] = value;
        }
        console.log('first /list', list)
        setformvalues(list);
        onChange(list)
    }

    const saveAddress = ((type, data) => {
        const formData = new FormData();

        try {
            const headerPyalod = getNormalHeaders();
            setIsLoading(true);
            data['model'] = model;
            data['ref_id'] = ref_id;
            data['filed_name'] = filed_name;
            data['id'] = data?.id;
            const response = axios.post(`/api/v1/updateaddress/${model}`, data, headerPyalod)
                .then((response) => {
                    const dirduration = response?.data;
                    if (response?.data?.status == true && response?.data?.httpscode == 200) {
                        toast.success(response?.data?.message);
                        reFetchData(ref_id);
                        setisChecktypeOfValue(null)(!isChecktypeOfValue);
                    }
                    else {

                    }
                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.response) {
                        setIsLoading(false)

                    } else if (error.request) {
                        setIsLoading(false)
                    } else {
                        setIsLoading(false)
                    }
                });

        } catch (err) {
            setIsLoading(false)
        }

    });

    const showEditOrSaveBtn = (index, type, field_id, data) => {
        if (type == 'edit' || type == 'cross') {
            if (isChecktypeOfValue === index) {
                setisChecktypeOfValue(null);
                return false;
            } else {

                setisChecktypeOfValue(index);
            }
        } else {
            saveAddress(type, data)
        }

    };


    useEffect(() => {
        let value = props?.value;
        if(agenda_req_id && value){
        if(typeof value === 'string'){
           value = JSON.parse(value);
        }
        console.log('firstfirstfirstfirstfirstfirstfirst', props?.value)
        setformvalues(value);
    }
    }, [agenda_req_id])


    return (<>
        <Col xs={8}>
            <h4 className="sectionheader my-0 mt-2">
                {'Details of the Registered Valuer '}</h4>
        </Col>

            <Col xs={4}>
                <div className="text-end">
                    <Button onClick={addAddressField} variant="light" className="add-btn" ><i className="fa-solid fa-plus"></i></Button>
                </div>
            </Col>

        <Col xs={12}><div className="graybottomborder my-2"></div></Col>

        <Col xs={12}>
            <Table className="tabletyp1 ">
                <thead>
                    <tr>
                        <th>Type </th>
                        <th>Name</th>
                        <th>Firm Name</th>
                        <th>Registration Number</th>
                        <th>Address and Contact Details </th>
                        <th>Other Details </th>
                        <th>Date of the Valuation Report </th>
                        <th>Attachment of the Report</th>
                    </tr>
                </thead>
                <tbody>
                    {formvalues && formvalues?.map((data, index) => {
                        const {
                        type,
                        name ,
                        firm_name ,
                        registration_number ,
                        address_contact_details  ,
                        other_details,
                        date_Report ,
                        attachment
                        } = data;
                        return (
                            <>
                                <tr>
                                    <td>
                                    <Form.Group className="mb-0">
                                          <InputText
                                            icon={false}
                                            label={'Name'}
                                            type="text"
                                            name="type"
                                            value={type}
                                            onChange={(e) => handleOnChange(e, index)}
                                            placeholder={" "}
                                        />
                                        </Form.Group>
                                    </td>
                                   <td>
                                        <Form.Group className="mb-0">
                                          <InputText
                                            icon={false}
                                            label={'Name'}
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={(e) => handleOnChange(e, index)}
                                            placeholder={" "}
                                        />
                                        </Form.Group>
                                    </td>
                                   <td>
                                        <Form.Group className="mb-0">
                                          <InputText
                                            icon={false}
                                            label={'Name'}
                                            type="text"
                                            name="firm_name"
                                            value={firm_name}
                                            onChange={(e) => handleOnChange(e, index)}
                                            placeholder={" "}
                                        />
                                        </Form.Group>
                                    </td>
                                   <td>
                                        <Form.Group className="mb-0">
                                          <InputText
                                            icon={false}
                                            label={'registration number'}
                                            type="text"
                                            name="registration_number"
                                            value={registration_number}
                                            onChange={(e) => handleOnChange(e, index)}
                                            placeholder={" "}
                                        />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-0">
                                          <InputText
                                            icon={false}
                                            label={'registration number'}
                                            type="text"
                                            name="address_contact_details"
                                            value={address_contact_details}
                                            onChange={(e) => handleOnChange(e, index)}
                                            placeholder={" "}
                                        />
                                        </Form.Group>
                                    </td>
                                   <td>
                                        <Form.Group className="mb-0">
                                          <InputText
                                            icon={false}
                                            label={'registration number'}
                                            type="text"
                                            name="other_details"
                                            value={other_details}
                                            onChange={(e) => handleOnChange(e, index)}
                                            placeholder={" "}
                                        />
                                        </Form.Group>
                                    </td>

                                   <td>
                                    <Form.Group className="mb-0">
                                        <DatePicker
                                        icon={false}
                                        type="date"
                                        name="date_Report"
                                        value={date_Report}
                                        onChange={(e) => handleOnChange(e, index)}
                                        />
                                    </Form.Group>
                                    </td>
                                    <td>
                                        <div className="uploadandsavefields">
                                            <Form.Group className="mb-0">
                                                <FileUpload
                                                    icon={false}
                                                    validated={validated}
                                                    label={'Attachment'}
                                                    name={'attachment'}
                                                    onChange={(e) => handleOnChange(e, index)}
                                                    document={{
                                                        file_name: data?.file_name,
                                                        file_full_path: data?.file_full_path,
                                                    }}
                                                    value={attachment}
                                                />
                                            </Form.Group>
                                        </div>
                                    </td>

                                    <td className="text-end">
                                        <div className={"tableactionbtngroup"}>
                                                    {index == isChecktypeOfValue ?
                                                        <>
                                                            <Button onClick={() => showEditOrSaveBtn(index, 'update', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-awesome-save.svg"} /></Button>
                                                            <Button onClick={() => showEditOrSaveBtn(index, 'cross', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-cross.svg"} /></Button>
                                                        </>
                                                        : <><Button onClick={() => showEditOrSaveBtn(index, 'edit', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-pencil.svg"} /></Button></>}

                                        </div>
                                    </td>
                                    {formvalues.length !== 1 && (
                                        <div className="text-end">
                                            <Button type="button" variant="secondary" onClick={() => removeDocumentField(index)} className="add-btn" ><i className="fa-solid fa-minus"></i></Button>
                                        </div>
                                    )}
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </Table>
        </Col>
    </>)
}

export default RegisteredValuer;
