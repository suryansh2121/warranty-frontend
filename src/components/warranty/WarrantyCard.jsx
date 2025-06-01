import { Link } from 'react-router-dom';

function WarrantyCard({ warranty, onDelete }) {
  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilExpiry = getDaysUntilExpiry(warranty.warrantyExpiryDate);

  return (
    <div className="p-5 border rounded-lg shadow-md bg-white hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800">{warranty.productName}</h3>
      <p className="text-gray-600">Brand: {warranty.brandAndModel}</p>
      <p className="text-gray-600">Serial: {warranty.serialNumber}</p>
      <p className="text-gray-600">
        Purchase Date: {new Date(warranty.purchaseDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600">
        Expiry Date: {new Date(warranty.warrantyExpiryDate).toLocaleDateString()}
      </p>
      <p
        className={`font-semibold ${
          daysUntilExpiry <= 30 ? 'text-red-500' : 'text-green-500'
        }`}
      >
        {daysUntilExpiry > 0
          ? `Expires in ${daysUntilExpiry} days`
          : `Expired ${Math.abs(daysUntilExpiry)} days ago`}
      </p>
      {warranty.warrantyDocs && (
        <a
          href={warranty.warrantyDocs}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline block mt-2"
        >
          View Document
        </a>
      )}
      <div className="mt-4 flex space-x-3">
        <Link
          to={`/edit/${warranty._id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(warranty._id)}
          className="text-red-600 hover:underline font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default WarrantyCard;