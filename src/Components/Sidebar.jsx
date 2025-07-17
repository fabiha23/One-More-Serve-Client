import React, { useState } from 'react';
import { FaUserCircle, FaSignOutAlt} from 'react-icons/fa';
import { AiOutlineBars } from 'react-icons/ai';
import useAuth from '../hooks/useAuth';
import UserMenu from '../pages/Dashboard/User/UserMenu';
import useRole from '../hooks/UseRole';

const Sidebar = () => {
  const { user, signOutUser } = useAuth();
    const [role, isRoleLoading] = useRole()
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log('sign out hoise');
        return fetch(`${import.meta.env.VITE_API_URL}/logout`, {
          method: 'POST',
          credentials: 'include',
        });
      })
      .then((res) => {
        if (res.ok) {
          console.log('Signed out from Firebase and backend token cleared');
        } else {
          console.log('Backend logout failed');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className=" flex justify-between items-center md:hidden p-4 shadow">
        <button onClick={handleToggle} className="text-primary">
          <AiOutlineBars className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between w-64 h-screen p-4 shadow-lg shadow-accent transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 absolute md:static`}
      >
        <div>
          <div className="flex gap-2 items-center mb-6">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full" />
            ) : (
              <FaUserCircle className="w-8 h-8 text-primary" />
            )}
            <h3 className="text-lg font-bold text-accent">{user?.displayName || 'Guest User'}</h3>
          </div>

          {role==='user'&& <UserMenu></UserMenu>}
        </div>

        <button onClick={handleSignOut} className="flex items-center gap-2 text-error hover:underline font-semibold">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
