

import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import Select from 'react-select'
import { auditortypes, auditorcategory, auditortype, auditorappointmentat, typeofaddress, identfiertype } from "../constants/defaualtvalues";
import { SelectField, InputText, FileUpload, DatePicker } from '../ui/index';
import { DeleteConfirm } from '../hook/useConfirm';
import { getNormalHeaders } from '../utility/utility';
import { documenttypes } from "../constants/defaualtvalues";
import AsyncSelects from '../utility/select_field/selectSearch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DocumentMaster = (props) => {
    const permission = true
    console.log('DocumentMaster', props?.formvalue);
    const [IsLoading, setIsLoading] = useState(true);
    const [statelabel, setStateLabel] = useState('');
    const [countrylabel, setCountryLabel] = useState('');
    const [isChecktypeOfValue, setisChecktypeOfValue] = useState(null)

    useEffect(() => {
        if (props?.formvalue && props?.formvalue[0]['id'] == 0) setisChecktypeOfValue(0)
    }, [props?.formvalue]);

    const addAddressField = () => {
        props?.setFormvalue([...props?.formvalue, props?.initialstate]);
        const lastid = props?.formvalue.length;
        console.log('lastid', lastid);
        setisChecktypeOfValue(lastid);
        setisEditMode(true)
    };

    const removeDocumentField = (index) => {
        const rows = [...props?.formvalue];
        rows.splice(index, 1);
        console.log('first cp1', index)
        console.log('first cp2', rows)
        props?.setFormvalue(rows);
    };

    const handleOnChange = (event, index, id) => {
        const { name, value, data } = event.target
        const list = [...props?.formvalue];
        list[index][name] = value;
        list[index]['id'] = id;
        if (name == 'nationality_id') {
            if(!list[index]['nationality']) list[index]['nationality'] = {}
            list[index]['nationality']['name'] = data?.label;
        }
        props?.setFormvalue(list)
    }

    const handleOnfileChange = (event, index, id) => {
        const { name, files, data } = event.target
        const list = [...props?.formvalue];
        list[index][name] = files[0];
        list[index]['id'] = id;
        props?.setFormvalue(list)

    }


    const saveAddress = ((type, data) => {

        try {
            const headerPyalod = getNormalHeaders();
            setIsLoading(true);
            data['model'] = props?.model;
            data['ref_id'] = props?.ref_id;
            data['filed_name'] = props?.filed_name;
            data['id'] = data?.id;
            const formData = new FormData();

            if (data) {
                Object.keys(data).map((key) => {
                    formData.append(key, data[key]);
                });
            }
            const response = axios.post(`/api/v1/updatedocument/${props?.model}`, formData, headerPyalod)
                .then((response) => {
                    const dirduration = response?.data;
                    if (response?.data?.status == true && response?.data?.httpscode == 200) {
                        toast.success(response?.data?.message);
                        props?.reFetchData(props?.ref_id);
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

    const reFetchData = () => {
        props?.reFetchData(props?.ref_id);
    };
    return (<>
        <Col xs={8}>
            <h4 className="sectionheader my-0 mt-2">
                {props?.heading || 'Document'}</h4>
        </Col>
        {!props?.addbutton ? <>
            <Col xs={4}>
                <div className="text-end">
                    {permission && <Button onClick={addAddressField} variant="light" className="add-btn" ><i className="fa-solid fa-plus"></i></Button>}
                </div>
            </Col>
        </> : ''}

        <Col xs={12}><div className="graybottomborder my-2"></div></Col>

        <Col xs={12}>
            <Table className="tabletyp1 ">
                <thead>
                    <tr>
                        {props?.nationality && <th>Nationality{props?.required && <sup>*</sup>}</th>}
                        {!props?.documentDate && <th>Document Type{props?.required && <sup>*</sup>}</th>}
                        {!props?.documentDate && <th>Document Number{props?.required && <sup>*</sup>}</th>}
                        {(!props?.documentDate && props?.docName != false) && <th>Document Name{props?.required && <sup>*</sup>}</th>}
                        {!props?.documentDate && <th>Attachment{props?.required && <sup>*</sup>}</th>}
                        {props?.declaration && <th>Declaration by/Document{props?.required && <sup>*</sup>}</th>}
                        {props?.documentDate && <th>{props?.documentNameNo ? 'Form No./Document Name' : 'Name of Document'}{props?.required && <sup>*</sup>}</th>}
                        {props?.documentDate && <th>Date of Document{props?.required && <sup>*</sup>}</th>}
                        {props?.documentDate && <th>Document Upload / Download{props?.required && <sup>*</sup>}</th>}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props?.formvalue && props?.formvalue?.map((data, index) => {
                        const {
                            id,
                            document_type,
                            nationality_id,
                            document_number,
                            document_name,
                            issue_date,
                            attachment,
                            nationality
                        } = data;
                        let documentnumber = (document_type == 'PAN Card' && props?.PanReadOnly) ? props?.pan_no: document_number;
                        console.log('data', data);
                        console.log('document_type++++', document_type);
                        return (
                            <>
                                <tr>
                                    {props?.nationality && <td>
                                        <Form.Group className="mb-0">
                                            <>
                                                {props?.iseditmode && index != isChecktypeOfValue ?
                                                    (<>{nationality?.name || countrylabel}</>)
                                                    :
                                                    (<>
                                                        <AsyncSelects
                                                            onChange={(e) => handleOnChange(e, index)}
                                                            ref_table={'Countries'}
                                                            values={nationality_id || ""}
                                                            name={'nationality_id'}
                                                            errors={''}
                                                            required={!props?.required ? '' : true}
                                                        />

                                                    </>)}
                                            </>
                                        </Form.Group>
                                    </td>}
                                    {!props?.documentDate &&
                                        <td>
                                            <Form.Group className="mb-0">
                                                <>
                                                    {props?.iseditmode && index != isChecktypeOfValue ?
                                                        document_type
                                                        :
                                                        (<>
                                                            <SelectField
                                                                required={!props?.required ? '' : true}
                                                                icon={false}
                                                                label={'type of Document'}
                                                                name={'document_type'}
                                                                options={documenttypes}
                                                                onChange={(e) => handleOnChange(e, index, id)}
                                                                value={document_type}
                                                                validated={props?.validated}
                                                            />

                                                        </>)}
                                                </>
                                            </Form.Group>
                                        </td>
                                    }
                                    {!props?.documentDate &&
                                        <td>
                                            <Form.Group className="mb-0">
                                                <>
                                                    {props?.iseditmode && index != isChecktypeOfValue ?
                                                        (<>{documentnumber}</>)
                                                        :
                                                        (<>
                                                            <InputText
                                                                icon={false}
                                                                label={'Document Number'}
                                                                type="text"
                                                                name="document_number"
                                                                value={documentnumber}
                                                                onChange={(e) => handleOnChange(e, index, id)}
                                                                placeholder={" "}
                                                                readOnly={(document_type == 'PAN Card' && props?.PanReadOnly) ? true : ""}
                                                                required={(props?.required || (props?.citizen == 'indian' && (document_type == 'PAN Card' || document_type == 'Aadhaar Card'))) ? true : ''}
                                                            />

                                                        </>)}
                                                </>
                                            </Form.Group>
                                        </td>
                                    }
                                    {props?.docName != false &&
                                        <td>
                                            <Form.Group className="mb-0">
                                                <>
                                                    {props?.iseditmode && index != isChecktypeOfValue ?
                                                        (<>{document_name}</>)
                                                        :
                                                        (<>
                                                            <InputText
                                                                icon={false}
                                                                label={'Document Name'}
                                                                type="text"
                                                                className="text"
                                                                name="document_name"
                                                                value={document_name}
                                                                onChange={(e) => handleOnChange(e, index, id)}
                                                                placeholder={" "}
                                                                required={(props?.required || (props?.citizen == 'indian' && (document_type == 'PAN Card' || document_type == 'Aadhaar Card'))) ? true : ''}
                                                            />

                                                        </>)}
                                                </>
                                            </Form.Group>
                                        </td>
                                    }
                                    {props?.documentNameNo &&
                                        <td>
                                            <Form.Group className="mb-0">
                                                <>
                                                    {props?.iseditmode && index != isChecktypeOfValue ?
                                                        (<>{document_number}</>)
                                                        :
                                                        (<>
                                                            <InputText
                                                                icon={false}
                                                                label={'Document Number'}
                                                                type="text"
                                                                name="document_number"
                                                                value={document_number}
                                                                onChange={(e) => handleOnChange(e, index, id)}
                                                                placeholder={" "}
                                                                required={(props?.required || (props?.citizen == 'indian' && (document_type == 'PAN Card' || document_type == 'Aadhaar Card'))) ? true : ''}
                                                            />

                                                        </>)}
                                                </>
                                            </Form.Group>
                                        </td>
                                    }
                                    {props?.documentDate &&
                                        <td>
                                            <Form.Group className="mb-0">
                                                {props?.iseditmode && index != isChecktypeOfValue ?
                                                    (<>{issue_date}</>)
                                                    :
                                                    (
                                                        <>
                                                            <DatePicker icon={false} required={(props?.required || (props?.citizen == 'indian' && (document_type == 'PAN Card' || document_type == 'Aadhaar Card'))) ? true : ''} type="date" className="datepicker issued_date_attatchment" data-index={index} value={issue_date} onChange={(e) => handleOnChange(e, index, id)} id="issue_date" name="issue_date" />
                                                        </>
                                                    )}
                                            </Form.Group>
                                        </td>
                                    }
                                    <td>
                                        <div className="uploadandsavefields">
                                            <Form.Group className="mb-0">
                                                <FileUpload
                                                    icon={false}
                                                    required={(props?.required || (props?.citizen == 'indian' && (document_type == 'PAN Card' || document_type == 'Aadhaar Card')) && !data?.file_name) ? true : ''}
                                                    validated={props?.validated}
                                                    label={'Attachment'}
                                                    id={'attachment'}
                                                    name={'attachment'}
                                                    onChange={(e) => handleOnfileChange(e, index, id)}
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
                                        {permission && <div className={"tableactionbtngroup"}>

                                            {(props?.iseditmode && id) ?
                                                <>
                                                    {index == isChecktypeOfValue  ?
                                                        <>
                                                            <Button onClick={() => showEditOrSaveBtn(index, 'update', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-awesome-save.svg"} /></Button>
                                                            <Button onClick={() => showEditOrSaveBtn(index, 'cross', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-cross.svg"} /></Button>
                                                        </>
                                                        : <><Button onClick={() => showEditOrSaveBtn(index, 'edit', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-pencil.svg"} /></Button></>}

                                                </>
                                                : ''}

                                            {props?.formvalue.length !== 1 ? (<> {(props?.iseditmode && id) ?
                                                (<div className={"tableactionbtngroup"}>
                                                    <DeleteConfirm
                                                        key={id}
                                                        payload={{
                                                            id: id,
                                                            model: 'DocumentMaster',
                                                            message: `Document Master`
                                                        }}
                                                        reFetchData={reFetchData}
                                                        remove={removeDocumentField}
                                                        index={index}
                                                    /></div>)
                                                : (
                                                    <div className="text-end">
                                                        <Button type="button" variant="secondary" onClick={() => removeDocumentField(index)} className="add-btn" ><i className="fa-solid fa-minus"></i></Button>
                                                    </div>
                                                )}</>
                                            ) : (
                                                ""
                                            )}
                                        </div>}
                                    </td>

                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </Table>
        </Col>
    </>)
}

export default DocumentMaster;
