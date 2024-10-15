'use client';

import { useState } from 'react';
import Title from '@/components/properties/Title';
import { Button } from '@/components/ui/button';

// 119. Description Component

type Props = {
  description: string;
};

const Description = ({ description }: Props) => {
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);

  const words: string[] = description.split(' ');
  const isLongDescription = words.length > 100;

  const toggleDescription = () => {
    setIsFullDescriptionShown(!isFullDescriptionShown);
  };

  const displayedDescription: string = isLongDescription && !isFullDescriptionShown ? words.splice(0, 100).join(' ') + '...' : description;

  return (
    <article className={'mt-4'}>
      <Title text={'Description'} />
      <p className={'text-muted-foreground font-light leading-loose'}>{displayedDescription}</p>
      {isLongDescription && (
        <Button variant={'link'} className={'pl-0'} onClick={toggleDescription}>
          {isFullDescriptionShown ? 'Show less' : 'Show more'}
        </Button>
      )}
    </article>
  );
};

export default Description;
