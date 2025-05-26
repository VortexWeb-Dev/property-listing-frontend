import { useState, useEffect } from "react";
import getAuthHeaders from "../utils/getAuthHeader";
import { tabs } from "../enums/sidebarTabsEnums";

export default function useFetchFormData(setMainTab) {
  const [formData, setFormData] = useState({
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

  const [locations, setLocations] = useState([]);
  const [pfLocations, setPfLocations] = useState([]);
  const [bayutLocations, setBayutLocations] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [agents, setAgents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [isLocationDubai, setIsLocationDubai] = useState(false);
  const [isListingRental, setIsListingRental] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);

  const financialStatuses = [
    { id: 1, name: "Mortgage Available" },
    { id: 2, name: "Cash Only" },
    { id: 3, name: "Bank Transfer" },
    { id: 4, name: "Payment Plan Available" },
  ];

  useEffect(() => {
    setMainTab(tabs.HIDDEN);
    const fetchData = async () => {
      try {
        // Fetch locations
        const pfResponse = await fetch(
          "https://backend.myemirateshome.com/api/locations?type=pf",
          { headers: getAuthHeaders() }
        );
        const pfData = await pfResponse.json();

        const bayutResponse = await fetch(
          "https://backend.myemirateshome.com/api/locations?type=bayut",
          { headers: getAuthHeaders() }
        );
        const bayutData = await bayutResponse.json();

        setPfLocations(pfData.data);
        setBayutLocations(bayutData.data);
        setLocations([...pfData.data, ...bayutData.data]);

        // Fetch developers
        const devResponse = await fetch(
          "https://backend.myemirateshome.com/api/developers",
          { headers: getAuthHeaders() }
        );
        const devData = await devResponse.json();
        setDevelopers(devData);

        // Fetch amenities
        const amenResponse = await fetch(
          "https://backend.myemirateshome.com/api/amenities",
          { headers: getAuthHeaders() }
        );
        const amenData = await amenResponse.json();
        setAmenities(amenData);

        // Fetch company/agent info
        const infoResponse = await fetch(
          userData.role === "super_admin"
            ? "https://backend.myemirateshome.com/api/listing/create-info"
            : userData.role === "admin"
            ? "https://backend.myemirateshome.com/api/listing/agents"
            : userData.role === "agent"
            ? "https://backend.myemirateshome.com/api/agents/list"
            : userData.role === "owner"
            ? "https://backend.myemirateshome.com/api/agents/list/forowners"
            : "",
          { headers: getAuthHeaders() }
        );
        const infoData = await infoResponse.json();

        if (userData.role === "super_admin") {
          setCompanies(infoData.companies);
        } else {
          formData.company_id = infoData.company_id;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setUserData(JSON.parse(localStorage.getItem("userData")));
    fetchData();
  }, [setMainTab, formData.company_id]);

  useEffect(() => {
    if (formData.company_id) {
      setAgents(
        companies.find((company) => company.id === formData.company_id)
          ?.agents || []
      );
    }
  }, [formData.company_id, companies]);

  useEffect(() => {
    const isDubai = locations
      .some(
        (loc) =>
          loc.id === formData.pf_location || loc.id === formData.bayut_location
      )
      ?.location?.toLowerCase()
      .includes("dubai");
    setIsLocationDubai(!!isDubai);
    setIsListingRental(["RR", "CR"].includes(formData.offering_type));
  }, [
    formData.pf_location,
    formData.bayut_location,
    formData.offering_type,
    locations,
  ]);

  const handleAmenityChange = (amenityId) => {
    const updatedAmenities = formData.amenities.includes(amenityId)
      ? formData.amenities.filter((id) => id !== amenityId)
      : [...formData.amenities, amenityId];
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  const handleFileSelect = async (e) => {
    if (uploading) return;
    const file = e.target.files[0];
    if (!file) return;
    setCurrentFile(file);
    await uploadFile(file);
  };

  const uploadFile = async (file) => {
    try {
      setUploading(true);
      const presignedResponse = await fetch(
        `https://backend.myemirateshome.com/api/s3/presigned-url?fileName=${file.name}&fileType=${file.type}`,
        { headers: getAuthHeaders() }
      );
      const presignedData = await presignedResponse.json();

      await fetch(presignedData.uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      const newPhoto = {
        file_url: presignedData.fileUrl.replace(/ /g, "%20"),
        is_main: formData.photo_urls.length === 0,
      };

      setFormData((prev) => ({
        ...prev,
        photo_urls: [...prev.photo_urls, newPhoto],
      }));
      setCurrentFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const setMainImage = (index) => {
    const updatedPhotos = formData.photo_urls.map((photo, i) => ({
      ...photo,
      is_main: i === index,
    }));
    setFormData({ ...formData, photo_urls: updatedPhotos });
  };

  const removeImage = (index) => {
    const updatedPhotos = formData.photo_urls.filter((_, i) => i !== index);
    if (updatedPhotos.length > 0 && !updatedPhotos.some((p) => p.is_main)) {
      updatedPhotos[0].is_main = true;
    }
    setFormData({ ...formData, photo_urls: updatedPhotos });
  };

  return {
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
  };
}
