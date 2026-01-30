import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/page';
import AdminLayout from './app/admin/layout';
import AdminDashboard from './app/admin/page';
import AddProject from './app/admin/projects/add/page';
import AddClient from './app/admin/clients/add/page';
import ProjectsList from './app/admin/projects/page';
import ClientsList from './app/admin/clients/page';
import ContactsList from './app/admin/contacts/page';
import SubscribersList from './app/admin/subscribers/page';
import LoginPage from './app/login/page';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                <Route path="/admin/projects" element={<AdminLayout><ProjectsList /></AdminLayout>} />
                <Route path="/admin/projects/add" element={<AdminLayout><AddProject /></AdminLayout>} />
                <Route path="/admin/clients" element={<AdminLayout><ClientsList /></AdminLayout>} />
                <Route path="/admin/clients/add" element={<AdminLayout><AddClient /></AdminLayout>} />
                <Route path="/admin/contacts" element={<AdminLayout><ContactsList /></AdminLayout>} />
                <Route path="/admin/subscribers" element={<AdminLayout><SubscribersList /></AdminLayout>} />
            </Routes>
        </Router>
    );
}

export default App;
