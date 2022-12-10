import React from "react";
import {FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'

const Todo = () => {

    const handleAdd = event =>{
        event.preventDefault();

        const Items = {
            name: event.target.name.value,
        }
        console.log(Items)
    }
    

  return (
    <div className="flex justify-center items-center bg-blue-600">
      <div className=" bg-white p-5 my-20 lg:w-1/2 container mx-auto">
        <h2 className="text-4xl text-center font-inter font-bold mb-10" >Todo-App</h2>
        <form onSubmit={handleAdd} className="w-full mb-10" >
          <label className="flex relative " >
          <input
            type="text"
            name="name"
            placeholder="Add Item"
            className="input border-gray-500 focus:outline-0 w-full font-inter"
          />
          <input type="submit" className="px-6 text-white font-inter text-3xl rounded 
           cursor-pointer bg-primary top-0 bottom-0 right-0 absolute" value="+" />
          </label>
        </form>
        <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      
      <tr>
        <th>1</th>
        <td>Cy Gandde ghgmgmg lihhgjjg</td>
        <td> <button> <FaEdit size={20} ></FaEdit> </button> </td>
        <td> <button className="" > <MdDelete size={20} /> </button> </td>
      </tr>
     
      
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default Todo;
