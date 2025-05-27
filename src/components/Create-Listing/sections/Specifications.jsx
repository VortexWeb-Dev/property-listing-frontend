import React, { useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  PropertyTypeEnum,
  OfferingTypeEnum,
} from "../../../enums/createListingsEnums";

const Specifications = ({ formData, setField }) => {
  // Grab the shared form context provided in PropertyDetails.jsx
  const { control, setValue, getValues, trigger } = useFormContext();

  // (Optional) you can run a validity check here if you want to disable/enable buttons
  useEffect(() => {
    const required = [
      "offeringType",
      "titleDeed",
      "propertyType",
      "size",
      "developer",
    ];
    const allFilled = required.every((name) => {
      const v = getValues(name);
      return v !== undefined && v !== "";
    });
    // e.g. you could call a callback prop here to enable the parent "Continue" button
    // setCanContinue(allFilled);
  }, [getValues, formData]);

  // Central handler to update both RHF state and your own formData
  const handleChange = (name, value) => {
    setValue(name, value);
    setField(name, value);
    trigger(name);
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Specifications</h2>
        <p className="text-muted-foreground text-sm">
          Enter the basic details about your property.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
        {/* Offering Type */}
        <FormField
          control={control}
          name="offeringType"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>
                Offering Type <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex flex-col gap-2"
                  value={field.value}
                  onValueChange={(val) => handleChange("offeringType", val)}
                >
                  {OfferingTypeEnum.map(({ value, name }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem id={value} value={value} />
                      <Label htmlFor={value} className="cursor-pointer">
                        {name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title Deed */}
        <FormField
          control={control}
          name="titleDeed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title Deed <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter title deed number"
                  value={field.value}
                  onChange={(e) => handleChange("titleDeed", e.target.value)}
                  onBlur={() => trigger("titleDeed")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Property Type */}
        <FormField
          control={control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Property Type <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={(val) => handleChange("propertyType", val)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PropertyTypeEnum.map(({ value, name }) => (
                    <SelectItem key={value} value={value}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Size (sq.ft) */}
        <FormField
          control={control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Size (sq.ft) <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter size in sq.ft"
                  value={field.value}
                  onChange={(e) => handleChange("size", e.target.value)}
                  onBlur={() => trigger("size")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Unit No */}
        <FormField
          control={control}
          name="unitNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit No</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter unit number"
                  value={field.value}
                  onChange={(e) => handleChange("unitNo", e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Bedrooms */}
        <FormField
          control={control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Number of bedrooms"
                  value={field.value}
                  onChange={(e) => handleChange("bedrooms", e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Bathrooms */}
        <FormField
          control={control}
          name="bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bathrooms</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Number of bathrooms"
                  value={field.value}
                  onChange={(e) => handleChange("bathrooms", e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Parking Spaces */}
        <FormField
          control={control}
          name="parkingSpaces"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parking Spaces</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Number of parking spaces"
                  value={field.value}
                  onChange={(e) =>
                    handleChange("parkingSpaces", e.target.value)
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Furnished */}
        <FormField
          control={control}
          name="isFurnished"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Furnished</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      handleChange("isFurnished", checked)
                    }
                  />
                  <span className="text-sm">{field.value ? "Yes" : "No"}</span>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Total Plot Size */}
        <FormField
          control={control}
          name="totalPlotSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Plot Size (sq.ft)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter total plot size"
                  value={field.value}
                  onChange={(e) =>
                    handleChange("totalPlotSize", e.target.value)
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Lot Size */}
        <FormField
          control={control}
          name="lotSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lot Size (sq.ft)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter lot size"
                  value={field.value}
                  onChange={(e) => handleChange("lotSize", e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Built-up Area */}
        <FormField
          control={control}
          name="builtUpArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Built-up Area (sq.ft)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter built-up area"
                  value={field.value}
                  onChange={(e) => handleChange("builtUpArea", e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Layout Type */}
        <FormField
          control={control}
          name="layoutType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Layout Type</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter layout type"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("layoutType", e.target.value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Ownership */}
        <FormField
          control={control}
          name="ownership"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ownership</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter ownership type"
                  value={field.value}
                  onChange={(e) => handleChange("ownership", e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Developer */}
        <FormField
          control={control}
          name="developer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Developer <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={(val) => handleChange("developer", val)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select developer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {formData.developers.map((dev) => (
                    <SelectItem key={dev.id} value={String(dev.id)}>
                      {dev.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Specifications;
