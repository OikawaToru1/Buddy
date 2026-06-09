import ReactDom from "react-dom";

function Portal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            It will be implemented soon , <span className="text-blue-500 text-sm" >(maybe if i have the energy later)</span>
          </h2>
          <p className="mb-4">Click the button to close the modal.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal") as HTMLElement,
  );
}

export default Portal;
