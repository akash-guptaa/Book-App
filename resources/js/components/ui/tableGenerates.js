
import { Link, NavLink, useParams, select, useHistory, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState,useId } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tabs, Tooltip, Toast, } from "react-bootstrap";
import Select from 'react-select'
// import { SelectField, InputText, DatePicker  } from '../ui/index';
// import {  } from '../ui/template';
import AsyncSelects from '../utility/select_field/selectSearchNew';
import { DatePicker, SelectFieldMulti, FileUploadUi as FileUpload , InputText, Auditors, Loans, Investments, InputTextArea, YesNoChecked, SelectField, Checkbox, SecurityHolder, IssueCertificate, AuthorisedCapital, DirectorApp, FinalDividendCalculationSheet, InterimDividendCalculationSheet, ShareholdersList, ShareholdersUserList, ShareholdersClass ,ShareholdersDivisionList,ShareholdersRightsoffer,AuthorisedUserList,TermsAndConditions, IssueofDivedendTable, AuthorisedCapitalData,AsyncSelectsMulti,ShareholdersUserListPostMeeting,ButtonLink} from "../ui/template";
// import { useAppContext } from '../AppContext'
const useAppContext = [];

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const TableGenerate = (props) => {
    const { dynamicFormValues, setdynamicFormValues } = useAppContext();

    const [initialstate, setinitialstate] = useState([]);
    const [formvalue, setFormvalue] = useState([]);
    const [status, setstatus] = useState(true);

    let initialstatedata = [];
    
    useEffect(() => {
     initialstatedata = props?.table
        if (props?.table && status) {
            if (typeof props?.table == 'string') {
                initialstatedata = JSON.parse(props?.table)
            }
           setinitialstate(initialstatedata)
            setstatus(false)
        }
        console.log('initialstatedata', initialstatedata,formvalue?.length )
        if (initialstate && formvalue?.length == 0) {
		dd('cppppppp0',initialstatedata)
		setFormvalue([initialstatedata])
        }

    }, [initialstate,props?.table]);

    console.log('TableGeneratenew9++', initialstate, formvalue, props)

    useEffect(() => {

	    if (initialstate.length !== 0) {
            if (props?.value) {
                const datastate = [];
                const data = (props?.value) ? JSON.parse(props?.value) : [];
                dd('data >>>>>>>>>>>>>>>>>>>>',typeof data,data);
                if( data && typeof data == 'object'){
		        data && data?.map((initialstatevalue, aindex) => {
                    const parent = [];
                    initialstate?.map((i, index) => {
                        parent.push({ ...i, "value": initialstatevalue[index]?.value,"document": initialstatevalue[index]?.document });
                    });
                    datastate[aindex] = parent;
                });
	            setFormvalue(datastate)
        	    setstatus(false)
            }

            } else if(initialstate) {

	        setFormvalue([initialstate])
		    dd('cppppp2')

            }
        }
    }, [initialstate, props?.value]);

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
        console.log('first', props)
    
        props?.onChange(payload)
    }
    const addFormField = () => {
        const newinitialstate = []
        initialstate.map((i, index) => {
            if((props?.ref_table_alias == 'Equity' || props?.ref_table_alias == 'Preference' || props?.ref_table_alias == 'Equity & Preference') && index == 0) {
                let eqval = (props?.ref_table_alias == 'Equity' || props?.ref_table_alias == 'Preference') ? props?.ref_table_alias : '';
                newinitialstate.push({ ...i, "value": eqval ,"document": ''});
            } else {
                newinitialstate.push({ ...i, "value": '' ,"document": ''});
            }
        });
        console.log('first newinitialstate', props, newinitialstate, initialstate)

        setFormvalue([...formvalue, newinitialstate]);
        savedata([...formvalue, newinitialstate])
    };

    const removeFormField = (index) => {
        const rows = [...formvalue];
        rows.splice(index, 1);
        setFormvalue(rows);
        savedata(rows)

    };

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
            list[index][optionindex]['value'] = value;
            if(list[index][optionindex]['nameattr'] == "NumberofShares" || list[index][optionindex]['nameattr'] == "FaceValue") {
                list[index][4]['value'] = list[index][2]['value'] * list[index][3]['value'];
            }

            if(props?.agendaRequest?.agenda_sub_master_rel?.sub_agenda_name =='Accepted And Renounced' && list?.length != 0){
                const Noofshares = ConverUiJsonTotable(JSON.stringify(list));
                const total = sumArray(pluck(Noofshares,'Noofshares'))
                console.log('first sumArray', total)
                
                if (dynamicFormValues['rejected'] && dynamicFormValues['rejected'] < total) {
                    toast['error']('number of share must be lees then rejected shares');
                    return false;
                }
                }
            setFormvalue(list)
            savedata(list)
        }
    };

    let componets = {
        2: Checkbox,
        3: InputText,
        4: SelectField,
        5: InputTextArea,
        6: FileUpload,
        7: DatePicker,
        10: AsyncSelectsMulti,
        11: InputText,
        17: AsyncSelects,
        33: SelectFieldMulti,
        18: YesNoChecked,
        19: InputText,
        21: SecurityHolder,
        22: IssueCertificate,
        23: AuthorisedCapital,
        24: DirectorApp,
        25: SelectFieldMulti,
        26: Auditors,
        27: ShareholdersClass,
        28: ShareholdersRightsoffer,
        29: ShareholdersUserList,
        30: FinalDividendCalculationSheet,
        31: InterimDividendCalculationSheet,
        32: TableGenerate,
        33: ShareholdersDivisionList,
        34: AuthorisedUserList,
        // 35: RegisteredValuer,
        36: TermsAndConditions,
        37: IssueofDivedendTable,
        38: AuthorisedCapitalData,
        // 39: TableShow,
        // 40: ExcelToTable,
        41: FileUpload,
        42: Loans,
        43: Investments,
        44: ShareholdersUserListPostMeeting,
        45: ButtonLink,
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
    const class_type = props?.ShareholdersclassSec;

    return (<>
    {props?.label && <Col xs={12}>
        <h4 className="sectionheader my-0 mt-2">
            {props?.label}</h4>
    </Col>}

    <Col xs={12}><div className="graybottomborder my-2"></div></Col>

        <Col xs={12}>
            <div className="sectioninnerbox mt-2 p-3">
                <Table responsive className="tabletyp1 " boarder={'1'}>
                    <thead>
                        <tr>
                            {initialstate && initialstate?.map((data, initialstateindex) => {
                                console.log('initialstate of TableGenerate', data)
                                if(data?.hide_show != '1')
                                {    return (
                                        <><th>{data?.header}</th ></>
                                    )}
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {formvalue && formvalue?.map((formvaluedata, formvalueindex) => {
                        return (
                                <>
                                    <tr>
                                        {formvaluedata && formvaluedata?.map((data, index) => {
                                            const ComponetsBox = componets[data?.cat_type];
                                            console.log("component Data",data);
                                            let read = ''
                                            read = ((props?.ref_table_alias == 'Equity' || props?.ref_table_alias == 'Preference') && index == 0) ? true : ''
                                            read = data?.nameattr == "TotalAmount" ? true : read;
                                            let options = data.options;
                                            if(data?.nameattr == 'classname'){
                                                data.options = class_type
                                            }
                                            if(props?.readOnly){
                                                read = true;
                                            }
                                        if(data?.hide_show != '1'){
                                            return (
                                                <><td>
                                                <ComponetsBox
                                                    {...data}
                                                    key={index}
                                                    className={"w-200px " +data?.classname}
                                                    name={data?.nameattr}
                                                    options={options}
                                                    inputindex={index}
                                                    headindex={formvalueindex}
                                                    onChange={(e) => handleOnInputChange(e, formvalueindex, index, data)}
                                                    readonly_condition={read.toString()}
                                                />
                                                </td>
                                                </>
                                            )
                                        }
                                        })}
                                        {!props?.readOnly &&
                                        <div className="text-end">
                                            <Button onClick={addFormField} variant="light" className="add-btn" ><i className="fa-solid fa-plus"></i></Button>
                                            {formvalue.length !== 1 && (<>
                                                <Button type="button" variant="secondary" onClick={() => removeFormField(formvalueindex)} className="add-btn" ><i className="fa-solid fa-minus"></i></Button>
                                            </>)}
                                        </div>}
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
// export const YesNoChecked = (props) => {
//     const id = uuidv4();
//     const handleonchange = (value) => {
//         const data = {
//             target: {
//                 name: '',
//                 value: ''
//             }
//         };
//         data['target']['name'] = props?.name
//         data['target']['value'] = value;
//         props?.onChange(data);
//     }
//     console.log('props YesNoChecked', props);
//     return (
//         <>
//             {props?.label && <Form.Label>{props?.label} </Form.Label>}
//             {props?.required && (<sup>*</sup>)}
//             <div className="justify-content-end mb-2">
//                 <ButtonGroup role="group" className="btn-grouptype2">
//                     <input type="radio" class="btn-check" onChange={(e) => handleonchange('yes')} name={id} id={id + '1'} autocomplete="off" checked={props?.value == 'yes' ? true : ''} />
//                     <Form.Label class="btn btn-light mb-0" for={id + '1'}> Yes </Form.Label>

//                     <input type="radio" class="btn-check" onChange={(e) => handleonchange('no')} name={id} id={id + '2'} autocomplete="off" checked={props?.value == 'no' ? true : ''} />
//                     <Form.Label class="btn btn-light mb-0" for={id + '2'}> No </Form.Label>
//                 </ButtonGroup>

//             </div>
//             {props?.validated === true && (props?.values == null || props?.values == '') ?
//                 <span className="error_show">
//                     Please select {props?.label}
//                 </span>
//                 : ""
//             }
//         </>)
// }
export default TableGenerate;
