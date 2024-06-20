

import React, { useCallback, useEffect, useState,useId } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import Select from 'react-select'
import { auditortypes, auditorcategory, auditortype, auditorappointmentat, typeofaddress, identfiertype, lpersontypeofaddress, persontypeofkmpaddress } from "../constants/defaualtvalues";
import { SelectField, InputText, FileUpload, DatePicker ,Checkbox} from '../ui/index';

import { DeleteConfirm } from '../hook/useConfirm';
import { getNormalHeaders } from '../utility/utility';
import { persontypeofaddress } from "../constants/defaualtvalues";
import AsyncSelects from '../utility/select_field/selectSearchNew';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddressMaster = ({setFormvalue,formvalue,...props}) => {
    const [isChecktypeOfValue, setisChecktypeOfValue] = useState(null)
console.log('AddressMaster', setFormvalue,formvalue,props)
    // const [formvalue, setFormvalue] = useState([{
    //     id: 0,
    //     type_of_address: 'Permanent Address',
    //     address: "",
    //     country: "",
    //     state: "",
    //     city: "",
    //     pincode: "",
    //     countryname: "",
    //     statename: "",
    //     address_checked: "false",

    // },
    // {
    //     id: 0,
    //     type_of_address: 'Present Address',
    //     address: "",
    //     country: "",
    //     state: "",
    //     city: "",
    //     pincode: "",
    //     countryname: "",
    //     statename: "",
    //     address_checked: "true",
    // }
    // ]);
    
    const handleOnChange = (event, index, id) => {
        const { name, value, data } = event.target
        const list = [...formvalue];
        list[index][name] = value;
        // list[index]['id'] = id;
        setFormvalue(list)
        if (name == 'state_id') {
            setStateLabel(data?.label)
        }
        else if (name == 'country_id') {
            setCountryLabel(data?.label)
        }
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
                    <Button onClick={addAddressField} variant="light" className="add-btn" ><i className="fa-solid fa-plus"></i></Button>
                </div>
            </Col>}

        <Col xs={12}><div className="graybottomborder my-2"></div></Col>

        <Col xs={12}>
            <Table className="tabletyp1 ">
                <thead>
                    <tr>
                        <th>Type Of Address</th>
                        {props?.address && <th>Address Line I</th>}
                        {props?.address_two && <th>Address Line II</th>}
                        <th>Country</th>
                        <th>State</th>
                        {props?.district && <th>District</th>}                        
                        <th>City</th>
                        <th>Pin Code</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props?.initialstate && props?.initialstate?.map((data, index) => {
                        const {
                            type_of_address,
                        } = data;
                        const {
                            id,
                            address,
                            address_two,
                            country_id,
                            country,
                            state_id,
                            state,
                            district,
                            city,
                            pin_code,
                        } = formvalue[index] !== undefined ? formvalue[index] : data;

                        console.log('data form', formvalue[index]);
                        console.log('state+++', data?.address_checked);
                        return (
                            <>
                            {type_of_address =='Present Address' && (<>
                            <tr>
                            <td>
                            <Checkbox
                                name="address_checked"
                                labelonCheck="same as above address"
                                value={data?.address_checked}
                                onChange={(e) => props?.replaceonclick(e)}
                                placeholder={""}
                            />
                           </td> </tr>
                            </>)}
                                <tr>
                                    <td>
                                        <Form.Group className="mb-0">
                                           {type_of_address}
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
                                    {props?.address_two && <td>
                                        <Form.Group className="mb-0">
                                            <>
                                                {props?.iseditmode && index != isChecktypeOfValue ?
                                                    (address_two)
                                                    :
                                                    (<>
                                                        <InputText
                                                        key={id}

                                                            icon={false}
                                                            label={'Address'}
                                                            type="text"
                                                            name="address_two"
                                                            value={address_two}
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

                                    {props?.district && <td>
                                        <Form.Group className="mb-0">
                                            <>
                                                {props?.iseditmode && index != isChecktypeOfValue ?
                                                    (district)
                                                    :
                                                    (<>
                                                        <InputText
                                                        key={id}

                                                            icon={false}
                                                            label={'District'}
                                                            type="text"
                                                            name="district"
                                                            value={district}
                                                            onChange={(e) => handleOnChange(e, index)}
                                                            placeholder={" "}
                                                            required={(props?.required || type_of_address == 'Permanent Address' || type_of_address == 'Present Address') ? true : ''}
                                                        />
                                                    </>)}
                                            </>
                                        </Form.Group>
                                    </td>}
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
