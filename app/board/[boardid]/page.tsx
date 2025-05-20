import Canvas from "./_components/canvas";
import { Room } from "@/app/room"
import { Loading } from "./_components/loading";



interface BoardIdPageProps {
    params: {
        boardid: string ;
    } ;
};

export default async function BoardPage({ params }) {
    const { boardid } = await params; // Await the params
  
    return ( 
      <Room roomId={boardid} fallback={<Loading />}>
        <Canvas boardId={boardid} />
      </Room>
    );
  }