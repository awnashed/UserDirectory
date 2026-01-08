import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../services/api';
import './AddUser.css';

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await userApi.create(formData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-container">
      <h2 className="add-user-title">Add New User</h2>
      {error && (
        <div className="add-user-error">
          {error}
        </div>
      )}
      <form className="add-user-form" onSubmit={handleSubmit}>
        <div className="add-user-form-group">
          <label className="add-user-label">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="add-user-input"
          />
        </div>
        <div className="add-user-form-group">
          <label className="add-user-label">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="add-user-input"
          />
        </div>
        <div className="add-user-form-group">
          <label className="add-user-label">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="add-user-input"
          />
        </div>
        <div className="add-user-form-group">
          <label className="add-user-label">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="add-user-input"
          />
        </div>
        <div className="add-user-form-group-last">
          <label className="add-user-label">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="add-user-input"
          />
        </div>
        <div className="add-user-button-group">
          <button
            type="submit"
            disabled={loading}
            className="add-user-submit-btn"
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="add-user-cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;