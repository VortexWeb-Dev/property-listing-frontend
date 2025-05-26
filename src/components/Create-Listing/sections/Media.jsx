import React, { useState, useRef } from 'react';
import { Upload, X, Camera } from 'lucide-react';

const MediaUpload = ({ listing = {} }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [listingData, setListingData] = useState({
    photo_urls: [],
    video_tour_url: '',
    view_360_url: '',
    qr_code_property_booster: '',
    qr_code_image_websites: '',
    ...listing
  });
  
  const fileInputRef = useRef(null);
  const PRESIGN_URL = 'https://backend.myemirateshome.com/api/s3/presigned-url'; // Sample presign URL

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    for (const file of imageFiles) {
      await uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    try {
      setUploadingFiles(prev => [...prev, file.name]);

      // Step 1: Get presigned URL
      const presignResponse = await fetch(PRESIGN_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type
        })
      });

      const { uploadUrl, fileUrl } = await presignResponse.json();

      // Step 2: Upload file to presigned URL
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      // Step 3: Add to photo_urls
      setListingData(prev => ({
        ...prev,
        photo_urls: [...prev.photo_urls, fileUrl]
      }));

    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploadingFiles(prev => prev.filter(name => name !== file.name));
    }
  };

  const removePhoto = (index) => {
    setListingData(prev => ({
      ...prev,
      photo_urls: prev.photo_urls.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (field, value) => {
    setListingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Save clicked');
  };

  const handleContinue = () => {
    console.log('Listing data:', listingData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Photo Upload Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Camera className="mr-2" size={20} />
          Add Photos
          <span className="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
            {listingData.photo_urls.length}
          </span>
        </h2>

        {/* Drag and Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600 mb-2">Drop files here or click to upload</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Photo Previews */}
        {listingData.photo_urls.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {listingData.photo_urls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Property ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Uploading Indicators */}
        {uploadingFiles.length > 0 && (
          <div className="mt-4">
            {uploadingFiles.map((fileName, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-3"></div>
                <span className="text-sm text-gray-600">Uploading {fileName}...</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* URL Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Tour URL
          </label>
          <input
            type="url"
            value={listingData.video_tour_url}
            onChange={(e) => handleInputChange('video_tour_url', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            View 360 URL
          </label>
          <input
            type="url"
            value={listingData.view_360_url}
            onChange={(e) => handleInputChange('view_360_url', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            QR Code (Property Booster)
          </label>
          <input
            type="text"
            value={listingData.qr_code_property_booster}
            onChange={(e) => handleInputChange('qr_code_property_booster', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter QR code data"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            QR Code Image (Websites)
          </label>
          <input
            type="text"
            value={listingData.qr_code_image_websites}
            onChange={(e) => handleInputChange('qr_code_image_websites', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter QR code data"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Save
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MediaUpload;