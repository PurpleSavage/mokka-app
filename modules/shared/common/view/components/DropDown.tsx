'use client'
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

export interface Option<T> {
  id: string;
  name: T;
}

interface DropDownProps<T> {
  options: Option<T>[];
  handleSelect: (option: Option<T>) => void; // Cambiado para pasar el objeto completo
  placeholder?: string;
  selected?: T;
}

export default function DropDown<T extends string>({ 
  options, 
  handleSelect, 
  placeholder = "Select option", 
  selected 
}: DropDownProps<T>) {
  return (
    <Menu as="div" className="relative inline-block w-full text-left">
      <MenuButton className="inline-flex w-full justify-between items-center rounded-lg border border-slate-600/50 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors h-10 outline-none">
        <span className="truncate">{selected || placeholder}</span>
        <IoIosArrowDown size={20} className="ml-2 text-slate-400" />
      </MenuButton>

      <MenuItems
        anchor="bottom start"
        transition
        className="z-50 mt-2 w-(--button-width) origin-top divide-y divide-slate-700 rounded-md bg-[#1a1a1a] border border-slate-700 shadow-lg
         transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
      >
        <div className="px-1 py-1 max-h-60 overflow-y-auto custom-scrollbar">
          {options.map((option) => (
            <MenuItem key={option.id}>
              <button
                type="button"
                onClick={() => handleSelect(option)} // Pasa el objeto completo
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-white data-focus:bg-pink-800 transition-colors"
              >
                {option.name}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}