"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { EmptyBoards } from "./empty-boards";
import {useQuery} from "convex/react" ;
import { api } from "@/convex/_generated/api";
interface BoardListProps {
  orgId: string;
}

export const BoardList = ({ orgId }: BoardListProps) => {
  const searchParams = useSearchParams(); // Get search params safely in client components

  const search = useMemo(() => searchParams.get("search"), [searchParams]);
  const favorites = useMemo(() => searchParams.get("favorites"), [searchParams]);
  

  const data = useQuery(api.boards.get, {orgId}); 

  if(data ==undefined)
  {
    return (
      <div> 
        Loading ......
      </div>
    )
  }

  if (!data?.length && search) {
    return <EmptySearch />;
  }

  if (!data?.length && favorites) {
    return <EmptyFavorites />;
  }

  if (!data.length) {
    return <EmptyBoards />;
  }

  return (
  <div>
    <h2>
Team Boards 
      </h2>  
    
  </div>
    
  
  )
};
