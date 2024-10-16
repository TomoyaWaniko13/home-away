'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FormContainer from '@/components/form/FormContainer';
import { createReviewAction } from '@/actions/reviewAction';
import RatingInput from '@/components/form/RatingInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { SubmitButton } from '@/components/form/Buttons';

// 124. Reviews Model

type Props = {
  propertyId: string;
};

const SubmitReview = ({ propertyId }: Props) => {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  return (
    <div className={'mt-8'}>
      <Button onClick={() => setIsReviewFormVisible((prevState) => !prevState)}>Leave a review</Button>
      {isReviewFormVisible && (
        <Card className={'p-8 mt-8'}>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name={'propertyId'} value={propertyId} />
            <RatingInput name={'rating'} />
            <TextAreaInput name={'comment'} labelText={'your thoughts on this property'} defaultValue={'Amazing place!'} />
            <SubmitButton text={'Submit'} className={'mt-4'} />
          </FormContainer>
        </Card>
      )}
    </div>
  );
};

export default SubmitReview;
