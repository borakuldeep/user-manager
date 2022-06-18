import {useContext} from 'react';
import {StoreContext} from '../store';
import { User, Group } from "../types";
import Tag from './Tag';
import grouppng from '../group.png';


const GroupItem = ({ group }: { group: Group }) => {

    const {users} = useContext(StoreContext);

  return (
      <div>
      <div className="flex flex-col items-center p-4 transition-colors duration-200 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-green-600 dark:border-gray-700">
        <img
          className="object-cover w-16 h-16 rounded-full ring-4 ring-gray-300"
          src={grouppng}
          alt="user"
        />

        <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize group-hover:text-white">
          {group.name}
        </h1>
        <p className="mt-2 text-gray-500 group-hover:text-white">
          Users in this group
        </p>
        <div className="flex mt-1 -mx-1 flex-wrap">
          {group.users?.map((id: number) => (
            <Tag name={users.find(u => u.id === id).name} key={id}/>
          ))}
          </div>
        </div>
    </div>
  );
};

export default GroupItem;
