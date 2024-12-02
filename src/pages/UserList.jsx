
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setCurrentPage } from '../redux/userSlice';
import SearchBar from '../components/SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const UserList = () => {
  const dispatch = useDispatch();
  const { data: users, status, error, total, currentPage, itemsPerPage } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      navigate(`?search=${searchTerm}`)
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    dispatch(setCurrentPage(newPage));
    dispatch(fetchUsers({ page: newPage, limit: itemsPerPage }));
    navigate(`?page=${newPage}`);
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="container font-serif mx-auto">
      <div className="mt-20 mb-20">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      <div className="mt-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Company</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone || 'N/A'}</td>
                    <td className="px-6 py-4">{user.company?.name || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <Link to={`/user/${user.id}`} className="text-blue-500 underline">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4 float-right">
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName="flex justify-center space-x-2"
              pageClassName="px-3 py-1 border rounded"
              previousClassName="px-3 py-1 border rounded"
              nextClassName="px-3 py-1 border rounded"
              activeClassName="bg-orange-500 text-white"
              forcePage={currentPage - 1} // Sync current page with pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
