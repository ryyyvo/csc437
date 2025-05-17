import { useRef } from 'react';

function Modal(props) {
  const modalContentRef = useRef(null);   
  if (!props.isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
      props.onCloseRequested();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: 'rgba(31, 41, 55, 0.25)' }}
      onClick={handleOverlayClick} 
    >
      <div 
        ref={modalContentRef} 
        className="bg-white p-6 rounded-lg shadow-xl"
      >
        <header className="flex justify-between items-center mb-4 pb-2">
          <h2 className="text-lg font-semibold">{props.headerLabel}</h2>
          <button 
            className="text-gray-500 hover:text-gray-800 font-bold px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close"
            onClick={props.onCloseRequested}
          >
            X
          </button>
        </header>
        <div className="mt-2">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;