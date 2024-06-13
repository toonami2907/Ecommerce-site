import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

export const AccordionItem = ({ id, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h2>
        <button
          className="flex items-center shadow-sm justify-between w-full lg:p-5 p-4 font-medium my-1 text-black border border-gray-100 rounded-xl"
          onClick={toggleOpen}
        >
          <span className='lg:text-sm text-xs font-[600]'>{title}</span>
          <span>
            {isOpen ? <ChevronDown/> : <ChevronUp/>}
          </span>
        </button>
      </h2>
      <div
        className={`${isOpen ? '' : 'hidden'}`}
      >
        <div className="p-6 ">
          {children}
        </div>
      </div>
    </div>
  );
};


