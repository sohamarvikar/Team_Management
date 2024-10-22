import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const EmployeeForm = () => {
  const { register, handleSubmit,formState:{errors,isSubmitting} } = useForm();
  const [cats,setCats] = useState(null)
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const createEmployee = async (data) => {

    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/createUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      }
    );

    console.log("FORM RESPONSE......", savedUserResponse);

    navigate("/")
  };

  useEffect(() => {
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
      setCats(data.data);
      setLoading(false);
    }

    getAllCategories();
  },[] )

  return (
    <div>
      <form onSubmit={handleSubmit(createEmployee)} className="mt-8">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              {" "}
              Player Name{" "}
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="text"
                placeholder="Enter You Full Name"
                {...register("name",{required:true})}
              ></input>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              {" "}
              Player Email Id{" "}
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="email"
                placeholder="Enter Your Email"
                {...register("email",{required:true})}
              ></input>
            </div>
          </div>

          <div>
          <div>
          <label
              htmlFor="category"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              {" "}
              Player Category{" "}
            </label>
            {cats && <select name="category" id="category" placeholder='Select category of player' className="dark:border-gray-700 p-2 mt-4 rounded-md bg-black outline-none w-full border border-gray-300 text-gray-50 placeholder:text-gray-400" {...register("categoryId",{required:true})}>
              <option selected disabled className="text-gray-400">Select Category</option>
              {cats.map((cat) => 
              (<option value={cat._id} className="text-gray-400">{cat.name}</option>))}
            </select>}
            </div>
          </div>

          

          <div>
            <label
              htmlFor="role"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              {" "}
              Player Grade{" "}
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="text"
                placeholder="Enter Your Player Role (A,B or C)"
                {...register("grade",{required:true})}
              ></input>
            </div>
          </div>
          {(errors.name || errors.email || errors.grade || errors.categoryId )&& <p className="text-sm text-red-600 font-semibold">all fields are required  <sup>*</sup></p>}

          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
            >
              {isSubmitting ? "submitting":"Create Player"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
