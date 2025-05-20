import { Loader } from "lucide-react";

export default function FormSubmissionSection({ isSubmitting, photoUrlsLength }) {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={isSubmitting || photoUrlsLength === 0}
        className={`px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center ${
          isSubmitting || photoUrlsLength === 0
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader className="animate-spin h-5 w-5 mr-2" />
            Submitting...
          </>
        ) : (
          "Create Listing"
        )}
      </button>
    </div>
  );
}