const Tag = ({active = false, name }) => {

    const cl = active ? 'bg-blue-600 rounded-full py-1 px-2 text-xs border border-blue-300 ml-2 text-white' : 'rounded-full py-1 px-2 text-xs border text-blue-900 bg-blue-100 border-blue-300 ml-2'
  return (
    <div className={cl}>
      {name}
    </div>
  );
};

export default Tag;
