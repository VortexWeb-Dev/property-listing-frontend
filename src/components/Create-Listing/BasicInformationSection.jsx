import { PropertyTypeEnum, OfferingTypeEnum } from "../../enums/createListingsEnums";

export default function BasicInformationSection({ formData, handleChange }) {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title Deed *
          </label>
          <input
            type="text"
            name="title_deed"
            value={formData.title_deed}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reference Number *
          </label>
          <input
            type="text"
            name="reference_no"
            value={formData.reference_no}
            onChange={handleChange}
            placeholder="REF-2025-001"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title Arabic
          </label>
          <input
            type="text"
            name="title_ar"
            value={formData.title_ar}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title English *
          </label>
          <input
            type="text"
            name="title_en"
            value={formData.title_en}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Arabic)
          </label>
          <textarea
            name="desc_ar"
            value={formData.desc_ar}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description English*
          </label>
          <textarea
            name="desc_en"
            value={formData.desc_en}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type *
          </label>
          <select
            name="property_type"
            value={formData.property_type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Property Type</option>
            {PropertyTypeEnum.map((type) => (
              <option key={type.value} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Offering Type
          </label>
          <select
            name="offering_type"
            value={formData.offering_type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Offering Type</option>
            {OfferingTypeEnum.map((type) => (
              <option key={type.value} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}