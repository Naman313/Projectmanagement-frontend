import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface AddTeamMembersProps {
  onClose: () => void;
}

const AddTeamMembers: React.FC<AddTeamMembersProps> = ({ onClose }) => {
  const [newMember, setNewMember] = useState('');
  const [members] = useState([
    {
      id: '1',
      name: 'Esther Howard',
      role: 'Owner',
      position: 'Project Manager',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '2',
      name: 'Eleanor Pena',
      role: 'Admin',
      position: 'Team Leader',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '3',
      name: 'Kathryn Murphy',
      role: 'User',
      position: 'Backend Developer',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '4',
      name: 'Devon Lane',
      role: 'User',
      position: 'Frontend Developer',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '5',
      name: 'Ronald Richards',
      role: 'User',
      position: 'UI/UX Designer',
      avatar: '/api/placeholder/40/40'
    }
  ]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-[480px] p-6 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Add Team Members</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add others by name"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
            />
            <button className="px-6 py-2 bg-[#5D56BD] text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
              Invite
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>Team members ({members.length})</span>
            <span>Roles</span>
          </div>

          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.position}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 text-gray-700 hover:bg-gray-50 rounded-lg text-sm border border-gray-200">
                  {member.role}
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMembers;