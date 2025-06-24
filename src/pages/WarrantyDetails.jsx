import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function WarrantyDetails(){
    const {id} = useParams();
    const [warranty , setWarranty] = useState(null);
    useEffect(()=>{
        const fetchWarranty = async ()=>{
            try{
                const res = await api.get(`/api/warranty/${id}`);
                setWarranty(res.data);
            }catch(err){
                console.log(err)
                toast.error("Failed to Fetch Warranty Details")
            }
        };
        fetchWarranty();
    } ,[id]);
    if(!warranty) return <Spinner/>;
  return (
     <div className="warranty-details">
      <h2>{warranty.productName}</h2>
      <p><strong>Brand:</strong> {warranty.brand}</p>
      <p><strong>Serial Number:</strong> {warranty.serialNumber}</p>
      <p><strong>Purchase Date:</strong> {warranty.purchaseDate}</p>
      <p><strong>Expiry Date:</strong> {warranty.expiryDate}</p>
      <p><strong>Invoice Number:</strong> {warranty.invoiceNumber}</p>
      <p><strong>User Email:</strong> {warranty.userEmail}</p>
      <p><strong>Notes:</strong> {warranty.notes}</p>

      {warranty.imageUrl && <img src={warranty.imageUrl} alt="Product" width="200" />}
      {warranty.documentUrl && (
        <p>
          <a href={warranty.documentUrl} target="_blank" rel="noopener noreferrer">View Document</a>
        </p>
      )}
    </div>
  )
}

export default WarrantyDetails