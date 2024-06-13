import React from 'react';
import { AccordionItem } from './Drop_down';
import { Link } from 'react-router-dom';


const Accordion = () => {
  return (
    <div >
      <AccordionItem  title="Delivery and Return">
        <p className="mb-2 text-gray-500 ">
          Delivery fee is determined when on checkout page. Return of Goods: <Link to='#' className='underline text-sm text-black'>Read the return policy</Link>
        </p>
        
      </AccordionItem>
      <AccordionItem  title="Is there a Figma file available?">
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out the <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.
        </p>
      </AccordionItem>
      <AccordionItem  title="Checkout the reviews given to this product">
        <p className="mb-2 text-gray-700">
         The very was rated 4 stars by satified constumer / consumer.
        </p>
        <p>
          <Link to='#' className='underline text-sm'>Write a review here</Link>
        </p>

      </AccordionItem>
    </div>
  );
};

export default Accordion;
