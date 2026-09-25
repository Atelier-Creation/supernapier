import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Command } from 'cmdk';
import { Check, ChevronDown, Search } from 'lucide-react';
import { COUNTRY_CODES } from '../../utils/phoneValidation';
import { cn } from '../../lib/utils';

export default function CountrySelect({ value, onChange, className = "py-3" }) {
  const [open, setOpen] = useState(false);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === value) || COUNTRY_CODES.find(c => c.code === 'IN') || COUNTRY_CODES[0];

  return (
    <div className="h-full border-r border-gray-200 bg-transparent flex">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            className={cn("flex h-full w-full items-center justify-between gap-1.5 outline-none pl-3 pr-2 text-sm font-medium cursor-pointer hover:bg-gray-100 min-w-[70px] transition-all bg-transparent border-none focus:bg-gray-100", className)}
          >
            <span className="text-gray-700">{selectedCountry.code}</span>
            <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content 
            align="start"
            sideOffset={4}
            className="w-[280px] p-0 z-50 rounded-lg border border-gray-200 bg-white shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          >
            <Command className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white text-gray-950">
              <div className="flex items-center border-b border-gray-100 px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
                <Command.Input 
                  placeholder="Search countries..." 
                  className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1 custom-scrollbar">
                <Command.Empty className="py-6 text-center text-sm text-gray-500">
                  No countries found.
                </Command.Empty>
                <Command.Group>
                  {COUNTRY_CODES.map((country) => (
                    <Command.Item
                      key={country.code}
                      value={`${country.name} ${country.code} ${country.callingCode}`}
                      onSelect={() => {
                        onChange(country.code);
                        setOpen(false);
                      }}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none aria-selected:bg-green-50 aria-selected:text-green-900 transition-colors",
                        value === country.code && "bg-green-50"
                      )}
                    >
                      <div className="flex flex-col flex-1">
                        <span className={cn(
                          "font-medium text-gray-900",
                          value === country.code && "text-green-800"
                        )}>
                          {country.name}
                        </span>
                        <span className={cn(
                          "text-xs text-gray-500 mt-0.5",
                          value === country.code && "text-green-600/80"
                        )}>
                          {country.callingCode} ({country.code})
                        </span>
                      </div>
                      {value === country.code && (
                        <Check className="ml-auto h-4 w-4 text-green-600 shrink-0" />
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
