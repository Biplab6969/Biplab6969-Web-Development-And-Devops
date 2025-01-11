import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Layout from "./component/Layout";
import Exams from "./component/Exams";
import Programs from "./component/Programs";
import Scholarship from "./component/Scholarship";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {


  return (
    <BrowserRouter>
    <Navbar />

    <Routes>
    <Route path="/" element={<Layout />} />
    <Route path="/exams" element={<Exams />} />
    <Route path="/programs" element={<Programs />} />
    <Route path="/scholarships" element={<Scholarship />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
