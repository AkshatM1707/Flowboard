import Image from "next/image";
import { Heart, Star } from "lucide-react";

export const EmptyFavorites = () => {
  const handleViewAllBoards = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center p-6 md:p-8">
      <div className="relative mb-6">
        <Image src="/empty-favourites.svg" height={140} width={140} alt="No favorite boards" />
        <div className="absolute -top-2 -right-2 bg-yellow-100 rounded-full p-2">
          <Heart className="h-5 w-5 text-yellow-600" />
        </div>
      </div>
      
      <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-900 mb-2">
        No favorite boards yet!
      </h2>
      
      <p className="text-sm text-gray-600 text-center max-w-md mb-6">
        Mark boards as favorites by clicking the star icon on any board. 
        Your favorite boards will appear here for quick access.
      </p>

      <button
        onClick={handleViewAllBoards}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        <Star className="h-4 w-4" />
        Browse All Boards
      </button>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500 mb-3">How to favorite a board:</p>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded flex items-center gap-1">
            <Star className="h-3 w-3" />
            Click the star icon
          </span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">On any board card</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">Quick access</span>
        </div>
      </div>
    </div>
  );
};
