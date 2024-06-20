
import React, { useCallback, useEffect, useState,useId } from "react";
import { Link, NavLink, useParams, select, useHistory, useNavigate } from "react-router-dom";

import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import { ToastContainer, toast } from 'react-toastify';
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import makeAnimated from "react-select/animated";
import { useFetch } from '../hook/useFetch';
import { getNormalHeaders } from '../utility/utility';

import moment from 'moment';
// import Pagination from 'react-js-pagination';
// import 'bootstrap/dist/css/bootstrap.min.css';

const animatedComponents = makeAnimated();
/**
<DatePicker required
type="date"
name="shareholders_Date_of_agreement"
value={formvalue?.shareholders_Date_of_agreement}
onChange={handleOnInputChange}
label='Date of Agreement' />
 *
 */
export const DatePicker = (props) => {
    console.log('props DatePicker'+props?.name, props);
    // const [startDate, setStartDate] = useState(new Date(date));
    
    let value = '';
    if(props?.value || props.defaultValue){
        value = props?.value || props.defaultValue
    }
    return (<>
        {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
        {props?.icon != false ? props?.required && <sup>*</sup> : ('')}
        <Form.Control type='date' {...props} value={value} />
        {props?.required && (<Form.Control.Feedback type="invalid">
            Please enter {props?.label}
        </Form.Control.Feedback>)}
    </>)
}

export const SelectFieldMulti = (props) => {
    console.log('props /SelectFieldMulti cp1', props);
    const extractValue = (arr, prop) => {
        let extractedValue = arr.map(item => item[prop]);
        return extractedValue;
    }

    const onChange = (e) => {
        const value = extractValue(e, 'value')
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = value;
        data['target']['data'] = e;
        props?.onChange(data)
    }
    let value = props?.value;
    console.log('typeof props?.value', typeof props?.value === 'string')
    if (typeof props?.value === 'string') {
        var convertarray = props?.value.split(",");
        convertarray = convertarray.map(function(str) {
            if(Number.isInteger(parseInt(str, 10))){
                return parseInt(str, 10);
            }else{
                return str;
            }
        });
        value = convertarray;
    }
    return (<>


        {props?.label && <Form.Label>{props?.label} </Form.Label>}
        {props?.required && (<sup>*</sup>)}
        <Select
            isMulti
            className="select2_filds"
            id={props?.name}
            controlId={props?.name}
            name={props?.name}
            options={props?.options}
            onChange={(e) => onChange(e)}
            value={props?.options && props?.options?.filter((option) => value && value.includes(option.value))}
            placeholder={props?.placeholder}
            // isOptionsDisabled={() => { return props?.readonly || false }}
            isDisabled={props?.readonly ? true : ''}
            required={props?.required}

        />


        {props?.required && (props?.validated === true && (props?.value == null || props?.value == "") ?
            <span className="error_show">
                Please select {props?.label}
            </span>
            : "")}

    </>)
}


export const DateTimePicker = (props) => {
    console.log('props', props);
    // const [startDate, setStartDate] = useState(new Date(date));

    return (<>
        {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
        {props?.icon != false ? props?.required && <sup>*</sup> : ('')}
        <Form.Control type='datetime-local' {...props} />
        {props?.required && (<Form.Control.Feedback type="invalid">
            Please enter {props?.label}
        </Form.Control.Feedback>)}
    </>)
}

/**
 * <FileUpload
    required={iseditmode ? '' : true}
    validated={validated}
    label={'Company Version'}
    id={'company_version'}
    name={'company_version'}
    onChange={(e) => handleOndirFileChange(e, formvalue?.company_version?.id)}
    document={{
        file_name: formvalue?.company_version[0]?.file_name,
        file_full_path: formvalue?.company_version[0]?.file_full_path,
    }}
/>
 */
export const FileUpload = (props) => {
    console.log('props FileUpload', props);
    let value = ''
    if(props?.document?.file_name || props?.value?.name){
        value = props?.value?.name || props?.document?.file_name && props?.document?.file_name?.split("_(eycs)")[0] + '.' + props?.document?.file_name?.split(".")[1]
    }
    return (<>
        {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
        {props?.icon != false ? props?.required && (<sup>*</sup>) : ('')}

        {/* <Form.Group className="mb-3 position-relative"> */}
        <Form.Group className="position-relative">
            <Form.Control required type="text" name="" placeholder={""} value={value} data-for={"filestip" + props?.id} data-tip={""} data-event='click focus' readOnly />

            <div className="inputsuccess-icon text-success" >
                <div className={"tableactionbtngroup"}>
                    {!props?.noupload && (<>
                        <Button className="tableactionbtn1 m-t-2 uploadbtn" htmlfor={props?.name}><img src={"/img/icons/Icon-material-file-upload.svg"} />
                            <Form.Control required={props?.document?.file_name ? '' : props?.required} type="file" name={props?.name} id={props?.name} onChange={props?.onChange} multiple={props?.multiple || ''} />
                            {props?.required && (<Form.Control.Feedback type="invalid">
                                Please select {props?.label}
                            </Form.Control.Feedback>)}
                        </Button>
                    </>)}
                    {props?.multiple == true ? (
                        props?.document && props?.document?.map((value, index) => {
                            console.log('document', value);
                            return (
                                <>
                                    <Button as={Link} to={value?.file_full_path} className={"tableactionbtn1 m-t-2 uploadbtn"} data-for={"downloadtip" + value?.file_name} data-tip={"Download " + value?.file_name} target="_blank" download>
                                        <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                                    </Button>
                                    <ReactTooltip class="secondary" id={"downloadtip" + value?.file_name} effect="solid" place="top" />
                                </>
                            )
                        })) : (
                        props?.document?.file_name && (
                            <>
                                <Button as={Link} to={props?.document?.file_full_path} className={"tableactionbtn1 m-t-2 uploadbtn"} data-for={"downloadtip" + props?.document?.file_name} data-tip={"Download " + props?.document?.file_name} target="_blank" download>
                                    <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                                </Button>
                                <ReactTooltip class="secondary" id={"downloadtip" + props?.document?.file_name} effect="solid" place="top" />
                            </>
                            ))}

                            {(props?.Button && !props?.noupload) && (
                        <>
                        <Button variant="secondary" className="add-btn ms-3" type="submit"><img className="" src={"/img/icons/Icon-awesome-save.svg"} onClick={props?.handleOnsavenoticeFile} /></Button>
                        </>


                    )}

                    {props?.sample_file && (
                        <>
                        <Button as={Link} to={props?.sample_file}  variant="secondary" data-for={"downloadtip"} data-tip={"Download sample file"} target="_blank" download>
                        {/* {"Sample file"} */}
                            <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                        </Button>
                        <ReactTooltip class="secondary" id={"downloadtip"} effect="solid" place="top" />
                        </>
                    )}
                </div>
            </div>
    </Form.Group >


    </>)
}
/**
 * <InputText
    label={'Key Considerations'}
    type="text"
    name="moa_key_considerations"
    value={formvalue?.moa_key_considerations}
    onChange={handleOnInputChange}
    placeholder={" "}
/>
 */
export const InputText = (props) => {
   
    return (<>
        {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
        {props?.icon != false ? props?.required && (<sup>*</sup>) : ('')}
        <Form.Control type='text' {...props} className={props?.className || 'alphanumeric'} />
        {props?.required && (<Form.Control.Feedback type="invalid">
            Please enter {props?.label}
        </Form.Control.Feedback>)}
    </>)
}


{/* <InputTextArea
    label={'Key Considerations'}
    type="text"
    name="moa_key_considerations"
    value={formvalue?.moa_key_considerations}
    onChange={handleOnInputChange}
    placeholder={" "}
/> */}
export const InputTextArea = (props) => {
    return (<>
        {props?.label && <Form.Label>{props?.label} </Form.Label>}
        {props?.required && <sup>*</sup>}
        <Form.Control as="textarea" rows={3}  {...props} className={props?.className || 'alphanumeric'} />
        {props?.required && (<Form.Control.Feedback type="invalid">
            Please enter {props?.label}
        </Form.Control.Feedback>)}
    </>)
}
/**
 * <YesNoChecked
            onClick={handleOnInputChange}
            label={'Whether Articles Entrenched'}
            values={formvalue?.aoa_whether_articles_entrenched}
            name="aoa_whether_articles_entrenched"
            id="aoa_whether_articles_entrenched"
            validated={validated}
            required
        />
        */
export const YesNoChecked = (props) => {
    const uid = useId();
    const handleonchange = (value) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = value;
        props?.onClick(data);
        // props?.onChange(data);
    }
    console.log('props YesNoChecked', props?.name);
    return (
        <>
            {props?.label && <Form.Label>{props?.label} </Form.Label>}
            {props?.required && (<sup>*</sup>)}
            <div className="justify-content-end mb-2">
                <ButtonGroup role="group" className="btn-grouptype2">
                    <input type="radio" class="btn-check" onChange={(e) => handleonchange('yes')} name={uid} id={uid + '1'} autocomplete="off" checked={props?.values == 'yes' ? true : ''} />
                    <Form.Label class="btn btn-light mb-0" for={uid + '1'}> {(!props?.option )? 'Yes' :(props?.option?.yes)} </Form.Label>

                    <input type="radio" class="btn-check" onChange={(e) => handleonchange('no')} name={uid} id={uid + '2'} autocomplete="off" checked={props?.values == 'no' ? true : ''} />
                    <Form.Label class="btn btn-light mb-0" for={uid + '2'}> {(!props?.option )? 'No' :(props?.option?.no)}  </Form.Label>
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

/**
 * <YesNoNaChecked
            onClick={handleOnInputChange}
            label={'Whether Articles Entrenched'}
            values={formvalue?.aoa_whether_articles_entrenched}
            name="aoa_whether_articles_entrenched"
            id="aoa_whether_articles_entrenched"
            validated={validated}
            required
        />
        */
export const YesNoNaChecked = (props) => {

    const handleonchange = (value) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = value;
        props?.onClick(data);
    }
    console.log('props YesNoNaChecked', props?.name);
    return (
        <>
            {props?.label && <Form.Label>{props?.label} </Form.Label>}
            {props?.required && (<sup>*</sup>)}
            <div className="justify-content-end mb-2">
                <ButtonGroup role="group" className="btn-grouptype2">
                    <input type="radio" class="btn-check" onChange={(e) => handleonchange('yes')} name={props?.id} id={props?.id + '1'} autocomplete="off" checked={props?.values == 'yes' ? true : ''} />
                    <Form.Label class="btn btn-light mb-0" for={props?.id + '1'}> Yes </Form.Label>

                    <input type="radio" class="btn-check" onChange={(e) => handleonchange('no')} name={props?.id} id={props?.id + '2'} autocomplete="off" checked={props?.values == 'no' ? true : ''} />
                    <Form.Label class="btn btn-light mb-0" for={props?.id + '2'}> No </Form.Label>

                    <input type="radio" class="btn-check" onChange={(e) => handleonchange('na')} name={props?.id} id={props?.id + '3'} autocomplete="off" checked={props?.values == 'na' ? true : ''} />
                    <Form.Label class="btn btn-light mb-0" for={props?.id + '3'}> NotApplicable </Form.Label>
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

export const AsyncSelectField = (props) => {

    const defaultOption = props.values ? props.values : '';
    const [inputLabel, setLabel] = useState('');
    const [Valuenew, setValuenew] = useState([]);

    const loadOptionsnew = (option_id) => {
        console.log('loadioptinnew');
        const token = sessionStorage.getItem("passportToken");
        return fetch(`/api/v1/commongenericmodel?model=${props?.ref_table}&fetch=${option_id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        ).then(res => res.json()).then((response) => {
            setValuenew(response)
        })
    }

    useEffect(() => {
        if (props.values) {
            loadOptionsnew(defaultOption)
        }
    }, [defaultOption]);


    const handleonchange = (e) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = e.value;
        console.log('target / akash', e)

        loadOptionsnew(e.value)
        props?.onChange(data)
    }
    const loadOptions = () => {
        const token = sessionStorage.getItem("passportToken");
        return fetch(`/api/v1/commongenericmodel?model=${props?.ref_table}&search_data=${inputLabel}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        ).then(res => res.json());
    };
    loadOptions();
    return (
        <>
            <Form.Label>{props?.label}</Form.Label>
            {props?.mandotory == true ? <sup>*</sup> : ''}

            <AsyncSelect
                closeMenuOnSelect={true}
                components={animatedComponents}
                cacheOptions
                defaultOptions
                getOptionLabel={e => e.label}
                getOptionValue={e => e.value}
                value={{ value: Valuenew.value, label: Valuenew.label }}
                loadOptions={loadOptions}
                onChange={handleonchange}
                onInputChange={(e) => setLabel(e)}

            />
            {/* <pre>Selected Value: {JSON.stringify(props || {}, null, 2)}</pre> */}
            {props?.errors && <span className="form-error">{props?.errors}</span>}
        </>
    )
}


/**
 *
 <SelectField
            required
            label={'Certificate of Incorporation'}
            name={'certificate_of_incorporation'}
            options={certificateofIncorporation}
            onChange={handleOnInputChange}
            value={formvalue?.certificate_of_incorporation}
            validated={validated}
        />
        */
export const SelectField = (props) => {
    console.log('props /SelectField cp1', props);
    const onChange = (e) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = e.label;
        data['target']['data'] = e;
        props?.onChange(data)
    }

    let readonly = props?.readonly;
   
    return (<>
        {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
        {props?.icon != false ? props?.required && (<sup>*</sup>) : ('')}

        <Select
            name={props?.name}
            id={props?.id}
            options={props?.options && props?.options}
            onChange={(e) => onChange(e)}
            value={props?.options && props?.options.filter(function (el) {
                return el.label == props?.value;
            })}
            isDisabled={readonly || ''}
            required={props?.required}
        />

        {props?.required && (props?.validated === true && (props?.value == null || props?.value == "") ?
            <span className="error_show">
                Please select {props?.label}
            </span>
            : "")}
    </>)
}

export const SelectValField = (props) => {
    console.log('props /SelectField', props);
    const onChange = (e) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = e.value;
        data['target']['data'] = e;
        props?.onChange(data)
    }
    return (<>

        {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
        {props?.icon != false ? props?.required && (<sup>*</sup>) : ('')}
        <Select
            name={props?.name}
            id={props?.id}
            options={props?.options}
            onChange={(e) => onChange(e)}
            value={props?.options && props?.options.filter(function (el) {
                return el.value == props?.value;
            })}
            required={props?.required}
            isDisabled={props?.readonly ?? false}

        />
        {props?.required && (props?.validated === true && (props?.value == null || props?.value == "") ?
            <span className="error_show">
                Please select {props?.label}
            </span>
            : "")}
    </>)
}
/*
<SearchData
            reFetchData={''}
        />*/
export const SearchData = (props) => {
    const onChangeonsearch = (value) => {
        props?.reFetchData(value)
    }

    return (<>

    <div className="d-flex justify-content-end lign-items-center">
        <Form.Group className="text-end inputtypesearch w-75">
            <Form.Control className="inputtypesearch" type="search" auditorname="" defaultValue={""} onChange={(e) => onChangeonsearch(e.target.value)} placeholder={"Search"} />
        </Form.Group>
    </div>

    </>)
}

<BackButton
// url={''}
/>
export const BackButton = (props) => {
    const navigate = useNavigate();
    const url = props?.url || -1;
    return (<>
        <Button variant="light" className="add-btn" onClick={() => navigate(url)}><i className="fa-solid fa-angle-left"></i></Button></>)
}

export const DateTimeVenue = (props) => {
    let { data: { getMeetingDetails, chairperson }, loading, error, reFetchData } = useFetch(`/api/v1/pre_meeting/get_DateTimeVenueDetails/${props?.meeting_id}`);

    let meeting_start_datetime = getMeetingDetails?.meeting_start_time;
    let meeting_start_date_time = meeting_start_datetime ? meeting_start_datetime.split('T') : '';
    let meeting_start_date = meeting_start_date_time ? moment(meeting_start_date_time[0]).format('DD-MM-YYYY') : '';
    let meeting_start_time = meeting_start_date_time ? meeting_start_date_time[1] : '';

    return (<>
        <Col xs={12}>
            <div className="innercontainer bg-gray-200 sectionheaderttl mb-3 p-2">
                <Row>

                    <Col xs={3}>
                        <div className="innercontainerdatasecrion">
                            <div className="innercontainerdatasecrionicon">
                                <img src={"/img/icons/Icons-Actions-ic_event.svg"} />
                            </div>
                            <div className="innercontainerdatasecriondata">
                                <Row>
                                    <Col xs={12}>
                                        <h4><strong>Date : </strong>{meeting_start_date}</h4>
                                    </Col>
                                    <Col xs={12}>
                                        <h4><strong>Time : </strong>{meeting_start_time}</h4>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>

                    <Col xs={5}>
                        <div className="innercontainerdatasecrion">
                            <div className="innercontainerdatasecrionicon">
                                <img src={"/img/icons/Icon-material-location-on.svg"} />
                            </div>
                            <div className="innercontainerdatasecriondata">
                                <Row>
                                    <Col xs={12}>
                                        <h4><strong>Venue : </strong>
                                            {getMeetingDetails?.meeting_address?.address},
                                            {' ' + getMeetingDetails?.meeting_address?.city},
                                            {' ' + getMeetingDetails?.meeting_address?.state?.name},
                                            {' ' + getMeetingDetails?.meeting_address?.country?.name}
                                        </h4>
                                    </Col>
                                    {getMeetingDetails?.meeting_heppening_type == 2 ? <Col xs={12}>
                                        <h4><strong>VC link : </strong>
                                            {/* {getMeetingDetails?.meeting_address?.address},
                                            {' ' + getMeetingDetails?.meeting_address?.city},
                                            {' ' + getMeetingDetails?.meeting_address?.state?.name},
                                            {' ' + getMeetingDetails?.meeting_address?.country?.name} */}
                                            {/* <Link>{' ' + getMeetingDetails?.meeting_msteamlink}</Link> */}
                                            <a href={' ' + getMeetingDetails?.meeting_msteamlink}  target="_blank"> Video Conference Link</a>
                                        </h4>
                                    </Col> : ''}

                                </Row>
                            </div>
                        </div>
                    </Col>

                    <Col xs={4}>
                        <div className="innercontainerdatasecrion">
                            <div className="innercontainerdatasecrionicon">
                                <img src={"/img/icons/Icon-ionic-md-person.svg"} />
                            </div>
                            <div className="innercontainerdatasecriondata">
                                <Row>
                                    {/* <Col xs={12}> */}
                                    {/* <Form.Group className="mb-0 inputtypesearch">
                                        <Form.Control
                                            type="search"
                                            defaultValue={''}
                                            placeholder={
                                                "Type Here"
                                            }
                                        /> */}
                                    {/* <AsyncSelects
                                        className='inputtypesearch'
                                        onChange={(e) => setChairperson(e.target.value)}
                                        ref_table={'CompanyDirKmpProf'}
                                        label={'Reporting person'}
                                        name={'chairperson'}
                                        errors={''}
                                        mandotory={true}
                                        required
                                    /> */}
                                    {/* </Form.Group> */}
                                    {/* </Col> */}
                                    <Col xs={12} className={"mt-1"}>
                                        {chairperson}
                                    </Col>
                                    <Col xs={10}>
                                        <Form.Label className="m-0">Chairperson </Form.Label>
                                    </Col>
                                    {/* <Col xs={2}>
                                        <div className="text-end">
                                            <Button variant="light" className="add-btn v-small-btn"><img src={"/img/icons/Icon-metro-pencil.svg"} /></Button>
                                        </div>
                                    </Col> */}
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    </>)
}
export const Checkbox = (props) => {
    console.log('Checkbox /Checkbox', props)
    const [value, setvalue] = useState(props?.value);
    
    const onClickCheckbox = (value) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = value;
        setvalue(value.toString())
        props?.onChange(data);
    }
    const uid = useId();

    return (<>
        <Form.Check id={uid} type="checkbox" label={props?.labelonCheck || ''} onClick={(e) => onClickCheckbox(e.target.checked)} name={props?.name} checked={value == 'true' ? true : false} className="me-2" />
        {props?.label && <h4 class="sectionheader mb-0">{props?.label}</h4>
        }
        {props?.required && (<sup>*</sup>)}

        {props?.required && (props?.validated === true && (props?.value == null || props?.value == "") ?
            <span className="error_show">
                Please select {props?.label}
            </span>
            : "")}
    </>)
}


export const Paginations = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [orderBy, setOrderBy] = useState('id');
    const [orderDirection, setOrderDirection] = useState('asc');

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    return (<>
       <div className="pagination-container d-flex justify-content-center">
        {/* <Pagination
          activePage={currentPage}
          itemsCountPerPage={10}
          totalItemsCount={totalPages * 10}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        /> */}
      </div>
    </>)
}

