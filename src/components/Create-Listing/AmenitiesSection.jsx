export default function AmenitiesSection({
    amenities,
    selectedAmenities,
    handleAmenityChange
  }) {
    return (
      <div className="bg-gray-50 p-4 rounded-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="flex items-center">
              <input
                type="checkbox"
                id={`amenity-${amenity.id}`}
                checked={selectedAmenities.includes(amenity.id)}
                onChange={() => handleAmenityChange(amenity.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`amenity-${amenity.id}`}
                className="ml-2 block text-sm text-gray-700"
              >
                {amenity.amenity_name}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }