import '@testing-library/jest-dom';
import { vi } from 'vitest';

global.window.confirm = vi.fn(() => true);