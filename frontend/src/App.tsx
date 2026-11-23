import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminPage } from "./pages/admin";
import { BookingPage } from "./pages/booking";
import { HomePage } from "./pages/home";
import { SlotsPage } from "./pages/slots";
import { BookingFormPage } from "./pages/booking-form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/:meetingTypeId/slots" element={<SlotsPage />} />
        <Route path="/booking/:meetingTypeId/slots/:slotStart" element={<BookingFormPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
