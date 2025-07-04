import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Search, RefreshCw } from "lucide-react";

export const EmptySearch = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleClearSearch = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center p-6 md:p-8">
      <div className="relative mb-6">
        <Image src="/empty-search.svg" height={140} width={140} alt="No search results" />
        <div className="absolute -top-2 -right-2 bg-blue-100 rounded-full p-2">
          <Search className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      
      <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-900 mb-2">
        No results found
      </h2>
      
      <p className="text-sm text-gray-600 text-center max-w-md mb-6">
        {search ? (
          <>
            No boards found matching <span className="font-medium">"{search}"</span>. 
            Try a different search term or check your spelling.
          </>
        ) : (
          "Try searching for something else or browse all boards."
        )}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <button
          onClick={handleClearSearch}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          <RefreshCw className="h-4 w-4" />
          View All Boards
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500 mb-3">Search tips:</p>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">Try board names</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">Check spelling</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">Use fewer words</span>
        </div>
      </div>
    </div>
  );
};
