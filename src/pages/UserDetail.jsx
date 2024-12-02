import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetail = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.users.data.find((u) => u.id === parseInt(id)));

  if (!user) {
    return (
      <div className="flex flex-col font-serif items-center justify-center h-screen">
        <h2 className="text-lg font-semibold text-gray-700">User not found</h2>
        <Link to="/" className="mt-4 text-blue-500 underline hover:text-blue-700">
          Go back to User List
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center font-serif justify-center min-h-screen ">
      <div className="max-w-lg w-full bg-white border border-orange-600 rounded-lg shadow-lg ">
        <div className="flex bg-orange-500  p-6 items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <span className="px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded">
            ID: {user.id}
          </span>
        </div>
        <div className="space-y-4 p-4">
          <div>
            <h3 className="text-gray-600 font-medium">Email:</h3>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div>
            <h3 className="text-gray-600 font-medium">Phone:</h3>
            <p className="text-gray-800">{user.phone || 'Not Available'}</p>
          </div>
          <div>
            <h3 className="text-gray-600 font-medium">Company:</h3>
            <p className="text-gray-800">{user.company?.name || 'Not Available'}</p>
          </div>
          <div>
            <h3 className="text-gray-600 font-medium">Address:</h3>
            <p className="text-gray-800">
              {user.address?.street}, {user.address?.city}
            </p>
          </div>
        </div>
        <div className="mt-6 text-center m-4">
          <Link
            to="/"
            className="inline-block px-6 py-2 text-sm font-medium text-orange-600 border border-orange-600 rounded hover:bg-orange-400 hover:text-white"
          >
            Back to User List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
