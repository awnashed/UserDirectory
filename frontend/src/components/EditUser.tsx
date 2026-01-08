import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userApi } from '../services/api';
import './AddUser.css';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;
      try {
        setLoadingUser(true);
        const response = await userApi.getById(Number(id));
        const user = response.data;
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber || '',
          department: user.department || ''
        });
      } catch (err) {
        setError('Failed to load user');
      } finally {
        setLoadingUser(false);
      }
    };
    loadUser();
  }, [id]);

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
      await userApi.update(Number(id), formData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="add-user-container">
        <p>Loading user...</p>
      </div>
    );
  }

  return (
    <div className="add-user-container">
      <h2 className="add-user-title">Edit User</h2>
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
            {loading ? 'Updating...' : 'Update User'}
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

export default EditUser;
