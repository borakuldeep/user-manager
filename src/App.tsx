import { ReactElement, useState, useEffect, useCallback, useContext } from "react";
import { Redirect, Switch, Route, Link, useRoute, Router } from "wouter";
import "./App.css";
import EditUser from "./components/EditUser";
import UserForm from "./components/UserForm";
import { UserList } from "./components/UserList";
import { GroupList } from "./components/GroupList";
import EditGroup from "./components/EditGroup";
import GroupForm from "./components/GroupForm";

const ActiveLink = (props) => {
  const [isActive] = useRoute(props.href);
  return (
    <Link {...props}>
      <a
        className={
          isActive
            ? "h-10 px-4 py-1 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base"
            : " h-10 px-4 py-1 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base"
        }
      >
        {props.children}
      </a>
    </Link>
  );
};

function App() {

  const [_, userParams] = useRoute("/edituser/:id");

  return (
    <Router>
      <div className="App">
        <header>
          <nav className="flex justify-center mt-2 py-1 border-b border-gray-200 dark:border-gray-700">
            <ActiveLink href="/">Users</ActiveLink>
            { " |"  }
            <ActiveLink href="/groups">Groups</ActiveLink>
          </nav>
        </header>
        <main>
        <Switch>
          <Route path="/"><UserList/></Route>
          <Route path="/groups"><GroupList /></Route>
          <Route path="/adduser">< UserForm /></Route>
          <Route path="/addgroup"><GroupForm /></Route>
          <Route path="/edituser/:id"><EditUser /></Route>
          <Route path="/editgroup/:id"><EditGroup /></Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
