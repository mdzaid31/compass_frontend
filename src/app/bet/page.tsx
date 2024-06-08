"use client";
import React, { useEffect, useState, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Modal,
    Row,
    Col,
} from "reactstrap";
import { Card as ShadCnCard } from "@/components/ui/card"
import { Button as ShadCnButton } from "@/components/ui/button"

// Sample events
const initialEvents = [
    { title: "Mohamed Light vs. TRB Wallace", start: "2024-06-07", id: 1, p1Image: '/player1.png', p2Image: '/player2.png' },
    { title: "Guriko vs. CAL Sub", start: "2024-06-08", id: 2, p1Image: '/player1.png', p2Image: '/player2.png' },
    { title: "Vitor75 vs. SandBox", start: "2024-06-09", id: 3, p1Image: '/player1.png', p2Image: '/player2.png' },
];

let calendar: Calendar;

export const Bet: React.FC = () => {
    const [events, setEvents] = useState(initialEvents);
    const [modalAdd, setModalAdd] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const selectedEventRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        createCalendar();
    }, []);

    useEffect(() => {
        if (selectedEventRef.current) {
            selectedEventRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedEvent]);

    const createCalendar = () => {
        calendar = new Calendar(document.getElementById("calendar") as HTMLElement, {
            plugins: [interaction, dayGridPlugin],
            initialView: "dayGridMonth",
            selectable: true,
            selectHelper: true,
            editable: false,
            events,
            eventClick: ({ event }) => {
                setSelectedEvent(event);
            },
        });
        calendar.render();
        setCurrentDate(calendar.view.title);
    };

    return (
        <main className="font-sans text-center p-8 bg-gray-900 text-gray-100 min-h-screen">
            {selectedEvent && (
                <Card className="flex flex-col items-center justify-between p-6 rounded-lg shadow-md dark:bg-gray-950 dark:text-white">
                    <div className="flex items-center gap-12">
                        <img src={selectedEvent.extendedProps.p1Image} width="80" height="80" alt="Team A Logo" className="aspect-square object-contain" />
                        <span className="text-2xl font-bold">vs</span>
                        <img src={selectedEvent.extendedProps.p2Image} width="80" height="80" alt="Team B Logo" className="aspect-square object-contain" />
                    </div>
                    <div className="mt-12 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-12">
                            <span className="text-lg font-bold">{selectedEvent.title.split("vs")[0]}</span>
                            <span className="text-lg font-bold">{selectedEvent.title.split("vs")[1]}</span>
                        </div>
                        <div className="flex items-center gap-12">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Probability: 60%</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Probability: 40%</div>
                        </div>
                        <a href="/twitch">
                            <Button variant="outline" className="w-full">
                                View Live
                            </Button>
                        </a>
                    </div>
                </Card>
            )}
            <Card className="w-4/5 mx-auto bg-gray-800 text-white rounded-lg p-6 shadow-md mt-8">
                <CardHeader className="bg-gray-800 text-white rounded-t-lg">
                    <Row className="flex items-center py-4 justify-end">
                        <Col lg="6" className="text-right">
                            <Button
                                className="btn-neutral bg-gray-600 text-white mx-1"
                                onClick={() => {
                                    calendar.prev();
                                    setCurrentDate(calendar.view.title);
                                }}
                                size="sm"
                            >
                                <i className="fas fa-angle-left" />
                            </Button>
                            <Button
                                className="btn-neutral bg-gray-600 text-white mx-1"
                                onClick={() => {
                                    calendar.next();
                                    setCurrentDate(calendar.view.title);
                                }}
                                size="sm"
                            >
                                <i className="fas fa-angle-right" />
                            </Button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className="p-0">
                    <div className="calendar" id="calendar" />
                </CardBody>
            </Card>
            <Modal
                isOpen={modalAdd}
                toggle={() => setModalAdd(false)}
                className="modal-dialog-centered modal-secondary"
            ></Modal>
            <p className="text-gray-400 text-lg mt-4">
                Note: Betting is only allowed for adults aged 19+. Please gamble
                responsibly.{" "}
                <a
                    href="https://www.canada.ca/en/health-canada/services/substance-use/get-help-with-substance-use.html"
                    className="text-blue-400 underline"
                >
                    Link to Substance Abuse Help
                </a>
            </p>
        </main>
    );
};

export default Bet;
