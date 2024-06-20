
import React, { useCallback, useEffect, useState, useRef, useId } from "react";
import { Link, NavLink, useParams, select, useHistory, useNavigate } from "react-router-dom";

import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, FormControl ,Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import { ToastContainer, toast } from 'react-toastify';
import Select from "react-select";
import AsyncSelectsNew from '../utility/select_field/selectSearchNew';
import AsyncSelectss from 'react-select/async';
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import { getNormalHeaders } from '../utility/utility';
import { useFetch } from '../hook/useFetch';
import { typeofsecurityforissuecert, optionexercised } from '../constants/defaualtvalues';
import { ToWords } from 'to-words';
import Editor from "../ui/editor";
import Autocomplete from "react-autocomplete";

import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import LoadingSpinner from "../loader/loader";
// import { useAppContext } from '../AppContext'
import { DeleteConfirm } from '../hook/useConfirm';
const useAppContext = [];
import TableGenerate from './tableGenerates';

import { Tablebox } from './table/index';
// import RightIssueTable from '../requestagendaservice/rightissue/rightissuetable';
import SelectSearchMultiNew from '../utility/select_field/selectSearchMultiNew';
import SelectSearchMultiCreate from '../utility/select_field/selectSearchMultiCreate';
import SelectSearchNew from '../utility/select_field/selectSearchNew';
import SelectSearchCreateNew from '../utility/select_field/selectSearchCreateNew';
// import AutoComplete from '../utility/select_field/autocomplete';

/*
<DatePicker required
type="date"
name="shareholders_Date_of_agreement"
value={formvalue?.shareholders_Date_of_agreement}
onChange={handleOnInputChange}
label='Date of Agreement' />
 */
export const AsyncSelectMulti = (props) => {
    return (<><Col xs={props?.xs || 4}>
        <Form.Group className={"mb-3"}>
                <input type='text'
                 className='d-none'
                   required={props?.required}
                   value={props.value}
                />
            <SelectSearchMultiNew {...props} />
            {props?.required && (<Form.Control.Feedback type="invalid" >
                <div className='SelectSearchNew'>
                    Please enter {props?.label}
                </div>
            </Form.Control.Feedback>)}
        </Form.Group>
    </Col></>)
}
export const AsyncSelectMultiCreate = (props) => <SelectSearchMultiCreate {...props} />
{/* <AsyncSelect
xs={12} // set cols
onChange={(event) => onInputChange(event)} // Event of object
ref_table={'StateMaster'} // model name
name={'StateMaster'} // filed name
value={contracttype?.StateMaster} // filed value
params={{
'where':{'country_id':contracttype?.CountryMaster} // filter by column 
//TODD :  also make for whereHas Relationship
'whereHas':[{ relation_name: 'StateMaster', column_name: 'company_id', column_value: '1' }]
}}
/> */}
export const AsyncSelect = (props) => {
console.log('SelectSearchNew :>> ', props);
    return (<> <SelectSearchNew {...props} /></>)
}
export const AsyncSelectCreate = (props) => {

    return (<> <SelectSearchCreateNew {...props} /></>)
}
export const TableGenerate_tunal = (props) => {
    return (<>
        <Tablebox
            {...props}
        />
    </>)
}

export const AsyncAutoComplete = (props) => {

    return (<> <AutoComplete {...props} /></>)
}

export const FileUploadUi = (props) => {
    console.log('FileUploadUi', props)
    return (<>
        <Form.Control
            // {...props}
            type="file"
            name={props?.name}
            onChange={(evnt) => props?.onChange(evnt)}
        // value={props?.value}
        />
        {props?.document ? (<a class="btn btn-primary" href={props?.document} download><i className="fa-solid fa-download"></i></a>) : ''}
        {/* <span> {props?.value}</span> */}
    </>)
}

export const TableGenerate_old = (props) => {
    let tablerow = props?.table;
    if (typeof (tablerow) == 'string') {
        tablerow = JSON.parse(tablerow);
    }
    const headerPyalod = getNormalHeaders();
    /**
     * need refrence table
     * filter -
     * colums on table;
     */
    const apiUrl = `/api/v1/commongenericmodel?model=${props?.ref_table}&req_agenda_id=${(props?.ids?.id)}`;

    console.log('props / ', props);

    // Fetch the data from the API
    useEffect(() => {
        fetch(apiUrl, headerPyalod)
            .then(response => response.json())
            .then(data => {
                // Create the table element
                var table = document.createElement('table');
                table.style.border = "2px solid";
                // classes = table.classList.add('tabletyp1');
                // Add a header row to the table
                const headerRow = table.insertRow();
                const headers = Object.keys(tablerow);
                headers.forEach(header => {
                    const cell = headerRow.insertCell();
                    cell.textContent = tablerow[header];
                });

                // Add a row for each item in the data
                data.forEach(item => {
                    const row = table.insertRow();
                    headers.forEach(header => {
                        const cell = row.insertCell();
                        cell.textContent = item[header];
                    });
                });
                const datapayload = {
                    target: {
                        name: '',
                        value: ''
                    }
                };
                datapayload['target']['name'] = props?.name
                datapayload['target']['value'] = table;
                console.log('datapayload', datapayload, table);
                document.getElementById("generictable").appendChild(table);
                props?.onChange(datapayload);

            })
            .catch(error => console.error(error));

    }, [apiUrl]);

    const companydirduration = [];

    return (<>
        <Col xs={12}>
            <div className="sectioninnerbox mt-2 p-3">
                <Table responsive className="tabletyp1 ">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Total Stay Period</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {companydirduration && companydirduration?.map((data, index) => {
                            const {
                                id,
                                dir_from_date,
                                dir_to_date,
                                total_stay,
                            } = data;
                            const totalstay = (isNaN(total_stay)) ? '0' : total_stay;
                            return (
                                <>
                                    <tr>
                                        <td>
                                            <Form.Group className="mb-0">
                                                {dirc_personaldetails_id && dir_from_date && index != isChecktypeOfVlaues ?
                                                    dir_from_date :
                                                    <Form.Control type="date" name="dir_from_date" value={dir_from_date} onChange={(event) => handleOnDirdurationChange(index, event, id, 'from')} placeholder={"DD-MM-YYYY"}
                                                        max={dir_to_date}
                                                    />
                                                }
                                            </Form.Group >
                                        </td >
                                        <td>
                                            <Form.Group className="mb-0">
                                                {
                                                    dirc_personaldetails_id && dir_to_date && index != isChecktypeOfVlaues ?
                                                        dir_to_date
                                                        :
                                                        <Form.Control type="date" name="dir_to_date"
                                                            min={dir_from_date}
                                                            value={dir_to_date} onChange={(event) => handleOnDirdurationChange(index, event, id, 'to')} placeholder={"DD-MM-YYYY - DD-MM-YYYY"} />
                                                }
                                            </Form.Group >
                                        </td >
                                        <td>{totalstay}</td>
                                        <td className="text-end">
                                            <div className={"tableactionbtngroup"}>
                                                {/* <span>{inx === isChecktypeOfVlaues && capitalstructureAddvalues?.total_equity_amt ? capitalstructureAddvalues?.total_equity_amt : collapsdatas?.total_equity_amt}</span> */}
                                                {dirc_personaldetails_id ?
                                                    <>
                                                        {index == isChecktypeOfVlaues ?
                                                            <>
                                                                <Button onClick={() => showEditOrSaveBtn(index, 'update', btoa(id), data, 'DurationOfStay')} className="tableactionbtn1"><img src={"/img/icons/Icon-awesome-save.svg"} /></Button>
                                                                <Button onClick={() => showEditOrSaveBtn(index, 'cross', btoa(id), data, 'DurationOfStay')} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-cross.svg"} /></Button>
                                                            </>
                                                            : <Button onClick={() => showEditOrSaveBtn(index, 'edit', btoa(id), data, 'DurationOfStay')} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-pencil.svg"} /></Button>}
                                                        <Button onClick={() => showEditOrSaveBtn(index, 'delete', btoa(id), data, 'DurationOfStay')} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-bin.svg"} /></Button>
                                                    </>
                                                    : ''}
                                            </div>

                                            {/* <div className={"tableactionbtngroup text-nowrap"}>
                                                            <Button className="tableactionbtn1"><img src={"/img/icons/Icon-awesome-save.svg"} /></Button>
                                                            <Button className="tableactionbtn1"><img src={"/img/icons/Icon-metro-cross.svg"} /></Button>
                                                        </div> */}
                                        </td >
                                        {
                                            companydirduration.length !== 1 ? (
                                                <td>
                                                    <div className="text-end">
                                                        <Button type="button" variant="secondary" onClick={() => removeDirduration(index)} className="add-btn" ><i className="fa-solid fa-minus"></i></Button>
                                                    </div>
                                                </td>
                                            ) : (
                                                ""
                                            )
                                        }
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
// export const IssueCertificate = (props) => {
//     const [editorData, setEditorData] = useState({});
//     const [showModal, setShowModal] = useState(null);
//     const handleShow = () => setShowModal(true);
//     const handleClose = () => setShowModal(false);

//     console.log('IssueCertificate', props);


//     return (<>
//         <Modal show={showModal} onHide={handleClose} className={"modaltype1"} size="lg">
//             <Modal.Header closeButton>
//                 <Modal.Title>Agenda request status track</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Row>
//                     <Col xs={12}>
//                         <Editor
//                             onChange={(e) => props?.onChange(e)}
//                             name={props?.name}
//                             value={props?.tiny_mce_editor}
//                             initialValue={props?.tiny_mce_editor}
//                         />
//                     </Col>
//                 </Row>

//             </Modal.Body>
//             <Modal.Footer className="py-0 pb-2 border-none">
//                 <Button className="img-btn" variant="secondary" onClick={handleClose}>
//                     <img src={"/img/icons/Icon-awesome-save.svg"} />
//                 </Button>
//             </Modal.Footer>
//         </Modal>

//         {props?.label && <Form.Label>{props?.label} </Form.Label>}
//         <br></br>
//         <Button variant="secondary" onClick={handleShow} className="my-3"> {'Open Editor'} </Button>
//         <Button variant="secondary" className="my-3"> {'Download'} </Button>


//     </>)
// }

export const DatePicker = (props) => {
    console.log('props', props);
    // const [startDate, setStartDate] = useState(new Date(date));
    let value = props.value;
    // if(value){
    //     // value = moment(props.value).format('Y-MM-DD');
    // }
    return (<>
        <Col xs={props?.xs || 4}>
            <Form.Group className={"mb-3 formDatePicker"}>
                {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                {props?.icon != false ? props?.required && <sup>*</sup> : ('')}
                <Form.Control type='date'
                    {...props}
                    value={value}
                    defaultValue={props?.defaultvalue}
                    readOnly={props?.readonly || ''}

                />
                {props?.required && (<Form.Control.Feedback type="invalid">
                    Please enter {props?.label}
                </Form.Control.Feedback>)}
            </Form.Group>
        </Col>
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
export const FileUploadIcon = (props) => {
    return (<>
       { props?.document?.file_name && <div className={"tableactionbtngroup"}>

            <Button as={Link} to={props?.document?.file_full_path} className={"tableactionbtn1 m-t-2 uploadbtn"} data-for={"downloadtip" + props?.document?.file_name} data-tip={"Download " + props?.document?.file_name} target="_blank" download>
                <img src={"/img/icons/Icon-ionic-md-download.svg"} />
            </Button>
            <ReactTooltip class="secondary" id={"downloadtip" + props?.document?.file_name} effect="solid" place="top" />
        </div>}
    </>)
}
export const FileUpload_new = (props) => {
    console.log('props FileUpload cp1', props);
    const onChange = (e) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['files'] = e.target.files;
        uploadFile(e.target)
        props?.onChange(data)
    }
    function uploadFile(fileInput) {
        var file = fileInput.files[0];

        // Check if a file is selected
        if (!file) {
            toast.error('Please select a file');
            return false;
        }

        // Check file size (assuming 50 MB limit)
        if (props?.validator?.hasOwnProperty('size') && file.size > props?.validator?.size) {
            toast.error('File size exceeds 50 MB');
            return false;
        }

        // Check file extension
        var allowedExtensions = props?.validator?.extensions;
        var fileName = file.name;
        var fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

        if (props?.validator?.hasOwnProperty('extensions') && allowedExtensions.indexOf(fileExtension) === -1) {
            toast.error('Invalid file extension. Allowed extensions are: ' + allowedExtensions.join(', '));
            return false;
        }
        return true;
    }

    let multiples = false;
    if (props?.type_cat_option_id == 41) {
        multiples = true;
    }

    return (<>
        <Col xs={4}>
            {!multiples ? (<>
                {props?.label && <Form.Label>{props?.label} </Form.Label>}
                {props?.required && (<sup>*</sup>)}
                <Form.Group className="mb-3 position-relative" htmlfor={props?.id}>
                    <Form.Control required type="text" name="" placeholder={""} value={props?.value?.name || props?.document?.file_name && props?.document?.file_name?.split("_(eycs)")[0] + '.' + props?.document?.file_name?.split(".")[1]} data-for={"filestip" + props?.id} data-tip={""} data-event='click focus' readOnly />



                    <div className="inputsuccess-icon text-success" >
                        <div className={"tableactionbtngroup"}>
                            {!props?.noupload && (<>
                                <Button className="tableactionbtn1 m-t-2 uploadbtn" ><img src={"/img/icons/Icon-material-file-upload.svg"} htmlfor={props?.name} />
                                    <Form.Control required={props?.document?.file_name ? '' : props?.required} type="file" name={props?.name} id={props?.name} onChange={onChange} multiple={props?.multiple || ''} />
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
                        </div>
                    </div>
                </Form.Group>

                {/* {props?.multiple == true ? (
                props?.document && props?.document?.map((value, index) => {
                    console.log('document', value);
                    return (
                        <>
                            <Button as={Link} to={value?.file_full_path} className={"tableactionbtn2 uploadbtn ms-3"} data-for={"downloadtip" + value?.file_name} data-tip={"Download " + value?.file_name} target="_blank" download>
                                <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                            </Button>
                            <ReactTooltip class="secondary" id={"downloadtip" + value?.file_name} effect="solid" place="top" />
                        </>
                    )
                })) : (
                props?.document?.file_name && (
                    <>
                    <div className={"tableactionbtngroup"}>
                        <Button as={Link} to={props?.document?.file_full_path} className={"tableactionbtn2 uploadbtn ms-3"} data-for={"downloadtip" + props?.document?.file_name} data-tip={"Download " + props?.document?.file_name} target="_blank" download>
                            <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                        </Button>
                        <ReactTooltip class="secondary" id={"downloadtip" + props?.document?.file_name} effect="solid" place="top" />
                        </div>
                    </>
                ))} */}

            </>) : (<>
                {props?.label && <Form.Label>{props?.label} </Form.Label>}
                {props?.required && (<sup>*</sup>)}
                <Form.Group className="mb-3 position-relative" htmlfor={props?.id}>
                    <Form.Control required type="text" name="" placeholder={"Click On download"} readOnly />

                    <div className="inputsuccess-icon text-success" >
                        <div className={"tableactionbtngroup"}>
                            <Button className={"tableactionbtn1 m-t-2 uploadbtn"} data-for={"filestip" + props?.id} data-tip={""} data-event='click focus' >
                                <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                            </Button>
                        </div>
                    </div>
                </Form.Group>

                <ReactTooltip id={"filestip" + props?.id} effect="solid" place="left" isHtml={true} globalEventOff='click' clickable={true}>

                    <div className="sectionbox">
                        <Row>
                            <Col xs={12}>
                                <div className="sectioninnerbox px-0 py-2">
                                    <div className="scrollybox1 px-2 scrollbartyp1">
                                        <Table responsive className="tabletyp1">
                                            <thead>
                                                <tr>
                                                    <th>file Name</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(props?.value) && props?.value.map((documentvalue, documentindex) => {
                                                    console.log('documentvalue', documentvalue)
                                                    return (<>
                                                        <tr>
                                                            <td className="text-break m-w-300">{documentvalue?.file_name}</td>
                                                            <td className="text-end">
                                                                <div className={"tableactionbtngroup text-nowrap"}>
                                                                    <Button as={Link} to={documentvalue?.file_full_path} className={"tableactionbtn1 m-t-2 uploadbtn"} data-for={"downloadtip" + documentvalue?.file_name} data-tip={"Download " + documentvalue?.file_name} target="_blank" download>
                                                                        <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                                                                    </Button>
                                                                    <ReactTooltip class="secondary" id={"downloadtip" + documentvalue?.file_name} effect="solid" place="top" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>)
                                                })}

                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </ReactTooltip>
            </>)}
        </Col>
    </>)
}
export const FileUpload = (props) => {
    console.log('props FileUpload cp1', props);
    const onChange = (e) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['files'] = e.target.files;
        data['target']['value'] = e.target.files[0];
        uploadFile(e.target)
        props?.onChange(data)
    }
    function uploadFile(fileInput) {
        var file = fileInput.files[0];

        // Check if a file is selected
        if (!file) {
            toast.error('Please select a file');
            return false;
        }

        // Check file size (assuming 50 MB limit)
        if (props?.validator?.hasOwnProperty('size') && file.size > props?.validator?.size) {
            toast.error('File size exceeds 50 MB');
            return false;
        }

        // Check file extension
        var allowedExtensions = props?.validator?.extensions;
        var fileName = file.name;
        var fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

        if (props?.validator?.hasOwnProperty('extensions') && allowedExtensions.indexOf(fileExtension) === -1) {
            toast.error('Invalid file extension. Allowed extensions are: ' + allowedExtensions.join(', '));
            return false;
        }
        return true;
    }

    let multiples = false;
    if (props?.type_cat_option_id == 41) {
        multiples = true;
    }

    const handledownload =() => {
        downloadfile(props?.document?.file_name, props?.document?.file_full_path)
    }

    return (<>
        <Col xs={props?.xs || 4} className={props?.hide}>
            {!multiples ? (<>
                {props?.label && <Form.Label>{props?.label} </Form.Label>}
                {props?.required && (<sup>*</sup>)}
                <Form.Group className="mb-3 position-relative" htmlfor={props?.id}>
                    <Form.Control required type="text" name="" placeholder={""} value={props?.value?.name || props?.document?.file_name } data-for={"filestip" + props?.id} data-tip={""} data-event='click focus' readOnly />

                    <div className="inputsuccess-icon text-success" >
                        <div className={"tableactionbtngroup"}>
                            {!props?.noupload && (<>
                                <Button className="tableactionbtn1 m-t-2 uploadbtn" ><img src={"/img/icons/Icon-material-file-upload.svg"} htmlfor={props?.name} />
                                    <Form.Control required={props?.document?.file_name ? '' : props?.required} type="file" name={props?.name} id={props?.name} onChange={onChange} />
                                    {props?.required && (<Form.Control.Feedback type="invalid">
                                        Please select {props?.label}
                                    </Form.Control.Feedback>)}
                                </Button>
                            </>)}
                             
                                {props?.document?.file_name && (
                                    <>
                                    <Button variant="secondary" onClick={handledownload} className={"tableactionbtn1 m-t-2 uploadbtn"} data-for={"downloadtip" + props?.document?.file_name} data-tip={"Download " + props?.document?.file_name}>
                        <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                    </Button>
                    <ReactTooltip class="secondary" id={"downloadtip" + props?.document?.file_name} effect="solid" place="top" />
                                        {/* <Button as={Link} to={props?.document?.file_full_path} className={"tableactionbtn1 m-t-2 uploadbtn"} data-for={"downloadtip" + props?.document?.file_name} data-tip={"Download " + props?.document?.file_name} target="_blank" download>
                                            <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                                        </Button>
                                        <ReactTooltip class="secondary" id={"downloadtip" + props?.document?.file_name} effect="solid" place="top" /> */}
                                    </>
                                )}
                        </div>
                    </div>
                </Form.Group>

                {/* {props?.multiple == true ? (
                props?.document && props?.document?.map((value, index) => {
                    console.log('document', value);
                    return (
                        <>
                            <Button as={Link} to={value?.file_full_path} className={"tableactionbtn2 uploadbtn ms-3"} data-for={"downloadtip" + value?.file_name} data-tip={"Download " + value?.file_name} target="_blank" download>
                                <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                            </Button>
                            <ReactTooltip class="secondary" id={"downloadtip" + value?.file_name} effect="solid" place="top" />
                        </>
                    )
                })) : (
                props?.document?.file_name && (
                    <>
                    <div className={"tableactionbtngroup"}>
                        <Button as={Link} to={props?.document?.file_full_path} className={"tableactionbtn2 uploadbtn ms-3"} data-for={"downloadtip" + props?.document?.file_name} data-tip={"Download " + props?.document?.file_name} target="_blank" download>
                            <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                        </Button>
                        <ReactTooltip class="secondary" id={"downloadtip" + props?.document?.file_name} effect="solid" place="top" />
                        </div>
                    </>
                ))} */}

            </>) : (<>
                {props?.label && <Form.Label>{props?.label} </Form.Label>}
                {props?.required && (<sup>*</sup>)}
                <Form.Group className="mb-3 position-relative" htmlfor={props?.id}>
                    <Form.Control required type="text" name="" placeholder={"Click On download"} readOnly />

                    <div className="inputsuccess-icon text-success" >
                        <div className={"tableactionbtngroup"}>
                            <Button className={"tableactionbtn1 m-t-2 uploadbtn"} data-for={"filestip" + props?.id} data-tip={""} data-event='click focus' >
                                <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                            </Button>
                        </div>
                    </div>
                </Form.Group>

                <ReactTooltip id={"filestip" + props?.id} effect="solid" place="left" isHtml={true} globalEventOff='click' clickable={true}>

                    <div className="sectionbox">
                        <Row>
                            <Col xs={12}>
                                <div className="sectioninnerbox px-0 py-2">
                                    <div className="scrollybox1 px-2 scrollbartyp1">
                                        <Table responsive className="tabletyp1">
                                            <thead>
                                                <tr>
                                                    <th>file Name</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(props?.value) && props?.value.map((documentvalue, documentindex) => {
                                                    console.log('documentvalue', documentvalue)
                                                    return (<>
                                                        <tr>
                                                            <td className="text-break m-w-300">{documentvalue?.file_name}</td>
                                                            <td className="text-end">
                                                                <div className={"tableactionbtngroup text-nowrap"}>
                                                                    <Button as={Link} to={documentvalue?.file_full_path} className={"tableactionbtn1 m-t-2 uploadbtn"} data-for={"downloadtip" + documentvalue?.file_name} data-tip={"Download " + documentvalue?.file_name} target="_blank" download>
                                                                        <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                                                                    </Button>
                                                                    <ReactTooltip class="secondary" id={"downloadtip" + documentvalue?.file_name} effect="solid" place="top" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>)
                                                })}

                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </ReactTooltip>
            </>)}
        </Col>
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
    console.log('InputText', props, props?.value && props?.type_cat_option_id == 19);

    let value;
    if (props?.defaultvalue && props?.value != '' && !props?.value) {
        value = props?.defaultvalue;
    }

    if (props?.value) {
        value = props?.value;
    }

    let show = true
    if (props?.value == '' && !props?.value && props?.type_cat_option_id == 19 && props?.ref_table_alias == 'company_secretary') {
        show = false
    }
    let type = 'text';
    if (props?.type_cat_option_id == 11 || props?.name == "estimated_spend" || props?.name == "actual_spend") {
        type = 'number';
    }
    if (props?.type) {
        type = props?.type;
    }

    if(props?.html_id == 'email'){
        type = 'email';
    }

    // if(props?.name == 'cnr_no'){
    //     pattern = "[a-zA-Z0-9]+" ;
    // } 
    
    return (<>
        {show == true &&
            <Col xs={props?.xs || 4}>
                <Form.Group className={"mb-3 " + props?.className}>
                    {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                    {props?.icon != false ? props?.required && (<sup>*</sup>) : ('')}
                    {props?.tooltip && <img data-for={props?.name} data-tip={""} src={"/img/icons/Icons-Alerts-ic_error_outline_blue.svg"} className="float-end" />}
                    <Form.Control {...props} type={type} value={value} pattern={props?.pattern}                     
                    readOnly={props?.readonly || ''} className={props?.className} />
                    <Form.Control.Feedback type="invalid">
                    {props?.contactvalid ? `${props?.label} should be minimum 8 digits and maximum 15 digits` : `Please enter ${props?.label}`}
                    </Form.Control.Feedback>
                    {props?.tooltip && <ReactTooltip className="secondary" id={props?.name} effect="solid" place="top" isHtml={true}>
                        <div className="text-center" dangerouslySetInnerHTML={{ __html: props?.tooltip }} />
                    </ReactTooltip>}
                </Form.Group>
            </Col>
        }
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
        <Col xs={props?.xs || 4} className={props?.hide}>
            <Form.Group className={"mb-3 "+props?.className}>
                {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                {props?.icon != false ? props?.required && (<sup>*</sup>) : ('')}
                <Form.Control as="textarea" rows={3}  {...props} className={props?.className + 'alphanumerictemplate'}                     
                readOnly={props?.readonly || ''} disabled={props?.disabled || false}
                
            />
                {props?.required && (<Form.Control.Feedback type="invalid">
                    Please enter {props?.label}
                </Form.Control.Feedback>)}
            </Form.Group>
        </Col>
    </>)
}
/**
 * <YesNoChecked
        onChange={handleOnInputChange}
        label={'Whether Articles Entrenched'}
        value={formvalue?.aoa_whether_articles_entrenched}
        name="aoa_whether_articles_entrenched"
        validated={validated}
        required
    />
 */
export const YesNoChecked = (props) => {
    const id = useId();
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
    console.log('props YesNoChecked', props?.name);
    return (
        <>
            <Col xs={4}>
                <Form.Group className={"mb-3" + props?.className}>
                    {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                    {props?.icon != false ? props?.required && (<sup>*</sup>) : ('')}
                    {props?.tooltip && <img data-for={props?.name} data-tip={""} src={"/img/icons/Icons-Alerts-ic_error_outline_blue.svg"} className="float-end" />}
                    <div className="justify-content-end mb-2">
                        <ButtonGroup role="group" className="btn-grouptype2">
                            <input type="radio" class="btn-check" onChange={(e) => handleonchange('yes')} name={id} id={id + '1'} autocomplete="off" checked={props?.value == 'yes' ? true : ''} />
                            <Form.Label class="btn btn-light mb-0" for={id + '1'}>  {(!props?.option) ? 'Yes' : (props?.option?.yes)} </Form.Label>

                            <input type="radio" class="btn-check" onChange={(e) => handleonchange('no')} name={id} id={id + '2'} autocomplete="off" checked={props?.value == 'no' ? true : ''} />
                            <Form.Label class="btn btn-light mb-0" for={id + '2'}> {(!props?.option) ? 'No' : (props?.option?.no)}  </Form.Label>
                        </ButtonGroup>

                    </div>
                    <ReactTooltip className="secondary" id={props?.name} effect="solid" place="top" isHtml={true}>
                        <div className="text-center" dangerouslySetInnerHTML={{ __html: props?.tooltip }} />
                    </ReactTooltip>

                    {props?.validated === true && (props?.value == null || props?.value == '') ?
                        <span className="error_show">
                            Please select {props?.label}
                        </span>
                        : ""
                    }
                </Form.Group>
            </Col>

        </>)
}


export const RadioButton = (props) => {

    const onClickRadioButton = (value) => {
        console.log("onClickRadioButton", value);
        const data = {
            target: {
                name: props?.name || '',
                value: value
            }
        };
        props?.onChange(data);
    }
    const id = useId();

    console.log('props RadioButton', props);

    return (
        <Col xs={props?.xs || 4}>
            <Form.Group className={"mb-3"}>
                <Form.Check 
                    type="radio" 
                    label={''} 
                    onChange={(e) => onClickRadioButton(e.target.checked)} 
                    id={props?.name} 
                    name={'group_name'}
                    checked={props?.value === true || props?.value === 'true'} 
                    className="me-2" 
                    value={props?.value}
                />
                {props?.label && <h4 className="sectionheader mb-0">{props?.label}</h4>}
                {props?.required && <sup>*</sup>}

                {props?.required && (props?.validated === true && (props?.value == null || props?.value === "") ?
                    <span className="error_show">
                        Please select {props?.label}
                    </span>
                    : "")}
            </Form.Group>
        </Col>
    );
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
    console.log('props /SelectField', props.html_id, props);
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
    return (<>

        <Col xs={4}>
            <Form.Group className={"mb-3 " + props?.className}>
                {props?.label && <Form.Label>{props?.label} </Form.Label>}
                {props?.required && (<sup>*</sup>)}

                {props?.tooltip && <img data-for={props?.name} data-tip={""} src={"/img/icons/Icons-Alerts-ic_error_outline_blue.svg"} className="float-end" />}

                <Select
                    name={props?.name}
                    isClearable
                    id={props?.id}
                    options={props?.options}
                    onChange={(e) => onChange(e)}
                    value={props?.options && props?.options.filter(function (el) {
                        return el.label == props?.value;
                    })}
                    placeholder={props?.placeholder}
                    required={props?.required}
                    isDisabled={props?.readonly || ''}
                />

                <ReactTooltip className="secondary" id={props?.name} effect="solid" place="top" isHtml={true}>
                    <div className="text-center" dangerouslySetInnerHTML={{ __html: props?.tooltip }} />
                </ReactTooltip>

                {/* data-for={props?.name} data-tip={tooltip}
                <ReactTooltip class="secondary" id={props?.name} effect="solid" place="top" /> */}

                {props?.required && (props?.validated === true && (props?.value == null || props?.value == "") ?
                    <span className="error_show">
                        Please select {props?.label}
                    </span>
                    : "")}
            </Form.Group>
        </Col>
    </>)
}

export const SelectFieldMulti = (props) => {
    console.log('props /SelectFieldMulti', props);
    const extractValue = (arr, prop) => {
        let extractedValue = arr.map(item => item[prop]);
        return extractedValue;
    }
    const [options, setoption] = useState([]);
    const [status, setstatus] = useState(true);
    const type_of_equity = props?.dynamicFormValues?.TypeofSecurity
    const typeofsecurityforissuecert = [];
    const type = typeofsecurityforissuecert.find((e) => e?.label == type_of_equity)?.value;
    const getclassofSec = () => {
        try {

            const headerPyalod = getNormalHeaders();
            const company_id = sessionStorage.getItem("company_id")
            const response = axios.get(`/api/v1/company/get_class_of_sec_select/SH/${type}/${company_id}`, headerPyalod)
                .then((response) => {
                    console.log("response", response?.data);
                    const companydetails = response?.data;
                    setoption(companydetails?.data);
                    setstatus(false);
                })
                .catch((error) => {
                    if (error.response) {
                        console.log('error', error.response.data.errors)
                        // setValidationError(error.response.data.errors)
                        // setIsLoading(false)

                    } else if (error.request) {

                        // setIsLoading(false)
                    } else {
                        // setIsLoading(false)
                    }
                });

        } catch (err) {
            //   setValidationError(err)
            console.log('errorerrorerrorerrorerror', err)

            //   setIsLoading(false)
        }
    }

    useEffect(() => {
        if (props?.options.length !== 0) {
            setoption(props?.options)
        }
        if (status === true && type) {
            getclassofSec();
        }
    }, [props?.options, type_of_equity]);
    console.log('getclassofSec', options, props?.options.length)
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
        props?.onChange(data)
    }

    let value = [];
    if (typeof props?.value === 'string') {
        value = props?.value;
    }

    if (props?.type_cat_option_id == 33) {
        console.log('getclassofSec', type_of_equity)
        getclassofSec(type_of_equity);
    }
    console.log('getclassofSecgetclassofSec', options?.filter((option) => value.includes(option.value)))
    return (<>

        <Col xs={4}>
            <Form.Group className={"mb-3"}>
                {props?.label && <Form.Label>{props?.label} </Form.Label>}
                {props?.required && (<sup>*</sup>)}
                <Select
                    isMulti
                    isClearable
                    className="select2_filds"
                    id={props?.name}
                    controlId={props?.name}
                    name={props?.name}
                    options={options}
                    onChange={(e) => onChange(e)}
                    value={options && options?.filter((option) => value.includes(option.value))}
                    placeholder={props?.placeholder}
                    isOptionsDisabled={() => { return props?.readonly || false }}
                    required={props?.required}

                />


                {props?.required && (props?.validated === true && (props?.value == null || props?.value == "") ?
                    <span className="error_show">
                        Please select {props?.label}
                    </span>
                    : "")}
            </Form.Group>
        </Col>
    </>)
}

export const AsyncSelectsMulti = (props) => {
    console.log('props /SelectFieldMulti', props);
    const extractValue = (arr, prop) => {
        let extractedValue = arr.map(item => item[prop]);
        return extractedValue;
    }
    // const [options, setoption] = useState([]);

    const { data: options, loading, error, reFetchData } = useFetch(`/api/v1/commongenericmodel?model=${props?.ref_table}`);

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
        props?.onChange(data)
    }

    let value = [];
    if (typeof props?.value === 'string') {
        value = props?.value;
    }

    return (<>

        <Col xs={4}>
            <Form.Group className={"mb-3"}>
                {props?.label && <Form.Label>{props?.label} </Form.Label>}
                {props?.required && (<sup>*</sup>)}
                <Select
                    isMulti
                    className="select2_filds"
                    id={props?.name}
                    controlId={props?.name}
                    name={props?.name}
                    options={options}
                    onChange={(e) => onChange(e)}
                    value={options && options?.filter((option) => value.includes(option.value))}
                    placeholder={props?.placeholder}
                    isOptionsDisabled={() => { return props?.readonly || false }}
                    required={props?.required}

                />


                {props?.required && (props?.validated === true && (props?.value == null || props?.value == "") ?
                    <span className="error_show">
                        Please select {props?.label}
                    </span>
                    : "")}
            </Form.Group>
        </Col>
    </>)
}

export const AsyncSelects = (props) => {
    let defaultOption = props.values ? props.values : '';
    let defaultValue = props.defaultvalue ? props.defaultvalue : '';
    console.log('defaultValue', props)
    const [inputLabel, setLabel] = useState('');
    const [Valuenew, setValuenew] = useState([]);
    var cond = '';
    if (props?.ref_table_alias) {
        cond += '&ref_table_alias=' + props?.ref_table_alias;
    }
    const loadOptionsnew = (option_id) => {
        const token = sessionStorage.getItem("passportToken");
        return fetch(`/api/v1/commongenericmodel?model=${props?.ref_table}&fetch=${option_id}${cond}`, {
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
            loadOptionsnew(defaultOption, cond)
        }
        if (!props.values) {
            setValuenew([])
        }

        if (props.defaultvalue) {
            loadOptionsnew(cond)
        }

    }, [props?.values, defaultValue]);



    const handleonchange = ((e) => {
        const data = {
            target: {
                name: '',
                value: '',
                data: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = e.id;
        data['target']['data'] = e;
        loadOptionsnew(e.id, cond)
        loadOptions();
        props?.onChange(data)
    })
    const loadOptions = () => {
        const headerPyalod = getNormalHeaders();
        const token = sessionStorage.getItem("passportToken");
        if (props?.ref_condition) {
            return fetch(`/api/v1/getAsyncSelectdata?condition=${props?.ref_condition}&search_data=${inputLabel}`, {
                method: 'GET',
                ...headerPyalod
            }).then(res => res.json());
        } else {

            return fetch(`/api/v1/commongenericmodel?model=${props?.ref_table}&search_data=${inputLabel}${cond}`, {
                method: 'GET',
                ...headerPyalod
            }
            ).then(res => res.json());
        }
    };

    useEffect(() => {
        if (props?.ref_table) {
            loadOptions()
        }
    }, [props?.ref_table]);
    console.log('loadOptions', loadOptions, props?.params, " xs ", props?.xs);
    // props?.isOptionDisabled
    // console.log('props?.isOptionDisabled :>> ', props?.isOptionDisabled);
    return (
        <>
            <Col xs={props?.xs || 4}>
                <Form.Group className={"mb-3 " + props?.className}>
                    {props?.label && <Form.Label>{props?.label}</Form.Label>}
                    {/* {props?.required && (<sup>*</sup>)} */}
                    {props?.icon != false ? props?.required && (<sup>*</sup>) : ('')}

                    <AsyncSelectss
                        className={props?.className}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        cacheOptions
                        defaultOptions
                        getOptionLabel={e => e.label}
                        getOptionValue={e => e.value}
                        value={{ value: Valuenew.id, label: Valuenew.label }}
                        loadOptions={loadOptions}
                        onChange={handleonchange}
                        onInputChange={(e) => setLabel(e)}
                        // isOptionsDisabled={(e) => { return props?.readonly_condition || false }}
                        isDisabled={(props?.readonly_condition == true || props?.readonly_condition == 'true') ? true : ''}
                        placeholder={props?.placeholder}


                    />

                    {props?.validated === true && (props?.value == null || props?.value == '') ?
                        <span className="error_show">
                            Please select {props?.label}
                        </span>
                        : ""
                    }
                    {/* <pre>Selected Value: {JSON.stringify(props || {}, null, 2)}</pre> */}
                    {props?.errors && <span className="form-error">{props?.errors}</span>}
                </Form.Group>
            </Col>
        </>
    )
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
        console.log('SelectValField /onChange', data)
        props?.onChange(data)
    }
    return (<>
        <Col xs={props?.xs || 4}>
            <Form.Group className={"mb-3 " + props?.className}>
            <input type='text'
                 className='d-none'
                   required={props?.required}
                   value={props.value}
                />
                {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                {props?.icon != false ? props?.required && (<sup>*</sup>) : ('')}
                <Select
                    isClearable  
                    name={props?.name}
                    id={props?.id}
                    options={props?.options}
                    onChange={(e) => onChange(e)}
                    value={props?.options && props?.options.filter(function (el) {
                        return el.value == props?.value;
                    })}
                    required={props?.required}
                    isDisabled={props?.readonly || ''}


                />
              {props?.required && (<Form.Control.Feedback type="invalid" >
                <div className='SelectSearchNew'>
                    Please enter {props?.label}
                </div>
            </Form.Control.Feedback>)}
            </Form.Group>
        </Col>
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
        <Col xs={props?.xs || 4}>
            <Form.Group className={"mb-3"}>
                <Form.Control required className={"inputtypesearch " + props?.className} type="search" onChange={(e) => onChangeonsearch(e.target.value)} placeholder={"Search ..."} {...props} />
            </Form.Group>
        </Col>
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

export const Checkbox = (props) => {
    const onClickCheckbox = (value) => {
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

    return (<>
        <Col xs={4}>
            <Form.Group className={"mb-3"}>
                <Form.Check type="checkbox" label={''} onClick={(e) => onClickCheckbox(e.target.checked)} name={props?.name} checked={props?.value == true || props?.value == 'true' ? true : ''} className="me-2" />
                {props?.label && <h4 class="sectionheader mb-0">{props?.label}</h4>
                }
                {props?.required && (<sup>*</sup>)}

                {props?.required && (props?.validated === true && (props?.value == null || props?.value == "") ?
                    <span className="error_show">
                        Please select {props?.label}
                    </span>
                    : "")}
            </Form.Group>
        </Col>

    </>)
}

export const InputCheckbox = (props) => {

    props
    const onClickCheckbox = (value) => {
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

    return (<>

        <Col xs={4}>
            <div className="tableckeckboxinline mt-3">
                <Form.Group className="mb-3" controlId="">
                    {props?.label && <h4 class="sectionheader mb-0">{props?.label}</h4>
                        }
                        {props?.required && (<sup>*</sup>)}
                    
                        <Form.Check type="checkbox" onClick={(e) => onClickCheckbox(e.target.checked)} label={""} name={props?.name} checked={props?.value == true || props?.value == 'true' ? true : ''} /> 
                </Form.Group>
            </div>
        </Col>

    </>)
}

export const IssueCertificate = (props) => {
    const [editorData, setEditorData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (props?.agendaRequest?.reference_model_id) {
            const value = props?.value || props?.tiny_mce_editor;
            formData.append('document_data', value)
            formData.append('id', props?.document?.id)
            formData.append('msg', 'Document saved & Download successfully')
            const headerPyalod = getNormalHeaders();
            try {
                setIsLoading(true);
                const response = axios.post(`/api/v1/agenda/saveDocument/${btoa(props?.agendaRequest?.reference_model_id)}`, formData, headerPyalod)
                    .then((response) => {
                        if (response?.data?.status == true) {
                            handleClose();
                            toast.success(response?.data?.message);
                            downloadfile(props?.label, response?.data?.response?.file_full_path)
                        } else {
                            showToastererror(response?.data?.error, toast)
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
                console.log('catch', err)
            }
        } else {
            downloadfile(props?.label, props?.document?.file_full_path)
            handleClose()
            downloadfile(props?.label, props?.file_full_path)
        }
    }

    // if (isLoading) { return <LoadingSpinner />; }

    console.log('IssueCertificate', props);
    const onChange = (e) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = e.target.value;
        props?.onChange(data);
    }

    return (<>
        <Modal show={showModal} onHide={handleClose} className={"modaltype1"} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{props?.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={12}>
                        <Editor
                            onChange={(e) => onChange(e)}
                            name={props?.name}
                            value={props?.value || props?.tiny_mce_editor}
                        // initialValue={props?.tiny_mce_editor}
                        />
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer className="py-0 pb-2 border-none">
                <Button className="img-btn" variant="secondary" onClick={handleClose}>
                    <img src={"/img/icons/Icon-awesome-save.svg"} />
                </Button>
            </Modal.Footer>
        </Modal>
        <Col xs={4}>

            {props?.label && <Form.Label>{props?.label} </Form.Label>}
            <br />
            <Button variant="secondary" onClick={handleShow} className="my-3"> {'Open Editor'} </Button>
            {/* <Button variant="secondary" className="my-3"> {'Download'} </Button> */}
            {props?.document?.file_name && (
                <>
                    <Button variant="secondary" onClick={handleSave} className={"my-3"} data-for={"downloadtip" + props?.document?.file_name} data-tip={"Download " + props?.document?.file_name}>
                        <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                    </Button>
                    <ReactTooltip class="secondary" id={"downloadtip" + props?.document?.file_name} effect="solid" place="top" />
                </>
            )}

        </Col>
    </>)
}
export const TinyMCEEditor = (props) => {
    const [editorData, setEditorData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(null);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleCopy = (data) => {
        navigator.clipboard.writeText('${' + data + "}");
    }

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (props?.agendaRequest?.reference_model_id) {
            const value = props?.value || props?.tiny_mce_editor;
            formData.append('document_data', value)
            formData.append('id', props?.document?.id)
            formData.append('msg', 'Document saved & Download successfully')
            const headerPyalod = getNormalHeaders();
            try {
                setIsLoading(true);
                const response = axios.post(`/api/v1/agenda/saveDocument/${btoa(props?.agendaRequest?.reference_model_id)}`, formData, headerPyalod)
                    .then((response) => {
                        if (response?.data?.status == true) {
                            handleClose();
                            toast.success(response?.data?.message);
                            downloadfile(props?.label, response?.data?.response?.file_full_path)
                        } else {
                            showToastererror(response?.data?.error, toast)
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
                console.log('catch', err)
            }
        } else {
            downloadfile(props?.label, props?.document?.file_full_path)
            handleClose()
            // downloadfile(props?.label, props?.file_full_path)
        }
    }

    if (isLoading) { return <LoadingSpinner />; }

    console.log('IssueCertificate', props);

    return (<>
        <Modal show={showModal} onHide={handleClose} className={"modaltype1"} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{props?.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={3}>
                        <div className="tagslist">
                            <ul>
                                {props?.options && props?.options.map((data, index) => {
                                    return (
                                        <>
                                            <li className="sectioninnerbox p-1 mb-2 copyli">
                                                <h6 data-for="tagsTip" data-tip={"{" + data + "}"}>{data}</h6>
                                                <Button data-for="CopyBtnTip" data-tip="Copy" variant="link" className="add-btn p-1" onClick={() => handleCopy(data)}><i className="fa-solid fa-copy"></i></Button>
                                                <ReactTooltip id="CopyBtnTip" effect="solid" place="top" />
                                                <ReactTooltip id="tagsTip" effect="solid" place="top" />
                                            </li>
                                        </>
                                    )
                                })}
                            </ul>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <Editor
                            onChange={(e) => props?.onChange(e)}
                            name={props?.name}
                            value={props?.value || props?.document_data}
                            //initialValue={props?.tiny_mce_editor}
                        />
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer className="py-0 pb-2 border-none">
                <Button className="img-btn" variant="secondary" onClick={handleClose}>
                    <img src={"/img/icons/Icon-awesome-save.svg"} />
                </Button>
            </Modal.Footer>
        </Modal>
        <Col xs={props?.xs || 4}>

            {props?.label && <Form.Label>{props?.label} </Form.Label>}
            <br />
            <Button variant="secondary" onClick={handleShow} className={(props?.aditionalAttachment) ? 'mb-3' : 'my-3'}> {(props?.name == 'category_data') ? 'Draft Notice' : (props?.aditionalAttachment) ? 'Draft Document' : 'Open Editor'} </Button>
            {/* <Button variant="secondary" className="my-3"> {'Download'} </Button> */}
            {props?.document?.file_name && (
                <>
                    <Button variant="secondary" onClick={handleSave} className={(props?.aditionalAttachment) ? 'mb-3' : 'my-3'} data-for={"downloadtip" + props?.document?.file_name} data-tip={"Download " + props?.document?.file_name}>
                        <img src={"/img/icons/Icon-ionic-md-download.svg"} />
                    </Button>
                    <ReactTooltip class="secondary" id={"downloadtip" + props?.document?.file_name} effect="solid" place="top" />
                </>
            )}

        </Col>
    </>)
}

export const TinyMCEEditorWithTag = (props) => {

    console.log('TinyMCEEditor :>> ', props);
    const handleCopy = (data) => {
        navigator.clipboard.writeText('${' + data + "}");
    }

    return (<>
        <Row>
            <Col xs={3}>
                <div className="tagslist">
                    <ul>
                        {props?.options && props?.options.map((data, index) => {
                            return (
                                <>
                                    <li className="sectioninnerbox p-1 mb-2 copyli">
                                        <h6 data-for="tagsTip" data-tip={"{" + data + "}"}>{data}</h6>
                                        <Button data-for="CopyBtnTip" data-tip="Copy" variant="link" className="add-btn p-1" onClick={() => handleCopy(data)}><i className="fa-solid fa-copy"></i></Button>
                                        <ReactTooltip id="CopyBtnTip" effect="solid" place="top" />
                                        <ReactTooltip id="tagsTip" effect="solid" place="top" />
                                    </li>
                                </>
                            )
                        })}
                    </ul>
                </div>
            </Col>
            <Col xs={9}>
                <h4><b>{props?.label}</b></h4>
                <div className="sectioninnerbox p-2">
                    <Editor
                        // onChange={props?.onChange}
                        // name="subagendalongtext"
                        // value={subagendalongtext}
                        {...props}
                    />
                </div>
            </Col>
        </Row>
    </>)
}

export const SecurityHolder1 = (props) => {

    const [CompanySecurityHolderPersonalDetails, setCompanySecurityHolderPersonalDetails] = useState('');
    const [CompanySecurityHolderPersonalDetailslabel, setCompanySecurityHolderPersonalDetailslabel] = useState('');
    const [nameOfSecuritys, setNameOfSecurity] = useState('');
    const [formdata, setFormdata] = useState([]);
    const [Formlist, setFormlist] = useState([]);
    const [autoData, setAutoData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const SecurityHolder = useRef('');
    const listedoptiondetails = [
        { label: "Equity", value: 1 },
        { label: "Preference", value: 2 },
        { label: "Unsatisfied", value: 3 },
    ];

    console.log('Formlist :>> ', Formlist);

    const getDirectorsDetails = ((id, type) => {
        const company_id = sessionStorage.getItem("company_id")
        try {
            const headerPyalod = getNormalHeaders();
            setIsLoading(true);
            const response = axios.get(`/api/v1/company/get_shareholding_alldetails/${btoa(company_id)}/${btoa(id)}`, headerPyalod)
                .then((response) => {
                    if (response?.data?.status == true) {
                        console.log(response?.data, 'agendarequest');
                        setFormdata(response?.data);

                        if (nameOfSecuritys == 'Equity') {
                            setFormlist(response?.data?.equityshareholdingdetails);
                        }

                        if (nameOfSecuritys == 'Preference') {
                            setFormlist(response?.data?.preferenceshareholdingdetails);
                        }

                        if (nameOfSecuritys == 'Unsatisfied') {
                            setFormlist(response?.data?.unsatisfiedshareholdingdetails);
                        }
                    }
                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.response) {
                        setIsLoading(false)
                        console.log(error.respons);


                    } else if (error.request) {
                        setIsLoading(false)
                        console.log(error.respons);

                    } else {
                        setIsLoading(false)
                    }
                });

        } catch (err) {
            setIsLoading(false)
            console.log('err', err);

        }
    })

    var shares = [];
    var i = 0;

    Formlist && Formlist?.map((data, dataindex) => {
        data && data?.shareholdingdetails?.map((value, valueindex) => {
            console.log('loopvalue :>> ', value);
            i++;
            shares[i] = value?.number_of_shares_allotted;
        })
    })

    const totalshares = shares.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);

    const handleChangeShares = (e, index, shareholdingdetailsindex) => {
        const { name, value } = e.target;
        const shareholdingdetails = [...Formlist];
        shareholdingdetails[index]['shareholdingdetails'][shareholdingdetailsindex][name] = value;
        setFormlist(shareholdingdetails)
    }

    const onChangeonsearch = (event) => {
        const { name, value, data } = event.target;
        setCompanySecurityHolderPersonalDetails(value);
        setCompanySecurityHolderPersonalDetailslabel(data?.label)
        getDirectorsDetails(value);
        // setFormlist([]);
    }
    const handleOnInputChange = (event) => {
        const { name, value } = event.target;
        setNameOfSecurity(value);
        if (value == 'Equity') {
            setFormlist(formdata?.equityshareholdingdetails);
        }

        if (value == 'Preference') {
            setFormlist(formdata?.preferenceshareholdingdetails);
        }

        if (value == 'Unsatisfied') {
            setFormlist(formdata?.unsatisfiedshareholdingdetails);
        }
    }
    useEffect(() => {

        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = autoData;
        props?.onChange(data)

    }, [SecurityHolder, CompanySecurityHolderPersonalDetails, nameOfSecuritys, Formlist, autoData])

    useEffect(() => {
        if (Formlist && Object.keys(Formlist).length > 0) {
            setAutoData({
                ...autoData,
                Numberofshares: totalshares,
                FaceValue: 10,
            })
        }
    }, [Formlist]);

    return (<>

        <AsyncSelects
            key={props?.key}
            onChange={(event) => onChangeonsearch(event)}
            ref_table={'CompanySecurityHolderPersonalDetails'}
            label={props?.label || 'Company Security Holder Personal Details'}
            values={CompanySecurityHolderPersonalDetails || ""}
            name={'user_name'}
        />

        <SelectField
            required
            label={'Name of Security'}
            name={'name_of_security'}
            options={listedoptiondetails}
            onChange={handleOnInputChange}
            value={nameOfSecuritys}
        />

        <Col xs={12}>
            <div className="sectioninnerbox px-0 mt-2 py-2">
                <Table responsive className="tabletyp1 " border={'1px solid'} ref={SecurityHolder}>
                    <thead>
                        <tr>
                            <th >Name of the Shareholder</th>
                            <th rowSpan={2}>No. of Equity Shares </th>
                            <th rowSpan={2}>Regd. Folio No</th>
                            <th rowSpan={2}>Certificate No.</th>
                            <th colSpan={2}><center>Distinctive No</center></th>
                        </tr>
                        <tr>
                            <th><center>From</center></th>
                            <th><center>To</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Formlist && Formlist?.map((directorslist, index) => {
                            return (<>
                                {directorslist && directorslist?.shareholdingdetails?.map((shareholdingdetails, shareholdingdetailsindex) => {
                                    return (<>
                                        <tr>
                                            <td>{CompanySecurityHolderPersonalDetailslabel}</td>
                                            <td>{shareholdingdetails?.number_of_shares_allotted}</td>
                                            {/* <td>{shareholdingdetails?.folio_number}</td> */}
                                            <td><Form.Control type="text" name="folio_number" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={shareholdingdetails?.folio_number} /></td>
                                            <td><Form.Control type="text" name="certificate_number" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={shareholdingdetails?.certificate_number} /></td>
                                            <td><center><Form.Control type="text" name="distinctive_number_from" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={shareholdingdetails?.distinctive_number_from} /></center></td>
                                            <td><center><Form.Control type="text" name="distinctive_number_to" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={shareholdingdetails?.distinctive_number_to} /></center></td>
                                        </tr> </>)
                                })}
                            </>);
                            return (<></>)
                        })}

                    </tbody>
                </Table>
            </div>

        </Col>







    </>)
}
export const SecurityHolder = (props) => {

    const [CompanySecurityHolderPersonalDetails, setCompanySecurityHolderPersonalDetails] = useState('');
    const [CompanySecurityHolderPersonalDetailslabel, setCompanySecurityHolderPersonalDetailslabel] = useState('');
    const [nameOfSecuritys, setNameOfSecurity] = useState('');
    const [formdata, setFormdata] = useState([]);
    const [Formlist, setFormlist] = useState([]);
    const [autoData, setAutoData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();
    const SecurityHolder = useRef('');
    const listedoptiondetails = [
        { label: "Equity", value: 1 },
        { label: "Preference", value: 2 },
        { label: "Unsatisfied", value: 3 },
    ];

    console.log('Formlist :>> ', Formlist, props);

    const getDirectorsDetails = ((id, type) => {
        const company_id = sessionStorage.getItem("company_id")
        try {
            const headerPyalod = getNormalHeaders();
            const formData = new FormData();
            formData.append("ids", id)
            formData.append("type", type)
            setIsLoading(true);
            const response = axios.post(`/api/v1/company/get_shareholding_alldetails/${btoa(company_id)}`, formData, headerPyalod)
                .then((response) => {
                    console.log(response?.data, 'agendarequest');
                    console.log("resdata+", response?.data);
                    setFormlist(response?.data);
                    props?.setdynamicFormValues({ ...dynamicFormValues, 'typeofClasstable': response?.data })

                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.response) {
                        setIsLoading(false)
                        console.log(error.respons);


                    } else if (error.request) {
                        setIsLoading(false)
                        console.log(error.respons);

                    } else {
                        setIsLoading(false)
                    }
                });

        } catch (err) {
            setIsLoading(false)
            console.log('err', err);

        }
    })

    var shares = [];
    var i = 0;

    Formlist && Formlist?.map((data, dataindex) => {
        data && data?.shareholdingdetails?.map((value, valueindex) => {
            console.log('loopvalue :>> ', value);
            i++;
            shares[i] = value?.number_of_shares_allotted;
        })
    })

    const totalshares = shares.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
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
    const handleChangeShares = async (e, index, shareholdingdetailsindex, type = 3) => {
        const { name, value, files } = e.target;
        if (type == 6) {
            const base64 = await convertToBase64(files[0]);
            console.log("console+shareholdingdetails", base64)
            const shareholdingdetails = [...Formlist];
            shareholdingdetails[index]['shareholdingdetails'][shareholdingdetailsindex][name] = base64;
            setFormlist(shareholdingdetails)
        } else {
            const shareholdingdetails = [...Formlist];
            shareholdingdetails[index]['shareholdingdetails'][shareholdingdetailsindex][name] = value;
            setFormlist(shareholdingdetails)

        }


    }

    const onChangeonsearch = (event) => {
        const { name, value, data } = event.target;
        setCompanySecurityHolderPersonalDetails(value);
        setCompanySecurityHolderPersonalDetailslabel(data?.label)
        getDirectorsDetails(value);
        // setFormlist([]);
    }

    useEffect(() => {

        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = Formlist;
        console.log("data console++", data);
        props?.onChange(data)

    }, [SecurityHolder, Formlist])

    useEffect(() => {
        if (Formlist && Object.keys(Formlist).length > 0) {
            setAutoData({
                ...autoData,
                Numberofshares: totalshares,
                FaceValue: 10,
            })

        }
    }, [Formlist]);

    useEffect(() => {
        if (props?.dynamicFormValues?.NameoftheShareholdertowhomsharecertificateisproposedtobegiven && props?.dynamicFormValues?.NameofSecurity && !agenda_req_id) {

            getDirectorsDetails(props?.dynamicFormValues?.NameoftheShareholdertowhomsharecertificateisproposedtobegiven, props?.dynamicFormValues?.NameofSecurity)
        }
    }, [props?.dynamicFormValues?.NameoftheShareholdertowhomsharecertificateisproposedtobegiven, props?.dynamicFormValues?.NameofSecurity, agenda_req_id])

    useEffect(() => {
        if (props?.dynamicFormValues?.[props.name + 'ext']) {
            if (typeof props?.dynamicFormValues?.[props.name + 'ext'] != 'object') {
                const data = JSON.parse(props?.dynamicFormValues?.[props.name + 'ext']);
                console.log("chk+ data", data);
                setFormlist(data);
            }
        }
    }, [props?.dynamicFormValues?.[props.name + 'ext']])

    const handleOnInputChange = async (event, index, optionindex, obj) => {
        const { name, files, data, value } = event.target
        const list = [...formvalue];
        console.log('formvalueformvalueformvalueformvalue', list[index][optionindex])
        if (obj == 6) {
            const base64 = await convertToBase64(files[0]);
            list[index]['shareholdingdetails'][optionindex]['value'] = files[0]?.name;
            list[index]['shareholdingdetails'][optionindex]['document'] = base64;
            setFormlist(list)
        } else {
            list[index]['shareholdingdetails'][optionindex]['value'] = value.toString();
            setFormlist(list)
        }
    };

    console.log("Formlist+-", Formlist);
    return (<>

        <Col xs={12}>
            <div className="sectioninnerbox px-0 mt-2 py-2">
                <Table responsive className="tabletyp1 " border={'1px solid'} ref={SecurityHolder}>
                    <thead>
                        <tr>
                            <th >Name of the Shareholder</th>
                            <th rowSpan={2}>No. of Equity Shares </th>
                            <th rowSpan={2}>Regd. Folio No</th>
                            <th rowSpan={2}>Certificate No.</th>
                            <th colSpan={2}><center>Distinctive No</center></th>
                        </tr>
                        <tr>
                            <th><center>From</center></th>
                            <th colSpan={2}><center>To</center></th>
                            <th>Face Value</th>
                            <th>Stamp duty to be paid on share certificate</th>
                            {/* <th>Date of payment of Stamp duty</th>                         */}
                            {/* <th>Date of issue of share certificate</th>                         */}
                            <th>File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Formlist && Formlist?.map((directorslist, index) => {
                            return (<>
                                {directorslist && directorslist?.shareholdingdetails?.map((shareholdingdetails, shareholdingdetailsindex) => {
                                    var totalvalue1 = shareholdingdetails?.face_value * shareholdingdetails?.number_of_shares_allotted;
                                    var stampduty1 = (totalvalue1 / 100) * 0.005;
                                    return (<>
                                        <tr>
                                            <td>{shareholdingdetails?.sc_name}</td>
                                            <td>{shareholdingdetails?.number_of_shares_allotted}</td>
                                            {/* <td>{shareholdingdetails?.folio_number}</td> */}
                                            <td><Form.Control type="text" name="folio_number" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={shareholdingdetails?.folio_number} /></td>
                                            <td><Form.Control type="text" name="certificate_number" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={shareholdingdetails?.certificate_number} /></td>
                                            <td><center><Form.Control type="text" name="distinctive_number_from" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={shareholdingdetails?.distinctive_number_from} /></center></td>
                                            <td><center><Form.Control type="text" name="distinctive_number_to" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={shareholdingdetails?.distinctive_number_to} /></center></td>
                                            <td><Form.Control type="text" name="face_value" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={shareholdingdetails?.face_value} /></td>
                                            <td><Form.Control type="text" name="Stampdutytobepaidonsharecertificate" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={stampduty1} /></td>
                                            {/* <td><Form.Control type="date" name="date_of_payment_of_stamp_duty" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={shareholdingdetails?.date_of_payment_of_stamp_duty} /></td> */}
                                            {/* <td><Form.Control type="date" name="date_of_issue_of_share_certificate" onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex)} value={shareholdingdetails?.date_of_issue_of_share_certificate} /></td> */}
                                            <td>
                                                <FileUploadUi
                                                    index={shareholdingdetailsindex}
                                                    name='request_document'
                                                    onChange={(e) => handleChangeShares(e, index, shareholdingdetailsindex, 6)}
                                                    document={shareholdingdetails?.request_document}
                                                />
                                            </td>
                                        </tr> </>)
                                })}
                            </>);
                            return (<></>)
                        })}

                    </tbody>
                </Table>
            </div>

        </Col>
    </>)
}
export const AuthorisedCapital = (props) => {

    const toWords = new ToWords();
    const [nameOfSecuritys, setNameOfSecurity] = useState('');
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();
    const [formdata, setFormdata] = useState({
        equitytotalshares: "",
        equitytotalfacevalue: "",
        equitytotalvalue: "",
        totalshareswords: "",
        totalfacevaluewords: "",
        totalamountwords: "",
    });

    const [formDataEdit, setFormDataEdit] = useState({
        equitytotalsharesedit: "",
        equitytotalfacevalueedit: "",
        equitytotalvalueedit: "",
        totalshareswordsedit: "",
        totalfacevaluewordsedit: "",
        totalamountwordsedit: "",
    });

    const [Formlist, setFormlist] = useState([]);
    const [FormlistEdit, setFormlistEdit] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const SecurityHolder = useRef('');
    console.log("authprops+", props);
    const getAuthorizedCapital = ((type, id) => {
        try {
            const headerPyalod = getNormalHeaders();
            setIsLoading(true);
            const response = axios.get(`/api/v1/company/get_authorized_capital/${btoa(type)}`, headerPyalod)
                .then((response) => {
                    if (response?.data?.status == true) {
                        setFormlist(response?.data?.CompanyCapitalStructure);
                        setFormlistEdit(response?.data?.CompanyCapitalStructure);
                    }
                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.response) {
                        setIsLoading(false)
                        console.log(error.response);


                    } else if (error.request) {
                        setIsLoading(false)
                        console.log(error.response);

                    } else {
                        setIsLoading(false)
                    }
                });

        } catch (err) {
            setIsLoading(false)
            console.log('err', err);

        }
    })

    // useEffect(() => {
    //     const data = {
    //         target: {
    //             name: '',
    //             value: ''
    //         }
    //     };
    //     var x = [];
    //     x['data'] = FormlistEdit;
    //     x['dataedit'] = formDataEdit;
    //     x['dataform'] = formDataEdit;
    //     x['table'] = SecurityHolder?.current;
    //     data['target']['name'] = props?.name
    //     data['target']['value'] = SecurityHolder?.current;
    //     data['target']['data'] = x;
    //     props?.onChange(data)

    // }, [SecurityHolder, nameOfSecuritys, FormlistEdit, Formlist, formdata, formDataEdit])
    useEffect(() => {

        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = FormlistEdit;
        data['target']['sdata'] = formdata;
        data['target']['edata'] = formDataEdit;
        console.log("data console++", data);
        props?.onChange(data)

    }, [SecurityHolder, FormlistEdit, nameOfSecuritys, Formlist, formdata, formDataEdit])

    var shares = [];
    var sharesedit = [];
    var facevalue = [];
    var facevalueedit = [];
    var amount = [];
    var amountedit = [];
    var i = 0;

    Formlist && Formlist?.map((data, dataindex) => {
        data?.company_capital_structure && data?.company_capital_structure?.map((value, valueindex) => {
            // console.log('facevalue :>> ', value);
            i++;
            shares[i] = value?.number_of_shares;
            facevalue[0] = value?.face_value;
            amount[i] = value?.total_equity_amt;
        })
    })

    var k = 0;
    FormlistEdit && FormlistEdit?.map((data, dataindex) => {
        data?.company_capital_structure && data?.company_capital_structure?.map((value, valueindex) => {
            console.log("value++----88", value?.face_value);
            k++;
            sharesedit[k] = value?.number_of_shares_1 ? value?.number_of_shares_1 : value?.number_of_shares;
            facevalueedit[k] = value?.face_value_1 ? value?.face_value_1 : value?.face_value;
            amountedit[k] = sharesedit[k] * facevalueedit[k];
            // amountedit[i] = value?.total_equity_amt_1 ? value?.total_equity_amt_1 : value?.total_equity_amt;
        })
    })

    const totalshares = shares.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalfacevalue = facevalue.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalamount = amount.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalsharesedit = sharesedit.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalfacevalueedit = facevalueedit.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalamountedit = amountedit.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    console.log('totalshares :>> ', totalamountedit);

    // useEffect(() => {

    // },[FormlistEdit])

    const totalshareswords = toWords.convert(totalshares);
    const totalfacevaluewords = toWords.convert(totalfacevalue);
    const totalamountwords = toWords.convert(totalamount);

    const totalshareswordsedit = toWords.convert(totalsharesedit + props?.addClassTotal?.shares);
    const totalfacevaluewordsedit = toWords.convert(totalfacevalueedit + props?.addClassTotal?.face_value);
    const totalamountwordsedit = toWords.convert(totalamountedit + props?.addClassTotal?.total_amount);

    useEffect(() => {
        if (Formlist && Object.keys(Formlist).length > 0) {
            setFormdata({
                ...formdata,
                equitytotalshares: totalshares,
                equitytotalfacevalue: totalfacevalue,
                equitytotalvalue: totalamount,
                totalshareswords: totalshareswords,
                totalfacevaluewords: totalfacevaluewords,
                totalamountwords: totalamountwords,
            })
        }
        if (FormlistEdit && Object.keys(FormlistEdit).length > 0) {

            setFormDataEdit({
                ...formDataEdit,
                equitytotalsharesedit: totalsharesedit + props?.addClassTotal?.shares,
                equitytotalfacevalueedit: totalfacevalueedit + props?.addClassTotal?.face_value,
                equitytotalvalueedit: totalamountedit + props?.addClassTotal?.total_amount,
                totalshareswordsedit: totalshareswordsedit,
                totalfacevaluewordsedit: totalfacevaluewordsedit,
                totalamountwordsedit: totalamountwordsedit,
            })
        }

    }, [Formlist, FormlistEdit, props?.addClassTotal?.shares, props?.addClassTotal?.face_value, props?.addClassTotal?.total_amount]);

    useEffect(() => {
        if (props?.defaultvalue && props?.defaultvalue != "" && !agenda_req_id) {
            setNameOfSecurity(props?.defaultvalue);
            getAuthorizedCapital(props?.defaultvalue);
        }
    }, [props?.defaultvalue]);
    useEffect(() => {
        if (props?.dynamicFormValues?.Typeofsecurity && !agenda_req_id) {
            let dvalue = 1;
            dvalue = (props?.dynamicFormValues?.Typeofsecurity == 'Equity') ? 1 : 2;
            dvalue = (props?.dynamicFormValues?.Typeofsecurity == 'Equity & Preference') ? 3 : dvalue;
            setNameOfSecurity(dvalue);
            getAuthorizedCapital(dvalue);
        }
    }, [props?.dynamicFormValues?.Typeofsecurity]);

    const handleOnInputChange = (event) => {
        const { name, value } = event.target;
        setNameOfSecurity(value);
        getAuthorizedCapital(value);
    }


    const handleChangeSharesin = (e, dataindex, valueindex) => {
        const { name, value } = e.target;
        const list = [...FormlistEdit];
        if (name == 'class_type') {
            list[dataindex]['company_capital_structure'][valueindex]['class_type_1'] = value;
        }
        if (name == 'number_of_shares') {
            list[dataindex]['company_capital_structure'][valueindex]['number_of_shares_1'] = value;
        }
        if (name == 'face_value') {
            list[dataindex]['company_capital_structure'][valueindex]['face_value_1'] = value;
        }
        if (name == 'total_equity_amt') {
            list[dataindex]['company_capital_structure'][valueindex]['total_equity_amt_1'] = value;
        }
        console.log('list :>> ', list);
        setFormlistEdit(list)
    }
    useEffect(() => {
        if (props?.dynamicFormValues?.[props.name + 'ext']) {
            if (typeof props?.dynamicFormValues?.[props.name + 'ext'] != 'object') {
                const data = JSON.parse(props?.dynamicFormValues?.[props.name + 'ext']);
                console.log("chk+ data", data);
                setFormlistEdit(data);
                setFormlist(data);
            }
        }
    }, [props?.dynamicFormValues?.[props.name + 'ext']])
    console.log('FormlistEdit :>> ', formdata);

    var i = 0;

    return (<>


        {/* <Col xs={12}>
            <SelectValField
                required
                label={'Type of Security'}
                name={'type_of_security'}
                options={listedoptiondetails}
                onChange={handleOnInputChange}
                value={nameOfSecuritys}
            />
        </Col> */}

        <div className="bodymaincontainer pt-1">
            <Container>
                <div className="innercontainer">
                    <Row>
                        <Col xs={12}>
                            <div className="sectioninnerbox mt-2 px-2 py-1 mb-3">
                                <Table responsive className="tabletyp1" border={'1px solid'}>
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Class</th>
                                            <th>Number of Shares  </th>
                                            <th>Face Value </th>
                                            <th>Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {FormlistEdit && FormlistEdit?.map((data, dataindex) => {
                                            return (
                                                <>
                                                    {data?.company_capital_structure && data?.company_capital_structure?.map((value, valueindex) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{data?.constant_data_master?.label}  </td>

                                                                    <td>
                                                                        {(value?.class_type_1) ? value?.class_type_1 : value?.class_type}
                                                                    </td>
                                                                    <td>
                                                                        <Form.Control type="text" name="number_of_shares"
                                                                            onChange={(e) => handleChangeSharesin(e, dataindex, valueindex)}
                                                                            value={(value?.number_of_shares_1) ? value?.number_of_shares_1 : value?.number_of_shares} />
                                                                    </td>
                                                                    <td>
                                                                        {(value?.face_value_1) ? value?.face_value_1 : value?.face_value}
                                                                    </td>
                                                                    <td>
                                                                        {amountedit[++i]}
                                                                        {/* <Form.Control type="text" name="total_equity_amt"
                                                                        onChange={(e) => handleChangeSharesin(e, dataindex, valueindex)}
                                                                        value={amountedit[++i]} /> */}
                                                                    </td>
                                                                    {/* <td>{value?.class_type} </td>
                                                                    <td>{value?.number_of_shares}</td>
                                                                    <td>{value?.face_value}</td>
                                                                    <td>{value?.total_equity_amt}</td> */}
                                                                </tr>
                                                            </>
                                                        )

                                                    })}
                                                </>
                                            )
                                        })}
                                        <tr>
                                            <td>Total</td>
                                            <td></td>
                                            <td>{totalsharesedit + props?.addClassTotal?.shares}</td>
                                            <td>{totalfacevalueedit + props?.addClassTotal?.face_value}</td>
                                            <td>{totalamountedit + props?.addClassTotal?.total_amount}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    </>)
}
export const AuthorisedCapitalData = (props) => {

    const toWords = new ToWords();

    const { agenda_req_id } = useParams();
    const [Formlist, setFormlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const SecurityHolder = useRef('');

    const getAuthorizedCapital = ((type, id) => {
        try {
            const headerPyalod = getNormalHeaders();
            setIsLoading(true);
            const response = axios.get(`/api/v1/company/get_authorized_capital/${btoa(type)}`, headerPyalod)
                .then((response) => {
                    if (response?.data?.status == true) {
                        setFormlist(response?.data?.CompanyCapitalStructure);
                    }
                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.response) {
                        setIsLoading(false)
                        console.log(error.response);


                    } else if (error.request) {
                        setIsLoading(false)
                        console.log(error.response);

                    } else {
                        setIsLoading(false)
                    }
                });

        } catch (err) {
            setIsLoading(false)
            console.log('err', err);

        }
    })

    useEffect(() => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        var x = [];
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = Formlist;
        props?.onChange(data)

    }, [SecurityHolder, Formlist])

    var shares = [];
    var sharesedit = [];
    var facevalue = [];
    var facevalueedit = [];
    var amount = [];
    var amountedit = [];
    var i = 0;
    Formlist && Formlist?.map((data, dataindex) => {
        data?.company_capital_structure && data?.company_capital_structure?.map((value, valueindex) => {
            console.log('facevalue :>> ', value);
            i++;
            shares[i] = value?.number_of_shares;
            facevalue[0] = value?.face_value;
            amount[i] = value?.total_equity_amt;
        })
    })

    useEffect(() => {
        if (props?.defaultvalue && props?.defaultvalue != "" && !agenda_req_id) {

            getAuthorizedCapital(props?.defaultvalue);
        }
    }, [props?.defaultvalue]);

    useEffect(() => {
        if (props?.dynamicFormValues?.[props.name + 'ext']) {
            if (typeof props?.dynamicFormValues?.[props.name + 'ext'] != 'object') {
                const data = JSON.parse(props?.dynamicFormValues?.[props.name + 'ext']);
                console.log("chk+ data", data);
                setFormlist(data);
            }
        }
    }, [props?.dynamicFormValues?.[props.name + 'ext']])

    const totalshares = shares.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalfacevalue = facevalue.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalamount = amount.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalsharesedit = sharesedit.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalfacevalueedit = facevalueedit.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalamountedit = amountedit.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);

    var i = 0;
    console.log("authdata++", props?.dynamicFormValues)
    return (<>

        <div className="bodymaincontainer pt-1">
            <Container>
                <div className="innercontainer">
                    <Row>
                        <Col xs={12}>
                            <div className="sectioninnerbox mt-2 px-2 py-1 mb-3">
                                <Table responsive className="tabletyp1" border={'1px solid'}>
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Class</th>
                                            <th>Number of Shares  </th>
                                            <th>Face Value </th>
                                            <th>Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Formlist && Formlist?.map((data, dataindex) => {
                                            return (
                                                <>
                                                    {data?.company_capital_structure && data?.company_capital_structure?.map((value, valueindex) => {
                                                        // totalfacevalue = 10;
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{data?.constant_data_master?.label}  </td>
                                                                    <td>{value?.class_type} </td>
                                                                    <td>{value?.number_of_shares}</td>
                                                                    <td>{value?.face_value}</td>
                                                                    <td>{value?.total_equity_amt}</td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                                </>
                                            )
                                        })}
                                        <tr>
                                            <td>Total</td>
                                            <td></td>
                                            <td>{totalshares}</td>
                                            <td>{totalfacevalue}</td>
                                            <td>{totalamount}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        {/* <Col xs={4}>
                            <Form.Label>Total Shares </Form.Label>
                            <Form.Control type="text" name="equitytotalshares" value={formdata?.equitytotalshares} />
                        </Col>
                        <Col xs={8}>
                            <Form.Label>Total Shares in Words </Form.Label>
                            <Form.Control type="text" name="totalshareswords" value={formdata?.totalshareswords} />
                        </Col>
                        <Col xs={4}>
                            <Form.Label>Total Facevalue </Form.Label>
                            <Form.Control type="text" name="equitytotalfacevalue" value={formdata?.equitytotalfacevalue} />
                        </Col>
                        <Col xs={8}>
                            <Form.Label>Total Facevalue in Words </Form.Label>
                            <Form.Control type="text" name="totalfacevaluewords" value={formdata?.totalfacevaluewords} />
                        </Col>
                        <Col xs={4}>
                            <Form.Label>Total Value </Form.Label>
                            <Form.Control type="text" name="equitytotalvalue" value={formdata?.equitytotalvalue} />
                        </Col>
                        <Col xs={8}>
                            <Form.Label>Total Amount in Words </Form.Label>
                            <Form.Control type="text" name="totalamountwords" value={formdata?.totalamountwords} />
                        </Col> */}
                    </Row>
                </div>
            </Container>
        </div>
    </>)
}
export const AuthorisedCapital1 = (props) => {

    const toWords = new ToWords();
    const [nameOfSecuritys, setNameOfSecurity] = useState('');
    const [formdata, setFormdata] = useState({
        equitytotalshares: "",
        equitytotalfacevalue: "",
        equitytotalvalue: "",
        totalshareswords: "",
        totalfacevaluewords: "",
        totalamountwords: "",
    });

    const [formDataEdit, setFormDataEdit] = useState({
        equitytotalsharesedit: "",
        equitytotalfacevalueedit: "",
        equitytotalvalueedit: "",
        totalshareswordsedit: "",
        totalfacevaluewordsedit: "",
        totalamountwordsedit: "",
    });

    const [Formlist, setFormlist] = useState([]);
    const [FormlistEdit, setFormlistEdit] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const SecurityHolder = useRef('');
    const listedoptiondetails = [
        { label: "Equity", value: 1 },
        { label: "Preference", value: 2 },
        { label: "Equity & Preference", value: 3 },
    ];

    const getAuthorizedCapital = ((type, id) => {
        try {
            const headerPyalod = getNormalHeaders();
            setIsLoading(true);
            const response = axios.get(`/api/v1/company/get_authorized_capital/${btoa(type)}`, headerPyalod)
                .then((response) => {
                    if (response?.data?.status == true) {
                        setFormlist(response?.data?.CompanyCapitalStructure);
                        setFormlistEdit(response?.data?.CompanyCapitalStructure);
                    }
                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.response) {
                        setIsLoading(false)
                        console.log(error.response);


                    } else if (error.request) {
                        setIsLoading(false)
                        console.log(error.response);

                    } else {
                        setIsLoading(false)
                    }
                });

        } catch (err) {
            setIsLoading(false)
            console.log('err', err);

        }
    })

    useEffect(() => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        var x = [];
        x['data'] = formdata;
        x['dataedit'] = formDataEdit;
        x['table'] = SecurityHolder?.current;
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = x;
        props?.onChange(data)

    }, [SecurityHolder, nameOfSecuritys, FormlistEdit, Formlist, formdata, formDataEdit])


    var shares = [];
    var sharesedit = [];
    var facevalue = [];
    var facevalueedit = [];
    var amount = [];
    var amountedit = [];
    var i = 0;

    Formlist && Formlist?.map((data, dataindex) => {
        data?.company_capital_structure && data?.company_capital_structure?.map((value, valueindex) => {
            // console.log('facevalue :>> ', value);
            i++;
            shares[i] = value?.number_of_shares;
            facevalue[0] = value?.face_value;
            amount[i] = value?.total_equity_amt;
        })
    })

    var i = 0;
    FormlistEdit && FormlistEdit?.map((data, dataindex) => {
        data?.company_capital_structure && data?.company_capital_structure?.map((value, valueindex) => {
            i++;
            sharesedit[i] = value?.number_of_shares_1 ? value?.number_of_shares_1 : value?.number_of_shares;
            facevalueedit[0] = value?.face_value_1 ? value?.face_value_1 : value?.face_value;
            amountedit[i] = sharesedit[i] * facevalueedit[0];
            // amountedit[i] = value?.total_equity_amt_1 ? value?.total_equity_amt_1 : value?.total_equity_amt;
        })
    })

    const totalshares = shares.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalfacevalue = facevalue.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalamount = amount.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalsharesedit = sharesedit.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalfacevalueedit = facevalueedit.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    const totalamountedit = amountedit.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);
    console.log('totalshares :>> ', amountedit);

    // useEffect(() => {

    // },[FormlistEdit])

    const totalshareswords = toWords.convert(totalshares);
    const totalfacevaluewords = toWords.convert(totalfacevalue);
    const totalamountwords = toWords.convert(totalamount);

    const totalshareswordsedit = toWords.convert(totalsharesedit);
    const totalfacevaluewordsedit = toWords.convert(totalfacevalueedit);
    const totalamountwordsedit = toWords.convert(totalamountedit);

    useEffect(() => {
        if (Formlist && Object.keys(Formlist).length > 0) {
            setFormdata({
                ...formdata,
                equitytotalshares: totalshares,
                equitytotalfacevalue: totalfacevalue,
                equitytotalvalue: totalamount,
                totalshareswords: totalshareswords,
                totalfacevaluewords: totalfacevaluewords,
                totalamountwords: totalamountwords,
            })
        }
        if (FormlistEdit && Object.keys(FormlistEdit).length > 0) {

            setFormDataEdit({
                ...formDataEdit,
                equitytotalsharesedit: totalsharesedit,
                equitytotalfacevalueedit: totalfacevalueedit,
                equitytotalvalueedit: totalamountedit,
                totalshareswordsedit: totalshareswordsedit,
                totalfacevaluewordsedit: totalfacevaluewordsedit,
                totalamountwordsedit: totalamountwordsedit,
            })
        }

    }, [Formlist, FormlistEdit]);

    useEffect(() => {
        if (props?.defaultvalue && props?.defaultvalue != "") {
            setNameOfSecurity(props?.defaultvalue);
            getAuthorizedCapital(props?.defaultvalue);
        }
    }, [props?.defaultvalue]);

    const handleOnInputChange = (event) => {
        const { name, value } = event.target;
        setNameOfSecurity(value);
        getAuthorizedCapital(value);
    }


    const handleChangeSharesin = (e, dataindex, valueindex) => {
        const { name, value } = e.target;
        const list = [...FormlistEdit];
        if (name == 'class_type') {
            list[dataindex]['company_capital_structure'][valueindex]['class_type_1'] = value;
        }
        if (name == 'number_of_shares') {
            list[dataindex]['company_capital_structure'][valueindex]['number_of_shares_1'] = value;
        }
        if (name == 'face_value') {
            list[dataindex]['company_capital_structure'][valueindex]['face_value_1'] = value;
        }
        if (name == 'total_equity_amt') {
            list[dataindex]['company_capital_structure'][valueindex]['total_equity_amt_1'] = value;
        }
        console.log('list :>> ', list);
        setFormlistEdit(list)
    }

    console.log('FormlistEdit :>> ', FormlistEdit);

    var i = 0;

    return (<>


        <Col xs={12}>
            <SelectValField
                required
                label={'Type of Security'}
                name={'type_of_security'}
                options={listedoptiondetails}
                onChange={handleOnInputChange}
                value={nameOfSecuritys}
            />
        </Col>

        <div className="bodymaincontainer pt-1">
            <Container>
                <div className="innercontainer">
                    <Row>
                        <Col xs={12}>
                            <div className="sectioninnerbox mt-2 px-2 py-1 mb-3">
                                <Table responsive className="tabletyp1" border={'1px solid'}>
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Class</th>
                                            <th>Number of Shares  </th>
                                            <th>Face Value </th>
                                            <th>Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Formlist && Formlist?.map((data, dataindex) => {
                                            return (
                                                <>
                                                    {data?.company_capital_structure && data?.company_capital_structure?.map((value, valueindex) => {
                                                        // totalfacevalue = 10;
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{data?.constant_data_master?.label}  </td>
                                                                    <td>{value?.class_type} </td>
                                                                    <td>{value?.number_of_shares}</td>
                                                                    <td>{value?.face_value}</td>
                                                                    <td>{value?.total_equity_amt}</td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                                </>
                                            )
                                        })}
                                        <tr>
                                            <td>Total</td>
                                            <td></td>
                                            <td>{totalshares}</td>
                                            <td>{totalfacevalue}</td>
                                            <td>{totalamount}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        {/* <Col xs={4}>
                            <Form.Label>Total Shares </Form.Label>
                            <Form.Control type="text" name="equitytotalshares" value={formdata?.equitytotalshares} />
                        </Col>
                        <Col xs={8}>
                            <Form.Label>Total Shares in Words </Form.Label>
                            <Form.Control type="text" name="totalshareswords" value={formdata?.totalshareswords} />
                        </Col>
                        <Col xs={4}>
                            <Form.Label>Total Facevalue </Form.Label>
                            <Form.Control type="text" name="equitytotalfacevalue" value={formdata?.equitytotalfacevalue} />
                        </Col>
                        <Col xs={8}>
                            <Form.Label>Total Facevalue in Words </Form.Label>
                            <Form.Control type="text" name="totalfacevaluewords" value={formdata?.totalfacevaluewords} />
                        </Col>
                        <Col xs={4}>
                            <Form.Label>Total Value </Form.Label>
                            <Form.Control type="text" name="equitytotalvalue" value={formdata?.equitytotalvalue} />
                        </Col>
                        <Col xs={8}>
                            <Form.Label>Total Amount in Words </Form.Label>
                            <Form.Control type="text" name="totalamountwords" value={formdata?.totalamountwords} />
                        </Col> */}
                    </Row>
                </div>
                <div className="innercontainer">
                    <Row>
                        <Col xs={12}>
                            <div className="sectioninnerbox mt-2 px-2 py-1 mb-3">
                                <Table responsive className="tabletyp1" border={'1px solid'}>
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Class</th>
                                            <th>Number of Shares  </th>
                                            <th>Face Value </th>
                                            <th>Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {FormlistEdit && FormlistEdit?.map((data, dataindex) => {
                                            return (
                                                <>
                                                    {data?.company_capital_structure && data?.company_capital_structure?.map((value, valueindex) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{data?.constant_data_master?.label}  </td>

                                                                    <td><Form.Control type="text" name="class_type"
                                                                        onChange={(e) => handleChangeSharesin(e, dataindex, valueindex)}
                                                                        value={(value?.class_type_1) ? value?.class_type_1 : value?.class_type} /></td>
                                                                    <td><Form.Control type="text" name="number_of_shares"
                                                                        onChange={(e) => handleChangeSharesin(e, dataindex, valueindex)}
                                                                        value={(value?.number_of_shares_1) ? value?.number_of_shares_1 : value?.number_of_shares} /></td>
                                                                    <td><Form.Control type="text" name="face_value"
                                                                        onChange={(e) => handleChangeSharesin(e, dataindex, valueindex)}
                                                                        value={(value?.face_value_1) ? value?.face_value_1 : value?.face_value} /></td>
                                                                    <td><Form.Control type="text" name="total_equity_amt"
                                                                        onChange={(e) => handleChangeSharesin(e, dataindex, valueindex)}
                                                                        value={amountedit[++i]} /></td>
                                                                    {/* <td>{value?.class_type} </td>
                                                                    <td>{value?.number_of_shares}</td>
                                                                    <td>{value?.face_value}</td>
                                                                    <td>{value?.total_equity_amt}</td> */}
                                                                </tr>
                                                            </>
                                                        )

                                                    })}
                                                </>
                                            )
                                        })}
                                        <tr>
                                            <td>Total</td>
                                            <td></td>
                                            <td>{totalsharesedit}</td>
                                            <td>{totalfacevalueedit}</td>
                                            <td>{totalamountedit}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    </>)
}

export const DirectorApp = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();
    let url;
    if (props?.ref_table_alias) {
        url = `/requestagendaservice/directors/${btoa(props?.agenda_id)}/${btoa(props?.sub_agenda_id)}/${agenda_req_id}/${btoa(props?.dynamicFormValues[props?.ref_table_alias])}`;
    } else {
        url = `/requestagendaservice/director/${btoa(props?.agenda_id)}/${btoa(props?.sub_agenda_id)}`;
    }
    const defaultvalue = props?.defaultvalue
    console.log('DirectorApp', props);
    if (defaultvalue == 'directorelist') {
        return <DirectorList {...props} />
    } else {
        return (<>
            <Col xs={4}>
                <Form.Group className={"mb-3"}>
                    {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                    {props?.icon != false ? props?.required && <sup>*</sup> : ('')}
                    {props?.ids?.directoreid ? (<><Button as={Link}
                        href={`/requestagendaservice/director/${btoa(props?.agenda_id)}/${btoa(props?.sub_agenda_id)}/${agenda_req_id}/${btoa(props?.ids?.directoreid)}`}
                        to={`/requestagendaservice/director/${btoa(props?.agenda_id)}/${btoa(props?.sub_agenda_id)}/${agenda_req_id}/${btoa(props?.ids?.directoreid)}`}
                        variant="dark">
                        {'Add Personal Details of the Director'}
                    </Button></>) : (<><Button as={Link}
                        href={url}
                        to={url}
                        variant="dark">
                        {'Add Personal Details of the Director'}
                    </Button></>)}

                    {props?.required && (<Form.Control.Feedback type="invalid">
                        Please enter {props?.label}
                    </Form.Control.Feedback>)}
                </Form.Group>
            </Col>
        </>)
    }
}

export const TermsAndConditions = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();
    console.log('TermsAndConditions', props?.agendaRequest)
    return (<>
        <Col xs={4}>
            <Form.Group className={"mb-3"}>
                {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                {props?.icon != false ? props?.required && <sup>*</sup> : ('')}
                {props?.agendaRequest?.reference_model?.id ? (<><Button as={Link}
                    href={`/requestagendaservice/clientonboarding/capitalstructure/sharecapital/issuedcapital/termsandconditions/${btoa(props?.agenda_id)}/${btoa(props?.sub_agenda_id)}/${agenda_req_id}/${btoa(props?.agendaRequest?.reference_model?.id)}`}
                    to={`/requestagendaservice/clientonboarding/capitalstructure/sharecapital/issuedcapital/termsandconditions/${btoa(props?.agenda_id)}/${btoa(props?.sub_agenda_id)}/${agenda_req_id}/${btoa(props?.agendaRequest?.reference_model?.id)}`}
                    variant="dark">
                    {'Issued Capital: Terms & Conditions'}
                </Button></>) : (<><Button as={Link}
                    href={`/requestagendaservice/clientonboarding/capitalstructure/sharecapital/issuedcapital/termsandconditions/${btoa(props?.agenda_id)}/${btoa(props?.sub_agenda_id)}`}
                    to={`/requestagendaservice/clientonboarding/capitalstructure/sharecapital/issuedcapital/termsandconditions/${(btoa(props?.agenda_id))}/${btoa(props?.sub_agenda_id)}`}
                    variant="dark">
                    {'Issued Capital: Terms & Conditions'}
                </Button></>)}

                {props?.required && (<Form.Control.Feedback type="invalid">
                    Please enter {props?.label}
                </Form.Control.Feedback>)}
            </Form.Group>
        </Col>
    </>)
}

export const Auditors = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const { dirc_personaldetails_id, type_of_request, agenda_req_id, sub_agenda_id, agenda_id } = useParams();
    console.log('DirectorApp', props);
    let tabname = '';
    if (props?.sub_agenda_name == 'Internal Auditor Employee of the Company') {
        tabname = 'internal'
    }
    if (props?.sub_agenda_name == 'Secretarial Auditor') {
        tabname = 'secretarial'
    }
    if (props?.sub_agenda_name == 'Cost Auditor') {
        tabname = 'cost'
    }
    if (props?.sub_agenda_name == 'Internal Auditor  External Professional') {
        tabname = 'internal'
    }
    if (props?.sub_agenda_name == 'Appointment of Statutory auditor') {
        tabname = 'statutory'
    }

    return (<>
        <Col xs={4}>
            <Form.Group className={"mb-3"}>
                {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                {props?.icon != false ? props?.required && <sup>*</sup> : ('')}
                <br />

                {props?.ids?.auditors?.id ? (<><Button as={Link}
                    href={`/requestagendaservice/auditortypes/${type_of_request}/${btoa(props?.agenda_id)}/${btoa(props?.sub_agenda_id)}/${agenda_req_id}/${btoa(props?.ids?.auditors?.id)}/${tabname}`}
                    to={`/requestagendaservice/auditortypes/${type_of_request}/${btoa(props?.agenda_id)}/${btoa(props?.sub_agenda_id)}/${agenda_req_id}/${btoa(props?.ids?.auditors?.id)}/${tabname}`}
                    variant="dark">
                    {'Add Auditors Details'}
                </Button></>) : (<><Button as={Link}
                    href={`/requestagendaservice/auditortypes/${type_of_request}/${(props?.agenda_id)}/${(props?.sub_agenda_id)}/${tabname}`}
                    to={`/requestagendaservice/auditortypes/${type_of_request}/${(btoa(props?.agenda_id))}/${(btoa(props?.sub_agenda_id))}/${tabname}`}
                    variant="dark">
                    {'Add Auditors Details'}
                </Button></>)}

                {props?.required && (<Form.Control.Feedback type="invalid">
                    Please enter {props?.label}
                </Form.Control.Feedback>)}
            </Form.Group>
        </Col>
    </>)
}

export const Loans = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const { type_of_request, sub_agenda_id, agenda_id } = useParams();
    console.log('Loans and Investment', props);
    let tabname = props?.defaultvalue
    if (!tabname) {
        tabname = 'given';
    }

    return (<>
        <Col xs={4}>
            <Form.Group className={"mb-3"}>
                {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                {props?.icon != false ? props?.required && <sup>*</sup> : ('')}
                <br />
                {props?.agendaRequest?.reference_model_id ? <Button as={Link}
                    to={`/requestagendaservice/loans/lenderorloandetails/${tabname}/${type_of_request}/${(btoa(props?.agenda_id))}/${(btoa(props?.sub_agenda_id))}/${(btoa(props?.agendaRequest?.reference_model_id))}`}
                    variant="dark">
                    {'Edit Loans Details'}
                </Button> : <Button as={Link}
                    to={`/requestagendaservice/loans/lenderorloandetails/${tabname}/${type_of_request}/${(btoa(props?.agenda_id))}/${(btoa(props?.sub_agenda_id))}`}
                    variant="dark">
                    {'Add Loans Details'}
                </Button>}




                {props?.required && (<Form.Control.Feedback type="invalid">
                    Please enter {props?.label}
                </Form.Control.Feedback>)}
            </Form.Group>
        </Col>
    </>)
}

export const Investments = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const { type_of_request, sub_agenda_id, agenda_id } = useParams();
    console.log('Investments props', props);


    return (<>
        <Col xs={4}>
            <Form.Group className={"mb-3"}>
                {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                {props?.icon != false ? props?.required && <sup>*</sup> : ('')}
                <br />
                {props?.agendaRequest?.reference_model_id ? <Button as={Link}
                    to={`/requestagendaservice/investment/addeditinvestmentdetails/${type_of_request}/${(btoa(props?.agenda_id))}/${(btoa(props?.sub_agenda_id))}/${(btoa(props?.agendaRequest?.reference_model_id))}`}
                    variant="dark">
                    {'Edit Investment Details'}
                </Button> : <Button as={Link}
                    to={`/requestagendaservice/investment/addeditinvestmentdetails/${type_of_request}/${(btoa(props?.agenda_id))}/${(btoa(props?.sub_agenda_id))}`}
                    variant="dark">
                    {'Add Investment Details'}
                </Button>}




                {props?.required && (<Form.Control.Feedback type="invalid">
                    Please enter {props?.label}
                </Form.Control.Feedback>)}
            </Form.Group>
        </Col>
    </>)
}


export const FinalDividendCalculationSheet = (props) => {
    // dd('props:',props);
    const [showFinalDividendCalSheetModal, setFinalDividendCalSheetModal] = useState(false);
    const hideFinalDividendCalSheetModal = () => setFinalDividendCalSheetModal(false)
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const company_id = sessionStorage.getItem("company_id")
    const handleShowFinalDividendSheetModal = () => setFinalDividendCalSheetModal(true)
    const { data: { maximumAmt, free_reserve, total_reserve_min_balance, net_profit }, loading, error, reFetchData } = useFetch(`/api/v1/get_cal_sheet_data/${btoa(company_id)}`);

    const calculateddata = {
        profit_available: "",
        avg_dividend_rate_declared: "",
        onetenth_sumof_freereserve_paidupcapital: "",
        fifteen_perc_paidup_capital: "",
        max_dividend_amt: "",
        dividend_rate_cfy: "",
        max_drawn_amount: "",
        quantum_of_dividend: "",
        reserve_min_balance: "",
    }

    const profitavlplusinitialdata = {
        money_provided: "",
        profit: ""
    }

    const profitavlminusinitialdata = {
        depreciation: "",
        unrealized_gain: "",
        notional_gain: "",
        revaluation_assets: "",
        any_changes: "",
    }

    const avgdividendrateinitialdata = {
        dividend_rate_declared_FY2: "",
        dividend_rate_declared_FY3: "",
        dividend_rate_declared_FY4: ""
    }

    const onetenthoftotalinitialdata = {
        paidup_capital: "",
        free_reserves: "",
    }

    const fdainitialdata = {
        accumulated_profits: "",
        losses: "",
        depreciation_cfy: "",
    }

    // const [stampDuty, setStampDuty] = useState();
    // const [totalData, setTotalData] = useState('');

    const [dividendcalculationsheet, setDividendCalculationSheet] = useState(calculateddata);
    const [profitAvlPlusData, setProfitAvlPlusData] = useState(profitavlplusinitialdata);
    const [profitAvlMinusData, setProfitAvlMinusData] = useState(profitavlminusinitialdata);
    const [avgDividendRate, setAvgDividendRate] = useState(avgdividendrateinitialdata);
    const [oneTenthOfTotal, setOneTenthOfTotal] = useState(onetenthoftotalinitialdata);
    const [finaldividendamount, setfinaldividendamount] = useState(fdainitialdata);



    const [profitavailable, setProfit] = useState(0);
    const [avgdividend, setAvgDividend] = useState(0);
    const [onetenth, setOneTenth] = useState(0);
    const [fifteenpercpuc, setfifteenpercpuc] = useState(0);
    const [finalDividendAmount, setfinalDividendAmount] = useState(0);
    const [financialYear, setFinancialYear] = useState({ f1: "", f2: "", f3: "", f4: "" });



    const handleOnDividendCalculationSheet = (evnt) => {
        let { value, name } = evnt.target;
        console.log('dividend_rate:', name, value);
        if (name == 'dividend_rate_cfy' && parseInt(avgdividend) < parseInt(value)) {
            // console.log('target:',name, value, files);
            toast.error('Dividend can not be declared at higher rate than average rate of prev of three FY.');
        }
        setDividendCalculationSheet({ ...dividendcalculationsheet, [name]: value });
    }

    const handleOnProfitAvlMinusData = (evnt) => {
        let { value, name } = evnt.target;
        setProfitAvlMinusData({ ...profitAvlMinusData, [name]: value });
    }

    const handleOnProfitAvlPlusData = (evnt) => {
        let { value, name } = evnt.target;
        setProfitAvlPlusData({ ...profitAvlPlusData, [name]: value });
    }

    const handleOnAvgDividendRate = (evnt) => {
        let { value, name } = evnt.target;
        setAvgDividendRate({ ...avgDividendRate, [name]: value });
    }

    const handleOnOneTenthOfTotal = (evnt) => {
        let { value, name } = evnt.target;
        setOneTenthOfTotal({ ...oneTenthOfTotal, [name]: value });
    }

    const handleOnFinalDividendAmount = (evnt) => {
        let { value, name } = evnt.target;
        setfinaldividendamount({ ...finaldividendamount, [name]: value });
    }

    const handleOnDividendCalSheetSave = () => {

        if (dividendcalculationsheet?.accumulated_profits == '' || dividendcalculationsheet?.any_changes == '' || dividendcalculationsheet?.avg_dividend_rate_declared == '' || dividendcalculationsheet?.depreciation == '' || dividendcalculationsheet?.depreciation_cfy == '' || dividendcalculationsheet?.dividend_rate_cfy == '' || dividendcalculationsheet?.fifteen_perc_paidup_capital == '' || dividendcalculationsheet?.free_reserves == '' || dividendcalculationsheet?.losses == '' || dividendcalculationsheet?.max_dividend_amt == '' || dividendcalculationsheet?.max_drawn_amount == '' || dividendcalculationsheet?.money_provided == '' || dividendcalculationsheet?.notional_gain == '' || dividendcalculationsheet?.onetenth_sumof_freereserve_paidupcapital == '' || dividendcalculationsheet?.paidup_capital == '' || dividendcalculationsheet?.profit == '' || dividendcalculationsheet?.profit_available == '' || dividendcalculationsheet?.quantum_of_dividend == '' || dividendcalculationsheet?.reserve_min_balance == '' || dividendcalculationsheet?.revaluation_assets == '' || dividendcalculationsheet?.unrealized_gain == '') {
            // $('html,body').scrollTop(0);
            toast.error('Please fill all the required fields');
        } else {
            props.dcs({ ...dividendcalculationsheet, ...profitAvlMinusData, ...profitAvlPlusData, ...avgDividendRate, ...oneTenthOfTotal, ...finaldividendamount });

            props?.setdynamicFormValues({ ...props?.dynamicFormValues, AverageDividendrate: dividendcalculationsheet?.avg_dividend_rate_declared });

            hideDividendCalSheetModal();
        }
    }
    // console.log('1111',dividendcalculationsheet?.dividend_rate_cfy);


    useEffect(() => {
        var minusnumbers = Object.values(profitAvlMinusData);
        console.log('minusnumbers33', profitAvlMinusData)
        const subtract = (accumulator, number) => parseInt(accumulator) + parseInt(number);
        var minustotal = minusnumbers.reduce(subtract);

        var plusnumbers = Object.values(profitAvlPlusData);
        const plus = (accumulator, number) => parseInt(accumulator) + parseInt(number);
        var plustotal = plusnumbers.reduce(plus);
        var total = parseInt(plustotal) - parseInt(minustotal);
        setProfit(total);

        console.log('total12', parseInt(plustotal) - parseInt(minustotal));

        var dividendsum = Object.values(avgDividendRate);
        console.log('dividendsum', dividendsum);
        const sum = (accumulator, number) => parseInt(accumulator) + parseInt(number);
        var dividendtotal = dividendsum.reduce(sum);
        var avgdividendrate = dividendtotal / 3;
        setAvgDividend(avgdividendrate);
        console.log('avgdividendrate:', avgdividendrate);

        var onetenthoftotal = Object.values(oneTenthOfTotal);
        const tenth = (accumulator, number) => parseInt(accumulator) + parseInt(number);
        var tenthtotal = onetenthoftotal.reduce(tenth);
        var onetenthtotal = tenthtotal * 0.1;
        var fifteen_percent_puc = oneTenthOfTotal?.paidup_capital;
        setOneTenth(onetenthtotal);
        setfifteenpercpuc(fifteen_percent_puc = fifteen_percent_puc * 0.15);


        var fda = Object.values(finaldividendamount);
        var fda = finaldividendamount?.accumulated_profits - finaldividendamount?.losses - finaldividendamount?.depreciation_cfy;
        setfinalDividendAmount(fda);
        setDividendCalculationSheet({ ...dividendcalculationsheet, profit_available: total, avg_dividend_rate_declared: avgdividendrate, onetenth_sumof_freereserve_paidupcapital: onetenthtotal, fifteen_perc_paidup_capital: fifteen_percent_puc, max_dividend_amt: fda });

        //Calculate current financial year
        var fy1 = "";
        var fy2 = "";
        var fy3 = "";
        var fy4 = "";
        var today = new Date();
        if ((today.getMonth() + 1) <= 3) {
            fy1 = (today.getFullYear() - 1) + "-" + today.getFullYear();
            fy2 = (today.getFullYear() - 2) + "-" + (today.getFullYear() - 1);
            fy3 = (today.getFullYear() - 3) + "-" + (today.getFullYear() - 2);
            fy4 = (today.getFullYear() - 4) + "-" + (today.getFullYear() - 3);
        } else {
            fy1 = today.getFullYear() + "-" + (today.getFullYear() + 1);
            fy2 = (today.getFullYear() - 1) + "-" + (today.getFullYear());
            fy3 = (today.getFullYear() - 2) + "-" + (today.getFullYear() - 1);
            fy4 = (today.getFullYear() - 3) + "-" + (today.getFullYear() - 2);
        }

        props?.setFinancialYearOptions([{ value: "1", label: fy1 }, { value: "2", label: fy2 }, { value: "3", label: fy3 }, { value: "4", label: fy4 }]);
        setFinancialYear({ ...financialYear, fy1: fy1, fy2: fy2, fy3: fy3, fy4: fy4 });

        console.log('modaldata:', { ...dividendcalculationsheet, ...profitAvlMinusData, ...profitAvlPlusData, ...avgDividendRate, ...oneTenthOfTotal, ...finaldividendamount });
        console.log('templatedataonmodalsave:', { avg_dividend_rate_declared: dividendcalculationsheet?.avg_dividend_rate_declared, profit_available: dividendcalculationsheet?.profit_available, onetenth_sumof_freereserve_paidupcapital: dividendcalculationsheet?.onetenth_sumof_freereserve_paidupcapital, fifteen_perc_paidup_capital: dividendcalculationsheet?.fifteen_perc_paidup_capital, max_dividend_amt: dividendcalculationsheet?.max_dividend_amt });

    }, [profitAvlMinusData, profitAvlPlusData, avgDividendRate, oneTenthOfTotal, finaldividendamount]);
    // console.log('dividendCalSheetData12:',dividendcalculationsheet);



    useEffect(() => {
        if (props?.agenda_req_id && props?.dcsonedit) {

            const getdynamicFormValues = ((agenda_req_id, dcsonedit) => {
                const dividendcalculationsheets = props?.dcsonedit;
                console.log('new---', dividendcalculationsheets);

                if (dividendcalculationsheets) {
                    setDividendCalculationSheet({ ...dividendcalculationsheet, profit_available: dividendcalculationsheets?.profit_available, avg_dividend_rate_declared: dividendcalculationsheets?.avg_dividend_rate_declared, onetenth_sumof_freereserve_paidupcapital: dividendcalculationsheets?.onetenth_sumof_freereserve_paidupcapital, fifteen_perc_paidup_capital: dividendcalculationsheets?.fifteen_perc_paidup_capital, dividend_rate_cfy: dividendcalculationsheets?.dividend_rate_cfy, max_drawn_amount: dividendcalculationsheets?.max_drawn_amount, quantum_of_dividend: dividendcalculationsheets?.quantum_of_dividend, reserve_min_balance: dividendcalculationsheets?.reserve_min_balance });

                    setProfitAvlMinusData({ ...profitAvlMinusData, depreciation: dividendcalculationsheets?.depreciation, unrealized_gain: dividendcalculationsheets?.unrealized_gain, notional_gain: dividendcalculationsheets?.notional_gain, revaluation_assets: dividendcalculationsheets?.revaluation_assets, any_changes: dividendcalculationsheets?.any_changes });

                    setProfitAvlPlusData({ ...profitAvlPlusData, money_provided: dividendcalculationsheets?.money_provided, profit: dividendcalculationsheets?.profit });

                    setAvgDividendRate({ ...avgDividendRate, dividend_rate_declared_FY2: dividendcalculationsheets?.dividend_rate_declared_FY2, dividend_rate_declared_FY3: dividendcalculationsheets?.dividend_rate_declared_FY3, dividend_rate_declared_FY4: dividendcalculationsheets?.dividend_rate_declared_FY4 });

                    setOneTenthOfTotal({ ...oneTenthOfTotal, paidup_capital: dividendcalculationsheets?.paidup_capital, free_reserves: dividendcalculationsheets?.free_reserves });

                    setfinaldividendamount({ ...finaldividendamount, accumulated_profits: dividendcalculationsheets?.accumulated_profits, losses: dividendcalculationsheets?.losses, depreciation_cfy: dividendcalculationsheets?.depreciation_cfy });

                    // setProfit(agendarequest?.dividend_calc_sheet_data?.profit_available);
                }
                else {
                    // setCompanyloandetails({});
                }
            });
            getdynamicFormValues(props?.agenda_req_id, props?.dcsonedit);
        }
    }, [props?.agenda_req_id, props?.dcsonedit]);

    console.log('total-----', props?.dcsonedit);

    useEffect(() => {
        if (maximumAmt) {
            setDividendCalculationSheet({ ...dividendcalculationsheet, 'max_drawn_amount': maximumAmt, 'reserve_min_balance': total_reserve_min_balance });
            setfinaldividendamount({ ...finaldividendamount, 'accumulated_profits': net_profit })
        }
    }, [maximumAmt])

    // return('akash')
    return (
        <>
            <Col xs={6}>
                <div className="text-end">
                    <Button variant={"secondary"} className="w-auto" onClick={handleShowFinalDividendSheetModal}>Final Dividend Calculation Sheet</Button>
                </div>
            </Col>
            <Modal
                show={showFinalDividendCalSheetModal}
                onHide={hideFinalDividendCalSheetModal}
                className={"modaltype1"}
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{"Final Dividend Calculation Sheet"}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-0" controlId="">

                        <Col xs={12}><div className="graybottomborder mt-2"></div></Col>

                        <Col xs={12}>
                            <Form>
                                <div className="sectioninnerbox mt-2 p-3">
                                    <Table responsive className="tabletyp1 ">
                                        <thead>
                                            <tr>
                                                <th>DIVIDEND CAN BE DECLARED OUT OF PROFITS</th>
                                                <th className="w-25"> {financialYear?.fy1} </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td colSpan={2} className="px-2 py-1">
                                                    <Table responsive className="mb-0">
                                                        <tbody>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Profits of the company or other eligible sources
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="profit" value={profitAvlPlusData.profit} className="text-end" onChange={handleOnProfitAvlPlusData} required placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Depreciation
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="depreciation" value={profitAvlMinusData.depreciation} className="text-end" onChange={handleOnProfitAvlMinusData} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Unrealized gains
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="unrealized_gain" value={profitAvlMinusData.unrealized_gain} className="text-end" onChange={handleOnProfitAvlMinusData} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Notional gains
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="notional_gain" value={profitAvlMinusData.notional_gain} className="text-end" onChange={handleOnProfitAvlMinusData} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Revaluation of assets
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="revaluation_assets" value={profitAvlMinusData.revaluation_assets} className="text-end" onChange={handleOnProfitAvlMinusData} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Any change in carrying amount of an asset or of a liability on measurement of the asset or the liability at fair value
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="any_changes" value={profitAvlMinusData.any_changes} className="text-end" onChange={handleOnProfitAvlMinusData} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Money provided by the Central Government or a State Government for the payment of dividend by the company in pursuance of a guarantee given by that Government
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="money_provided" value={profitAvlPlusData.money_provided} className="text-end" onChange={handleOnProfitAvlPlusData} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        <b>Profit available for distribution as dividend</b>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" readOnly name="profit_available" value={profitavailable} className="text-end" placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td colSpan={2} className="px-2 py-1">
                                                    <Table responsive className="mb-0">
                                                        <thead>

                                                            <tr>
                                                                <th colSpan={"5"}>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Audit Balance Sheet as on {financialYear?.fy1}
                                                                    </div>
                                                                </th>
                                                            </tr>

                                                            <tr>
                                                                <th>DIVIDEND CAN BE DECLARED OUT OF </th>
                                                                <th>{financialYear?.fy1}</th>
                                                                <th>{financialYear?.fy2}</th>
                                                                <th>{financialYear?.fy3}</th>
                                                                <th>{financialYear?.fy4}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Rate of dividends declared</td>
                                                                <td></td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="dividend_rate_declared_FY2" value={avgDividendRate.dividend_rate_declared_FY2} className="text-end" onChange={handleOnAvgDividendRate} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="dividend_rate_declared_FY3" value={avgDividendRate.dividend_rate_declared_FY3} className="text-end" onChange={handleOnAvgDividendRate} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="dividend_rate_declared_FY4" value={avgDividendRate.dividend_rate_declared_FY4} className="text-end" onChange={handleOnAvgDividendRate} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Average of the rate of dividends declared</td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" readOnly name="avg_dividend_rate_declared" value={avgdividend} className="text-end" placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>

                                                            <tr>
                                                                <td>Divdend rate in current financial year</td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="dividend_rate_cfy" value={dividendcalculationsheet.dividend_rate_cfy} className="text-end" onChange={handleOnDividendCalculationSheet} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>

                                                            <tr>                                                        <td>Maximum amount that can be drawn 1/10(Paid Up Share Capital + Free Reserves)</td>

                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="max_drawn_amount" value={dividendcalculationsheet.max_drawn_amount} className="text-end" onChange={handleOnDividendCalculationSheet} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>

                                                            <tr>
                                                                <td>Paid up capital</td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="paidup_capital" value={oneTenthOfTotal.paidup_capital} className="text-end" onChange={handleOnOneTenthOfTotal} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>

                                                            <tr>
                                                                <td>Free reserves</td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="free_reserves" value={oneTenthOfTotal.free_reserves} className="text-end" onChange={handleOnOneTenthOfTotal} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>

                                                            <tr>
                                                                <td>1/10 of total</td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" readOnly name="onetenth_sumof_freereserve_paidupcapital" value={onetenth} className="text-end" placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>

                                                            <tr>
                                                                <td> Total Quantum of Dividend</td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="quantum_of_dividend" value={dividendcalculationsheet.quantum_of_dividend} className="text-end" onChange={handleOnDividendCalculationSheet} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>

                                                            <tr>
                                                                <td>Minimum Balance in reserves after deduction of maximum amount of dividend</td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="reserve_min_balance" value={dividendcalculationsheet.reserve_min_balance} className="text-end" onChange={handleOnDividendCalculationSheet} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>

                                                            <tr>
                                                                <td>15% of paid up capital</td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="fifteen_perc_paidup_capital" readOnly value={fifteenpercpuc} className="text-end" placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td colSpan={2} className="px-2 py-1">
                                                    <Table responsive className="mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th colSpan={"2"}>Dividend declared from only Accumulated Profits
                                                                </th>
                                                            </tr>

                                                            <tr>
                                                                <th>Particulars</th>
                                                                <th>Amount in INR</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Accumulated Profits of previous years as on end of FY
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="accumulated_profits" value={finaldividendamount.accumulated_profits} className="text-end" onChange={handleOnFinalDividendAmount} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Losses of the quarter preeceding the quarter in which dividend is being declared
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="losses" value={finaldividendamount.losses} className="text-end" onChange={handleOnFinalDividendAmount} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Depreciation for the CY
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="depreciation_cfy" value={finaldividendamount.depreciation_cfy} className="text-end" onChange={handleOnFinalDividendAmount} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        <b>Maximum amount of dividend that can be paid out of accumulated profits</b>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="max_dividend_amt" readOnly value={finalDividendAmount} className="text-end" placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="px-3 text-end" >
                                    {/* <Button type="submit" variant="secondary" className="my-3"> Save </Button> */}
                                    <Button className="img-btn" variant="secondary" onClick={handleOnDividendCalSheetSave}>
                                        <img src={"/img/icons/Icon-awesome-save.svg"} />
                                    </Button>
                                </div>
                            </Form>
                        </Col>

                    </Form.Group>
                </Modal.Body>
            </Modal>
        </>
    );
}

export const InterimDividendCalculationSheet = (props) => {

    const interimsheetdata = {
        surplus_amount: "",
        profits_fy: "",
        out_of_profits_fy: "",
        dividend_rate_cfy: "",
    }

    const avginterimsheetdata = {
        dividend_rate_declared_FY2: "",
        dividend_rate_declared_FY3: "",
        dividend_rate_declared_FY4: "",
    }

    const [showInterimDividendCalSheetModal, setInterimDividendCalSheetModal] = useState(false);
    const [avgInterimDividendRate, setAvgInterimDividendRate] = useState(avginterimsheetdata);
    const [interimSheetData, setInterimSheetData] = useState(interimsheetdata);
    const [avginterimdividend, setAvgInterimDividend] = useState({ avg_dividend_rate_declared: "" });
    const [financialYear, setFinancialYear] = useState({ f1: "", f2: "", f3: "", f4: "" });

    const hideInterimDividendCalSheetModal = () => setInterimDividendCalSheetModal(false);
    const handleShowInterimDividendSheetModal = () => setInterimDividendCalSheetModal(true);


    useEffect(() => {
        var dividendsum = Object.values(avgInterimDividendRate);
        console.log('dividendsum', dividendsum);
        const sum = (accumulator, number) => parseInt(accumulator) + parseInt(number);
        var dividendtotal = dividendsum.reduce(sum);
        var avgdividendrate = dividendtotal / 3;
        setAvgInterimDividend({ avg_dividend_rate_declared: avgdividendrate });
        console.log('avgdividendrate:', avgdividendrate);

        //Calculate current financial year
        var fy1 = "";
        var fy2 = "";
        var fy3 = "";
        var fy4 = "";
        var today = new Date();
        if ((today.getMonth() + 1) <= 3) {
            fy1 = (today.getFullYear() - 1) + "-" + today.getFullYear();
            fy2 = (today.getFullYear() - 2) + "-" + (today.getFullYear() - 1);
            fy3 = (today.getFullYear() - 3) + "-" + (today.getFullYear() - 2);
            fy4 = (today.getFullYear() - 4) + "-" + (today.getFullYear() - 3);
        } else {
            fy1 = today.getFullYear() + "-" + (today.getFullYear() + 1);
            fy2 = (today.getFullYear() - 1) + "-" + (today.getFullYear());
            fy3 = (today.getFullYear() - 2) + "-" + (today.getFullYear() - 1);
            fy4 = (today.getFullYear() - 3) + "-" + (today.getFullYear() - 2);
        }
        setFinancialYear({ ...financialYear, fy1: fy1, fy2: fy2, fy3: fy3, fy4: fy4 });
    }, [avgInterimDividendRate]);


    useEffect(() => {
        if (props?.agenda_req_id && props?.dcsonedit) {

            const getdynamicFormValues = ((agenda_req_id, dcsonedit) => {
                const data = props?.dcsonedit;

                if (data) {
                    setInterimSheetData({ ...interimSheetData, surplus_amount: data?.surplus_amount, profits_fy: data?.profits_fy, out_of_profits_fy: data?.out_of_profits_fy, dividend_rate_cfy: data.dividend_rate_cfy });
                    setAvgInterimDividendRate({ ...avgInterimDividendRate, dividend_rate_declared_FY2: data?.dividend_rate_declared_FY2, dividend_rate_declared_FY3: data?.dividend_rate_declared_FY3, dividend_rate_declared_FY4: data?.dividend_rate_declared_FY4 });
                    setAvgInterimDividend({ ...avginterimdividend, avg_dividend_rate_declared: data?.avg_dividend_rate_declared });
                }
                else {
                    //
                }
            });
            getdynamicFormValues(props?.agenda_req_id, props?.dcsonedit);
        }
    }, [props?.agenda_req_id, props?.dcsonedit]);

    const handleOnChangeOfInterimSheet = (evnt) => {
        let { value, name } = evnt.target;
        setInterimSheetData({ ...interimSheetData, [name]: value });
    }

    const handleOnAvgInterimDividendRate = (evnt) => {
        let { value, name } = evnt.target;
        setAvgInterimDividendRate({ ...avgInterimDividendRate, [name]: value });
    }

    const handleOnInterimSheetSave = () => {
        props?.interimsheetdata({ ...interimSheetData, ...avgInterimDividendRate, ...avginterimdividend });
        hideInterimDividendCalSheetModal();

    }





    return (
        <>
            <Col xs={6}>
                <div className="text-end">
                    <Button variant={"secondary"} className="w-auto" onClick={handleShowInterimDividendSheetModal}>Interim Dividend Calculation Sheet</Button>
                </div>
            </Col>
            <Modal
                show={showInterimDividendCalSheetModal}
                onHide={hideInterimDividendCalSheetModal}
                className={"modaltype1"}
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{"Interim Dividend Calculation Sheet"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-0" controlId="">

                        <Col xs={12}><div className="graybottomborder mt-2"></div></Col>

                        <Col xs={12}>
                            <Form>
                                <div className="sectioninnerbox mt-2 p-3">
                                    <Table responsive className="tabletyp1 ">
                                        <thead>
                                            <tr>
                                                <th>DIVIDEND CAN BE DECLARED OUT OF </th>
                                                <th className="w-25"> AMOUNT </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td colSpan={2} className="px-2 py-1">
                                                    <Table responsive className="mb-0">
                                                        <tbody>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Surplus of profit and loss
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="surplus_amount" value={interimSheetData?.surplus_amount} className="text-end" onChange={handleOnChangeOfInterimSheet} required placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Profits of the financial year for which such interim dividend is being declared
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="profits_fy" value={interimSheetData?.profits_fy} className="text-end" onChange={handleOnChangeOfInterimSheet} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        Out of profits generated in the financial year till the quarter preceding the date of declaration of the interim dividend
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="out_of_profits_fy" value={interimSheetData?.out_of_profits_fy} className="text-end" onChange={handleOnChangeOfInterimSheet} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                            </tr>

                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td colSpan={2} className="px-2 py-1">
                                                    <Table responsive className="mb-0">
                                                        <thead>


                                                            <tr>
                                                                <th>IN CASE OF LOSSES</th>
                                                                <th>{financialYear?.fy1}</th>
                                                                <th>{financialYear?.fy2}</th>
                                                                <th>{financialYear?.fy3}</th>
                                                                <th>{financialYear?.fy4}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Rate of dividends declared</td>
                                                                <td></td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="dividend_rate_declared_FY2" value={avgInterimDividendRate?.dividend_rate_declared_FY2} className="text-end" onChange={handleOnAvgInterimDividendRate} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="dividend_rate_declared_FY3" value={avgInterimDividendRate?.dividend_rate_declared_FY3} className="text-end" onChange={handleOnAvgInterimDividendRate} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="dividend_rate_declared_FY4" value={avgInterimDividendRate?.dividend_rate_declared_FY4} className="text-end" onChange={handleOnAvgInterimDividendRate} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Average of the rate of dividends declared</td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" readOnly name="avg_dividend_rate_declared" value={avginterimdividend?.avg_dividend_rate_declared} className="text-end" placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>

                                                            <tr>
                                                                <td>Divdend rate in current financial year</td>
                                                                <td>
                                                                    <Form.Group className="mb-0">
                                                                        <Form.Control type="number" name="dividend_rate_cfy" value={interimSheetData?.dividend_rate_cfy} className="text-end" onChange={handleOnChangeOfInterimSheet} placeholder={""} />
                                                                    </Form.Group>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>


                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="px-3 text-end" >
                                    {/* <Button type="submit" variant="secondary" className="my-3"> Save </Button> */}
                                    <Button className="img-btn" variant="secondary" onClick={handleOnInterimSheetSave}>
                                        <img src={"/img/icons/Icon-awesome-save.svg"} />
                                    </Button>
                                </div>
                            </Form>
                        </Col>

                    </Form.Group>
                </Modal.Body>

            </Modal>
        </>
    );
}

export const ShareholdersClass = (props) => {

    const [classSec, setclassSec] = useState([])
    const [IsLoading, setIsLoading] = useState(false)
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();
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

    const classOfShares = props?.classOfShares?.filter((option) => props?.dynamicFormValues?.EligibleClass && props?.dynamicFormValues?.EligibleClass.includes(option.value));

    return (
        <>
            <Col xs={12} ref={SecurityHolder} >
                <h4>{`List of eligible shareholders for issue of ${props?.dynamicFormValues?.TypeofSecurity}`}</h4>
                <div className="sectioninnerbox px-0 mt-2 py-2">
                    <Table responsive className="tabletyp1 " border={'1px solid'} >
                        <thead>
                            <tr>
                                <th >Type of Share and Class of shares (Issued)</th>
                                <th >Offer Open Date</th>
                                <th >Offer Closure Date</th>
                                <th >Record Date </th>
                                <th >Details as on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classOfShares && classOfShares?.map((shareholdingdetails, index) => {
                                console.log('classSec', shareholdingdetails)
                                let created_at = moment(props?.agendaRequest?.created_at).format('DD-MM-Y');
                                const right = shareholdingdetails?.face_value * props?.dynamicFormValues?.Pricepershare;
                                return (<>
                                    <tr>
                                        <td>{shareholdingdetails?.class_type}</td>
                                        <td>{props?.dynamicFormValues['OfferOpenDate']}</td>
                                        <td>{props?.dynamicFormValues['OfferClosureDate']}</td>
                                        <td>{props?.dynamicFormValues['RecordDate']}</td>
                                        <td>{created_at}</td>
                                    </tr>
                                </>);
                            })}
                        </tbody>
                    </Table>
                </div>

            </Col>
        </>
    )
}

export const ShareholdersList = (props) => {
    console.log('first ShareholdersList', props)
    const [classSec, setclassSec] = useState([])
    const [IsLoading, setIsLoading] = useState(false)
    const type_of_class = props?.dynamicFormValues?.EligibleClass
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();

    const getclassofSec = () => {
        try {
            const headerPyalod = getNormalHeaders();
            setIsLoading(true);
            const response = axios.get(`/api/v1/typeofClass/${type_of_class}`, headerPyalod)
                .then((response) => {
                    console.log("getclassofSec last", response?.data);
                    setclassSec(response?.data);
                    props?.setdynamicFormValues({ ...dynamicFormValues, 'typeofClasstable': response?.data })

                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.response) {
                        setValidationError(error.response.data.errors)
                        setIsLoading(false)

                    } else if (error.request) {
                        setIsLoading(false)
                    } else {
                        setIsLoading(false)
                    }
                });

        } catch (err) {
            setValidationError(err)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (type_of_class && !agenda_req_id) {
            getclassofSec(type_of_class);
        }
    }, [type_of_class])

    useEffect(() => {
        if (props?.dynamicFormValues?.[props.name + 'ext']) {
            if (typeof props?.dynamicFormValues?.[props.name + 'ext'] != 'object') {
                const data = JSON.parse(props?.dynamicFormValues?.[props.name + 'ext']);
                setclassSec(data);
            }
        }
    }, [props?.dynamicFormValues?.[props.name + 'ext']])


    const SecurityHolder = useRef('');
    useEffect(() => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = classSec;
        props?.onChange(data)

    }, [SecurityHolder, classSec])
    useEffect(() => {
        if (props?.dynamicFormValues?.[props.name + 'ext']) {
            if (typeof props?.dynamicFormValues?.[props.name + 'ext'] != 'object') {
                const data = JSON.parse(props?.dynamicFormValues?.[props.name + 'ext']);
                setclassSec(data);
            }
        }
    }, [props?.dynamicFormValues?.[props.name + 'ext']])


    const handleOnInputChange = (evnt, index) => {
        let { value, name } = evnt.target;
        let list = [...classSec]
        list[index][name] = value;
        setclassSec(list);
    }
    return (
        <>
            <Col xs={12} ref={SecurityHolder} >
                <h4>{`List of eligible shareholders for issue of ${props?.dynamicFormValues['TypeofIssue']}`}</h4>
                <div className="sectioninnerbox px-0 mt-2 py-2">
                    <Table responsive className="tabletyp1 " border={'1px solid'} >
                        <thead>
                            <tr>
                                <th>Eligible Class</th>
                                <th>Number of shares in the class</th>
                                <th>Face Value of Shares</th>
                                <th>Total Amount</th>
                                <th>Number of Shareholders (Count of Folios) </th>
                                <th colspan="2" ><center>Ratio</center></th>
                                <th>No of Issued Shares</th>
                                <th>Premium Amount per share </th>
                                <th>Issue value per share </th>
                                <th>Price per share as per valuation report  </th>
                                <th>Total Amount at Face Value  </th>
                                <th>Amount of Premium  </th>
                                <th>Total Quantum of Issue </th>
                            </tr>

                        </thead>
                        <tbody>
                            {classSec && classSec?.map((shareholdingdetails, index) => {
                                const total = +shareholdingdetails?.number_of_shares * +shareholdingdetails?.ratio_old / +shareholdingdetails?.ratio_new

                                const Issuevalue = +shareholdingdetails?.face_value + +shareholdingdetails?.premium_amount;
                                const TotalAmount = +total * +shareholdingdetails?.face_value;
                                const Premium = +total * +shareholdingdetails?.premium_amount;
                                const TotalQuantum = +shareholdingdetails?.face_value + +shareholdingdetails?.premium_amount;
                                console.log('firstfirstfirstfirstfirstfirstfirstfirst', Premium)
                                return (<>
                                    <tr>
                                        <td>{shareholdingdetails?.class_type}</td>
                                        <td>{shareholdingdetails?.number_of_shares}</td>
                                        <td>{shareholdingdetails?.face_value}</td>
                                        <td>{+shareholdingdetails?.number_of_shares * +shareholdingdetails?.face_value}</td>
                                        <td>{shareholdingdetails?.shareholdingdetailscount}</td>
                                        <td>
                                            <Form.Control type="number" name="ratio_old"
                                                value={shareholdingdetails?.ratio_old}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control type="number" name="ratio_new"
                                                value={shareholdingdetails?.ratio_new}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                            />
                                        </td>
                                        <td>{!isNaN(total) ? Math.floor(total) : 0}</td>
                                        <td><Form.Control type="number" name="premium_amount"
                                            value={shareholdingdetails?.premium_amount}
                                            onChange={(e) => handleOnInputChange(e, index)}
                                        />
                                        </td>
                                        <td>{!isNaN(Issuevalue) ? Math.floor(Issuevalue) : 0}</td>
                                        <td><Form.Control type="number" name="price_per_share "
                                            value={shareholdingdetails?.price_per_share}
                                            onChange={(e) => handleOnInputChange(e, index)}
                                        /></td>
                                        <td>{!isNaN(TotalAmount) ? Math.floor(TotalAmount) : 0}</td>
                                        <td>{!isNaN(Premium) ? Math.floor(Premium) : 0}</td>
                                        <td>{!isNaN(TotalQuantum) ? Math.floor(TotalQuantum) : 0}</td>

                                    </tr>
                                </>);
                            })}
                        </tbody>
                    </Table>
                </div>

            </Col>
        </>
    )
}

export const ShareholdersRightsoffer = (props) => {
    console.log('first ShareholdersList', props)
    const [status, setStatus] = useState(true)
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();
    const SecurityHolder = useRef('');

    let data = props?.dynamicFormValues[props?.name + 'ext']

    console.log('props?.ShareholdersclassSec >>>', props?.ShareholdersclassSec, data)
    // const { data: getdata, loading, error, reFetchData } = useFetch(`/api/v1/rightsissue/${props?.agenda_req_id}`);

    const savedata = (payload) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = payload;
        props?.onChange(data)
    }



    const handleOnInputChange = (evnt, index, data) => {
        let { value, name } = evnt.target;
        if (name == 'date_of_the_valuation_report' || name == 'remarks') {
            let list = [...props?.ShareholdersclassSec]
            list[index][name] = value;
            savedata(list);
        } else {
            let list = [...props?.ShareholdersclassSec]
            list[index][name] = value;
            const total = +data?.number_of_shares * +data?.ratio_old / +data?.ratio_new;
            list[index]['total'] = total;
            // list[index]['premium_amount'] = +data?.face_value + +data?.premium_amount;
            const total_facevalue = +data?.face_value * total;
            list[index]['total_facevalue'] = total_facevalue;
            const total_premium = +data?.premium_amount_per_share * total;
            list[index]['total_premium'] = total_premium;
            const total_quantum = total_facevalue + total_premium;
            list[index]['total_quantum'] = !isNaN(total_quantum) ? Math.floor(total_quantum) : 0;
            console.log('handleOnInputChange >>>>', list, +data?.premium_amount_per_share, total)
            console.log('handleOnInputChange >>>>', list, +data?.premium_amount_per_share, total)
            props?.setShareholdersclassSec(list);
            savedata(list);
        }
    }

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


    const [callmoneytoggle, setCallMoneyToggle] = useState(null);

    let handlerCallMoney = (id) => {
        if (callmoneytoggle === id) {
            setCallMoneyToggle(null)(!callmoneytoggle);
            return false;
        }
        setCallMoneyToggle(id);
    };

    const { dynamicFormValues, setdynamicFormValues } = useAppContext();

    useEffect(() => {
        const per_share_value = sumArray(pluck(props?.ShareholdersclassSec, 'per_share_value'))
        const total = sumArray(pluck(props?.ShareholdersclassSec, 'total'))
        const premium_amount_per_share = sumArray(pluck(props?.ShareholdersclassSec, 'premium_amount_per_share'))
        setdynamicFormValues({ 'TotalPersharevalue': per_share_value, "FundsCalculate": total * premium_amount_per_share })
    }, [props?.ShareholdersclassSec]);

    // console.log('sectioninnerbox', sumArray(pluck(props?.ShareholdersclassSec, 'per_share_value')))
    // console.log('sectioninnerbox', sumArray(pluck(props?.ShareholdersclassSec, 'total')))
    // console.log('sectioninnerbox', sumArray(pluck(props?.ShareholdersclassSec, 'premium_amount_per_share')))
    return (
        <>

            <div className="sectionbox pt-3">
                <Row>
                    <Col xs={12}>
                        <div className="sectioninnerbox px-0 py-2">
                            <div className="--scrollybox1 px-2 --scrollbartyp1">
                                <Table responsive className="tabletyp1" ref={SecurityHolder}>
                                    <thead>
                                        <tr>
                                            {/* Eligible Class */}
                                            <th></th>
                                            <th>Name of Class</th>
                                            <th>Authorised No. of Securities</th>
                                            <th>Per share value</th>
                                            <th>Available Amount</th>
                                            <th>Record Date</th>
                                            <th>Available Securities</th>
                                            <th>Number of shares in the class</th>
                                            <th>Face Value of Shares </th>
                                            <th>Total Amount</th>
                                            <th> Number of Shareholders (Count of Folios)</th>
                                            <th colspan="2"><center>Ratio</center></th>
                                            <th>Total</th>
                                            <th>Right of Renunciation</th>
                                            <th>Premium Amount per share</th>
                                            {/* <th>Issue value per share</th> */}
                                            {/* <th>Price per share as per valuation report</th> */}
                                            <th>Date of the Valuation Report</th>
                                            <th>Total Amount at Face Value</th>
                                            <th>Amount of Premium</th>
                                            <th>Total Quantum of Issue</th>
                                            <th>remark</th>
                                            <th>Division of Iss</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {props?.ShareholdersclassSec && Object.values(props?.ShareholdersclassSec).map((data, index) => {
                                            // const ShareholdersclassSecdata = getdata.find(x => x.class_id == data?.id)
                                            const available_amount = data?.authorised_number_of_shares - data?.number_of_shares;
                                            const available_securities = data?.authorised_total_equity_amt - data?.total_equity_amt;
                                            console.log('authorised_total_equity_amt', data?.authorised_total_equity_amt, data?.total_equity_amt)

                                            return (
                                                <>
                                                    {available_amount > 0 ? (<>
                                                    </>) : (<>
                                                        <tr>
                                                            <td><img data-for={'error'} data-tip={""} src={"/img/icons/Icons-Alerts-ic_error_outline_blue.svg"} className="float-end" />
                                                            </td>
                                                            <td colspan={10}>
                                                                <marquee direction="right">Capitalnot Available Amount must be grater then 0 this class not eligible</marquee>
                                                            </td>
                                                        </tr>
                                                    </>
                                                    )}
                                                    <tr tableaccordenheader={index} key={index + data?.id} className={"ctheader"}>
                                                        <td>

                                                            <ReactTooltip className="secondary" id={'error'} effect="solid" place="top" isHtml={true}

                                                            >
                                                                <div className="text-center" dangerouslySetInnerHTML={{ __html: 'Available Amount must be grater then 0' }} />
                                                            </ReactTooltip>
                                                        </td>
                                                        <td>{data?.class_type}</td>
                                                        <td>{data?.authorised_number_of_shares}</td>
                                                        <td>
                                                            <Form.Group className="mb-0 ">
                                                                <Form.Control
                                                                    className="w-120px"
                                                                    type="text"
                                                                    name="per_share_value"
                                                                    value={data?.per_share_value}
                                                                    onChange={(e) => handleOnInputChange(e, index, data)} />
                                                            </Form.Group>
                                                        </td>
                                                        <td>{available_securities}</td>
                                                        <td>{props?.dynamicFormValues['RecordDate']}</td>
                                                        <td>{available_amount}</td>
                                                        <td>{data?.number_of_shares}</td>
                                                        <td>{data?.face_value}</td>
                                                        <td>{data?.total_equity_amt}</td>
                                                        {/* <td>{!isNaN(total) ? Math.floor(total) : 0}</td> */}
                                                        <td>{data?.shareholdingdetailscount}</td>
                                                        <td>
                                                            <Form.Group className="mb-0 ">
                                                                <Form.Control
                                                                    className="w-120px"
                                                                    type="text"
                                                                    name="ratio_old"
                                                                    value={data?.ratio_old}
                                                                    onChange={(e) => handleOnInputChange(e, index, data)} />
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group className="mb-0 ">
                                                                <Form.Control
                                                                    className="w-120px"
                                                                    type="text"
                                                                    name="ratio_new"
                                                                    value={data?.ratio_new}
                                                                    onChange={(e) => handleOnInputChange(e, index, data)} />
                                                            </Form.Group>
                                                        </td>
                                                        <td>{!isNaN(data?.total) ? Math.floor(data?.total) : 0}</td>
                                                        <td>
                                                            <YesNoChecked
                                                                className="w-120px"
                                                                onChange={(e) => handleOnInputChange(e, index, data)}
                                                                value={data?.right_of_renunciation}
                                                                name="right_of_renunciation"
                                                                id={index + 'right_of_renunciation'}
                                                            />
                                                        </td>

                                                        <td>
                                                            <Form.Group className="mb-0 ">
                                                                <Form.Control
                                                                    className="w-120px"
                                                                    type="text"
                                                                    name="premium_amount_per_share"
                                                                    value={data?.premium_amount_per_share}
                                                                    onChange={(e) => handleOnInputChange(e, index, data)} />
                                                            </Form.Group>
                                                        </td>



                                                        {/* <td>
                                                            <Form.Group className="mb-0 ">
                                                                <Form.Control
                                                                    className="w-120px"
                                                                    type="text"
                                                                    name="price_per_share_as_per_valuation_report"
                                                                    value={data?.price_per_share_as_per_valuation_report}
                                                                    onChange={(e) => handleOnInputChange(e, index, data)} />
                                                            </Form.Group>
                                                        </td> */}
                                                        <td>
                                                            <Form.Group className="mb-0 ">
                                                                <Form.Control type="date"
                                                                    name="date_of_the_valuation_report"
                                                                    value={data?.date_of_the_valuation_report}
                                                                    onChange={(e) => handleOnInputChange(e, index)} />
                                                            </Form.Group>
                                                        </td>
                                                        <td>{!isNaN(data?.total_facevalue) ? Math.floor(data?.total_facevalue) : 0}</td>
                                                        <td>{!isNaN(data?.total_premium) ? Math.floor(data?.total_premium) : 0}</td>
                                                        <td>{!isNaN(data?.total_quantum) ? Math.floor(data?.total_quantum) : 0}</td>

                                                        <td className="text-center">
                                                            <div className={"tableactionbtngroup text-nowrap"}>
                                                                <Button className="tableactionbtn1" onClick={() => handleRemarkToggle(index)} data-for="remarkTip" data-tip="Remark"><img src="/img/icons/click.svg" /></Button>
                                                                <ReactTooltip id="remarkTip" effect="solid" place="top" />
                                                            </div>
                                                        </td>

                                                        <td className="text-center">
                                                            <div className={"tableactionbtngroup text-nowrap"}>
                                                                <Button className="tableactionbtn1" onClick={() => handleDivisionofIssToggle(index)} data-for="divisionofissTip" data-tip="Division of Issue Value per Share"><img src="/img/icons/click.svg" /></Button>
                                                                <ReactTooltip id="divisionofissTip" effect="solid" place="top" />
                                                            </div>
                                                        </td>

                                                    </tr>

                                                    {index === remarktoggle || index === divisionofisstoggle ? (
                                                        <tr tableaccordenbody={index} className="activetableaccordenbody">
                                                            <td colSpan={50}>
                                                                <div className="tableactionbox">
                                                                    {index === remarktoggle ?
                                                                        (
                                                                            <>
                                                                                <Table className="tabletyp1">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th colSpan={50} className="px-0">
                                                                                                Remark
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="w-200px">
                                                                                                <Form.Group className="mb-0 ">
                                                                                                    <Form.Control required type="text" name="remarks"
                                                                                                        value={data?.remarks}
                                                                                                        onChange={(e) => handleOnInputChange(e, index)}
                                                                                                    />
                                                                                                </Form.Group>
                                                                                            </td>
                                                                                            <td></td>
                                                                                            <td></td>

                                                                                        </tr>
                                                                                    </tbody>
                                                                                </Table>
                                                                            </>
                                                                        ) : ("")
                                                                    }
                                                                    {index === divisionofisstoggle ?
                                                                        (
                                                                            <>
                                                                                <Table className="tabletyp1 notfocus ">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th colSpan={50} className="px-0">
                                                                                                Division of Issue Value per Share
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="w-200px">
                                                                                                <Form.Label>Application money</Form.Label>
                                                                                            </td>
                                                                                            <td className="w-200px">
                                                                                                <Form.Group className="mb-0 ">
                                                                                                    <Form.Control type="number" name="application_money"
                                                                                                        value={data?.application_money}
                                                                                                        onChange={(e) => handleOnInputChange(e, index, data)} />
                                                                                                </Form.Group>
                                                                                            </td>
                                                                                            <td className="w-200px">
                                                                                                <YesNoChecked
                                                                                                    className="w-120px"
                                                                                                    onChange={(e) => handleOnInputChange(e, index, data)}
                                                                                                    value={data?.application_money_ext}
                                                                                                    name="application_money_ext"
                                                                                                    id={index + 'application_money_ext'}
                                                                                                />
                                                                                            </td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="w-200px">
                                                                                                <Form.Label>Allotment money</Form.Label>
                                                                                            </td>
                                                                                            <td className="w-200px">
                                                                                                <Form.Group className="mb-0 ">
                                                                                                    <Form.Control type="number" name="allotment_money"
                                                                                                        value={data?.allotment_money}
                                                                                                        onChange={(e) => handleOnInputChange(e, index, data)} />
                                                                                                </Form.Group>
                                                                                            </td>
                                                                                            <td className="w-200px">
                                                                                                <YesNoChecked
                                                                                                    className="w-120px"
                                                                                                    onChange={(e) => handleOnInputChange(e, index, data)}
                                                                                                    value={data?.allotment_money_ext}
                                                                                                    name="allotment_money_ext"
                                                                                                    id={index + 'allotment_money_ext'}
                                                                                                />
                                                                                            </td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                        </tr>
                                                                                        <tr className={index === callmoneytoggle ? "activetableaccordenheader ctheader" : "ctheader"}>
                                                                                            <td className="w-200px">
                                                                                                <Form.Label><div className="tablecollapsbtnplusminus m-0 me-2 d-inline-block" onClick={() => handlerCallMoney(index)} />Call money</Form.Label>
                                                                                            </td>
                                                                                            <td className="w-200px"> </td>
                                                                                            <td className="w-200px"></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                        </tr>
                                                                                        {/* {index === callmoneytoggle ?
                                            ( */}
                                                                                        <tr className="activetableaccordenbody bg-transparent">
                                                                                            <td colSpan={50}>

                                                                                                <TableGenerate
                                                                                                    key={index + 1}
                                                                                                    value={data?.call_money}
                                                                                                    name={'call_money'}
                                                                                                    table={[
                                                                                                        { "cat_type": "3", "header": "Amount ", "node": true, "nameattr": "call_money", "document": "" },
                                                                                                        { "cat_type": "7", "header": "Date of call", "node": true, "nameattr": "date_of_call" },
                                                                                                        { "cat_type": "18", "header": "offer made", "node": true, "nameattr": "offer_made" }]}
                                                                                                    onChange={(e) => handleOnInputChange(e, index, data)}
                                                                                                />
                                                                                            </td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                        </tr>
                                                                                        {/*     ) : ("")
                                        */}
                                                                                    </tbody>
                                                                                </Table>
                                                                            </>
                                                                        ) : ("")
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>) : ("")
                                                    }
                                                </>
                                            );
                                        })}

                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export const ShareholdersUserList = (props) => {
    const SecurityHolder = useRef('');
    var count = 0;
    return (
        <>
            <Col xs={12} ref={SecurityHolder} >
                <div className="sectioninnerbox px-0 mt-2 py-2">
                    <Table responsive className="tabletyp1 " border={'1px solid'} >
                        <thead>
                            <tr>
                                <th >Sr. No</th>
                                <th >Class Type</th>
                                <th >Name of the shareholder</th>
                                <th >Folio Number/Demat Account Number</th>
                                <th >PAN/Passport/CIN/Registration Number</th>
                                <th >{`No of Shares held `} </th>
                                <th >Face Value</th>
                                <th > Fully Paid/Amount in Arrears </th>
                                <th > {`No of Issued Shares eligible`} </th>
                                <th colspan="2"><center>Ratio</center></th>
                                <th > {`No of be offered`} </th>
                            </tr>

                        </thead>
                        <tbody>
                            {props?.ShareholdersclassSec && Object.values(props?.ShareholdersclassSec)?.map((data, sindex) => {
                                return (data?.shareholdingdetails && Object.values(data?.shareholdingdetails)?.map((shareholdingdetails, pindex) => {
                                    const offered = +shareholdingdetails?.number_of_shares_allotted * +data?.ratio_old / +data?.ratio_new;
                                    return (<>
                                        <tr>
                                            <td>{++count}</td>
                                            <td>{shareholdingdetails?.classdetails?.class_type}</td>
                                            <td>{shareholdingdetails?.personaldata?.name}</td>
                                            <td>{shareholdingdetails?.folio_number}</td>
                                            <td>{shareholdingdetails?.personaldata?.cin_llpin_reg_number}</td>
                                            <td>{shareholdingdetails?.personaldata?.total_shareheld}</td>
                                            <td>{shareholdingdetails?.classdetails?.face_value}</td>
                                            <td>{shareholdingdetails?.amount_payable <= 0 ? 'Fully Paid' : 'Amount in Arrears'}</td>
                                            <td>{shareholdingdetails?.number_of_shares_allotted}</td>
                                            <td>{data?.ratio_old ? data?.ratio_old : 0}</td>
                                            <td>{data?.ratio_new ? data?.ratio_new : 0}</td>
                                            {/* <td> <YesNoChecked
                                                    className="w-120px"
                                                    onChange={(e) => handleOnInputChange(e, sindex,pindex,data)}
                                                    value={shareholdingdetails?.partial_rights_entitlement}
                                                    name="partial_rights_entitlement"
                                                    id={sindex+pindex+'partial_rights_entitlement'}
                                                /></td> */}
                                            <td>{isNaN(offered) ? 0 : Math.floor(offered)}</td>

                                            {/* <td><Form.Control className='w-150px' type="text" name="remarks"
                                                value={shareholdingdetails?.remarks}
                                                onChange={(e) => handleOnInputChange(e, sindex,pindex,data)}
                                            /></td> */}
                                        </tr>

                                    </>);
                                })

                                )
                            })}
                        </tbody>
                    </Table>
                </div>

            </Col>
        </>
    )
}

export const ShareholdersUserListAditional = (props) => {
    console.log('ShareholdersUserListAditional', props)
    const SecurityHolder = useRef('');
    var count = 0;
    const { type_of_request, sub_agenda_id, agenda_id } = useParams();
    let url = '';
    if (type_of_request) {
        url = `type_of_request=${type_of_request}`;
    }
    const { data, loading, error, reFetchData } = useFetch(`/api/v1/requestresolutionservice/additionalshareholder/${props?.agenda_req_id}?${url}`);
const optionexercisedstatus =[];
    return (
        <>
            <Col xs={12} ref={SecurityHolder} >
                <div className="sectioninnerbox px-0 mt-2 py-2">
                    <Table responsive className="tabletyp1 " border={'1px solid'} >
                        <thead>
                            <tr>
                                <th >Sr. No</th>
                                <th >Class Type</th>
                                <th >Name of the shareholder</th>
                                <th >Folio Number/Demat Account Number</th>
                                <th >PAN/Passport/CIN/Registration Number</th>
                                <th >{`No of Shares held `} </th>
                                <th >Face Value</th>
                                <th > Fully Paid/Amount in Arrears </th>
                                <th > {`No of Issued Shares eligible`} </th>
                                <th colspan="2"><center>Ratio</center></th>
                                <th> {`No of be offered`} </th>
                                <th> {'Status'} </th>
                                <th> Action</th>
                            </tr>

                        </thead>
                        <tbody>
                            {data && Object.values(data)?.map((shareholdingdetails, pindex) => {
                                // const shareholdingdetails= data?.shareholder
                                const offered = shareholdingdetails?.no_of_be_offered;
                                const status = optionexercisedstatus.filter(function (el) {
                                    return el.value == shareholdingdetails?.option_exercised;
                                })[0]?.label
                                console.log('shareholdingdetails cp1', shareholdingdetails, data)
                                return (<>
                                    <tr>
                                        <td>{++count}</td>
                                        <td>{shareholdingdetails?.classdetails?.class_type}</td>
                                        <td>{shareholdingdetails?.personaldata?.name}</td>
                                        <td>{shareholdingdetails?.folio_number}</td>
                                        <td>{shareholdingdetails?.personaldata?.cin_llpin_reg_number}</td>
                                        <td>{shareholdingdetails?.personaldata?.total_shareheld}</td>
                                        <td>{shareholdingdetails?.classdetails?.face_value}</td>
                                        <td>{shareholdingdetails?.amount_payable <= 0 ? 'Fully Paid' : 'Amount in Arrears'}</td>
                                        <td>{shareholdingdetails?.personaldata?.no_of_shares}</td>
                                        <td>{shareholdingdetails?.ratio_old ? shareholdingdetails?.ratio_old : 0}</td>
                                        <td>{shareholdingdetails?.ratio_new ? shareholdingdetails?.ratio_new : 0}</td>
                                        <td>{isNaN(offered) ? 0 : Math.floor(offered)}</td>
                                        <td>{status}</td>

                                        <td>
                                            <div className={"tableactionbtngroup"}>
                                                <DeleteConfirm
                                                    key={shareholdingdetails?.id}
                                                    payload={{
                                                        id: shareholdingdetails?.id,
                                                        model: 'AgendaRequestRightIssueUser',
                                                        message: `Shareholder`
                                                    }}
                                                    reFetchData={reFetchData}
                                                /></div>

                                        </td>
                                    </tr>

                                </>);
                            })}


                        </tbody>
                    </Table>
                </div>

            </Col>
        </>
    )
}


export const CallMoneyList = (props) => {
    console.log('ShareholdersUserListAditional', props)
    const { dynamicFormValues, setdynamicFormValues } = useAppContext();

    const SecurityHolder = useRef('');
    var count = 0;
    const { data, loading, error, reFetchData } = useFetch(`/api/v1/requestresolutionservice/rightissueuser/${props?.agenda_req_id}`);
    const [divisionofisstoggle, setDivisionofIssToggle] = useState(null);
    const [fomdata, setfomdata] = useState([]);
    const [status, setstatus] = useState(true);
    const handleOnInputChange = (evnt, index, pindex, data) => {
        let { value, name } = evnt.target;
        let list = [...fomdata];
        if (!list[index]) {
            list[index] = {}
        }
        if (!list[index][pindex]) {
            list[index][pindex] = {}
        }
        list[index][pindex]['id'] = data?.id
        list[index][pindex]['json'] = value;
        setfomdata(list)
        console.log('CallMoneyList', list)
        setdynamicFormValues({ 'rightissueuser': JSON.stringify(list) })
    }
    const handleOnChange = (evnt, index, data) => {
        let { value, name } = evnt.target;
        console.log('CallMoneyList cp1', value)

        let list = [...fomdata];
        if (!list[index]) {
            list[index] = {}
        }
        if (!list[index][name]) {
            list[index][name] = {}
        }
        console.log('CallMoneyList cp2', list)
        list[index]['id'] = data?.id
        list[index][name]['json'] = value;
        setfomdata(list)
        console.log('CallMoneyList cp3', list)
        setdynamicFormValues({ 'application_money': JSON.stringify(list) })
    }
    let handleDivisionofIssToggle = (id) => {
        if (divisionofisstoggle === id) {
            setDivisionofIssToggle(null)(!divisionofisstoggle);
            return false;
        }
        setDivisionofIssToggle(id);
    };

    return (
        <>
            <Col xs={12} ref={SecurityHolder} >
                <h4>{`Call Money`}</h4>
                <div className="sectioninnerbox px-0 mt-2 py-2">
                    <Table responsive className="tabletyp1 " border={'1px solid'} >
                        <thead>
                            <tr>
                                <th >Share Holder</th>
                                <th >Amount</th>
                                <th >Call Money</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data?.map((shareholdingdetails, index) => {
                                console.log('shareholdingdetails>>>>>>>>>>>>>>>>>>', shareholdingdetails)
                                return (<>
                                    <tr>
                                        <td>{shareholdingdetails?.personaldata?.name}</td>
                                        <td>{shareholdingdetails?.accept_shares}</td>
                                        <td className="text-center w-200px" >
                                            <div className={"tableactionbtngroup text-nowrap"}>
                                                <Button className="tableactionbtn1" onClick={() => handleDivisionofIssToggle(index)} data-for="remarkTip" data-tip="Remark"><img src="/img/icons/click.svg" /></Button>
                                                <ReactTooltip id="remarkTip" effect="solid" place="top" />
                                            </div>
                                        </td>
                                    </tr>

                                    {index === divisionofisstoggle &&
                                        (<>
                                            <tr className="activetableaccordenbody bg-transparent">
                                                <td className="w-200px">
                                                    <Form.Label>Allotment money</Form.Label>
                                                </td>
                                                <td className="w-200px">
                                                    {shareholdingdetails?.class?.agenda_request_right_issue?.allotment_money}
                                                </td>
                                                <td>
                                                    <TableGenerate
                                                        key={index + 1}
                                                        value={shareholdingdetails?.allotment_money}
                                                        name={'allotment_money'}
                                                        onChange={(e) => handleOnChange(e, index, shareholdingdetails)}
                                                        table={[
                                                            { "cat_type": "3", "header": "Amount ", "node": true, "nameattr": "call_money" },
                                                            { "cat_type": "7", "header": "payment date", "node": true, "nameattr": "payment_date" }
                                                        ]}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-200px">
                                                    <Form.Label>Application money</Form.Label>
                                                </td>
                                                <td className="w-200px">
                                                    {shareholdingdetails?.class?.agenda_request_right_issue?.application_money}
                                                </td>
                                                <td>
                                                    <TableGenerate
                                                        key={index + 1}
                                                        value={shareholdingdetails?.application_money}
                                                        name={'application_money'}
                                                        onChange={(e) => handleOnChange(e, index, shareholdingdetails)}
                                                        table={[
                                                            { "cat_type": "3", "header": "Amount ", "node": true, "nameattr": "call_money" },
                                                            { "cat_type": "7", "header": "payment date", "node": true, "nameattr": "payment_date" }
                                                        ]}
                                                    />
                                                </td>
                                            </tr>
                                            <tr className="activetableaccordenbody bg-transparent">
                                                <td colSpan={40}>
                                                    <td >
                                                        <Table responsive className="tabletyp1 " border={'1px solid'} >
                                                            <thead>
                                                                <tr>
                                                                    <th >Amount</th>
                                                                    <th >Call Date</th>
                                                                    <th >Call Money</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {shareholdingdetails?.class_call_money && shareholdingdetails?.class_call_money[0]?.map((call, pindex) => {
                                                                    console.log('shareholdingdetails?.call_money', shareholdingdetails?.call_money, pindex)
                                                                    let callmoney;
                                                                    console.log('shareholdingdetailscallmoney', shareholdingdetails?.call_money)
                                                                    if (shareholdingdetails?.call_money && shareholdingdetails?.call_money[pindex]) {
                                                                        console.log('shareholdingdetailscallmoney', JSON.parse(shareholdingdetails?.call_money[pindex].json))
                                                                        callmoney = (shareholdingdetails?.call_money[pindex]?.json)
                                                                    }
                                                                    return (<>
                                                                        <tr>
                                                                            <td >{call?.call_money}</td>
                                                                            <td >{call?.date_of_call}</td>
                                                                            <td >
                                                                                <TableGenerate
                                                                                    key={pindex + 1}
                                                                                    value={callmoney}
                                                                                    name={'call_money'}
                                                                                    onChange={(e) => handleOnInputChange(e, index, pindex, shareholdingdetails)}
                                                                                    table={[
                                                                                        { "cat_type": "3", "header": "Amount ", "node": true, "nameattr": "call_money" },
                                                                                        { "cat_type": "7", "header": "payment date", "node": true, "nameattr": "payment_date" }
                                                                                    ]}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    </>)
                                                                })}

                                                            </tbody>
                                                        </Table>
                                                    </td>
                                                </td>
                                            </tr>

                                        </>
                                        )
                                    }
                                </>);
                            })}


                        </tbody>
                    </Table>
                </div>

            </Col>
        </>
    )
}

export const ShareholdersUserListPostMeeting = (props) => {
    const { dynamicFormValues, setdynamicFormValues } = useAppContext();

    const SecurityHolder = useRef('');
    var count = 0;
    const [remarktoggle, setRemarkToggle] = useState(null);

    let handleRemarkToggle = (id) => {
        if (remarktoggle === id) {
            setRemarkToggle(null)(!remarktoggle);
            return false;
        }
        setRemarkToggle(id);
    };

    const savedata = (payload) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = [];
        props?.onChange(data)
    }
    // ShareholdersRightsoffer


    const handleOnInputChange = (evnt, sindex, pindex) => {
        let { value, name } = evnt.target;
        let list = [...props?.ShareholdersclassSec]
        list[sindex]['shareholdingdetails'][pindex][name] = value;
        props?.setShareholdersclassSec(list);
        savedata(list);
        setdynamicFormValues({ 'ShareholdersRightsofferext': JSON.stringify(list) })
    }
    const [divisionofisstoggle, setDivisionofIssToggle] = useState(null);

    let handleDivisionofIssToggle = (id) => {
        if (divisionofisstoggle === id) {
            setDivisionofIssToggle(null)(!divisionofisstoggle);
            return false;
        }
        setDivisionofIssToggle(id);
    };
    console.log('ShareholdersRightsofferext cp1', props?.ShareholdersclassSec)
    function ConverUiJsonTotable(data) {
        console.log('ConverUiJsonTotable cp01', data)
        if (!data) return [];
        const table = [];
        const tabledata = JSON.parse(data);
        const table_column = {};
        for (const [key, columns] of Object.entries(tabledata)) {
            table.push({});
            for (const column of columns) {
                table[key][column.nameattr] = column.value;
            }
        }
        return table;
    }
    return (
        <>
            <Col xs={12} ref={SecurityHolder} >
                <div className="sectioninnerbox px-0 mt-2 py-2">
                    <Table responsive className="tabletyp1 " border={'1px solid'} >
                        <thead>
                            <tr>
                                <th >Sr. No</th>
                                <th >Name of the shareholder</th>
                                <th >Folio Number/Demat Account Number</th>
                                <th >PAN/Passport/CIN/Registration Number</th>
                                <th >{`No of Shares held `} </th>
                                <th >Face Value</th>
                                <th > Fully Paid/Amount in Arrears </th>
                                <th > {`No of Issued Shares eligible`} </th>
                                <th colspan="2"><center>Ratio</center></th>
                                <th > {`No of be offered`} </th>
                                <th > {`Consent letter`} </th>
                                <th > {`Date of circulation`} </th>
                                <th > {`Sign by`} </th>
                                <th > {`Remark`} </th>
                                <th > {`Document`} </th>
                                <th > {`Status`} </th>
                                {/* <th > {`Call Money`} </th> */}
                            </tr>

                        </thead>
                        <tbody>
                            {props?.ShareholdersclassSec && Object.values(props?.ShareholdersclassSec)?.map((data, sindex) => {
                                return (data?.shareholdingdetails && data?.shareholdingdetails?.map((shareholdingdetails, pindex) => {
                                    const offered = +shareholdingdetails?.number_of_shares_allotted * +data?.ratio_old / +data?.ratio_new;
                                    console.log('shareholdingdetails cp1', shareholdingdetails, data)
                                    const index = sindex + pindex;
                                    const status = optionexercisedstatus.filter(function (el) {
                                        return el.value == shareholdingdetails?.option_exercised;
                                    })[0]?.label
                                    // const call_money = ConverUiJsonTotable(shareholdingdetails?.class?.agenda_request_right_issue?.call_money)
                                    // const total = sumArray(pluck(call_money,'call_money'))
                                    // const call_money_re = ConverUiJsonTotable(shareholdingdetails?.call_money)
                                    // const total_re = sumArray(pluck(call_money_re,'call_money'))
                                    // console.log('ConverUiJsonTotable cp4',shareholdingdetails?.call_money )
                                    return (<>
                                        <tr>
                                            <td>{++count}</td>
                                            <td>{shareholdingdetails?.personaldata?.name}</td>
                                            <td>{shareholdingdetails?.folio_number}</td>
                                            <td>{shareholdingdetails?.personaldata?.cin_llpin_reg_number}</td>
                                            <td>{shareholdingdetails?.personaldata?.total_shareheld}</td>
                                            <td>{shareholdingdetails?.classdetails?.face_value}</td>
                                            <td>{shareholdingdetails?.amount_payable <= 0 ? 'Fully Paid' : 'Amount in Arrears'}</td>
                                            <td>{shareholdingdetails?.personaldata?.no_of_shares}</td>
                                            <td>{data?.ratio_old ? data?.ratio_old : 0}</td>
                                            <td>{data?.ratio_new ? data?.ratio_new : 0}</td>

                                            <td>{isNaN(offered) ? 0 : Math.floor(offered)}</td>
                                            <td>
                                                <SelectValField
                                                    xs={12}
                                                    className={"w-200px"}
                                                    name={'consent_letter'}
                                                    options={[
                                                        { label: "Electronic Delivery", value: 1 },
                                                        { label: "Manual Despatch", value: 2 },
                                                    ]}
                                                    onChange={(e) => handleOnInputChange(e, sindex, pindex, data)}
                                                    value={shareholdingdetails?.consent_letter}
                                                />
                                            </td>
                                            <td>
                                                <DatePicker
                                                    className={"w-200px"}
                                                    xs={12}
                                                    name="date_of_circulation"
                                                    value={shareholdingdetails?.date_of_circulation}
                                                    onChange={(e) => handleOnInputChange(e, sindex, pindex, data)}
                                                />
                                            </td>
                                            <td>
                                                <AsyncSelectsNew
                                                    className={"w-200px"}
                                                    xs={12}
                                                    name={'sign_by'}
                                                    ref_table={'CompanyDirKmpProf'}
                                                    onChange={(e) => handleOnInputChange(e, sindex, pindex, data)}
                                                    value={shareholdingdetails?.sign_by}
                                                />
                                            </td>
                                            <td className="text-center w-200px" >
                                                <div className={"tableactionbtngroup text-nowrap"}>
                                                    <Button className="tableactionbtn1" onClick={() => handleRemarkToggle(index)} data-for="remarkTip" data-tip="Remark"><img src="/img/icons/click.svg" /></Button>
                                                    <ReactTooltip id="remarkTip" effect="solid" place="top" />
                                                </div>
                                            </td>

                                            <td className="text-center w-200px" >
                                                {shareholdingdetails?.consent_letter == 2 && <FileUpload
                                                    id={'rightissue_offer_letter'}
                                                    document={shareholdingdetails?.rightissue_offer_letter
                                                    }
                                                    value={shareholdingdetails?.rightissue_offer_letter}
                                                    noupload={true}
                                                />}
                                            </td>
                                            <td className="text-center w-200px" >
                                                {status}
                                            </td>
                                            {/* <td className="text-center w-200px" >
                                                <div className={"tableactionbtngroup text-nowrap"}>
                                                    <Button className="tableactionbtn1" onClick={() => handleDivisionofIssToggle(index)} data-for="remarkTip" data-tip="Remark"><img src="/img/icons/click.svg" /></Button>
                                                    <ReactTooltip id="remarkTip" effect="solid" place="top" />
                                                </div>
                                            </td> */}
                                        </tr>
                                        {index === remarktoggle && (
                                            <tr tableaccordenbody={index} className="activetableaccordenbody">
                                                <td colSpan={50}>
                                                    <div className="tableactionbox">
                                                        {index === remarktoggle ?
                                                            (
                                                                <>
                                                                    <Table className="tabletyp1">
                                                                        <thead>
                                                                            <tr>
                                                                                <th colSpan={50} className="px-0">
                                                                                    Remark
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="w-200px">
                                                                                    <InputText
                                                                                        xs={12}
                                                                                        name="remark"
                                                                                        value={shareholdingdetails?.remark}
                                                                                        onChange={(e) => handleOnInputChange(e, sindex, pindex, data)}
                                                                                        placeholder={" "}
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>
                                                                </>
                                                            ) : ("")
                                                        }

                                                    </div>
                                                </td>
                                            </tr>)}
                                    </>);
                                })

                                )
                            })}
                        </tbody>
                    </Table>
                </div>

            </Col>
        </>
    )
}

export const ShareholdersUserListPostMeetingListAditional = (props) => {
    const { dynamicFormValues, setdynamicFormValues } = useAppContext();

    const SecurityHolder = useRef('');
    var count = 0;
    const [remarktoggle, setRemarkToggle] = useState(null);
    const [formdata, setFormdata] = useState([]);

    let handleRemarkToggle = (id) => {
        if (remarktoggle === id) {
            setRemarkToggle(null)(!remarktoggle);
            return false;
        }
        setRemarkToggle(id);
    };

    const savedata = (payload) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = payload;
        props?.onChange(data)
    }
    // ShareholdersRightsoffer

    const { data, loading, error, reFetchData } = useFetch(`/api/v1/requestresolutionservice/additionalshareholder/${props?.agenda_req_id}`);

    useEffect(() => {
        if (data) {
            setFormdata(data);
        }
    }, [data])

    const handleOnInputChange = (evnt, index) => {
        let { value, name } = evnt.target;
        let list = [...formdata]
        list[index][name] = value;
        setFormdata(list);
        savedata(list)
    }
    const [divisionofisstoggle, setDivisionofIssToggle] = useState(null);

    let handleDivisionofIssToggle = (id) => {
        if (divisionofisstoggle === id) {
            setDivisionofIssToggle(null)(!divisionofisstoggle);
            return false;
        }
        setDivisionofIssToggle(id);
    };
    console.log('ShareholdersRightsofferext cp1', props?.ShareholdersclassSec)
    function ConverUiJsonTotable(data) {
        console.log('ConverUiJsonTotable cp01', data)
        if (!data) return [];
        const tabledata = JSON.parse(data);
        const table = [];
        const table_column = {};
        for (const [key, columns] of Object.entries(tabledata)) {
            table.push({});
            for (const column of columns) {
                table[key][column.nameattr] = column.value;
            }
        }
        return table;
    }
    return (
        <>
            <Col xs={12} ref={SecurityHolder} >
                <div className="sectioninnerbox px-0 mt-2 py-2">
                    <Table responsive className="tabletyp1 " border={'1px solid'} >
                        <thead>
                            <tr>
                                <th >Sr. No</th>
                                <th >Name of the shareholder</th>
                                <th >Folio Number/Demat Account Number</th>
                                <th >PAN/Passport/CIN/Registration Number</th>
                                <th >{`No of Shares held `} </th>
                                <th >Face Value</th>
                                <th > Fully Paid/Amount in Arrears </th>
                                <th > {`No of Issued Shares eligible`} </th>
                                <th colspan="2"><center>Ratio</center></th>
                                <th > {`No of be offered`} </th>
                                <th > {`Consent letter`} </th>
                                <th > {`Date of circulation`} </th>
                                <th > {`Sign by`} </th>
                                <th > {`Remark`} </th>
                                <th > {`Document`} </th>
                                <th > {`Status`} </th>
                                {/* <th > {`Call Money`} </th> */}
                            </tr>

                        </thead>
                        <tbody>
                            {data && data?.map((shareholdingdetails, index) => {
                                const offered = +shareholdingdetails?.no_of_be_offered;

                                // const index = sindex + pindex;
                                const status = optionexercisedstatus.filter(function (el) {
                                    return el.value == shareholdingdetails?.option_exercised;
                                })[0]?.label

                                const call_money = ConverUiJsonTotable(shareholdingdetails?.class?.agenda_request_right_issue?.call_money)
                                const total = sumArray(pluck(call_money, 'call_money'))
                                // const call_money_re = ConverUiJsonTotable(shareholdingdetails?.call_money)
                                // const total_re = sumArray(pluck(call_money_re,'call_money'))

                                return (<>
                                    <tr>
                                        <td>{++count}</td>
                                        <td>{shareholdingdetails?.personaldata?.name}</td>
                                        <td>{shareholdingdetails?.personaldata?.folio_number}</td>
                                        <td>{shareholdingdetails?.personaldata?.cin_llpin_reg_number}</td>
                                        <td>{shareholdingdetails?.personaldata?.total_shareheld}</td>
                                        <td>{shareholdingdetails?.classdetails?.face_value}</td>
                                        <td>{shareholdingdetails?.amount_payable <= 0 ? 'Fully Paid' : 'Amount in Arrears'}</td>
                                        <td>{shareholdingdetails?.personaldata?.no_of_shares}</td>
                                        <td>{shareholdingdetails?.ratio_old ? shareholdingdetails?.ratio_old : 0}</td>
                                        <td>{shareholdingdetails?.ratio_new ? shareholdingdetails?.ratio_new : 0}</td>

                                        <td>{isNaN(offered) ? 0 : Math.floor(offered)}</td>
                                        <td>
                                            <SelectValField
                                                xs={12}
                                                className={"w-200px"}
                                                name={'consent_letter'}
                                                options={[
                                                    { label: "Electronic Delivery", value: 1 },
                                                    { label: "Manual Despatch", value: 2 },
                                                ]}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                                value={shareholdingdetails?.consent_letter}
                                            />
                                        </td>
                                        <td>
                                            <DatePicker
                                                className={"w-200px"}
                                                xs={12}
                                                name="date_of_circulation"
                                                value={shareholdingdetails?.date_of_circulation}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <AsyncSelectsNew
                                                className={"w-200px"}
                                                xs={12}
                                                name={'sign_by'}
                                                ref_table={'CompanyDirKmpProf'}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                                value={shareholdingdetails?.sign_by}
                                            />
                                        </td>
                                        <td className="text-center w-200px" >
                                            <div className={"tableactionbtngroup text-nowrap"}>
                                                <Button className="tableactionbtn1" onClick={() => handleRemarkToggle(index)} data-for="remarkTip" data-tip="Remark"><img src="/img/icons/click.svg" /></Button>
                                                <ReactTooltip id="remarkTip" effect="solid" place="top" />
                                            </div>
                                        </td>

                                        <td className="text-center w-200px" >
                                            {shareholdingdetails?.consent_letter == 2 && <FileUpload
                                                id={'rightissue_offer_letter'}
                                                document={shareholdingdetails?.rightissue_offer_letter
                                                }
                                                value={shareholdingdetails?.rightissue_offer_letter}
                                                noupload={true}
                                            />}
                                        </td>
                                        <td className="text-center w-200px" >
                                            {status}
                                        </td>
                                        {/* <td className="text-center w-200px" >
                                                <div className={"tableactionbtngroup text-nowrap"}>
                                                    <Button className="tableactionbtn1" onClick={() => handleDivisionofIssToggle(index)} data-for="remarkTip" data-tip="Remark"><img src="/img/icons/click.svg" /></Button>
                                                    <ReactTooltip id="remarkTip" effect="solid" place="top" />
                                                </div>
                                            </td> */}
                                    </tr>
                                    {index === remarktoggle && (
                                        <tr tableaccordenbody={index} className="activetableaccordenbody">
                                            <td colSpan={50}>
                                                <div className="tableactionbox">
                                                    {index === remarktoggle ?
                                                        (
                                                            <>
                                                                <Table className="tabletyp1">
                                                                    <thead>
                                                                        <tr>
                                                                            <th colSpan={50} className="px-0">
                                                                                Remark
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="w-200px">
                                                                                <InputText
                                                                                    xs={12}
                                                                                    name="remark"
                                                                                    value={shareholdingdetails?.remark}
                                                                                    onChange={(e) => handleOnInputChange(e, index)}
                                                                                    placeholder={" "}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </Table>
                                                            </>
                                                        ) : ("")
                                                    }

                                                </div>
                                            </td>
                                        </tr>)
                                    }

                                    {index === divisionofisstoggle &&
                                        (<>
                                            <Table className="tabletyp1 notfocus ">
                                                <thead>
                                                    <tr>
                                                        <th colSpan={50} className="px-0">
                                                            Call Money list
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="activetableaccordenbody bg-transparent">
                                                        <td colSpan={50}>
                                                            <TableGenerate
                                                                key={index + 1}
                                                                value={shareholdingdetails?.class?.agenda_request_right_issue?.call_money}
                                                                name={'call_money'}
                                                                table={[
                                                                    { "cat_type": "3", "header": "Amount ", "node": true, "nameattr": "call_money" },
                                                                    { "cat_type": "7", "header": "last Date", "node": true, "nameattr": "last_date" }]}
                                                                readOnly
                                                            />

                                                        </td>
                                                        <td colSpan={50}>
                                                            {/* <TableGenerate
                                                                    key={index + 1}
                                                                    value={shareholdingdetails?.call_money}
                                                                    name={'call_money'}
                                                                    table={[
                                                                        { "cat_type": "3", "header": "Amount ", "node": true, "nameattr": "call_money" },
                                                                        { "cat_type": "7", "header": "payment date", "node": true, "nameattr": "payment_date" }]}
                                                                    onChange={(e) => handleOnInputChange(e,index)}
                                                                /> */}
                                                        </td>
                                                    </tr>
                                                    {/* <tr>
                                                            <td>Total Amount : {total}</td>
                                                            <td>Total received Balance : {total_re}</td>
                                                            <td>Total Balance : {total - total_re}</td>
                                                        </tr> */}
                                                </tbody>
                                            </Table>
                                        </>
                                        )
                                    }

                                </>);
                            })}
                        </tbody>
                    </Table>
                </div>

            </Col>
            <CallMoneyList
                {...props}
            />
        </>
    )
}






export const AuthorisedUserList = (props) => {
    console.log('first ShareholdersList', props)
    const [classSec, setclassSec] = useState([])
    const [IsLoading, setIsLoading] = useState(false)
    const type_of_class = props?.dynamicFormValues?.EligibleClass
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();

    const getclassofSec = () => {
        try {
            const headerPyalod = getNormalHeaders();
            setIsLoading(true);
            const response = axios.get(`/api/v1/typeofClass/${type_of_class}`, headerPyalod)
                .then((response) => {
                    console.log("getclassofSec last", response?.data);
                    setclassSec(response?.data);
                    props?.setdynamicFormValues({ ...dynamicFormValues, 'typeofClasstable': response?.data })

                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.response) {
                        setValidationError(error.response.data.errors)
                        setIsLoading(false)

                    } else if (error.request) {
                        setIsLoading(false)
                    } else {
                        setIsLoading(false)
                    }
                });

        } catch (err) {
            setValidationError(err)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (type_of_class && !agenda_req_id) {
            getclassofSec(type_of_class);
        }
    }, [type_of_class])

    useEffect(() => {
        if (props?.dynamicFormValues?.[props.name + 'ext']) {
            if (typeof props?.dynamicFormValues?.[props.name + 'ext'] != 'object') {
                const data = JSON.parse(props?.dynamicFormValues?.[props.name + 'ext']);
                setclassSec(data);
            }
        }
    }, [props?.dynamicFormValues?.[props.name + 'ext']])


    const SecurityHolder = useRef('');
    useEffect(() => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = classSec;
        props?.onChange(data)

    }, [SecurityHolder, classSec])

    useEffect(() => {
        if (props?.dynamicFormValues?.[props.name + 'ext']) {
            if (typeof props?.dynamicFormValues?.[props.name + 'ext'] != 'object') {
                const data = JSON.parse(props?.dynamicFormValues?.[props.name + 'ext']);
                setclassSec(data);
            }
        }
    }, [props?.dynamicFormValues?.[props.name + 'ext']])


    const handleOnInputChange = (evnt, index) => {
        let { value, name } = evnt.target;
        let list = [...classSec]
        list[index][name] = value;
        list[index]['no_of_be_offered'] = Math.trunc(+list[index]?.classdetails?.number_of_shares * +list[index]?.ratio_old / +list[index]?.ratio_new);
        setclassSec(list);
    }

    return (
        <>
            <Col xs={12} ref={SecurityHolder} >
                <div className="sectioninnerbox px-0 mt-2 py-2">
                    <Table responsive className="tabletyp1 " border={'1px solid'} >
                        <thead>
                            <tr>
                                <th >name of Class </th>
                                <th >Number of shares </th>
                                <th >Face Value of Shares </th>
                                <th >Total Amount </th>
                                <th >Face Value</th>
                                <th >Premium Amount per share</th>
                                <th >Issue value per share</th>
                                <th >Price per share as per valuation report</th>
                                <th >Date of the Valuation Report</th>
                                <th >Total Quantum of Issue</th>
                            </tr>

                        </thead>
                        <tbody>
                            {classSec && classSec?.map((shareholdingdetails, index) => {
                                console.log('shareholdingdetails', shareholdingdetails)
                                const offered = Math.trunc(+shareholdingdetails?.classdetails?.number_of_shares * +shareholdingdetails?.ratio_old / +shareholdingdetails?.ratio_new);
                                const premium_amount = +shareholdingdetails?.face_value + +shareholdingdetails?.premium_amount;
                                return (<>
                                    <tr>
                                        <td>{shareholdingdetails?.class_type}</td>
                                        <td>{shareholdingdetails?.number_of_shares}</td>
                                        <td>{shareholdingdetails?.face_value}</td>
                                        <td>{shareholdingdetails?.total_equity_amt}</td>
                                        <td>
                                            <Form.Control type="number" name="face_value_user"
                                                value={shareholdingdetails?.face_value_user || shareholdingdetails?.face_value}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control type="number" name="premium_amount"
                                                value={shareholdingdetails?.premium_amount}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            {!isNaN(premium_amount) ? Math.floor(premium_amount) : 0}
                                        </td>
                                        <td>
                                            <Form.Control type="number" name="price_per_share"
                                                value={shareholdingdetails?.price_per_share}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control type="date" name="valuation"
                                                value={shareholdingdetails?.valuation}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control type="number" name="total_quantum"
                                                value={shareholdingdetails?.total_quantum}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                            />
                                        </td>
                                    </tr>

                                </>);
                            })}
                        </tbody>
                    </Table>
                </div>

            </Col>
        </>
    )
}

export const InputTextMulti = (props) => {
    console.log('InputTextMulti', props);
    // const [newformvalue, setnewFormvalue] = useState([{ branch: '' }]);
    
    const addField = () => {
        props?.setnewFormvalue([...props?.newformvalue, props?.initialstate]);
    };

    const removeField = (index) => {
        const rows = [...props?.newformvalue];
        rows.splice(index, 1);
        props?.setnewFormvalue(rows);
    };

    const handleOnChange = (event, index, id) => {
        const { name, value, data } = event.target
        const list = [...props?.newformvalue];
        list[index][name] = value;
        props?.setnewFormvalue(list)
        // console.log('setnewFormvaluesetnewFormvalue', newFormvalue);
        const datas = {
            target: {
                name: '',
                value: ''
            }
        };
        datas['target']['name'] = props?.name
        datas['target']['value'] = JSON.stringify(list);
        props?.onChange(datas)
    }

 

    console.log('handleOnChangeshilpa', props?.newformvalue);
    return (
        <>
            <Col xs={12}>
                <Row>
                <Col xs={6}>
                    <div className="text-start text-bold">
                        <Form.Label>Add {props?.label} </Form.Label>
                    </div>
                </Col>
                <Col xs={6}>
                    <div className="text-end">
                        <Button onClick={addField} variant="light" className="add-btn" ><i className="fa-solid fa-plus"></i></Button>
                    </div>
                </Col>
                </Row>
            </Col>
            {props?.newformvalue && props?.newformvalue?.map((data, index) => {
                const {
                    id,

                } = data;
                console.log('data form', data);
                // console.log('state+++', type_of_address);
                return (
                    <Col xs={4}>
                        <Row>
                        <InputText
                            value={data?.bench}
                            name={'bench'}
                            onChange={(e)=>handleOnChange(e,index)}
                            placeholder={" "}
                            xs={9}
                        />
                        
                        <Col xs={3}>
                            <td className="text-end">
                                <div className={"tableactionbtngroup"}>
                                    <div className="text-end">
                                        <Button type="button" variant="secondary" onClick={() => removeField(index)} className="add-btn" ><i className="fa-solid fa-minus"></i></Button>
                                    </div>

                                </div>
                            </td>
                        </Col>
                        </Row>
                    </Col>
                );
            })}
        </>
    )
}

export const ShareholdersDivisionList = (props) => {
    console.log('first ShareholdersList', props)
    const [classSec, setclassSec] = useState([])
    const [IsLoading, setIsLoading] = useState(false)
    const type_of_class = props?.dynamicFormValues?.EligibleClass
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();

    const getclassofSec = () => {
        try {
            const headerPyalod = getNormalHeaders();
            setIsLoading(true);
            const response = axios.get(`/api/v1/typeofClassbyUser/${type_of_class}`, headerPyalod)
                .then((response) => {
                    console.log("getclassofSec last", response?.data);
                    setclassSec(response?.data);
                    props?.setdynamicFormValues({ ...dynamicFormValues, 'typeofClasstable': response?.data })

                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.response) {
                        setValidationError(error.response.data.errors)
                        setIsLoading(false)

                    } else if (error.request) {
                        setIsLoading(false)
                    } else {
                        setIsLoading(false)
                    }
                });

        } catch (err) {
            setValidationError(err)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (type_of_class && !agenda_req_id) {
            getclassofSec(type_of_class);
        }
    }, [type_of_class])

    useEffect(() => {
        if (props?.dynamicFormValues?.[props.name + 'ext']) {
            if (typeof props?.dynamicFormValues?.[props.name + 'ext'] != 'object') {
                const data = JSON.parse(props?.dynamicFormValues?.[props.name + 'ext']);
                setclassSec(data);
            }
        }
    }, [props?.dynamicFormValues?.[props.name + 'ext']])


    const SecurityHolder = useRef('');
    useEffect(() => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = classSec;
        props?.onChange(data)

    }, [SecurityHolder, classSec])

    useEffect(() => {
        if (props?.dynamicFormValues?.[props.name + 'ext']) {
            if (typeof props?.dynamicFormValues?.[props.name + 'ext'] != 'object') {
                const data = JSON.parse(props?.dynamicFormValues?.[props.name + 'ext']);
                setclassSec(data);
            }
        }
    }, [props?.dynamicFormValues?.[props.name + 'ext']])


    const handleOnInputChange = (evnt, index) => {
        let { value, name } = evnt.target;
        let list = [...classSec]
        list[index][name] = value;
        setclassSec(list);
    }

    return (
        <>
            <Col xs={12} ref={SecurityHolder} >
                <h4>{`List of eligible shareholders for issue`}</h4>
                <div className="sectioninnerbox px-0 mt-2 py-2">
                    <Table responsive className="tabletyp1 " border={'1px solid'} >
                        <thead>
                            <tr>
                                <th >Sr. No</th>
                                <th >Number of shares in the class</th>
                                <th >Name of the shareholder</th>
                                <th >Folio Number/Demat Account Number</th>
                                <th >PAN/Passport/CIN/Registration Number</th>
                                <th >{`No of Shares held `} </th>
                                <th >Face Value</th>
                                <th > Fully Paid/Amount in Arrears </th>
                                <th > {`No of eligible`} </th>
                                <th colspan="2" ><center>Ratio</center></th>
                                <th > Partial Rights Entitlement</th>
                                <th > {`No of be offered`} </th>
                                <th >Remarks </th>
                            </tr>

                        </thead>
                        <tbody>
                            {classSec && classSec?.map((shareholdingdetails, index) => {
                                console.log('shareholdingdetails', shareholdingdetails)
                                const offered = Math.trunc(+shareholdingdetails?.classdetails?.number_of_shares * +shareholdingdetails?.ratio_old / +shareholdingdetails?.ratio_new);
                                return (<>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{shareholdingdetails?.classdetails?.class_type}</td>
                                        <td>{shareholdingdetails?.personaldata?.name}</td>
                                        <td>{shareholdingdetails?.folio_number}</td>
                                        <td>{shareholdingdetails?.personaldata?.cin_llpin_reg_number}</td>
                                        <td>{shareholdingdetails?.personaldata?.total_shareheld}</td>
                                        <td>{shareholdingdetails?.classdetails?.face_value}</td>
                                        <td>{shareholdingdetails?.amount_payable <= 0 ? 'Fully Paid' : 'Amount in Arrears'}</td>
                                        <td>{+shareholdingdetails?.classdetails?.number_of_shares * +shareholdingdetails?.classdetails?.face_value}</td>
                                        <td>
                                            <Form.Control type="number" name="ratio_old"
                                                value={shareholdingdetails?.ratio_old}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control type="number" name="ratio_new"
                                                value={shareholdingdetails?.ratio_new}
                                                onChange={(e) => handleOnInputChange(e, index)}
                                            />
                                        </td>
                                        <td><Form.Control type="number" name="partial_rights_entitlement"
                                            value={shareholdingdetails?.partial_rights_entitlement}
                                            onChange={(e) => handleOnInputChange(e, index)}
                                        /></td>
                                        <td>{isNaN(offered) ? 0 : Math.floor(offered)}</td>
                                        <td><Form.Control type="number" name="remarks"
                                            value={shareholdingdetails?.remarks}
                                            onChange={(e) => handleOnInputChange(e, index)}
                                        /></td>
                                    </tr>

                                </>);
                            })}
                        </tbody>
                    </Table>
                </div>

            </Col>
        </>
    )
}
export const IssueofDivedendTable = (props) => {
    const [Formlist, setFormlist] = useState([]);
    const [autoData, setAutoData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();
    const SecurityHolder = useRef('');
    const listedoptiondetails = [
        { label: "Equity", value: 1 },
        { label: "Preference", value: 2 },
        { label: "Unsatisfied", value: 3 },
    ];

    console.log('Formlist :>> ', Formlist, props);

    const getDirectorsDetails = ((id, type) => {
        const company_id = sessionStorage.getItem("company_id")
        try {
            const headerPyalod = getNormalHeaders();
            const formData = new FormData();
            formData.append("ids", id)
            formData.append("type", type)
            setIsLoading(true);
            const response = axios.post(`/api/v1/company/get_shareholder_class_details/${btoa(company_id)}`, formData, headerPyalod)
                .then((response) => {
                    console.log(response?.data, 'agendarequest');
                    console.log("resdata+", response?.data);
                    setFormlist(response?.data);
                    props?.setdynamicFormValues({ ...dynamicFormValues, 'typeofClasstable': response?.data })

                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.response) {
                        setIsLoading(false)
                        console.log(error.respons);


                    } else if (error.request) {
                        setIsLoading(false)
                        console.log(error.respons);

                    } else {
                        setIsLoading(false)
                    }
                });

        } catch (err) {
            setIsLoading(false)
            console.log('err', err);

        }
    })

    var shares = [];
    var i = 0;

    Formlist && Formlist?.map((data, dataindex) => {
        data && data?.shareholdingdetails?.map((value, valueindex) => {
            console.log('loopvalue :>> ', value);
            i++;
            shares[i] = value?.number_of_shares_allotted;
        })
    })

    const totalshares = shares.reduce((previousScore, currentScore, index) => parseInt(previousScore) + parseInt(currentScore), 0);

    const handleChangeShares = async (e, index) => {
        const { name, value, files } = e.target;
        const shareholdingdetails = [...Formlist];
        shareholdingdetails[index][name] = value;
        setFormlist(shareholdingdetails)
    }

    useEffect(() => {

        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = Formlist;
        console.log("data console++", data);
        props?.onChange(data)

    }, [SecurityHolder, Formlist])

    useEffect(() => {
        if (Formlist && Object.keys(Formlist).length > 0) {
            setAutoData({
                ...autoData,
                Numberofshares: totalshares,
                FaceValue: 10,
            })

        }
    }, [Formlist]);

    useEffect(() => {
        if (props?.dynamicFormValues?.SelecttypeofSecurity && props?.dynamicFormValues?.ClassofShares && !agenda_req_id) {

            getDirectorsDetails(props?.dynamicFormValues?.ClassofShares, props?.dynamicFormValues?.SelecttypeofSecurity)
        }
    }, [props?.dynamicFormValues?.SelecttypeofSecurity, props?.dynamicFormValues?.ClassofShares])

    useEffect(() => {
        if (props?.dynamicFormValues?.[props.name + 'ext']) {
            if (typeof props?.dynamicFormValues?.[props.name + 'ext'] != 'object') {
                const data = JSON.parse(props?.dynamicFormValues?.[props.name + 'ext']);
                console.log("chk+ data", data);
                setFormlist(data);
            }
        }
    }, [props?.dynamicFormValues?.[props.name + 'ext']])

    const quantum_of_divedend_arr = Formlist.map(function (user) {
        return (!isNaN(user.quantum_of_divedend)) ? +user.quantum_of_divedend : 0;
    });
    const sum = quantum_of_divedend_arr.reduce((partialSum, a) => partialSum + a, 0);
    console.log("result1+++", sum, quantum_of_divedend_arr, props);
    useEffect(() => {
        if (sum) {
            props?.setQuantumTotal(sum);
        }
    }, [sum])
    return (<>

        <Col xs={12}>
            <div className="sectioninnerbox px-0 mt-2 py-2">
                <Table responsive className="tabletyp1 " border={'1px solid'} ref={SecurityHolder}>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th rowSpan={2}>Class rate of divedend </th>
                            <th rowSpan={2}>Quantum of divedend</th>
                            <th rowSpan={2}>Total no of shares</th>
                            <th colSpan={2}><center>No of Shareholders</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Formlist && Formlist?.map((directorslist, index) => {
                            return (<>
                                <tr>
                                    <td>{directorslist?.classdetails?.class_type}</td>
                                    <td><Form.Control type="text" name="class_rate_of_divedend" onChange={(e) => handleChangeShares(e, index)} value={directorslist?.class_rate_of_divedend} /></td>
                                    <td><Form.Control type="text" name="quantum_of_divedend" onChange={(e) => handleChangeShares(e, index)} value={directorslist?.quantum_of_divedend} /></td>
                                    <td>{directorslist?.total_share}</td>
                                    <td>{directorslist?.share_holder_count}</td>
                                </tr>
                            </>);
                            return (<></>)
                        })}

                    </tbody>
                </Table>
            </div>

        </Col>
    </>)
}

export const ButtonLink = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();
    console.log('DirectorApp', props, props?.dynamicFormValues[props?.ref_table_alias]);
    let url;
    if (props?.ref_table_alias) {
        url = `/${props?.ref_table}/${btoa(props?.dynamicFormValues[props?.ref_table_alias])}`;
    } else {
        url = `/${props?.ref_table}/${btoa(props?.agenda_id)}/${btoa(props?.sub_agenda_id)}/${agenda_req_id}`;
    }
    return (<>
        <Col xs={4}>
            <Form.Group className={"mb-3"}>
                {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                {props?.icon != false ? props?.required && <sup>*</sup> : ('')}
                <br />
                <Button as={Link}
                    href={url}
                    to={url}
                    variant="dark">
                    {props?.label}
                </Button>
                {props?.required && (<Form.Control.Feedback type="invalid">
                    Please enter {props?.label}
                </Form.Control.Feedback>)}
            </Form.Group>
        </Col>
    </>)
}
export const DirectorList = (props) => {
    console.log('DirectorList', props)
    const [directorslists, setdirectorslists] = useState(false);
    const { dirc_personaldetails_id, agenda_req_id, sub_agenda_id, agenda_id } = useParams();
    let { data: { data, TotalnoofDirectors, TotalnoofIndependentDirector, eligible, retiring }, loading, error, reFetchData } = useFetch(`/api/v1/requestresolutionservice/rotationofdirector`);
    const { dynamicFormValues, setdynamicFormValues } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (props?.values) {
            // console.log('directorslistsdirectorslists', JSON.parse(props?.value))
            setdirectorslists(JSON.parse(props?.value))
        } else {
            setdirectorslists(data)
        }

    }, [props?.value, data])
    useEffect(() => {
        if (data) {
            setdynamicFormValues({
                'Totalno.ofDirectors': TotalnoofDirectors,
                'Totalno.ofIndependentDirector': TotalnoofIndependentDirector,
                'Totalno.ofDirectorwhoareeligibletoretirebyrotation': eligible,
                'Totalno.ofDirectorsretiringbyrotation': retiring,
            })
        }
    }, [data])

    const savedata = (payload) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = JSON.stringify(payload);
        props?.onChange(data)
    }
    console.log('directorslist', directorslists)

    const handleOnInputChange = (e, index, obj) => {
        const { name, value } = e.target;
        let list = [...directorslists]
        list[index][name] = value
        console.log('rotation_of_director_value >>>>>>>', name, value)
        if (name == 'rotation_of_director_value' && value == 'yes') {
            directorslists?.map((item, indexin) => {
                if (item.id != obj?.id) {
                    list[indexin][name] = 'no'
                }
            });
        }
        setdirectorslists(list);
        savedata(list)
    }

    return (<>
        <Col xs={12}>
            <div className="sectioninnerbox px-3 py-2">
                <Table className="tabletyp1 ">
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Date Of Appointment</th>
                            <th>Rotation of Director</th>
                            <th>Re-appointment</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {directorslists && directorslists?.map((directorslist, index) => {
                            const count = index + 1
                            return (
                                <>
                                    <tr>
                                        <td>{count}</td>
                                        <td>{directorslist?.dir_full_name}</td>
                                        <td>{directorslist?.designation}</td>
                                        <td>{directorslist?.appointment_date}</td>
                                        <td>
                                            {directorslist?.rotation_of_director == 'true' ? <div className={'approve'}></div> : (<>
                                                <YesNoChecked
                                                    onChange={(e) => handleOnInputChange(e, index, directorslist)}
                                                    label={'Date Of Appointment'}
                                                    icon={false}
                                                    value={directorslist?.rotation_of_director_value}
                                                    name="rotation_of_director_value"
                                                    required
                                                />
                                            </>)}
                                        </td>
                                        <td>
                                            {(directorslist?.rotation_of_director == 'true' || directorslist?.rotation_of_director_value == 'yes') && (<>
                                                <YesNoChecked
                                                    onChange={(e) => handleOnInputChange(e, index)}
                                                    label={'Re-appointment'}
                                                    icon={false}
                                                    value={directorslist?.re_appointment}
                                                    name="re_appointment"
                                                    required
                                                /></>)}
                                        </td>
                                        <td>
                                            {(directorslist?.rotation_of_director == 'true' || directorslist?.rotation_of_director_value == 'yes') && directorslist?.re_appointment == 'yes' && (<>
                                                <div className={"tableactionbtngroup text-nowrap"}>
                                                    <Button onClick={() => navigate(`/requestagendaservice/re_appointment/${btoa(props?.agenda_id)}/${btoa(props?.sub_agenda_id)}/${agenda_req_id}/${btoa(directorslist?.id)}`)} className="tableactionbtn1"><img src={"/img/icons/Icon-metro-pencil.svg"} /></Button>
                                                </div>
                                            </>)}
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

        </Col>
    </>)
}

export const ShareHolderRemoveDirector = (props) => {
    const [shareholderInfo, setshareholderInfo] = useState();
    const SecurityHolder = useRef('');
    const shareholderdetails = (() => {
        try {
            const headerPyalod = getNormalHeaders();
            const response = axios.get(`/api/v1/requestresolutionservice/getshareholderdetails`, headerPyalod)
                .then((response) => {
                    if (response?.data?.status == true) {
                        setshareholderInfo(response?.data?.shareholderInfo);
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.respons);


                    } else if (error.request) {
                        console.log(error.respons);

                    } else {
                    }
                });

        } catch (err) {
            setIsLoading(false)
            console.log('err', err);

        }
    })
    console.log("remove props", shareholderInfo);
    const savedata = (payload) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = SecurityHolder?.current;
        data['target']['data'] = payload;
        console.log("save data", data);
        props?.onChange(data)
    }
    const handleOnInputChange = (e, index, obj) => {
        const { name, value } = e.target;
        let list = [...shareholderInfo];
        list[index][name] = value;
        savedata(list);
    }
    useEffect(() => {
        if (shareholderInfo) {
            savedata(shareholderInfo);
        }
    }, [shareholderInfo])
    useEffect(() => {
        if (!props?.dynamicFormValues?.RemovalofDirectorext) {
            shareholderdetails();
        } else {
            let RemovalofDirectorext = JSON.parse(props?.dynamicFormValues?.RemovalofDirectorext);
            if (RemovalofDirectorext.length > 0) {
                console.log("RemovalofDirectorext+", RemovalofDirectorext);
                setshareholderInfo(RemovalofDirectorext);
            }
        }
    }, [])
    // console.log("pdynamicFormValues",props?.dynamicFormValues);
    return (
        <>
            <Col xs={12} ref={SecurityHolder}>
                <div className="sectioninnerbox px-3 py-2">
                    <Table className="tabletyp1 ">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Folio Number</th>
                                <th>Class</th>
                                <th>Total Equity Shareholding</th>
                                <th>Total Voting Power</th>
                                <th>Vote</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {shareholderInfo && shareholderInfo?.map((res, index) => {
                                console.log("shareholderInfo", res);
                                return (
                                    <>
                                        <tr>
                                            <td>{res?.sc_name}</td>
                                            <td>{res?.folio_number}</td>
                                            <td>{res?.classdetailson?.class_type}</td>
                                            <td>{res?.number_of_shares_allotted}</td>
                                            <td>{res?.total_voting_power}</td>
                                            <td>
                                                <YesNoChecked
                                                    onChange={(e) => handleOnInputChange(e, index)}
                                                    icon={false}
                                                    value={res?.vote}
                                                    name="vote"
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </Col>
        </>
    );
}

{/* <CustomPagination
data={}
reFetchData={}
otherParams={filter}
/> */}
export const CustomPagination = (props) => {
    let disable = false;
    const handlePagination = (value) => {
        let nextpage = 1;
        console.log('value?.label', value?.label,props?.data?.current_page + 1 > props?.data?.last_page,props?.data?.last_page,props?.data?.current_page)
        if (value?.label.includes("Next") && !(value?.label,props?.data?.current_page + 1 > props?.data?.last_page)) {
            nextpage = props?.data?.current_page + 1;
            props?.reFetchData(props?.otherParams?.search_data, {...props?.otherParams ,'page': nextpage })
        } else if (value?.label.includes("Previous")) {
            nextpage = props?.data?.current_page - 1;
            props?.reFetchData(props?.otherParams?.search_data, {...props?.otherParams ,'page': nextpage })
        } else if(Number(value?.label)){
            nextpage = value?.label;
            props?.reFetchData(props?.otherParams?.search_data, {...props?.otherParams ,'page': nextpage })
        }else{
            disable = true;
        }
    }
    return (
        <>
            <Pagination>
                {props?.data?.links && props?.data?.links.map((value, index) => {
                    return (
                        <Pagination.Item key={value?.label} active={value?.active} onClick={() => handlePagination(value)}><div className="text-center" dangerouslySetInnerHTML={{ __html: value?.label }} 
                        disabled = {disable}
                        /></Pagination.Item>
                    )
                })}
            </Pagination>
        </>)
}

//    <CustomModal
//         //show={} 
//         //onHide={}
//         //header={''}
//         //footer={''}
//         >
//         <Row>
//             <SelectField
//                 required
//                 label={'Change plan'}
//                 name={'change_plan'}

//             />
//             </Row>
//         </CustomModal>
export const CustomModal = ({ header, children, footer, ...props }) => {
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>{header || process.env.MIX_REACT_APP_NAME}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>{children}</Row>
            </Modal.Body>
            {props?.viewfooter === false ? '' : <Modal.Footer>
                {footer || (
                    <Button variant="secondary" onClick={props?.onHide}>
                        Close
                    </Button>
                )}
            </Modal.Footer>}
            
        </Modal>
    );
}

export const AutoComplete  = (props) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const cityValue = useRef()

    const getSuggestions = async (value) => {
        const token = sessionStorage.getItem("passportToken");
        console.log("inside load", value);
        const response = await  axios.post(`${process.env.MIX_REACT_APP_BASE_URL}/api/v1/cgenericmodel?search_data=${value}&model=${props?.ref_table}`, props?.params, {
            headers: {
                Authorization: `Bearer ${token}`,
            },   
        });
        const data = response.data;
        console.log('response', data)
        const mappedOptions = data.map((option) => ({
            value: option.id,
            label: option.label
        }));
        setSuggestions(data);
        return mappedOptions;
    };
    
    const handleChange = (e) => {
        setValue(e.target.value);
        const data = {
            target: {
                name: '',
                value: '',
                data: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = e.target?.value;        
        getSuggestions(e.target?.value);
        props?.onChange(data)
      };
    
    const handleSelect = (value) => {
        setValue(value);
        const data = {
            target: {
                name: '',
                value: '',
                data: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = value;
        props?.onChange(data)
      };
      

      useEffect(() => {
        if (props.value) {
            setValue(props.value)
        }else{
            setValue('')
        }
    }, [props.value,props?.params?.where]);
      
    return (
        <><Col xs={props?.xs || 4}>
                <Form.Group className={"mb-3 suggestions-block  " + props?.className}>
                    {props?.icon != false ? props?.label && <Form.Label>{props?.label} </Form.Label> : ('')}
                    {props?.icon != false ? props?.required && (<sup>*</sup>) : ('')}
                    <Autocomplete
                        value={value}
                        items={suggestions}
                        ref={cityValue}
                        getItemValue={(item) => item.label}
                        renderItem={(item, isHighlighted) => (
                            <ListGroup.Item key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                            </ListGroup.Item>
                        )}
                        onChange={handleChange}
                        
                        onSelect={handleSelect}
                        renderInput={(inprops) => (
                            
                                <FormControl
                                readOnly={props?.readonly || ''}
                                {...inprops}
                                type="text"
                                />
                        )}

                        />
                {props?.required && (<Form.Control.Feedback type="invalid">
                    Please enter {props?.label}
                </Form.Control.Feedback>)}
                </Form.Group>
            </Col>
</>        
    );
}