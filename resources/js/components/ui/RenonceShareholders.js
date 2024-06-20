
import { Link, NavLink, useParams, select, useHistory, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import Select from 'react-select'
import { auditortypes, auditorcategory, auditortype, auditorappointmentat, typeofaddress, identfiertype, lpersontypeofaddress, persontypeofkmpaddress } from "../constants/defaualtvalues";
import { SelectField, InputText, SelectValField, FileUpload, YesNoChecked, DatePicker } from '../ui/template';

import { DeleteConfirm } from '../hook/useConfirm';
import { getNormalHeaders } from '../utility/utility';
import { persontypeofaddress, optionexercised, shareholdercategory, nationalitylistSCH } from "../constants/defaualtvalues";
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
        option_exercised: '2'
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

    const handleOnChange = (event, index, id) => {
        const { name, value, data, files } = event.target
        const list = [...formvalues];
        if (name == 'attachment') {
            list[index][name] = files[0];
        } else if (name == 'option_exercised' && value == 1) {
            list[index][name] = value;
            handleRemarkToggle(index);
        } else {
            list[index][name] = value;
        }
        console.log('first /list', list)
        if(list?.length != 0){
            const total = sumArray(pluck(list,'no_of_shares'))
            console.log('first sumArray', total)
            const no_of_shares = +props?.AgendaRequestRightIssueUser?.no_of_be_offered
            if (no_of_shares && no_of_shares > total) {
                toast['error']('number of share must be lees then own shares');
                return false;
            }
        }
        setformvalues(list);
        onChange(list)
    }

    useEffect(() => {
        let value = props?.value;
        if (value) {
            if (typeof value === 'string') {
                value = JSON.parse(value);
            }
            setformvalues(value);
        }
    }, [props?.value])

    const [remarktoggle, setRemarkToggle] = useState(null);
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
                {'Details of Renonce Shareholders '}</h4>
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
                        <th>Shares are renounced in favour</th>
                        <th>No of shares</th>
                        <th>Shareholder </th>
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
                                            label={'Shares are renounced in favour'}
                                            name={'option_exercised'}
                                            options={[
                                                { label: "Other Shareholder", value: '1' },
                                                { label: "Existing Shareholder", value: '2' }
                                            ]}
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
                                    {data?.option_exercised == 1 ? (<>
                                        <td className="text-center w-200px" >
                                            <div className={"tableactionbtngroup text-nowrap"}>
                                                <Button className="tableactionbtn1" onClick={() => handleRemarkToggle(index)} data-for="remarkTip" data-tip="Remark"><img src="/img/icons/click.svg" /></Button>
                                                <ReactTooltip id="remarkTip" effect="solid" place="top" />
                                            </div>
                                        </td>
                                    </>) : (<>
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
                                                        // icon={false}
                                                        label={'Name'}
                                                        type="text"
                                                        name="renonce_name"
                                                        value={data?.renonce_name}
                                                        onChange={(e) => handleOnChange(e, index)}
                                                        placeholder={" "}
                                                        required
                                                    />
                                                    <InputText
                                                        // icon={false}
                                                        label={'Email'}
                                                        className="text"
                                                        name="renonce_email"
                                                        value={data?.renonce_email}
                                                        onChange={(e) => handleOnChange(e, index)}
                                                        placeholder={" "}
                                                        required
                                                    />
                                                    <InputText
                                                        // icon={false}
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
                                                {/* <Row>
                                                    <Col xs={4}>
                                                        <Form.Group className="mb-3 position-relative">
                                                            <Form.Label>Name <sup>*</sup> </Form.Label>
                                                            <Form.Control required type="text" className="alphasp" name="name" defaultValue={data.name} onChange={handleOnChange} placeholder={"Enter Name of holder"} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please enter Name
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>

                                                    <SelectValField
                                                        required
                                                        label={'Category'}
                                                        name={'category'}
                                                        options={shareholdercategory}
                                                        onChange={handleOnChange}
                                                        value={data?.category}
                                                        validated={validated}
                                                    />

                                                        <Col xs={4}>
                                                            <Form.Group className="mb-3 position-relative">
                                                                <Form.Label>Other Details </Form.Label>
                                                                <Form.Control type="text" name="other_shareholdercategory" defaultValue={data.other_shareholdercategory} onChange={handleOnChange} placeholder={""} />
                                                            </Form.Group>
                                                        </Col>
                                                        <SelectValField
                                                            required
                                                            label={'Select Nationality'}
                                                            name={'nationality'}
                                                            options={nationalitylistSCH}
                                                            onChange={handleOnChange}
                                                            value={data?.nationality}
                                                            validated={validated}
                                                        />
                                                    <Col xs={4}>
                                                        <Form.Group className="mb-3 position-relative">
                                                            <Form.Label>CIN / LLPIN / Registration Number <sup>*</sup> </Form.Label>
                                                            <Form.Control required type="text" className="alphanumeric" pattern={(data?.scrtyhldr_nationality == 101) ? '[LUu]{1}[0-9]{5}[A-Za-z]{2}[0-9]{4}[A-Za-z]{3}[0-9]{6}' : false} name="cin_llpin_reg_number" defaultValue={data.cin_llpin_reg_number} onChange={handleOnChange} placeholder={""} />
                                                            {/* <div className="inputshield-icon icon-start" ><img src={"/img/icons/Icons-Actions-verified_user.svg"} /></div>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please enter CIN / LLPIN / Registration Number
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xs={4}>
                                                        <Form.Group className="mb-3 position-relative">
                                                            <Form.Label>Email Address <sup>*</sup> </Form.Label>
                                                            <Form.Control required type="email" name="email_address" defaultValue={data.email_address} onChange={handleOnChange} placeholder={"Enter Email address"} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please enter valid email id
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xs={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Contact Number <sup>*</sup> </Form.Label>
                                                            <Row>
                                                                <Col xs={3}>
                                                                    <Form.Control required type="text" className="numeric" maxLength="5" name="country_code" defaultValue={data.country_code} onChange={handleOnChange} placeholder={""} />
                                                                </Col>
                                                                <Col xs={9}>
                                                                    <Form.Control required type="text" className="numeric" maxLength="10" name="mobile_no" defaultValue={data.mobile_no} onChange={handleOnChange} placeholder={"000000000"} />
                                                                </Col>
                                                            </Row>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please enter valid contact no
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>

                                                    {/* <Col xs={4}>
                <Form.Group className="mb-3">
                  <Form.Label>CIN/ Reg No. <sup>*</sup> </Form.Label>
                  <Form.Control required type="text" name="cin_regno" defaultValue={data.cin_regno} onChange={handleOnChange} placeholder={""} />
                </Form.Group>
              </Col>

                                                    <Col xs={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Unique Identification Number <sup>*</sup> </Form.Label>
                                                            <Form.Control required type="text" name="unique_identification_number" defaultValue={data.unique_identification_number} onChange={handleOnChange} placeholder={"Type here"} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please enter valid UIN no
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>PAN No. <sup>*</sup> </Form.Label>
                                                            <Form.Control required type="text" class="pan_no" name="pan_no" defaultValue={data.pan_no} onChange={handleOnChange} placeholder={"Type here"}
                                                                pattern={'[A-Z]{5}[0-9]{4}[A-Z]{1}'}
                                                                maxLength='10'
                                                                mLength='10'
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please enter valid PAN no
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Occupation <sup>*</sup> </Form.Label>
                                                            <Form.Control required type="text" name="occupation" defaultValue={data.occupation} onChange={handleOnChange} placeholder={""} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please enter Occupation
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Father's/ Mother's/ Spouse's Name <sup>*</sup> </Form.Label>
                                                            <Form.Control required type="text" class="alpha" name="relative_name" defaultValue={data.relative_name} onChange={handleOnChange} placeholder={"Type here"} />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please enter Status
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row> */}
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
