import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const Management = ({ formData, setField }) => {
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const { control, setValue, getValues, trigger } = useFormContext();

  const handleChange = (name, value) => {
    // store all IDs as strings
    setValue(name, value);
    setField(name, value);
    trigger(name);

    // when a super_admin picks a company, update agents
    if (name === "company" && user.role === "super_admin") {
      // find by string comparison
      const selectedCompany = formData.companies.find(
        (c) => String(c.id) === value
      );
      const agentsForCompany = selectedCompany?.agents || [];
      // reset agent field
      setValue("listingAgent", "");
      setField("listingAgent", "");
      // store new list of agents (objects) in formData.agents
      setField("agents", agentsForCompany);
      setValue("agents", agentsForCompany);
    }
  };

  const agents = formData.agents || [];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Management</h2>
        <p className="text-muted-foreground text-sm">
          Enter management and contact details for your property.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
        {/* Reference Number */}
        <FormField
          control={control}
          name="referenceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Reference Number <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter reference number"
                  value={field.value}
                  onChange={(e) =>
                    handleChange("referenceNumber", e.target.value)
                  }
                  onBlur={() => trigger("referenceNumber")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Super-admin only: Company */}
        {user.role === "super_admin" && (
          <FormField
            control={control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(val) => handleChange("company", val)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {formData.companies.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Listing Agent */}
        <FormField
          control={control}
          name="listingAgent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Listing Agent <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={(val) => handleChange("listingAgent", val)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select listing agent" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={String(agent.id)}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Use Different Agents Toggle */}
        <FormField
          control={control}
          name="useDifferentAgents"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between col-span-full">
              <FormLabel>Use different agents per portal?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    handleChange("useDifferentAgents", checked)
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Conditional Agent Fields */}
        {getValues("useDifferentAgents") && (
          <>
            {/* PF Agent */}
            <FormField
              control={control}
              name="pfAgent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PF Agent</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(val) => handleChange("pfAgent", val)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select PF agent" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formData.agents.map((agent) => (
                        <SelectItem key={agent} value={agent}>
                          {agent}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Bayut Agent */}
            <FormField
              control={control}
              name="bayutAgent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bayut Agent</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(val) => handleChange("bayutAgent", val)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Bayut agent" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formData.agents.map((agent) => (
                        <SelectItem key={agent} value={agent}>
                          {agent}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Website Agent */}
            <FormField
              control={control}
              name="websiteAgent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Agent</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(val) => handleChange("websiteAgent", val)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select website agent" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formData.agents.map((agent) => (
                        <SelectItem key={agent} value={agent}>
                          {agent}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </>
        )}

        {/* Listing Owner */}
        <FormField
          control={control}
          name="listingOwner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Listing Owner <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={(val) => handleChange("listingOwner", val)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select listing owner" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {formData.owners.map((owner) => (
                    <SelectItem key={owner.id} value={String(owner.id)}>
                      {owner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Landlord Name */}
        <FormField
          control={control}
          name="landlordName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landlord Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter landlord name"
                  value={field.value}
                  onChange={(e) => handleChange("landlordName", e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Landlord Email */}
        <FormField
          control={control}
          name="landlordEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landlord Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter landlord email"
                  value={field.value}
                  onChange={(e) =>
                    handleChange("landlordEmail", e.target.value)
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Landlord Contact */}
        <FormField
          control={control}
          name="landlordContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landlord Contact</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Enter landlord contact number"
                  value={field.value}
                  onChange={(e) =>
                    handleChange("landlordContact", e.target.value)
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Available From */}
        <FormField
          control={control}
          name="availableFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Available From <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value}
                  onChange={(e) =>
                    handleChange("availableFrom", e.target.value)
                  }
                  onBlur={() => trigger("availableFrom")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Management;
