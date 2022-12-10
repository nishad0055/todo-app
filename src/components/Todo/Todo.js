import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import EditModal from "../EditModal/EditModal";

const Todo = () => {

   const [isEditing, setEditing] = useState(null)
    const {data: items =[], refetch} =useQuery({
        queryKey: ['items'],
        queryFn: async ()=>{
            const res = await fetch('https://todo-server-nu.vercel.app/items')
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
        
        fetch('https://todo-server-nu.vercel.app/items',{
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
            form.reset(items);
        })

    }
    
    

    const handleDelete = _id => {

       const confirm = window.confirm('Are You Confirm Delete')

       if(confirm){

        fetch(`https://todo-server-nu.vercel.app/items/${_id}`, {
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
    <div className=" flex justify-center items-center bg-gray-300">
      <div className=" bg-white p-5 my-20 lg:w-1/2 container mx-auto shadow-xl rounded">
        <h2 className="text-4xl text-center font-inter font-bold mb-10" >Todo-App</h2>
        <form onSubmit={handleAdd} className="w-full mb-10 font-inter " >
          <label className="flex relative " >
          <input
            type="text"
            name="name"
        placeholder= 'Add item'
        
            className="input border-gray-500 focus:outline-0 w-full font-inter"
          />
          <button className="px-6 bg-orange-600 text-white text-lg
          top-0 bottom-0 right-0 absolute" > Add </button>
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
        items.map((item, i)=>  <tr 
           key={item._id}
           >
            <th>{i+1} </th>
            <td> {item.name} </td>
           <td> <label onClick={()=>setEditing(item)}
             htmlFor="edit-modal" className="cursor-pointer">
           <FaEdit size={20} />
          </label></td>
            <td> <button onClick={()=>handleDelete(item._id , )}  className="" > 
             <MdDelete 
             size={20} /> </button> </td>
          </tr>)
     }
     
      
    </tbody>
  </table>
</div>
      </div>
     {
        isEditing &&
        <EditModal
        isEditing ={isEditing}
        refetch = {refetch}
        setEditing = {setEditing}
        ></EditModal>
     }
    </div>
  );
};

export default Todo;
