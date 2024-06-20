import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import Select from 'react-select'
import { auditortypes, auditorcategory, auditortype, auditorappointmentat, typeofaddress, identfiertype } from "../constants/defaualtvalues";
import { SelectField, InputText, FileUpload, DatePicker } from './index';
import { DeleteConfirm } from '../hook/useConfirm';
import { getNormalHeaders,hasPermission } from '../utility/utility';
import { documenttypes } from "../constants/defaualtvalues";
import AsyncSelects from '../utility/select_field/selectSearch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DocumentFileMaster = (props) => {
    console.log('DocumentMaster', props?.formvalue);
    const permission = hasPermission();

    const [IsLoading, setIsLoading] = useState(true);
    const [statelabel, setStateLabel] = useState('');
    const [countrylabel, setCountryLabel] = useState('');
    const [isChecktypeOfValue, setisChecktypeOfValue] = useState(null)
    const [iseditmode, setisEditMode] = useState(false);

    useEffect(() => {
        if (props?.formvalue[0]['id'] == 0) setisChecktypeOfValue(0)
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
        props?.setFormvalue(rows);
    };

    const handleOnChange = (event, index, id) => {
        const { name, value, data } = event.target
        const list = [...props?.formvalue];
        list[index][name] = value;
        list[index]['id'] = id;
        props?.setFormvalue(list)
        if (name == 'state_id') {
            setStateLabel(data?.label)
        }
        else if (name == 'country_id') {
            setCountryLabel(data?.label)
        }
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

        <Col xs={12}>
            {props?.heading && <>
                <h4 className="sectionheader my-0 mt-2">
                    {props?.heading}
                </h4>
                <Col xs={12}><div className="graybottomborder my-2"></div></Col>            
            </>}
            <Table className="tabletyp1 ">
                <thead>
                    <tr>
                        <th></th>
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

                        console.log('data', data);
                        console.log('document_type++++',document_type);
                        return (
                            <>
                                <tr>
                                    <td>
                                        <div className="uploadandsavefields">
                                        <Form.Group className="mb-0">
                                            <FileUpload
                                                icon={false}
                                                required={(props?.required || (props?.citizen == 'indian' && (document_type == 'PAN Card' || document_type == 'Aadhaar Card'))) ? true : ''}
                                                validated={props?.validated}
                                                label={'Attachment'}
                                                id={'attachment'}
                                                name={'attachment'}
                                                value={attachment}
                                                onChange={(e) => handleOnfileChange(e, index, id)}
                                                document={{
                                                    file_name: data?.file_name,
                                                    file_full_path: data?.file_full_path,
                                                }}
                                            />
                                        </Form.Group>
                                        </div>
                                    </td>

                                    <td className="text-end">
                                    {permission && <div className={"tableactionbtngroup"}>

                                            {props?.iseditmode ?
                                                <>
                                                    {index == isChecktypeOfValue ?
                                                        <>
                                                            <Button onClick={() => showEditOrSaveBtn(index, 'update', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-awesome-save.svg"} /></Button>
                                                            <Button onClick={() => showEditOrSaveBtn(index, 'cross', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-cross.svg"} /></Button>
                                                        </>
                                                        : <><Button onClick={() => showEditOrSaveBtn(index, 'edit', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-pencil.svg"} /></Button></>}

                                                </>
                                                : ''}
                                        </div>}
                                    </td>
                                    {props?.formvalue.length !== 1 ? (
                                        <td> {props?.iseditmode ?
                                            (<div className={"tableactionbtngroup"}>
                                                <DeleteConfirm
                                                    key={id}
                                                    payload={{
                                                        id: id,
                                                        model: 'DocumentMaster',
                                                        message: `Document`
                                                    }}
                                                    reFetchData={reFetchData}
                                                    remove={removeDocumentField}
                                                    index={index}
                                                /></div>)
                                            : (
                                                <div className="text-end">
                                                    <Button type="button" variant="secondary" onClick={() => removeDocumentField(index)} className="add-btn" ><i className="fa-solid fa-minus"></i></Button>
                                                </div>
                                            )}
                                        </td>
                                    ) : (
                                        ""
                                    )}
                                    <td>
                                    {permission &&  <div className="text-end">
                                        <Button onClick={addAddressField} variant="light" className="add-btn" ><i className="fa-solid fa-plus"></i></Button>
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

export default DocumentFileMaster;
