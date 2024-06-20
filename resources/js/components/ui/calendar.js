import moment from "moment";
import axios from "axios";
import "./index.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Alert, Accordion, Badge, Breadcrumb, Button, ButtonGroup, Card, Carousel, CloseButton, Dropdown, DropdownButton, Figure, Image, ListGroup, Modal, Nav, Navbar, Offcanvas, Overlay, Pagination, Placeholder, Popover, ProgressBar, Spinner, Table, Tab, Tooltip, Toast, } from "react-bootstrap";
import ReactTooltip from 'react-tooltip';

export default function Calendar() {
    // return 'hey';
    const [logs, setLogs] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(moment());

    useEffect(() => {
        axios.get("/api/v1/loadlog").then((response) => {
            setLogs(response.data);
        });
    }, []);

    const handlePrevMonth = () => {
        setCurrentMonth(currentMonth.clone().subtract(1, "month"));
    };

    const handleNextMonth = () => {
        setCurrentMonth(currentMonth.clone().add(1, "month"));
    };

    const renderCalendar = () => {
        const startWeek = currentMonth.clone().startOf("month").week();
        const endWeek =
            currentMonth.clone().endOf("month").week() === 1
                ? 53
                : currentMonth.clone().endOf("month").week();

        const calendar = [];
        for (let week = startWeek; week <= endWeek; week++) {
            calendar.push(
                <div className="calendar-row" key={week}>
                    {Array(7)
                        .fill(0)
                        .map((n, i) => {
                            const currentDay = moment()
                                .week(week)
                                .startOf("week")
                                .clone()
                                .add(n + i, "day");

                            const logsForDay = logs.filter((log) =>
                                moment(log.created_at).format("YYYY-MM-DD") === currentDay.format("YYYY-MM-DD")
                            );


                            return (
                                <div className="calendar-day" key={i}>
                                    <div className="calendar-day-number">
                                        {currentDay.format("D")}
                                    </div>
                                    <div className="calendar-day-logs">
                                        {logsForDay.map((log) => (
                                            <div className="calendar-log" data-for={"upmcatip"} data-tip={log.subject} >
                                                {/* {log.subject} */}
                                                <Button data-for={"upmcatip"} data-tip={log.subject} ><img className="danger" src={"/img/icons/Icons-Alerts-ic_error_outline_red.svg"} /></Button>
                                                <ReactTooltip className="secondary min-width-170" id={"upmcatip"} effect="solid" place="bottom" ></ReactTooltip >
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            );
        }
        return calendar;
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>Prev</button>
                <h2>{currentMonth.format("MMMM YYYY")}</h2>
                <button onClick={handleNextMonth}>Next</button>
            </div>
            <div className="calendar-body">{renderCalendar()}</div>
        </div>
    );
};
