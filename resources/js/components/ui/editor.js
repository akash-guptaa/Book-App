import moment from "moment";
import "./index.css";
import { Link, NavLink, useParams, select, useHistory, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tab, Tooltip, Toast, } from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { getNormalHeaders } from '../utility/utility';
import { v4 as uuidv4 } from 'uuid';

export default function DocumentEditor(props) {
    const { company_id } = useParams();

    console.log('DocumentEditor', props)
    
    const editorRef = useRef(null);
    const onChange = (e) => {
        const data = {
            target: {
                name: '',
                value: ''
            }
        };
        data['target']['name'] = props?.name
        data['target']['value'] = e;
        data['target']['data'] = e;
        props?.onChange(data)
    }
    let isDisabled = false;
    if (props?.readonly) {
        isDisabled = props?.readonly;
    }


    const editorinit = async(evt, editor) => {
        editorRef.current = editor;
    }
    const TinyMCEEditor = async(blobInfo, success, failure) => {
        // const handle_image_upload = async (blobInfo, success, failure) => {
            try {
                const headerPyalod = getNormalHeaders();
                formData = new FormData();
                var formId = blobInfo.id;
                formData.append("formId", formId);
                formData.append('file', blobInfo.blob(), blobInfo.filename());
                const companyid = sessionStorage.getItem("company_id");
                formData.append('company_id', company_id || companyid );
                const res = await axios.post('/editor_image', formData,headerPyalod);
                return success(res.data);
            } catch (err) {
                console.log('failure', err)
                setLoading(false)
            }
        // };
    }




console.log(props,'tiny_mce_editor');
    return (
        <Editor
            apiKey="r55j6wpr0o2nupsigzh1cnwt943r3vv756ajsow9p5oj1oc2"
            // onInit={editorinit}
            onEditorChange={onChange} //Change the OnInit values to the EditorChange
            value={props?.value || props?.initialValue} //Add the new initial value content
            // initialValue={props?.initialValue} //Add the new initial value content
            disabled={isDisabled}

            init={{
                height: 300,
                menubar: false,
                statusbar: false,
                plugins: "searchreplace autolink directionality visualblocks visualchars media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons print autosave image code",
                toolbar: "bold italic underline alignleft aligncenter alignright alignjustify image |undo redo | link image | code | blocks fontfamily fontsize | casechange bullist numlist link table | image addcomment showcomments forecolor backcolor lineheight | image code | checklist indent outdent removeformat | searchreplace autolink directionality advcode visualblocks visualchars image media mediaembed codesample charmap pagebreak nonbreaking anchor insertdatetime advlist lists checklist wordcount tinymcespellchecker help formatpainter permanentpen charmap linkchecker emoticons advtable export print autosave",
                toolbar_sticky: true,
                image_title: true,
                file_picker_types: 'image',
                icons: "thin",
                selector: '#tinymce',
                branding: false,
                /* without images_upload_url set, Upload tab won't show up*/
                // images_upload_url: 'postAcceptor.php',
                file_picker_callback: function (cb, value, meta) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    /*
                      Note: In modern browsers input[type="file"] is functional without
                      even adding it to the DOM, but that might not be the case in some older
                      or quirky browsers like IE, so you might want to add it to the DOM
                      just in case, and visually hide it. And do not forget do remove it
                      once you do not need it anymore.
                    */

                    input.onchange = function () {
                      var file = this.files[0];

                      var reader = new FileReader();
                      reader.onload = function () {
                        /*
                          Note: Now we need to register the blob in TinyMCEs image blob
                          registry. In the next release this part hopefully won't be
                          necessary, as we are looking to handle it internally.
                        */
                        var id = 'editore' + uuidv4();
                        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);

                        /* call the callback and populate the Title field with the file name */
                        cb(blobInfo.blobUri(), { title: file.name });
                      };
                      reader.readAsDataURL(file);
                    };

                    input.click();
                  },
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

            }}





        />

    );
};
