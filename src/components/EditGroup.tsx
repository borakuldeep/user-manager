import { useContext, useState } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { StoreContext } from "../store";
import { Group } from "../types";
import Tag from "./Tag";

const EditGroup = () => {
  const [location, setLocation] = useLocation();
  const [match, params]: [boolean, { id: string }] = useRoute("/editgroup/:id");
  const { groups, users, dispatch } = useContext(StoreContext);
  const groupData: Group = groups.filter((g) => g.id == params.id)[0] || [];
  const [name, setName] = useState(groupData.name || "");
  const [groupMembers, setGroupMembers] = useState(
    groupData.users.map((g) => users.find((gr) => gr.id == g))
  );

  const saveDisabled =
    !name ||
    (name === groupData.name &&
      groupMembers
        .map((gr) => gr.id)
        .sort((x, y) => x - y)
        .join("") === groupData.users.sort((x, y) => x - y).join(""));

  const toggleUser = (user) => {
    groupMembers.map((g) => g.id).includes(user.id)
      ? setGroupMembers((prev) => prev.filter((g) => g.id !== user.id))
      : setGroupMembers((prev) => [...prev, user]);
  };

  const saveGroup = () => {
    dispatch("EDIT_GROUP", {
      id: groupData.id,
      name: name.trim(),
      users: groupMembers.map((gr) => gr.id),
    });
    setLocation("/groups");
  };

  const deleteGroup = () => {
    dispatch("DELETE_GROUP", { ...groupData, users: [] });
    setLocation("/groups");
  };

  return (
    <>
      <Link className="text-blue-500 underline mt-4" href="/groups">
        back
      </Link>
      <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md mt-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          Edit Group
        </h2>
        <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
          Click on user item to add / remove
        </p>

        <div className="mt-6 ">
          <div className="items-center -mx-2 md:flex">
            <div className="w-full mx-2">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
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
              Group Members
            </label>

            <div className="flex block w-full px-4 py-6 bg-white border rounded-md">
              {users.map((group) => (
                <button onClick={() => toggleUser(group)} key={group.id}>
                  <Tag
                    active={groupMembers.map((g) => g.id).includes(group.id)}
                    name={group.name}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center mt-6">
            {saveDisabled ? (
              <p className="text-red-500 text-sm mt-2">
                Edit name or groups to enable save
              </p>
            ) : null}
            <button
              className={
                saveDisabled
                  ? "px-4 py-2 text-black bg-gray-200 rounded-md mb-3"
                  : "px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-600 mb-3"
              }
              disabled={saveDisabled}
              onClick={saveGroup}
            >
              Save
            </button>
            {groupMembers.length ? (
              <p className="text-red-500 text-sm mt-2">
                Only group with no users can be deleted
              </p>
            ) : null}
            <button
              className={
                groupMembers.length
                  ? "px-4 py-2 text-black bg-gray-200 rounded-md"
                  : "px-4 py-2 text-white bg-pink-700 rounded-md hover:bg-pink-500"
              }
              disabled={!!groupMembers.length}
              onClick={deleteGroup}
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditGroup;
