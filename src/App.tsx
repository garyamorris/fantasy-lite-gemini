import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Matchup3D } from './pages/Matchup3D';
import { AdminConfig } from './pages/AdminConfig';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/matchup" element={<Matchup3D />} />
                    <Route path="/admin" element={<AdminConfig />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
