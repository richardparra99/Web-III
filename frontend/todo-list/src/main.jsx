import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormTarea from './pages/tareas/FormTarea';
import ListaTareas from './pages/tareas/ListaTareas';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaTareas />} />
        <Route path="/tareas/create" element={<FormTarea />} />
        <Route path="/tareas/:id/edit" element={<FormTarea />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
