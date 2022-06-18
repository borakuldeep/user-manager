import { createContext, useEffect, useState } from "react";
import { set, get } from "idb-keyval";
import { User, Group } from "./types";

const StoreContext = createContext(null);

const getRandomInt = () => {
  return Math.floor(Math.random() * (1000 - 1 + 1) + 1);
};

const getStoredValues = async (setUsers: Function, setGroups: Function) => {
  const storedUsers = await get("users");
  const storedGroups = await get("groups");
  storedUsers
    ? setUsers(storedUsers)
    : setUsers([{ id: 1, name: "Kuldeep", groups: [1, 2] }]);
  storedGroups
    ? setGroups(storedGroups)
    : setGroups([
        { id: 1, name: "Vollyball group", users: [1] },
        { id: 2, name: "Movie group", users: [1] },
      ]);
};

function StoreProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getStoredValues(setUsers, setGroups);
  }, []);

  const dispatch = (type: string, payload: any) => {
    switch (type) {
      case "ADD_USER":
        addUser(payload);
        break;
      case "EDIT_USER":
        editUser(payload);
        break;
      case "DELETE_USER":
        deleteUser(payload);
        break;
      case "ADD_GROUP":
        addGroup(payload);
        break;
      case "EDIT_GROUP":
        editGroup(payload);
        break;
      case "DELETE_GROUP":
        deleteGroup(payload);
        break;
    }
  };

  const addUser = (user: User) => {
    const userId = getRandomInt();
    setUsers([...users, { id: userId, ...user }]);
    set("users", [...users, { id: userId, ...user }]);
    updateGroupsOnUserChange({ id: userId, ...user });
  };

  const editUser = (user: User) => {
    const filtered = users.filter((u) => u.id !== user.id);
    setUsers([...filtered, user]);
    updateGroupsOnUserChange(user);
    set("users", [...filtered, user]);
  };

  const deleteUser = (user: User) => {
    const filtered = users.filter((u) => u.id !== user.id);
    setUsers([...filtered]);
    updateGroupsOnUserChange(user);
    set("users", [...filtered]);
  };

  const addGroup = (group: Group) => {
    const groupId = getRandomInt();
    setGroups([...groups, { id: groupId, ...group }]);
    updateUsersOnGroupChange({ id: groupId, ...group });
    set("groups", [...groups, { id: groupId, ...group }]);
  };

  const editGroup = (group: Group) => {
    const filtered = groups.filter((g) => g.id !== group.id);
    setGroups([...filtered, group]);
    updateUsersOnGroupChange(group);
    set("groups", [...filtered, group]);
  };

  const deleteGroup = (group: Group) => {
    const filtered = groups.filter((g) => g.id !== group.id);
    setGroups([...filtered]);
    updateUsersOnGroupChange(group);
    set("groups", [...filtered]);
  };

  const updateUsersOnGroupChange = (group: Group) => {
    const newUsers = users.map((u) => {
      // when a user is removed from group
      if (u.groups.includes(group.id) && !group.users.includes(u.id)) {
        return { ...u, groups: u.groups.filter((id) => id !== group.id) };
      }
      // when a user is added in group
      else if (!u.groups.includes(group.id) && group.users.includes(u.id)) {
        return { ...u, groups: [...new Set([...u.groups, group.id])] };
      }
      // return same
      return u;
    });
    //ewUsers.length &&
    setUsers(newUsers);
    set("users", newUsers);
  };

  const updateGroupsOnUserChange = (user: User) => {
    const newGroups = groups.map((g) => {
      // when a user is removed from group
      if (g.users.includes(user.id) && !user.groups.includes(g.id)) {
        return { ...g, users: g.users.filter((id) => id !== user.id) };
      }
      // when a user is added in group
      else if (!g.users.includes(user.id) && user.groups.includes(g.id)) {
        return { ...g, users: [...new Set([...g.users, user.id])] };
      }
      // return same
      return g;
    });
    //newGroups.length &&
    setGroups(newGroups);
    set("groups", newGroups);
  };

  return (
    <StoreContext.Provider value={{ users, groups, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export { StoreProvider, StoreContext };
