import { useState, ChangeEvent } from 'react';
import Image from 'next/image';

interface ProfileFormData {
  fullName: string;
  jobTitle: string;
  location: string;
  currentStatus: string;
  emailId: string;
  contact: string;
}

const PersonalProfile= () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    jobTitle: '',
    location: '',
    currentStatus: '',
    emailId: '',
    contact: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form data:', formData);
  };

  return (
    <div className="h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-8">Personal Profile</h1>
      
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
          <Image
            src="/api/placeholder/96/96"
            alt="Profile Avatar"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
        <button className="text-[#565DBD] hover:text-indigo-800">
          Change your Avatar
        </button>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Enter your job title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter your locatin"
              className='w-full px-4 py-2 border border-gray-300 rounded-md'
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Status
            </label>
            <input
              type="text"
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleInputChange}
              placeholder="Enter your current status"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ID
            </label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder="Enter your contact number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#565DBD] text-white rounded-md hover:bg-indigo-700 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalProfile;