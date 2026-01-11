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
    department: '',
    age: 0,
    city: '',
    state: '',
    postCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? Number(value) : value
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
        <div className="add-user-form-group">
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
        <div className="add-user-form-group">
          <label className="add-user-label">
            Age *
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min={0}
            max={120}
            className="add-user-input"
          />
        </div>
        <div className="add-user-form-group">
          <label className="add-user-label">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="add-user-input"
          />
        </div>
        <div className="add-user-form-group">
          <label className="add-user-label">
            State *
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="add-user-input"
          />
        </div>
        <div className="add-user-form-group-last">
          <label className="add-user-label">
            Post Code *
          </label>
          <input
            type="text"
            name="postCode"
            value={formData.postCode}
            onChange={handleChange}
            required
            minLength={4}
            maxLength={10}
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