import React from "react";
import { toast } from "react-hot-toast";

const EditModal = ({isEditing, refetch, setEditing}) => {
    const {name, _id} = isEditing;
    const handleEdit = (event) =>{
        event.preventDefault()
        const form = event.target;
       const items = {
        name: event.target.name.value,
       }
       
       

        fetch(`https://todo-server-nu.vercel.app/items/${_id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(items)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount >0 ){
                toast.success('Item edit successfull')
                refetch();
                
            }
        })
        setEditing(null)
    }
  return (
    <div>
      <input type="checkbox" id="edit-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-1/3">
          <label
            htmlFor="edit-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
         
          <form onSubmit={handleEdit} className ='mt-5' >
          <label className="flex relative " >
          <input
            type="text"
            name="name"
            placeholder= {name}
        
            className="input border-gray-500 focus:outline-0 w-full font-inter"
          />
          <button 
          className="font-inter text-lg text-white px-6 bg-orange-600
          top-0 bottom-0 right-0 absolute" >Edit</button>
          </label>
          </form>
    
        
        </div>
      </div>
    </div>
  );
};

export default EditModal;
