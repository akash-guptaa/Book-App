import { Button, Form, Table } from "react-bootstrap";
import React, { useState, useEffect} from 'react';
import TableRows from "./TableRows";

export const Tablebox = (old) => {
const props = {
    "table": [{ "type": "3", "header ": "akash ", "node ":true, "nameattr ": "akash "},{ "type": "3 ", "header ": "tunal ", "node ":true, "nameattr ": "tunal "}],
    "value": "[[{\"type\":\"3\",\"header\":\"akash\",\"node\":true,\"nameattr\":\"akash\",\"value\":\"1\"},{\"type\":\"3\",\"header\":\"tunal\",\"node\":true,\"nameattr\":\"tunal\",\"value\":\"2\"}],[{\"type\":\"3\",\"header\":\"akash\",\"node\":true,\"nameattr\":\"akash\",\"value\":\"3\"},{\"type\":\"3\",\"header\":\"tunal\",\"node\":true,\"nameattr\":\"tunal\",\"value\":\"4\"}]]",
  }
console.log('firstfirstfirstfirstfirstfirst',props, old)
const [options, setOptions] = useState(props?.table);
const [rowsData, setRowsData] = useState([]);
const [file, setFile] = useState({});
const [manualAddStatus, setManualAddStatus] = useState(false);

useEffect(() => {

  if(!props?.value && !manualAddStatus)  addTableRowData()

}, [props?.table.length]);

useEffect(() => {

  if(props?.value && !manualAddStatus){
    const rows = JSON.parse(props?.value)
    setRowsData(rows)
  }

   setManualAddStatus(false)

}, [props?.value]);

const addTableRowData = () => {

  const rowsInput = [];

  props?.table.map((i,index) => {
    rowsInput.push({  "value" : '', "node" : true, "type": 1 , "filename": ""});
  });

  console.log("rowsInput add : " + JSON.stringify(rowsInput))

  let data = [...rowsData, rowsInput];

  setRowsData(data);

  return data;
}

const addTableRows = ( )=> {

  let rows = addTableRowData()

  console.log("getting rows data : "+ JSON.stringify(rows))

  props?.onChangeTable(rows)

  setManualAddStatus(true)

}
const deleteTableRows = (index)=>{

  const rows = [...rowsData];

  rows.splice(index, 1);

  setRowsData(rows);

  props?.onChangeTable(rows)

  setManualAddStatus(true)

}

const handleChange = (index, evnt, optionindex)=>{

  const rowsInput = [...rowsData];

  rowsInput[index][optionindex]['value'] = evnt.target.value;

  setRowsData(rowsInput);

  props?.onChangeTable(rowsInput)

  setManualAddStatus(true)

}


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



const handleFileChange = async (index, evnt, optionindex)=>{

  const rowsInput = [...rowsData];

  let file = evnt.target.files[0];

  const base64 = await convertToBase64(file);

  rowsInput[index][optionindex]['value'] = base64;
  rowsInput[index][optionindex]['filename'] = file.name;

  setRowsData(rowsInput);

  props?.onChangeTable(rowsInput)

  setManualAddStatus(true)

}

  return (
  <>
    <Form.Group className="mb-3" controlId="">
       <Form.Label>{props?.label}</Form.Label>
       <Table responsive className=" mb-0">
         <thead>
           <tr>
            {props?.table.map((questdetailsvalue, questdetailsindex) => (
                <th>{questdetailsvalue.label}</th>
              ))}
            <th></th>
           </tr>
         </thead>
         { props?.table.length > 0 && props?.process !='create' &&
           (
            <tbody>
            <TableRows rowsData={rowsData}
                      options={options}
                      htmlid={props?.html_id}
                      deleteTableRows={deleteTableRows}
                      handleChange={handleChange}
                      handleFileChange={handleFileChange}
                       />

            <tr>
              <td colSpan={props?.table.length+1}>
                <Button onClick={addTableRows}>Add new row</Button>
              </td>
            </tr>
          </tbody>
            )
         }
       </Table>
     </Form.Group>
    </>

  );
}
