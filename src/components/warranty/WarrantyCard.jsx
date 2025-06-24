import { Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaEdit,
  FaTrash,
  FaFileAlt,
} from "react-icons/fa";

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
    <div className="relative p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-.5 backdrop-blur-lg bg-opacity-80 max-w-sm mx-auto">
      <div
        className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
          daysUntilExpiry <= 30
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        } shadow-md`}
      >
        {daysUntilExpiry > 0 ? `${daysUntilExpiry} days left` : `Expired`}
      </div>

      <Link
        to={`/warranty/${warranty._id}`}
        className=" absolute -right-3 px-3 py-1 rounded-lg text-xs font-semibold tracking-wide text-black shadow-md bg-gradient-to-br from-red-100 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-100  transition-colors duration-200

"
      >
        <button className="">View Details</button>
      </Link>

      <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
        {warranty.productName}
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        <span className="font-medium text-gray-800">Brand:</span>{" "}
        {warranty.brandAndModel}
      </p>
      <p className="mt-1 text-sm text-gray-600">
        <span className="font-medium text-gray-800">Serial:</span>{" "}
        <span className="font-mono text-gray-700">{warranty.serialNumber}</span>
      </p>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-800">Purchased:</span>{" "}
          {new Date(warranty.purchaseDate).toLocaleDateString()}
        </p>
        <p>
          <span className="font-medium text-gray-800">Expires:</span>{" "}
          {new Date(warranty.warrantyExpiryDate).toLocaleDateString()}
        </p>
      </div>

      {warranty.warrantyDocs && (
        <a
          href={warranty.warrantyDocs}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-medium"
        >
          <FaFileAlt className="text-blue-600" /> View Warranty Document
        </a>
      )}

      {(support.phone || support.email || support.website) && (
        <div className="mt-5 border-t border-gray-200 pt-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Customer Support
          </h4>
          <div className="mt-2 space-y-2 text-sm text-gray-600">
            {support.phone && (
              <p className="flex items-center gap-2">
                <FaPhone className="text-blue-500" /> {support.phone}
              </p>
            )}
            {support.email && (
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> {support.email}
              </p>
            )}
            {support.website && (
              <p className="flex items-center gap-2">
                <FaGlobe className="text-blue-500" />
                <a
                  href={support.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  {support.website}
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <Link
          to={`/edit/${warranty._id}`}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
        >
          <FaEdit /> Edit
        </Link>
        <button
          onClick={() => onDelete(warranty._id)}
          className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}

export default WarrantyCard;
