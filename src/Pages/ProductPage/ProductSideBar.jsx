import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { useGlobalContext } from '../../components/config/StateProvider';

const Links = [
  { name: "shoes" },
  { name: "Tops & T-shirts" },
  { name: "Short" },
  { name: "Jeans" },
  { name: "Hoodies" },
  { name: "Accessories" },
  { name: "Socks" },
  { name: "Pants & Tights" },
];

const SideNav = [
  { name: "Gender", for: ["female", "male"] },
  { name: "kids", for: ["girls", "boys"] },
  { name: "Color", for: [] },
  { name: "Price", for: ["$0 - $50", "$50 - $100", "$100 - $150", "$150 - $200", "$250 +"] },
  { name: "Brand", for: [] },
  { name: "Purpose", for: ["sport", "casual", "cooperate", "school"] },
];

export default function ProductSideBar() {
  const [expanded, setExpanded] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { handle_filter, Handle_price } = useGlobalContext();

  const handleClick = (name) => {
    setExpanded(expanded === name ? null : name);
  };

  const filterByCategory = (categoryId) => {
    handle_filter(categoryId);
  };

  const handleCheckboxChange = (category, option) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [category]: option,
    };
    setSelectedOptions(newSelectedOptions);

    if (category === "Price") {
      Handle_price(option);
    }
  };

  return (
    <div className='lg:px-10 px-5 py-2 lg:flex flex-col hidden max-h-full w-full'>
      <div className='max-h-[120vh] h-[100vh] w-full bg-white pr-2 md:pr-4 overflow-y-auto flex flex-col gap-10 '>
        <ul className="flex flex-col gap-5">
          {Links.map((link) => (
            <li key={link.name} className='text-lg'>
              <button onClick={() => filterByCategory(link.name)}>{link.name}</button>
            </li>
          ))}
        </ul>
        <ul className='flex flex-col gap-5'>
          {SideNav.map((nav) => (
            <li key={nav.name} className='text-lg border-b'>
              <div onClick={() => handleClick(nav.name)} className='flex items-center justify-between py-2 cursor-pointer'>
                {nav.name}
                {expanded === nav.name ? <ChevronUp /> : <ChevronDown />}
              </div>
              {expanded === nav.name && nav.for.length > 0 && (
                <ul className='pl-5 pt-2'>
                  {nav.for.map((item) => (
                    <li key={item} className='py-1 flex gap-1 items-center'>
                      <input
                        type='checkbox'
                        checked={selectedOptions[nav.name] === item}
                        onChange={() => handleCheckboxChange(nav.name, item)}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
