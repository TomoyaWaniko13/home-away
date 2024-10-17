'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 124. Reviews Model
// 130. ReviewCard Component

type Props = {
  comment: string;
};

const Comment = ({ comment }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const longComment = comment.length > 130;
  const displayComment = longComment && !isExpanded ? `${comment.slice(0, 130)}` : comment;

  return (
    <div>
      <p>{displayComment}</p>
      {longComment && (
        <Button variant={'link'} className={'pl-0 text-muted-foreground'} onClick={toggleExpanded}>
          {isExpanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  );
};

export default Comment;
