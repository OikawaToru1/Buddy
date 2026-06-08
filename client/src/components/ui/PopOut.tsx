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
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 animate-fade-in"
            onClick={handleBackgroundClick}
          >
            <div
              className="bg-slate-900 border border-slate-800 text-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative transform transition-all scale-100 animate-scale-in"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
            >
              {/* Top accent bar for visual error cue */}
              <div className="h-1.5 bg-red-500 w-full" />

              <div className="p-6">
                {/* Close 'X' Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 hover:bg-slate-800 p-1.5 rounded-lg transition-colors"
                  aria-label="Close error message"
                >
                  &times;
                </button>

                {/* Header with Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-red-500 mt-0.5">
                    {/* Simple SVG Alert Icon */}
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-100 tracking-wide pt-0.5">
                    {title || "An Error Occurred"}
                  </h2>
                </div>

                {/* Content Body */}
                <div className="text-sm text-slate-300 leading-relaxed pl-9 mb-6">
                  {content}
                </div>

                {/* Bottom Action Button */}
                <div className="flex justify-end pl-9">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors w-full sm:w-auto"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
}