import { TimePeriodEnum } from "../../enums/createListingsEnums";

export default function PropertyDetailsSection({
  formData,
  pfLocations,
  bayutLocations,
  developers,
  isListingRental,
  handleChange
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Property Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size (sq.ft)
          </label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bathrooms
          </label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Furnished
          </label>
          <select
            name="furnished"
            value={formData.furnished}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PropertyFinder Location *
          </label>
          <select
            name="pf_location"
            value={formData.pf_location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Location</option>
            {pfLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bayut Location *
          </label>
          <select
            name="bayut_location"
            value={formData.bayut_location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Location</option>
            {bayutLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Developer *
          </label>
          <select
            name="developer_id"
            value={formData.developer_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Developer</option>
            {developers.map((dev) => (
              <option key={dev.id} value={dev.id}>
                {dev.name} ({dev.email})
              </option>
            ))}
          </select>
        </div>

        {isListingRental && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rental Period *
            </label>
            <select
              name="rental_period"
              value={formData.rental_period}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Period</option>
              {TimePeriodEnum.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}