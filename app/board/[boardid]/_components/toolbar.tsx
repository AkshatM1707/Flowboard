export const Toolbar = () => {
    return (
        <div className="fixed top-1/2 left-4 transform -translate-y-1/2 flex flex-col gap-y-4">
            <div className="bg-white rounded-lg p-2 flex gap-y-2 flex-col items-center shadow-lg">
                <button className="p-2 rounded-md hover:bg-gray-100">🖊️ Pencil</button>
                <button className="p-2 rounded-md hover:bg-gray-100">⬛ Square</button>
                <button className="p-2 rounded-md hover:bg-gray-100">⚫ Circle</button>
                <button className="p-2 rounded-md hover:bg-gray-100">⭕ Ellipse</button>
            </div>
            <div className ="bg-white rounded-md p-1,5 flex flex-col items-center shadow-md">
                <div>
                    Undo
                </div>
                <div>
                    Redo
                </div>

            </div>
        </div>
    );
};
