import { StatusEnum } from "../../enums/createListingsEnums";

export default function OrganizationDetailsSection({
  formData,
  userData,
  companies,
  agents,
  financialStatuses,
  handleChange
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Organization Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userData?.role === "super_admin" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <select
              name="company_id"
              value={formData.company_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Agent
          </label>
          <select
            name="agent_id"
            value={formData.agent_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            disabled={formData.company_id === "" && userData?.role === "super_admin"}
          >
            <option value="">Select Agent</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Financial Status
          </label>
          <select
            name="financial_status_id"
            value={formData.financial_status_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Financial Status</option>
            {financialStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Status</option>
            {StatusEnum.map((type) => (
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