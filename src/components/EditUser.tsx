import { useContext, useState } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { StoreContext } from "../store";
import { User } from "../types";
import Tag from "./Tag";

const EditUser = () => {
  const [location, setLocation] = useLocation();
  const [match, params]: [boolean, { id: string }] = useRoute("/edituser/:id");
  const { users, groups, dispatch } = useContext(StoreContext);
  const userData: User = users.filter((user) => user.id == params.id)[0] || [];
  const [name, setName] = useState(userData.name || "");
  const [userGroups, setUserGroups] = useState(
    userData.groups.map((g) => groups.find((gr) => gr.id == g))
  );

  const saveDisabled =
    !name || !userGroups.length ||
    (name === userData.name &&
      userGroups
        .map((gr) => gr.id)
        .sort((x, y) => x - y)
        .join("") === userData.groups.sort((x, y) => x - y).join(""));

  const toggleGroup = (group) => {
    userGroups.map((g) => g.id).includes(group.id)
      ? setUserGroups((prev) => prev.filter((g) => g.id !== group.id))
      : setUserGroups((prev) => [...prev, group]);
  };

  const saveUser = () => {
    dispatch("EDIT_USER", {
      id: userData.id,
      name: name.trim(),
      groups: userGroups.map((gr) => gr.id),
    });
    setLocation("/");
  };

  const deleteUser = () => {
    dispatch("DELETE_USER", { ...userData, groups: [] });
    setLocation("/");
  };

  return (
    <>
      <Link className="text-blue-500 underline mt-4" href="/">
        back
      </Link>
      <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md mt-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          Edit User
        </h2>
        <p className="mt-3 text-center text-gray-600">
          Click on group item to select / unselect
        </p>

        <div className="mt-6 ">
          <div className="items-center -mx-2 md:flex">
            <div className="w-full mx-2">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400"
                type="text"
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
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
            {saveDisabled ? (
              <p className="text-red-500 text-sm mt-2">
                {userGroups.length? 'Edit name or groups to enable save' : 'User should have at least one group'}
              </p>
            ) : null}
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
            <button
              className="px-4 py-2 text-white bg-pink-700 rounded-md hover:bg-pink-500 mt-4"
              onClick={deleteUser}
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditUser;
