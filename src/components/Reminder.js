import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "@headlessui/react"; // ✅ Modern modal UI

const localizer = momentLocalizer(moment);

function Reminder() {
  const [events, setEvents] = useState([]); // Store reminders
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminderText, setReminderText] = useState("");
  const [isOpen, setIsOpen] = useState(false); // ✅ Modal state
  const [agenda, setAgenda] = useState(""); // ✅ Agenda state

  // Load agenda from local storage
  useEffect(() => {
    const savedAgenda = localStorage.getItem("agenda");
    if (savedAgenda) {
      setAgenda(savedAgenda);
    }
  }, []);

  // Save agenda to local storage when changed
  useEffect(() => {
    localStorage.setItem("agenda", agenda);
  }, [agenda]);

  // Handle date selection
  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setIsOpen(true); // ✅ Open modal
  };

  // Add reminder
  const handleAddReminder = () => {
    if (!reminderText || !selectedDate) return;

    const newEvent = {
      title: reminderText,
      start: selectedDate,
      end: selectedDate,
    };

    setEvents([...events, newEvent]);
    setReminderText("");
    setSelectedDate(null);
    setIsOpen(false); // ✅ Close modal after adding reminder
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Reminders & Agenda</h1>

      {/* Calendar Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Your Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ height: 500 }}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Agenda Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Your Agenda</h2>
        <textarea
          className="w-full h-40 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your agenda here..."
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
        />
      </div>

      {/* ✅ Modern Modal for Adding Reminders */}
      {isOpen && (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Add Reminder for {moment(selectedDate).format("LL")}
            </h2>
            <input
              type="text"
              placeholder="Enter reminder"
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReminder}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Add Reminder
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default Reminder;
