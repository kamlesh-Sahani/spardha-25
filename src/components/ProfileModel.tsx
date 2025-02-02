"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Importing ShadCN dialog components
import { cn } from "@/lib/utils"; // Assuming you have a utility for conditional classnames
import { X } from "lucide-react"; // Using X for the close button icon

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
    <Dialog open onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* Trigger can be anything that opens the modal, e.g., a button */}
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-800 mb-4">Enter Password</DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mb-6">
              Please enter your password to proceed.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg shadow-md focus:outline-none mb-6"
              placeholder="Enter your password"
            />
            
            <DialogFooter>
              <DialogClose asChild>
                <button
                  type="button"
                  className="bg-gray-300 text-black py-2 px-6 rounded-md font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
            </DialogFooter>
          </form>
          
          <DialogClose asChild>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Modal;
