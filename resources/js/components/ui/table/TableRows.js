import { Form, Button } from "react-bootstrap";
import { InputText} from "../index";




function TableRows({rowsData, options, deleteTableRows, handleChange, handleFileChange}) {

    let componets = {
        3: InputText,
    };
  return(

    rowsData?.map((data, index) => {

          if(options?.length > 0){
              return(

                  <tr key={index}>
                    {options?.map((questdetailsvalue, questdetailsindex) => {

                      let inputValue = '';
                      if(data && data[questdetailsindex]) {
                        inputValue = data[questdetailsindex]['value'];
                      }
                    const ComponetsBox = componets[+questdetailsvalue.type];

                    if(+questdetailsvalue.type == 1) {
                      let filenameValue = data[questdetailsindex]['filename'];
                            return(
                                <td>
                                    <Form.Control
                                        type="file"
                                        name={'name'+questdetailsindex}
                                        onChange={(evnt)=>(handleFileChange(index, evnt, questdetailsindex ))}
                                        />
                                        {inputValue ? (<a class="btn btn-primary" href={inputValue} download={filenameValue}><i className="fa-solid fa-download"></i></a>) : ''}
                                        <span> { filenameValue }</span>

                                </td>
                            )
                        }
                        else{
                            return(
                                <td>
                                    <ComponetsBox
                                         type="text"
                                         name={'name'+questdetailsindex}
                                         value={inputValue}
                                         onChange={(evnt)=>(handleChange(index, evnt, questdetailsindex ))}
                                        />
                                </td>

                            )
                        }


                        })
                    }

                      {/* <td>
                        <Button variant="danger"
                                onClick={()=>(deleteTableRows(index))}
                          >x</Button>
                      </td> */}
                      <td className="action_td max-w50px">
                        <div className="table_action">
                            <div className="contentcontrollerbtngroup iconbtngroup">
                              <Button type="button" className="iconbtn iconblink" onClick={()=>(deleteTableRows(index))} ><i className="fa-solid fa-trash-can"></i>{" "} </Button>
                            </div>
                        </div>
                    </td>
                  </tr>

              )
          }

      })

  )

}

export default TableRows;
