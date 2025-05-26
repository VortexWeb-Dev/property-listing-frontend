import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form as FormProvider } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Import all section components
import {
  Specifications,
  Management,
  PermitDetails,
  Pricing,
  Description,
  Amenities,
} from "./sections";

const PropertyDetails = ({ formData, setField, nextStep, prevStep }) => {
  const form = useForm({
    defaultValues: formData,
  });

  const [activeSection, setActiveSection] = useState("specifications");

  const sections = [
    { id: "specifications", label: "Specifications" },
    { id: "management", label: "Management" },
    { id: "permits", label: "Permit Details" },
    { id: "pricing", label: "Pricing" },
    { id: "description", label: "Description" },
    { id: "amenities", label: "Amenities" },
  ];

  const handleSectionChange = (value) => {
    setActiveSection(value);
  };

  const sectionProps = {
    formData,
    setField,
    nextStep: () => {
      const currentIndex = sections.findIndex((s) => s.id === activeSection);
      if (currentIndex < sections.length - 1) {
        setActiveSection(sections[currentIndex + 1].id);
      } else {
        nextStep();
      }
    },
    prevStep: () => {
      const currentIndex = sections.findIndex((s) => s.id === activeSection);
      if (currentIndex > 0) {
        setActiveSection(sections[currentIndex - 1].id);
      } else {
        prevStep();
      }
    },
  };

  return (
    <FormProvider {...form}>
      {/* native form to wire up handleSubmit */}
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(() => sectionProps.nextStep())}
      >
        <div className="border-b pb-4">
          <h2 className="text-2xl font-semibold">Property Details</h2>
          <p className="text-muted-foreground text-sm">
            Complete all sections to continue to the next step.
          </p>
        </div>

        <Tabs value={activeSection} onValueChange={handleSectionChange}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
            {sections.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="specifications">
            <Specifications {...sectionProps} />
          </TabsContent>
          <TabsContent value="management">
            <Management {...sectionProps} />
          </TabsContent>
          <TabsContent value="permits">
            <PermitDetails {...sectionProps} isDubai={true} />
          </TabsContent>
          <TabsContent value="pricing">
            <Pricing {...sectionProps} />
          </TabsContent>
          <TabsContent value="description">
            <Description {...sectionProps} />
          </TabsContent>
          <TabsContent value="amenities">
            <Amenities {...sectionProps} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Continue to Next Step
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PropertyDetails;
