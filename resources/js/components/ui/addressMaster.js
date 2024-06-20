

import React, { useCallback, useEffect, useState,useId } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import Select from 'react-select'
import { auditortypes, auditorcategory, auditortype, auditorappointmentat, typeofaddress, identfiertype, lpersontypeofaddress, persontypeofkmpaddress } from "../constants/defaualtvalues";
import { SelectField, InputText, FileUpload, DatePicker ,Checkbox} from '../ui/index';

import { DeleteConfirm } from '../hook/useConfirm';
import { getNormalHeaders,hasPermission } from '../utility/utility';
import { persontypeofaddress } from "../constants/defaualtvalues";
import AsyncSelects from '../utility/select_field/selectSearchNew';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddressMaster = (props) => {
    const permission = hasPermission();
    const id = useId();
    console.log('AddressMaster', props)
    const [IsLoading, setIsLoading] = useState(true);
    const [statelabel, setStateLabel] = useState('');
    const [countrylabel, setCountryLabel] = useState('');
    const [isChecktypeOfValue, setisChecktypeOfValue] = useState(null)
    useEffect(() => {
        // if (props?.formvalue.length != 0 && props?.formvalue[0]['id'] == 0) setisChecktypeOfValue(0)
    }, [props?.formvalue]);

    const addAddressField = () => {
        props?.setFormvalue([...props?.formvalue, props?.initialstate]);
        const lastid = props?.formvalue.length;
        console.log('lastid', lastid);
        setisChecktypeOfValue(lastid);
    };

    const removeDocumentField = (index) => {
        const rows = [...props?.formvalue];
        rows.splice(index, 1);
        props?.setFormvalue(rows);
    };

    const handleOnRemindeInputChange = (event, index, id) => {
        const { name, value, data } = event.target
        const list = [...props?.formvalue];
        list[index][name] = value;
        props?.setFormvalue(list)
        
    }


    const saveAddress = ((type, data) => {
        const formData = new FormData();

        try {
            const headerPyalod = getNormalHeaders();
            setIsLoading(true);
            data['model'] = props?.model;
            data['ref_id'] = props?.ref_id;
            data['filed_name'] = props?.filed_name;
            data['id'] = data?.id;
            const response = axios.post(`/api/v1/updateaddress/${props?.model}`, data, headerPyalod)
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
                {props?.heading || 'Address'}</h4>
        </Col>
        {!props?.addbutton &&
            <Col xs={4}>
                <div className="text-end">
                {permission && <Button onClick={addAddressField} variant="light" className="add-btn" ><i className="fa-solid fa-plus"></i></Button>}
                </div>
            </Col>}

        <Col xs={12}><div className="graybottomborder my-2"></div></Col>

        <Col xs={12}>
            <Table className="tabletyp1 ">
                <thead>
                    <tr>
                        <th>Type Of Address</th>
                        {props?.address && <th>Address</th>}
                        <th>Country</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Pin Code</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props?.formvalue && props?.formvalue?.map((data, index) => {
                        const {
                            id,
                            type_of_address,
                            address,
                            country_id,
                            country,
                            state_id,
                            state,
                            city,
                            pin_code,
                        } = data;
                        console.log('data form', data);
                        console.log('state+++', data?.address_checked);
                        return (
                            <>
                                <tr>
                                    <td>
                                        <Form.Group className="mb-0">
                                            <>
                                                {data?.address_checked &&
                                                    <Checkbox
                                                        name="address_checked"
                                                        labelonCheck="same as above address"
                                                        value={data?.address_checked}
                                                        onChange={(e) => props?.replaceonclick(e)}
                                                        placeholder={""}
                                                    />}
                                                {props?.iseditmode && index != isChecktypeOfValue ?
                                                    type_of_address
                                                    :
                                                    (<>
                                                        <SelectField
                                                            key={id}
                                                            required={props?.notreq ? '' : true}
                                                            readonly={props?.typeofaddressreadonly ? true : ''}
                                                            icon={false}
                                                            label={'type of address'}
                                                            name={'type_of_address'}
                                                            options={(props?.limit) ? lpersontypeofaddress : (props?.kmp) ? persontypeofkmpaddress : persontypeofaddress}
                                                            onChange={(e) => handleOnChange(e, index, id)}
                                                            value={type_of_address}
                                                            validated={props?.validated}
                                                        />

                                                    </>)}
                                            </>
                                        </Form.Group>
                                    </td>
                                    {props?.address && <td>
                                        <Form.Group className="mb-0">
                                            <>
                                                {props?.iseditmode && index != isChecktypeOfValue ?
                                                    (address)
                                                    :
                                                    (<>
                                                        <InputText
                                                        key={id}

                                                            icon={false}
                                                            label={'Address'}
                                                            type="text"
                                                            name="address"
                                                            value={address}
                                                            className="address"
                                                            onChange={(e) => handleOnChange(e, index)}
                                                            placeholder={" "}
                                                        />
                                                    </>)}
                                            </>
                                        </Form.Group>
                                    </td>}
                                    <td>
                                        <Form.Group className="mb-0">
                                            <>
                                                {props?.iseditmode && index != isChecktypeOfValue ?
                                                    (<>{country?.name}</>)
                                                    :
                                                    (<>
                                                        <AsyncSelects
                                                        key={id}

                                                            icon={false}
                                                            onChange={(e) => handleOnChange(e, index)}
                                                            ref_table={'Countries'}
                                                            value={country_id || ""}
                                                            values={country_id || ""}
                                                            name={'country_id'}
                                                            errors={''}
                                                            required={(props?.required || type_of_address == 'Permanent Address' || type_of_address == 'Present Address') ? true : ''}
                                                        />


                                                    </>)}
                                            </>
                                        </Form.Group>
                                    </td>

                                    <td>
                                        <Form.Group className="mb-0">
                                            <>
                                                {props?.iseditmode && index != isChecktypeOfValue ?
                                                    (<>{state?.name}</>)
                                                    :
                                                    (<>
                                                        <AsyncSelects
                                                        key={id}

                                                            icon={false}
                                                            onChange={(e) => handleOnChange(e, index)}
                                                            ref_table={'States'}
                                                            value={state_id || ""}
                                                            values={state_id || ""}
                                                            name={'state_id'}
                                                            wherehas={{ 'country_id': country_id }}
                                                            required={(props?.required || type_of_address == 'Permanent Address' || type_of_address == 'Present Address') ? true : ''}
                                                        />

                                                    </>)}
                                            </>
                                        </Form.Group>
                                    </td>

                                    <td>
                                        <Form.Group className="mb-0">
                                            <>
                                                {props?.iseditmode && index != isChecktypeOfValue ?
                                                    (city)
                                                    :
                                                    (<>
                                                        <InputText
                                                        key={id}

                                                            icon={false}
                                                            label={'City'}
                                                            type="text"
                                                            name="city"
                                                            value={city}
                                                            onChange={(e) => handleOnChange(e, index)}
                                                            placeholder={" "}
                                                            required={(props?.required || type_of_address == 'Permanent Address' || type_of_address == 'Present Address') ? true : ''}
                                                        />
                                                    </>)}
                                            </>
                                        </Form.Group>
                                    </td>

                                    <td>
                                        <Form.Group className="mb-0">

                                            {props?.iseditmode && index != isChecktypeOfValue ?
                                                (pin_code)
                                                :
                                                (<>
                                                    <InputText
                                                        icon={false}
                                                        label={'Pin Code'}
                                                        type="text"
                                                        name="pin_code"
                                                        className="numeric"
                                                        value={pin_code}
                                                        onChange={(e) => handleOnChange(e, index)}
                                                        placeholder={" "}
                                                        required={(props?.required || type_of_address == 'Permanent Address' || type_of_address == 'Present Address') ? true : ''}
                                                    />

                                                </>)}
                                        </Form.Group>
                                    </td>
                                    <td className="text-end">
                                    {permission && <div className={"tableactionbtngroup"}>

                                            {(props?.iseditmode && id) ?
                                                <>
                                                    {index == isChecktypeOfValue ?
                                                        <>
                                                            <Button onClick={() => showEditOrSaveBtn(index, 'update', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-awesome-save.svg"} /></Button>
                                                            <Button onClick={() => showEditOrSaveBtn(index, 'cross', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-cross.svg"} /></Button>
                                                        </>
                                                        : <><Button onClick={() => showEditOrSaveBtn(index, 'edit', id, data)} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-pencil.svg"} /></Button></>}

                                                </>
                                                : ''}
                                    {props?.formvalue.length !== 1 ? (
                                        <>{(props?.iseditmode && id) ?
                                            (<div className={"tableactionbtngroup"}>
                                                <DeleteConfirm
                                                    key={id}
                                                    payload={{
                                                        id: id,
                                                        model: 'AddressMaster',
                                                        message: `Address Master`
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
                                    </>) : (
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

export default AddressMaster;
