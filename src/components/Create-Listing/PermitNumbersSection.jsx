export default function PermitNumbersSection({
    formData,
    isLocationDubai,
    handleChange
  }) {
    return (
      <div className="bg-gray-50 p-4 rounded-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Permit Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RERA Permit No. {isLocationDubai && "(MANDATORY FOR DUBAI)"} *
            </label>
            <input
              type="text"
              name="rera_permit_number"
              value={formData.rera_permit_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required={isLocationDubai}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              DTCM No.*
            </label>
            <input
              type="text"
              name="dtcm_permit_number"
              value={formData.dtcm_permit_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>
    );
  }