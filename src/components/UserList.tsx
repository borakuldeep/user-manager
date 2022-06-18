import { useContext, useState } from "react";
import { useLocation } from "wouter";
import { StoreContext } from "../store";
import User from "./User";

export const UserList = () => {
  const { users } = useContext(StoreContext);
  const [search, setSearch] = useState("");
  const [_, setLocation] = useLocation();

  const filteredUsers = users.filter((user) => user.name.includes(search));

  return (
    <>
      <button
        className="mt-5 px-4 py-2 font-medium tracking-wide text-white bg-blue-600 rounded-md hover:bg-blue-500"
        onClick={() => setLocation("/adduser")}
      >
        Add a user
      </button>
      <div className="flex flex-col items-center mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
          Search a user
        </label>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="w-100 block px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400"
          type="text"
        />
      </div>
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-3 px-10">
        {filteredUsers
          .sort((x, y) => x.id - y.id)
          .map((user) => (
            <div
              onClick={() => setLocation(`/edituser/${user.id}`)}
              key={user.id}
            >
              <User user={user} />
            </div>
          ))}
      </div>
    </>
  );
};
