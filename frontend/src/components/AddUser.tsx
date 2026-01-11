import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../services/api';
import Toast from './Toast';
import './AddUser.css';

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: string;
  city?: string;
  state?: string;
  postCode?: string;
}

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
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length > 100) {
      newErrors.firstName = 'First name must be 100 characters or less';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length > 100) {
      newErrors.lastName = 'Last name must be 100 characters or less';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.age < 0 || formData.age > 120) {
      newErrors.age = 'Age must be between 0 and 120';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.postCode.trim()) {
      newErrors.postCode = 'Post code is required';
    } else if (formData.postCode.length < 4 || formData.postCode.length > 10) {
      newErrors.postCode = 'Post code must be 4-10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? Number(value) : value
    });
    if (errors[name as keyof ValidationErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      await userApi.create(formData);
      setToast({ message: 'User created successfully!', type: 'success' });
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-container">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h2 className="add-user-title">Add New User</h2>
      {error && (
        <div className="add-user-error">
          {error}
        </div>
      )}
      <form className="add-user-form" onSubmit={handleSubmit} noValidate>
        <div className="add-user-form-group">
          <label className="add-user-label">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`add-user-input ${errors.firstName ? 'input-error' : ''}`}
          />
          {errors.firstName && <span className="field-error">{errors.firstName}</span>}
        </div>
        <div className="add-user-form-group">
          <label className="add-user-label">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`add-user-input ${errors.lastName ? 'input-error' : ''}`}
          />
          {errors.lastName && <span className="field-error">{errors.lastName}</span>}
        </div>
        <div className="add-user-form-group">
          <label className="add-user-label">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`add-user-input ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="add-user-form-group">
          <label className="add-user-label">Phone Number</label>
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