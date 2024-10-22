import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import Loader from "../components/Loader";
// const people = [
//   {
//     name: "John Doe",
//     title: "Front-end Developer",
//     department: "Engineering",
//     email: "john@devui.com",
//     role: "Developer",
//     image:
//       "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
//   },
//   {
//     name: "Jane Doe",
//     title: "Back-end Developer",
//     department: "Engineering",
//     email: "jane@devui.com",
//     role: "CTO",
//     image:
//       "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
//   },
// ];

const HomePage = () => {
  const [empData, setEmpData] = useState(null);
  const [category,setCategory] = useState("All")
  const [cats,setCats] = useState(null)
  const [loading,setLoading] = useState(false);

  const getAllCategories = async() => {
    setLoading(true);
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/getAllCategories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("getAllCats",data)
    setCats(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getAllCategories();
  },[] )

  useEffect(() => {
    if(!cats) return;
    if(category === "All"){
      console.log("cats",cats)
      const data = cats.flatMap(cat => cat.members);
      setEmpData(data);
      console.log("empdata",data)
      return;
    }
    else{
      const data = cats.filter((cat) => cat.name === category)[0]
      setEmpData(data.members);
      console.log("empdata",data)
    }
    
  },[cats,category])
   
  const handleDelete = async(uid,cid) => {
    setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/deleteUser`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid,cid }),
      });
      getAllCategories();
  }

  // console.log(empData);

  return (
    <>
      <section className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Team Members
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              This is a list of all players. You can add new players, edit
              or delete existing ones.
            </p>
          </div>
          <Link to={"/addemployee"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add Player
              </button>
            </div>
          </Link>
        </div>
        <div>
          {cats && <select name="category" id="category" className="p-2 bg-slate-600 mt-4 rounded-md text-white outline-none" onChange={(e) => setCategory(e.target.value)}>
            <option value="All" className="text-white bg-slate-500">All</option>
            {cats.map((cat) => 
            (<option value={cat.name}>{cat.name}</option>))}
          </select>}
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                {loading ? 
                (<Loader/>):
                (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Player</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Grade
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {empData?.map((person) => (
                      <tr key={person.name}>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={person.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {person.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                                {person.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {person.category.name}
                          </div>
                        
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 font-bold flex justify-between items-center h-[72px]">
                          <p>{person.grade}</p>
                          <MdDeleteOutline className=" w-6 h-6" onClick={(e) => handleDelete(person._id,person.category._id)}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                ) 
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
