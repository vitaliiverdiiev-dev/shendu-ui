import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RoleBadge } from './role-badge';
import type { UserRole } from './role-badge.types';

describe('RoleBadge', () => {
  describe('Rendering', () => {
    it('renders the role correctly', () => {
      render(<RoleBadge role="admin" />);
      expect(screen.getByText('admin')).toBeInTheDocument();
    });

    it('renders as a badge component', () => {
      render(<RoleBadge role="buyer" />);
      const badge = screen.getByText('buyer');
      expect(badge).toHaveAttribute('data-slot', 'badge');
    });
  });

  describe('Role Variants', () => {
    const roles: UserRole[] = ['admin', 'teamlead', 'tech', 'qa', 'buyer', 'trainee'];

    roles.forEach((role) => {
      it(`renders ${role} role with correct styling`, () => {
        render(<RoleBadge role={role} />);
        const badge = screen.getByText(role);
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('text-xs');
      });
    });

    it('applies admin role colors', () => {
      render(<RoleBadge role="admin" />);
      const badge = screen.getByText('admin');
      expect(badge).toHaveClass('bg-red-200', 'text-red-800', 'border-red-300');
    });

    it('applies teamlead role colors', () => {
      render(<RoleBadge role="teamlead" />);
      const badge = screen.getByText('teamlead');
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800', 'border-blue-200');
    });

    it('applies buyer role colors', () => {
      render(<RoleBadge role="buyer" />);
      const badge = screen.getByText('buyer');
      expect(badge).toHaveClass('bg-green-100', 'text-green-800', 'border-green-200');
    });

    it('applies trainee role colors', () => {
      render(<RoleBadge role="trainee" />);
      const badge = screen.getByText('trainee');
      expect(badge).toHaveClass('bg-cyan-100', 'text-cyan-800', 'border-cyan-200');
    });

    it('applies tech role colors', () => {
      render(<RoleBadge role="tech" />);
      const badge = screen.getByText('tech');
      expect(badge).toHaveClass('bg-purple-100', 'text-purple-800', 'border-purple-200');
    });

    it('applies qa role colors', () => {
      render(<RoleBadge role="qa" />);
      const badge = screen.getByText('qa');
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800', 'border-yellow-200');
    });
  });

  describe('Custom className', () => {
    it('allows custom className to be added', () => {
      render(<RoleBadge role="admin" className="custom-class" />);
      expect(screen.getByText('admin')).toHaveClass('custom-class');
    });

    it('merges custom className with role colors', () => {
      render(<RoleBadge role="admin" className="uppercase" />);
      const badge = screen.getByText('admin');
      expect(badge).toHaveClass('bg-red-200', 'text-red-800', 'border-red-300', 'uppercase');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards HTML attributes to the badge element', () => {
      render(
        <RoleBadge role="buyer" id="test-id" data-testid="role-badge">
          buyer
        </RoleBadge>
      );
      const badge = screen.getByTestId('role-badge');
      expect(badge).toHaveAttribute('id', 'test-id');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the badge element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<RoleBadge role="admin" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.textContent).toBe('admin');
    });
  });
});
