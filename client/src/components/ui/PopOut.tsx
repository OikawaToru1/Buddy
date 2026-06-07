import {useState} from "react";

interface PopOutProps {
    title: string;
    content: React.ReactNode;
    onClose: () => void;
}

export default function PopOut({ title, content, onClose }: PopOutProps) {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    setTimeout(() => {
        handleClose();
    }, 4000);
    
    return (
        <>
        {isOpen && (
            <div className=" absolute right-0 top-4 flex items-center justify-center bg-black/50 z-50" onClick={handleBackgroundClick}>
                <div className="bg-gray-800 text-white rounded-lg p-6 w-96 relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                    >
                        &times;
                    </button>
                    <h2 className="text-xl text-red-500 font-bold mb-4">{title}</h2>
                    <div className="text-gray-300">{content}</div>
                </div>
            </div>
        )}
        </>
    );
}