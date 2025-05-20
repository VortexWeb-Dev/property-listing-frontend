import { Calendar } from "lucide-react";

export default function DatesSection({ formData, handleChange }) {
    const dateFields = [
      { name: "rera_issue_date", label: "RERA Permit Issue Date" },
      { name: "rera_expiration_date", label: "RERA Expiration Date" },
      { name: "contract_expiry_date", label: "Contract Expiry Date" },
      { name: "available_from", label: "Available From" }
    ];
  
    return (
      <div className="bg-gray-50 p-4 rounded-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5" /> Important Dates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dateFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="date"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }