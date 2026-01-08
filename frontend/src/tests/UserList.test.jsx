import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UserList from '../components/UserList';
import { userApi } from '../services/api';

vi.mock('../services/api');

describe('UserList Component', () => {
  it('displays loading state', () => {
    userApi.getAll = vi.fn(() => new Promise(() => {}));

    render(<UserList />);
    expect(screen.getByText(/Loading users/i)).toBeInTheDocument();
  });

  it('displays users when loaded', async () => {
    const mockUsers = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' }
    ];

    userApi.getAll = vi.fn().mockResolvedValue({ data: mockUsers });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    });
  });
});