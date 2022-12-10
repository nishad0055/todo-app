import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import {FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'

const Todo = () => {

   
    const {data: items =[], refetch} =useQuery({
        queryKey: ['items'],
        queryFn: async ()=>{
            const res = await fetch('http://localhost:5000/items')
            const data = await res.json()
            return data
        }
    })
        

    const handleAdd = event =>{
        event.preventDefault();
        const form = event.target;
        const items = {
            name: event.target.name.value,
        }
        
        fetch('http://localhost:5000/items',{
            method:'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(items)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.acknowledged >0){
                toast.success('Item Added Successfull')
                refetch()
            }
            form.reset();
        })

    }

    const handleDelete = _id => {

       const confirm = window.confirm('Are You Confirm Delete')

       if(confirm){

        fetch(`http://localhost:5000/items/${_id}`, {
            method: 'DELETE',
        })
        .then( res => res.json())
        .then(data =>{
            if(data.deletedCount > 0){
                toast.success('Item Deleted Successfull')
                refetch()
            }
            
        })
       }
    }
    

  return (
    <div className=" flex justify-center items-center bg-gray-600">
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
          <input type="submit" className="px-6 text-white font-inter text-3xl 
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
      
     {
        items.map((item, i)=>  <tr key={item._id}>
            <th>{i+1} </th>
            <td> {item.name} </td>
            <td> <button> <FaEdit size={20} ></FaEdit> </button> </td>
            <td> <button onClick={()=>handleDelete(item._id)}  className="" > <MdDelete 
             size={20} /> </button> </td>
          </tr>)
     }
     
      
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default Todo;
