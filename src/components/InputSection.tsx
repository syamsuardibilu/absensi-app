"use client";

import React, { useState, useEffect } from "react";

interface InputSectionProps {
  label: string;
  onValidationChange: (isValid: boolean) => void;
}

export default function InputSection({ label, onValidationChange }: InputSectionProps) {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  const handleCheck = () => {
    // Simple validation: textarea not empty
    if (text.trim().length === 0) {
      setResult("Input tidak boleh kosong.");
      setIsValid(false);
    } else {
      setResult("Input valid.");
      setIsValid(true);
    }
  };

  const handleDelete = () => {
    setText("");
    setResult("");
    setIsValid(false);
  };

  return (
    <div className="mb-6">
      <label className="block font-bold mb-2">{label}</label>
      <textarea
        rows={5}
        className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center gap-3 mt-2">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={handleCheck}
          type="button"
        >
          CEK
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={handleDelete}
          type="button"
        >
          HAPUS
        </button>
        <div className="flex-grow p-2 border border-gray-300 rounded min-h-[40px]">
          {result}
        </div>
      </div>
    </div>
  );
}
