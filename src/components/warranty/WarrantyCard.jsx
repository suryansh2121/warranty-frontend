import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaGlobe, FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";

function WarrantyCard({ warranty, onDelete }) {
  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilExpiry = getDaysUntilExpiry(warranty.warrantyExpiryDate);

  const support = warranty.supportContactInfo || {};

  return (
    <div className="p-6 border rounded-2xl shadow-xl bg-white/90 backdrop-blur-md transition hover:shadow-2xl space-y-3">
      <h3 className="text-2xl font-bold text-gray-800">{warranty.productName}</h3>
      <p className="text-gray-700">Brand: <span className="font-medium">{warranty.brandAndModel}</span></p>
      <p className="text-gray-700">Serial: <span className="font-mono">{warranty.serialNumber}</span></p>
      <p className="text-gray-700">
        Purchase Date: {new Date(warranty.purchaseDate).toLocaleDateString()}
      </p>
      <p className="text-gray-700">
        Expiry Date: {new Date(warranty.warrantyExpiryDate).toLocaleDateString()}
      </p>
      <p
        className={`font-semibold ${
          daysUntilExpiry <= 30 ? "text-red-600" : "text-green-600"
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
          className="flex items-center gap-2 text-blue-600 hover:underline mt-2"
        >
          <FaFileAlt /> View Warranty Document
        </a>
      )}

      {(support.phone || support.email || support.website) && (
        <div className="mt-4 border-t pt-3 text-sm text-gray-700 space-y-1">
          <h4 className="font-semibold text-gray-800">Customer Support:</h4>
          {support.phone && (
            <p className="flex items-center gap-2">
              <FaPhone className="text-yellow-500" /> {support.phone}
            </p>
          )}
          {support.email && (
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-500" /> {support.email}
            </p>
          )}
          {support.website && (
            <p className="flex items-center gap-2">
              <FaGlobe className="text-yellow-500" />
              <a
                href={support.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {support.website}
              </a>
            </p>
          )}
        </div>
      )}

 
      <div className="mt-4 flex space-x-6 text-sm font-medium">
        <Link
          to={`/edit/${warranty._id}`}
          className="flex items-center gap-1 text-blue-600 hover:underline"
        >
          <FaEdit /> Edit
        </Link>
        <button
          onClick={() => onDelete(warranty._id)}
          className="flex items-center gap-1 text-red-600 hover:underline"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}

export default WarrantyCard;
