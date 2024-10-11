// 97. Categories List

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { categories } from '@/utils/categories';
import { clsx } from 'clsx';
import Link from 'next/link';

type Props = {
  categoryQuery?: string;
  searchQuery?: string;
};

const CategoriesList = ({ categoryQuery, searchQuery }: Props) => {
  const searchTerm = searchQuery ? `&search=${searchQuery}` : '';

  return (
    <section>
      <ScrollArea className={'py-6'}>
        <div className={'flex gap-x-4'}>
          {categories.map((category) => {
            const isActive = category.label === categoryQuery;
            return (
              <Link key={category.label} href={`/?category=${category.label}${searchTerm}`}>
                <article
                  className={clsx('p-3 flex-col items-center cursor-pointer duration-300 hover:text-primary w-[100px]', {
                    'text-primary': isActive,
                  })}
                >
                  <div className={'flex justify-center'}>
                    <category.icon className={'w-8 h-8'} />
                  </div>
                  <p className={'capitalize  mt-1 text-center'}>{category.label}</p>
                </article>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation={'horizontal'} />
      </ScrollArea>
    </section>
  );
};

export default CategoriesList;
