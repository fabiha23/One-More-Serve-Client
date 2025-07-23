import { FaUser, FaShieldAlt, FaUtensils, FaHandsHelping } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';

const UserDropdown = ({ user, role, handleSignOut, openUser }) => {
  if (!openUser) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg bg-base-100 shadow-xl ring-1 ring-neutral/20 z-50 animate-fadeIn overflow-hidden">
      {/* User Info Section */}
      <div className="px-4 py-3 border-b border-neutral/10 bg-base-200">
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <img 
              className="h-10 w-10 rounded-full object-cover" 
              src={user?.photoURL || '/default-user.png'} 
              alt="User profile"
            />
          </div>
          
          {/* User Details with Icons */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <FaUser className="text-accent text-sm" />
              <p className="text-sm font-semibold text-accent truncate">
                {user?.displayName || 'User'}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {role === 'admin' ? (
                <>
                  <FaShieldAlt className="text-purple-500 text-sm" />
                  <p className="text-xs text-accent/70 capitalize">Administrator</p>
                </>
              ) : role === 'restaurant' ? (
                <>
                  <FaUtensils className="text-orange-500 text-sm" />
                  <p className="text-xs text-accent/70 capitalize">Restaurant</p>
                </>
              ) : role === 'charity' ? (
                <>
                  <FaHandsHelping className="text-green-500 text-sm" />
                  <p className="text-xs text-accent/70 capitalize">Charity</p>
                </>
              ) : (
                <>
                  <FaUser className="text-blue-500 text-sm" />
                  <p className="text-xs text-accent/70 capitalize">User</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Logout Button */}
      <button
        onClick={handleSignOut}
        className="flex w-full items-center gap-3 cursor-pointer px-4 py-3 text-sm text-accent hover:bg-neutral/5 transition-colors duration-200"
      >
        <TbLogout2 className="text-lg text-accent/80" />
        <span>Sign out</span>
      </button>
    </div>
  );
};

export default UserDropdown;