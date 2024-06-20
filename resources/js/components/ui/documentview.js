import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams, select, useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tab, Tooltip, Toast, } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function Documentview(props) {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <>
            <Row>
                <Col xs={12}>

                    <div className="text-center centercontent">
                        <React.Fragment>
                            <div data-bs-spy="scroll" data-bs-target="#pagecont1" data-bs-offset="0" tabindex="0" id="canvas" >
                                <Document
                                    file={props?.requiredFile}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    renderMode="canvas"
                                    className="canvas">
                                    {Array.apply(null, Array(numPages))
                                        .map((x, i) => i + 1)
                                        .map((page) => (
                                            <Page
                                                className={"pagecont" + page}
                                                pageNumber={page}
                                                canvasBackground={"transparent"}
                                                rotate={0}
                                                key={page}
                                            >
                                            </Page>
                                        ))}
                                </Document>
                                <p>
                                    Page {pageNumber} of {numPages}
                                </p>
                            </div>
                        </React.Fragment>
                    </div>
                </Col >
            </Row>
        </>
    );
}

export default Documentview;
