function Modal({ videoKey, onClose }) {
  if (!videoKey) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <iframe
        onClick={(e) => e.stopPropagation()}
        width="800"
        height="450"
        src={`https://www.youtube.com/embed/${videoKey}`}
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    </div>
  );
}

export default Modal;