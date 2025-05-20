import { Upload, Loader, X, Check, Info } from "lucide-react";

export default function ImageUploadSection({
  formData,
  uploading,
  currentFile,
  handleFileSelect,
  setMainImage,
  removeImage
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
        <Upload className="mr-2 h-5 w-5" /> Property Images *
      </h2>

      <div className="mb-4">
        <div className="flex items-center justify-center w-full">
          <label
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              disabled={uploading}
              accept="image/*"
            />
          </label>
        </div>

        {uploading && (
          <div className="mt-2 flex items-center justify-center">
            <Loader className="animate-spin h-5 w-5 mr-2 text-blue-500" />
            <span className="text-sm text-gray-600">
              Uploading {currentFile?.name}...
            </span>
          </div>
        )}
      </div>

      {formData.photo_urls.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.photo_urls.map((photo, index) => (
              <div
                key={index}
                className="relative border rounded-md overflow-hidden"
              >
                <img
                  src={photo.file_url}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="mt-auto flex items-center">
                    <label className="flex items-center space-x-1 text-white cursor-pointer">
                      <input
                        type="radio"
                        name="main_image"
                        checked={photo.is_main}
                        onChange={() => setMainImage(index)}
                        className="h-3 w-3"
                      />
                      <span className="text-xs">Main image</span>
                    </label>
                    {photo.is_main && (
                      <span className="ml-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                        <Check className="h-3 w-3 inline" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.photo_urls.length === 0 && (
        <div className="flex items-center text-amber-600 text-sm mt-2">
          <Info className="h-4 w-4 mr-1" />
          At least one image is required. The first image will be set as main.
        </div>
      )}
    </div>
  );
}