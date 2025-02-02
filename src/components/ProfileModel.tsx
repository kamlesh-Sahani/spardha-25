import React from "react";

interface ModalProps {
  onClose: () => void;
  onSubmit: (pass: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onSubmit }) => {
  const [password, setPassword] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-4 border border-gray-300 rounded h-[45px] text-lg shadow-md focus:outline-none mb-4"
            placeholder="Enter your password"
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-800 text-white w-[120px] h-[40px] rounded font-semibold text-lg transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white w-[120px] h-[40px] rounded font-semibold text-lg transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
