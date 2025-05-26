import React from "react";
import { useCreateListingData } from "@/hooks/useCreateListingData";
import PropertyDetails from "../components/Create-Listing/PropertyDetails";
import ProgressBar from "../components/Create-Listing/ProgressBar";

const CreateListing = () => {
  const { formData, setField, currentStep, nextStep, prevStep, steps } =
    useCreateListingData();

  // Render the current step component
  const renderCurrentStep = () => {
    const props = {
      formData,
      setField,
      nextStep,
      prevStep,
    };

    switch (currentStep) {
      case 0:
        return <PropertyDetails {...props} />;
      // Future steps will be added here (Media, Location, Publishing, etc.)
      default:
        return <PropertyDetails {...props} />;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Don't do anything here, each section handles its own navigation
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Create Property Listing</h1>

      <ProgressBar steps={steps} currentStep={currentStep} />

      <div className="mt-8">
        <form onSubmit={handleFormSubmit}>{renderCurrentStep()}</form>
      </div>
    </div>
  );
};

export default CreateListing;
