import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BusinessPage from './pages/BusinessPage';
import AddBusinessPage from './pages/AddBusinessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="business/:id" element={<BusinessPage />} />
          <Route path="add-business" element={<AddBusinessPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
