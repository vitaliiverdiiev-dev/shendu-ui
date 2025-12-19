import type { UserRole } from './role-badge.types';

export const getRoleColor = (role: UserRole): string => {
  const colors: Record<UserRole, string> = {
    admin: 'bg-red-200 text-red-800 border-red-300',
    teamlead: 'bg-blue-100 text-blue-800 border-blue-200',
    buyer: 'bg-green-100 text-green-800 border-green-200',
    trainee: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    tech: 'bg-purple-100 text-purple-800 border-purple-200',
    qa: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };

  return colors[role] || 'bg-gray-100 text-gray-800 border-gray-200';
};
