import { useContext, useState } from "react";
import { useLocation, Link } from "wouter";
import { StoreContext } from "../store";
import Tag from "./Tag";

const GroupForm = () => {
  const [location, setLocation] = useLocation();
  const { users, dispatch } = useContext(StoreContext);
  const [name, setName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);

  const toggleUser = (user) => {
    groupMembers.map((u) => u.id).includes(user.id)
      ? setGroupMembers((prev) => prev.filter((g) => g.id !== user.id))
      : setGroupMembers((prev) => [...prev, user]);
  };

  const saveDisabled = !name;

  const saveGroup = () => {
    dispatch("ADD_GROUP", { name, users: groupMembers.map((u) => u.id) });
    setLocation("/groups");
  };

  return (
    <>
      <Link className="text-blue-500 underline mt-4" href="/groups">
        back
      </Link>

      <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          Add a Group
        </h2>
        <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
          Click on users to add in the group
        </p>

        <div className="mt-6 ">
          <div className="items-center -mx-2 md:flex">
            <div className="w-full mx-2">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              All users:
            </label>

            <div className="flex block w-full px-4 py-6 bg-white border rounded-md">
              {users.map((user) => (
                <button onClick={() => toggleUser(user)} key={user.id}>
                  <Tag
                    active={groupMembers.map((u) => u.id).includes(user.id)}
                    name={user.name}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center mt-6">
            <button
              className={
                saveDisabled
                  ? "px-4 py-2 text-black bg-gray-200 rounded-md"
                  : "px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-600"
              }
              disabled={saveDisabled}
              onClick={saveGroup}
            >
              Save
            </button>
            {saveDisabled ? (
              <p className="text-red-500 text-sm mt-2">
                Provide group name to enable save
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default GroupForm;
