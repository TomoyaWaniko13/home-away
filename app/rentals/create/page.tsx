import CardWrapper from '@/components/CardWrapper';
import FormWrapper from '@/components/form/FormWrapper';
import { createPropertyAction } from '@/utils/actions';
import FormInput from '@/components/form/FormInput';
import SubmitButton from '@/components/form/SubmitButton';
import PriceInput from '@/components/form/PriceInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import TextAreaInput from '@/components/form/TextAreaInput';

// 87. Create Property Page - Setup
// 88. Price Input
// 89. Categories Input
// 90. Description Input

const CreatePropertyPage = () => {
  return (
    <CardWrapper
      title={'create property'}
      content={
        <FormWrapper formSubmitAction={createPropertyAction}>
          <div className={'grid grid-cols-2 gap-5 py-4'}>
            <FormInput inputType={'text'} name={'firstName'} label={'Name (20 limit)'} defaultValue={'Cabin in latvia'} />
            <FormInput inputType={'text'} name={'tagline'} label={'Tagline (30 limit)'} defaultValue={'Dream Gateway Awaits you here'} />
            <PriceInput />
            <CategoriesInput />
          </div>
          <TextAreaInput name={'description'} labelText={'Description (10 - 1000 words)'} />
          <SubmitButton text={'create rental'} className={'mt-8'} />
        </FormWrapper>
      }
    />
  );
};

export default CreatePropertyPage;
