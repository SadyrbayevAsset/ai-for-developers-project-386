import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminPage } from "./pages/admin";
import { BookingPage } from "./pages/booking";
import { HomePage } from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
