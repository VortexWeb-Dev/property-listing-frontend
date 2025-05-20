import { useState, useContext } from "react";
import { Home } from "lucide-react";
import MainTabContext from "../contexts/TabContext";
import useFetchFormData from "../hooks/useFetchFormData";
import {
  BasicInformationSection,
  PropertyDetailsSection,
  OrganizationDetailsSection,
  PermitNumbersSection,
  DatesSection,
  AmenitiesSection,
  ImageUploadSection,
  FormSubmissionSection,
} from "../components/Create-Listing";

export default function ListingForm() {
  const { setMainTab } = useContext(MainTabContext);
  const [submitResult, setSubmitResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    formData,
    setFormData,
    locations,
    pfLocations,
    bayutLocations,
    developers,
    amenities,
    agents,
    companies,
    userData,
    isLocationDubai,
    isListingRental,
    uploading,
    setUploading,
    currentFile,
    setCurrentFile,
    financialStatuses,
    handleAmenityChange,
    handleFileSelect,
    uploadFile,
    setMainImage,
    removeImage,
  } = useFetchFormData(setMainTab);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title_deed ||
      !formData.pf_location ||
      !formData.bayut_location ||
      !formData.developer_id ||
      formData.photo_urls.length === 0
    ) {
      alert("Please fill all required fields and upload at least one image");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://backend.myemirateshome.com/api/listings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      setSubmitResult({
        success: response.ok,
        message: response.ok
          ? "Listing created successfully!"
          : "Failed to create listing",
      });

      if (response.ok) {
        setFormData({
          title_deed: "",
          title_en: "",
          title_ar: "",
          desc_en: "",
          desc_ar: "",
          reference_no: "",
          property_type: "",
          offering_type: "Sale",
          dtcm_permit_number: "",
          rental_period: "",
          size: "",
          bedrooms: "",
          bathrooms: "",
          furnished: "0",
          developer_id: "",
          pf_location: "",
          bayut_location: "",
          company_id: "",
          agent_id: "",
          financial_status_id: "",
          rera_permit_number: "",
          rera_issue_date: "",
          rera_expiration_date: "",
          contract_expiry_date: "",
          available_from: "",
          status: "1",
          amenities: [],
          photo_urls: [],
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitResult({
        success: false,
        message: "Error submitting form: " + error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Home className="mr-2" /> Create New Property Listing
      </h1>

      {submitResult && (
        <div
          className={`mb-6 p-4 rounded-md ${
            submitResult.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInformationSection
          formData={formData}
          handleChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <PropertyDetailsSection
          formData={formData}
          pfLocations={pfLocations}
          bayutLocations={bayutLocations}
          developers={developers}
          isListingRental={isListingRental}
          handleChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <OrganizationDetailsSection
          formData={formData}
          userData={userData}
          companies={companies}
          agents={agents}
          financialStatuses={financialStatuses}
          handleChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <PermitNumbersSection
          formData={formData}
          isLocationDubai={isLocationDubai}
          handleChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <DatesSection
          formData={formData}
          handleChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <AmenitiesSection
          amenities={amenities}
          selectedAmenities={formData.amenities}
          handleAmenityChange={handleAmenityChange}
        />

        <ImageUploadSection
          formData={formData}
          uploading={uploading}
          currentFile={currentFile}
          handleFileSelect={handleFileSelect}
          setMainImage={setMainImage}
          removeImage={removeImage}
        />

        <FormSubmissionSection
          isSubmitting={isSubmitting}
          photoUrlsLength={formData.photo_urls.length}
        />
      </form>
    </div>
  );
}
