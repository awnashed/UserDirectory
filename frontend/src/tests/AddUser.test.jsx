import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AddUser from '../components/AddUser';
import { userApi } from '../services/api';

vi.mock('../services/api');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

describe('AddUser Component', () => {
  it('renders form fields', () => {
    render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );

    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    userApi.create = vi.fn().mockResolvedValue({ data: { id: 1 } });

    render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'John' } });
    fireEvent.change(inputs[1], { target: { value: 'Doe' } });
    fireEvent.change(inputs[2], { target: { value: 'john@example.com' } });

    const button = screen.getByText(/Create User/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(userApi.create).toHaveBeenCalled();
    });
  });
});