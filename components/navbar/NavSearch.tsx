'use client';

import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// 55. Logo and NavSearch Components
// 106. NavSearch Component

const NavSearch = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '');

  const handleSearch = useDebouncedCallback((inputValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (inputValue) {
      params.set('search', inputValue);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('');
    }
  }, [searchParams.get('search')]);

  return (
    <Input
      type={'text'}
      placeholder={'find a property...'}
      className={'max-w-xs dark:bg-muted'}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export default NavSearch;
