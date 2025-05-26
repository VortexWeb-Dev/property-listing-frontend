import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Amenities = ({ formData, setField, prevStep }) => {
  const { setValue, getValues, trigger } = useFormContext();

  const selectedAmenities = getValues("selectedAmenities") || [];

  const handleAmenityToggle = (amenity) => {
    const updated = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];

    setValue("selectedAmenities", updated);
    setField("selectedAmenities", updated);
    trigger("selectedAmenities");
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Property Amenities</h2>
        <p className="text-muted-foreground text-sm">
          Select the amenities available at your property.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {formData.amenities.map((amenity) => (
          <Card
            key={amenity}
            className={`cursor-pointer transition-colors ${
              selectedAmenities.includes(amenity)
                ? "border-primary bg-primary/5"
                : ""
            }`}
            onClick={() => handleAmenityToggle(amenity)}
          >
            <CardContent className="p-4 flex items-start space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
                aria-label={amenity}
              />
              <Label
                htmlFor={`amenity-${amenity}`}
                className="cursor-pointer flex-1 text-sm"
              >
                {amenity}
              </Label>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="w-full sm:w-auto"
        >
          Back
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          Submit Listing
        </Button>
      </div>
    </div>
  );
};

export default Amenities;
