import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListPage from '../pages/ListPage';
import AddEditPage from '../pages/AddEditPage';
import ViewPage from '../pages/ViewPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/add" element={<AddEditPage />} />
        <Route path="/edit/:id" element={<AddEditPage />} />
        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}
