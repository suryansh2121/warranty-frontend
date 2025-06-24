import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tilt from 'react-parallax-tilt'; 
import api from '../services/api';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function WarrantyDetails() {
  const { id } = useParams();
  const [warranty, setWarranty] = useState(null);

  useEffect(() => {
    const fetchWarranty = async () => {
      try {
        const res = await api.get(`/api/warranty/${id}`);
        setWarranty(res.data);
      } catch (err) {
        console.error('Error fetching warranty:', err);
        toast.error('Failed to fetch warranty details');
      }
    };

    fetchWarranty();
  }, [id]);

  if (!warranty) return <Spinner />;

  return (
    <div className="warranty-details relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white flex items-center justify-center py-12 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-pulse"></div>

      
      <Tilt
        className="relative z-10 max-w-4xl w-full mx-4"
        options={{
          max: 10, 
          scale: 1.02, 
          speed: 100, 
          perspective: 200,
          glare: true, 
          'max-glare': 0.3, 
        }}
      >
        <div className="p-8 bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-500/30">
          <h2 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-glow">
            {warranty.productName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-5">
              {[
                ['Brand & Model', warranty.brandAndModel],
                ['Serial Number', warranty.serialNumber],
                ['Purchase Date', new Date(warranty.purchaseDate).toLocaleDateString()],
                ['Warranty Duration', `${warranty.warrantyDuration} months`],
                ['Expiry Date', new Date(warranty.warrantyExpiryDate).toLocaleDateString()],
              ].map(([label, value], index) => (
                <p className="text-lg animate-slide-up" style={{ animationDelay: `${0.1 * (index + 1)}s` }} key={label}>
                  <strong className="text-blue-300">{label}:</strong>{' '}
                  <span className="hover:text-blue-400 transition-colors">{value}</span>
                </p>
              ))}
            </div>

           
            <div className="space-y-5">
              {[
                ['Invoice Number', warranty.invoiceNumber],
                ['User Email', warranty.userEmail],
                ['Warranty Status', warranty.isWarrantyValid ? 'Valid' : 'Expired'],
                ['Created At', new Date(warranty.createdAt).toLocaleString()],
                ['Updated At', new Date(warranty.updatedAt).toLocaleString()],
              ].map(([label, value], index) => (
                <p className="text-lg animate-slide-up" style={{ animationDelay: `${0.6 + 0.1 * index}s` }} key={label}>
                  <strong className="text-blue-300">{label}:</strong>{' '}
                  <span
                    className={`transition-colors ${
                      label === 'Warranty Status'
                        ? warranty.isWarrantyValid
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-red-400 hover:text-red-300'
                        : 'hover:text-blue-400'
                    }`}
                  >
                    {value}
                  </span>
                </p>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-blue-300 mb-4 animate-slide-up">Support Contact</h3>
            <div className="space-y-3">
              {warranty.supportContactInfo?.phone && (
                <p className="text-lg animate-slide-up" style={{ animationDelay: '1.2s' }}>
                  <strong className="text-blue-300">Phone:</strong>{' '}
                  <span className="hover:text-blue-400 transition-colors">{warranty.supportContactInfo.phone}</span>
                </p>
              )}
              {warranty.supportContactInfo?.email && (
                <p className="text-lg animate-slide-up" style={{ animationDelay: '1.3s' }}>
                  <strong className="text-blue-300">Email:</strong>{' '}
                  <span className="hover:text-blue-400 transition-colors">{warranty.supportContactInfo.email}</span>
                </p>
              )}
              {warranty.supportContactInfo?.website && (
                <p className="text-lg animate-slide-up" style={{ animationDelay: '1.4s' }}>
                  <strong className="text-blue-300">Website:</strong>{' '}
                  <a
                    href={warranty.supportContactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors underline"
                  >
                    {warranty.supportContactInfo.website}
                  </a>
                </p>
              )}
            </div>
          </div>

          {warranty.warrantyDocs && (
            <div className="mt-10 flex flex-col items-center gap-6">
              <div className="relative group">
                <img
                  src={warranty.warrantyDocs}
                  alt="Warranty Document"
                  className="w-80 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-blue-500/50"
                />
                <div className="absolute inset-0 border-2 border-blue-500/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              </div>

              <a
                href={warranty.warrantyDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-500 hover:to-purple-500 transition-transform transform hover:scale-105 animate-pulse-button shadow-lg"
              >
                View Warranty Document
              </a>
            </div>
          )}
        </div>
      </Tilt>
    </div>
  );
}

export default WarrantyDetails;