// src/hooks/useCreateListingData.jsx
import { useState, useEffect, useCallback } from "react";

export function useCreateListingData() {
  // 1) Define the wizard steps
  const steps = [
    { id: 0, name: "Property Details", shortName: "Details" },
    { id: 1, name: "Media", shortName: "Media" },
    { id: 2, name: "Location", shortName: "Location" },
    { id: 3, name: "Publishing", shortName: "Publish" },
    { id: 4, name: "Notes", shortName: "Notes" },
    { id: 5, name: "Documents", shortName: "Docs" },
    { id: 6, name: "Publishing Status", shortName: "Status" },
    { id: 7, name: "Preview", shortName: "Preview" },
  ];

  // 2) Load draft from localStorage if exists
  const draft = JSON.parse(localStorage.getItem("draftListing") || "{}");

  // 3) Master formData state (all fields across all sections)
  const [formData, setFormData] = useState({
    // Specifications
    offeringType: "",
    titleDeed: "",
    propertyType: "",
    size: "",
    unitNo: "",
    bedrooms: "",
    bathrooms: "",
    parkingSpaces: "",
    isFurnished: false,
    totalPlotSize: "",
    lotSize: "",
    builtUpArea: "",
    layoutType: "",
    ownership: "",
    developer: "",
    // Management
    referenceNumber: "",
    listingAgent: "",
    perPortalAgents: {
      pf: "",
      bayut: "",
      website: "",
    },
    listingOwner: "",
    landlordName: "",
    landlordEmail: "",
    landlordContact: "",
    availableFrom: "",
    // PermitDetails
    reraPermitNumber: "",
    reraIssueDate: "",
    reraExpirationDate: "",
    dtcmPermitNumber: "",
    // Pricing
    price: "",
    hidePrice: false,
    paymentMethod: "",
    downPayment: "",
    numberOfCheques: "",
    serviceCharges: "",
    financialStatus: "",
    rentFrequency: "",
    rentAmount: "",
    // Description
    titleEn: "",
    descriptionEn: "",
    titleAr: "",
    descriptionAr: "",
    // Amenities
    amenities: [],
    // ... you can add any other fields you’ll use

    // Option lists (populated from APIs)
    developers: [],
    agents: [],
    owners: [],
    amenitiesList: [],

    // Merge in any draft values
    ...(draft.formData || {}),
  });

  // 4) Track current step index
  const [currentStep, setCurrentStep] = useState(
    typeof draft.currentStep === "number" ? draft.currentStep : 0
  );

  // 5) Fetch dropdown data once on mount
  useEffect(() => {
    async function loadOptions() {
      try {
        const [devRes, agentRes, ownerRes, amenRes] = await Promise.all([
          fetch("/api/developers"),
          fetch("/api/agents/list"),
          fetch("/api/owners"),
          fetch("/api/amenities"),
        ]);
        const [devData, agentData, ownerData, amenData] = await Promise.all([
          devRes.json(),
          agentRes.json(),
          ownerRes.json(),
          amenRes.json(),
        ]);

        setFormData((f) => ({
          ...f,
          developers: devData, // expect array of { id, name }
          agents: agentData, // expect array of { id, name }
          owners: ownerData, // expect array of { id, name }
          amenitiesList: amenData, // expect array of { id, amenity_name }
        }));
      } catch (err) {
        console.error("Failed to load select options", err);
      }
    }
    loadOptions();
  }, []);

  // 6) Persist draft to localStorage on every change
  useEffect(() => {
    localStorage.setItem(
      "draftListing",
      JSON.stringify({ formData, currentStep })
    );
  }, [formData, currentStep]);

  // 7) Helpers to update a single field
  const setField = useCallback((name, value) => {
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
  }, []);

  // 8) Navigation
  const nextStep = useCallback(() => {
    setCurrentStep((i) => Math.min(i + 1, steps.length - 1));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setCurrentStep((i) => Math.max(i - 1, 0));
  }, []);

  return {
    formData,
    setField,
    currentStep,
    nextStep,
    prevStep,
    steps,
  };
}
