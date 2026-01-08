import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<AddUser />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
