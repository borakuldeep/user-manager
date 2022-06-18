import { useContext, useState } from "react";
import { useLocation, Link } from "wouter";
import { StoreContext } from "../store";
import Tag from "./Tag";

const UserForm = () => {
  const [location, setLocation] = useLocation();
  const { groups, dispatch } = useContext(StoreContext);
  const [name, setName] = useState("");
  const [userGroups, setUserGroups] = useState([]);

  const toggleGroup = (group) => {
    userGroups.map((g) => g.id).includes(group.id)
      ? setUserGroups((prev) => prev.filter((g) => g.id !== group.id))
      : setUserGroups((prev) => [...prev, group]);
  };

  const saveDisabled = !name || !userGroups.length;

  const saveUser = () => {
    dispatch("ADD_USER", { name, groups: userGroups.map((g) => g.id) });
    setLocation("/");
  };

  return (
    <>
      <Link className="text-blue-500 underline mt-4" href="/">
        back
      </Link>

      <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          Add a user
        </h2>
        <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
          Click on groups to select / unselect
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
              Groups
            </label>

            <div className="flex block w-full px-4 py-6 bg-white border rounded-md">
              {groups.map((group) => (
                <button onClick={() => toggleGroup(group)} key={group.id}>
                  <Tag
                    active={userGroups.map((g) => g.id).includes(group.id)}
                    name={group.name}
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
              onClick={saveUser}
            >
              Save
            </button>
            {saveDisabled ? (
              <p className="text-red-500 text-sm mt-2">
                Provide name and select at least one group to enable save
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserForm;
