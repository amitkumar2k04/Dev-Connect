import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const RightSidebar = () => {
  const connections = useSelector((store) => store.connections);

  return (
    //<div className="border-l-2 border-gray-800 ">
      <div className="p-4 mt-16 w-76 h-145 hidden lg:block">
        <div className="bg-base-300 p-4  h-140 rounded-lg shadow-md">
          <h3 className="font-bold ">Messaging</h3>
          <p className="text-sm text-gray-400 mb-2">
            Click a profile to start chat
          </p>

          <div className="space-y-3 max-h-[67vh]  overflow-y-auto">
            {connections?.length > 0 ? (
              connections.map((conn) => {
                if (!conn) return null;
                const { _id, firstName, lastName, photoUrl } = conn;

                return (
                  <Link
                    to={`/chat/${_id}`}
                    key={_id}
                    className="flex items-center gap-3 bg-gray-900 rounded-lg p-2 hover:bg-gray-700 transition"
                  >
                    <img
                      src={photoUrl || "/default-avatar.png"}
                      alt={firstName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 ">
                      <p className="font-medium text-sm text-gray-200">
                        {firstName} {lastName}
                      </p>
                    </div>
                    <MessageCircle className="text-gray-500" size={20} />
                  </Link>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm">No connections yet.</p>
            )}
          </div>
        </div>
      </div>
    //</div>
  );
};

export default RightSidebar;
