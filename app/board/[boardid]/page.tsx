import Canvas from "./_components/canvas";
import { Room } from "@/app/room"

interface BoardIdPageProps {
    params: {
        boardid: string ;
    } ;
};

const BoardIdPage = ({params}: BoardIdPageProps) => {
    return ( 
        <Room roomId={params.boardid} fallback={<div>Loading…</div>}>
            <Canvas boardId={params.boardid} />
        </Room>
    );
};

export default BoardIdPage ;