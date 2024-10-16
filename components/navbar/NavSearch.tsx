'use client';

import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// 55. Logo and NavSearch Components
// 106. NavSearch Component
// 123. Deploy Application on Vercel

const NavSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '');

  // ユーザーの検索入力をURLパラメータと同期させます。
  const handleSearch = useDebouncedCallback((inputValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (inputValue) {
      params.set('search', inputValue);
    } else {
      params.delete('search');
    }
    router.replace(`/?${params.toString()}`);
  }, 500);

  // この useEffect がない場合、URL から検索パラメータが削除されても入力フィールドの表示が更新されない可能性があります。
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
