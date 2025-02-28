import React, { useState } from "react";
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
  const [currentDate, setCurrentDate] = useState(new Date()); // ✅ Track selected date
  const [view, setView] = useState("month"); // ✅ Track selected view

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
      <h1 className="text-6xl font-serif text-yellow-400 mb-6">Reminders & Agenda</h1>

      {/* ✅ Calendar Navigation Buttons */}
      <div className="flex justify-between items-center w-full max-w-4xl bg-white shadow-md p-4 rounded-lg mb-4">
        <button
          onClick={() => setCurrentDate(new Date())}  // ✅ Reset to today
          className="bg-yellow-400 text-white px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-yellow-500"
        >
          Today
        </button>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentDate(moment(currentDate).subtract(1, view === "month" ? "months" : "weeks").toDate())} // ✅ Move Back
            className="bg-gray-500 text-white px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-gray-600"
          >
            ◀️ Back
          </button>
          <button
            onClick={() => setCurrentDate(moment(currentDate).add(1, view === "month" ? "months" : "weeks").toDate())} // ✅ Move Forward
            className="bg-gray-500 text-white px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-gray-600"
          >
            Next ▶️
          </button>
        </div>
      </div>

      {/* ✅ View Selector */}
      <div className="flex justify-center space-x-3 mb-4">
        {["month", "week", "day", "agenda"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)} // ✅ Change view
            className={`px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 ${
              view === v ? "bg-yellow-400 text-white" : "bg-gray-300"
            } hover:bg-yellow-500`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Calendar Component */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5 mb-6">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          date={currentDate} // ✅ Ensure current date updates correctly
          onNavigate={(date) => setCurrentDate(date)} // ✅ Sync date changes
          view={view} // ✅ Sync view changes
          onView={(newView) => setView(newView)} // ✅ Handle view changes
          style={{ height: 500 }}
          className="rounded-lg shadow-md"
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
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReminder}
                className="bg-yellow-400 text-white px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-yellow-500"
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

