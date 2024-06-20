
import { Link, NavLink, useParams, select, useHistory, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import Select from 'react-select'
import { auditortypes, auditorcategory, auditortype, auditorappointmentat, typeofaddress, identfiertype, lpersontypeofaddress, persontypeofkmpaddress } from "../constants/defaualtvalues";
import { SelectField, InputText, SelectValField, FileUpload, YesNoChecked, DatePicker } from '../ui/template';

import { DeleteConfirm } from '../hook/useConfirm';
import { getNormalHeaders } from '../utility/utility';
import { persontypeofaddress, optionexercised, Partoptionexercised,shareholdercategory, nationalitylistSCH } from "../constants/defaualtvalues";
import AsyncSelects from '../utility/select_field/selectSearch';
import ReactTooltip from 'react-tooltip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RenonceShareholders = (props) => {
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();

    console.log('AddressMaster', props)
    const [IsLoading, setIsLoading] = useState(true);
    const [validated, setvalidated] = useState(true);
    const [isChecktypeOfValue, setisChecktypeOfValue] = useState(null)
    const initialstate = {
        option_exercised: ''
    };
    const [formvalues, setformvalues] = useState([initialstate])
    const onChange = (value) => {
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
    const [remarktoggle, setRemarkToggle] = useState(null);

    const handleOnChange = (event, index, id) => {
        const { name, value, data, files } = event.target
        const list = [...formvalues];
        if (name == 'renonce_to_other') {
            list[index][name] = value;
            if(value == 'no'){
                handleRemarkToggle(index);
            }else{
                setRemarkToggle(null);
            }
        } else {
            list[index][name] = value;
        }
        if(list?.length != 0){
            const total = sumArray(pluck(list,'no_of_shares'))
            console.log('first sumArray', total)
            const accept_shares = +props?.companyShareholderDetails?.accept_shares;
            console.log('first sumArray cp1', accept_shares)
            console.log('first sumArray cp2', props?.AgendaRequestRightIssueUser?.no_of_be_offered)
            const no_of_shares = +props?.AgendaRequestRightIssueUser?.no_of_be_offered - accept_shares;

            if (no_of_shares && no_of_shares < total) {
                toast['error']('number of share must be lees then own shares');
                return false;
            }
        }
        setformvalues(list);
        onChange(list)
    }

    useEffect(() => {
        let value = props?.value;
        if (value && value !== 'null') {
            if (typeof value === 'string') {
                value = JSON.parse(value);
            }
            setformvalues(value);
        }
    }, [props?.value])

    const [divisionofisstoggle, setDivisionofIssToggle] = useState(null);

    let handleRemarkToggle = (id) => {
        if (remarktoggle === id) {
            setRemarkToggle(null)(!remarktoggle);
            return false;
        }
        setRemarkToggle(id);
    };

    let handleDivisionofIssToggle = (id) => {
        if (divisionofisstoggle === id) {
            setDivisionofIssToggle(null)(!divisionofisstoggle);
            return false;
        }
        setDivisionofIssToggle(id);
    };

    return (<>
        <Col xs={8}>
            <h4 className="sectionheader my-0 mt-2">
                {'Details of Part Shareholders '}</h4>
        </Col>

        <Col xs={4}>
            <div className="text-end">
                <Button onClick={addAddressField} variant="light" className="add-btn" ><i className="fa-solid fa-plus"></i></Button>
            </div>
        </Col>

        <Col xs={12}><div className="graybottomborder my-2"></div></Col>

        <Col xs={12}>
            <Table responsive className="tabletyp1 ">
                <thead>
                    <tr>
                        <th>Option Exercised</th>
                        <th>No of shares</th>
                        <th> </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {formvalues && formvalues?.map((data, index) => {
                        return (
                            <>
                                <tr>
                                    <td>
                                        <SelectValField
                                            icon={false}
                                            className={'w-200px'}
                                            label={'Option Exercised'}
                                            name={'option_exercised'}
                                            options={Partoptionexercised}
                                            onChange={(e) => handleOnChange(e, index)}
                                            value={data?.option_exercised}
                                            validated={validated}
                                        />
                                    </td>
                                    <td>
                                    <InputText
                                        icon={false}
                                        className={'w-200px'}
                                        label={'No of shares'}
                                        name={'no_of_shares'}
                                        onChange={(e) => handleOnChange(e, index)}
                                        value={data?.no_of_shares}
                                    />
                                    </td>
                                    {data?.option_exercised == 5 &&
                                    <td>
                                    <YesNoChecked
                                        icon={false}
                                        onChange={(e) => handleOnChange(e, index)}
                                        label={'Renonce to Other'}
                                        value={data?.renonce_to_other}
                                        name="renonce_to_other"
                                        id="renonce_to_othersasas"
                                        required
                                        option={{yes:'To Existing',no:'To Other'}}
                                    />
                                    </td>}
                                    {data?.option_exercised == 5 && data?.renonce_to_other =='no' && (<>
                                        <td className="text-center w-200px" >
                                            <div className={"tableactionbtngroup text-nowrap"}>
                                                <Button className="tableactionbtn1" onClick={() => handleRemarkToggle(index)} data-for="remarkTip" data-tip="Shareholders Details"><img src="/img/icons/click.svg" /></Button>
                                                <ReactTooltip id="remarkTip" effect="solid" place="top" />
                                            </div>
                                        </td>
                                    </>)}

                                    {data?.option_exercised == 5 && data?.renonce_to_other =='yes' && (<>
                                        <td className="text-center w-200px" >
                                        <SelectValField
                                            icon={false}
                                            className={'w-200px'}
                                            required
                                            label={'Shareholders'}
                                            name={'renonce_shareholders'}
                                            options={props?.Shareholders}
                                            value={data?.renonce_shareholders}
                                            onChange={(e) => handleOnChange(e, index)}
                                            validated={validated}
                                        />
                                        </td>
                                    </>)}
                                    <td>
                                        {formvalues.length !== 1 && (
                                            <div className="text-end">
                                                <Button type="button" variant="secondary" onClick={() => removeDocumentField(index)} className="add-btn" ><i className="fa-solid fa-minus"></i></Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                                {index === remarktoggle && (
                                    <tr tableaccordenbody={index} className="activetableaccordenbody">
                                        <td colSpan={50}>
                                            <div className="tableactionbox">
                                                <Row>
                                                    <InputText
                                                        label={'Name'}
                                                        type="text"
                                                        name="renonce_name"
                                                        value={data?.renonce_name}
                                                        onChange={(e) => handleOnChange(e, index)}
                                                        placeholder={" "}
                                                        required
                                                    />
                                                    <InputText
                                                        label={'Email'}
                                                        className="text"
                                                        name="renonce_email"
                                                        value={data?.renonce_email}
                                                        onChange={(e) => handleOnChange(e, index)}
                                                        placeholder={" "}
                                                        required
                                                    />
                                                    <InputText
                                                        label={'PAN No.'}
                                                        type="text"
                                                        name="renonce_pan_no"
                                                        value={data?.renonce_pan_no}
                                                        onChange={(e) => handleOnChange(e, index)}
                                                        pattern={'[A-Z]{5}[0-9]{4}[A-Z]{1}'}
                                                        maxLength='10'
                                                        mLength='10'
                                                        required
                                                    />
                                                    </Row>
                                            </div>
                                        </td>
                                    </tr>)}
                            </>
                        )
                    })}
                </tbody>
            </Table>
        </Col>
    </>)
}

export default RenonceShareholders;
