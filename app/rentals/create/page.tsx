import CardContainer from '@/components/card/CardContainer';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import PriceInput from '@/components/form/PriceInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CountriesInput from '@/components/form/CountriesInput';
import ImageInput from '@/components/form/ImageInput';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';
import { SubmitButton } from '@/components/form/Buttons';
import { createPropertyAction } from '@/actions/propertyAction';

// 87. Create Property Page - Setup
// 88. Price Input
// 89. Categories Input
// 90. Description Input
// 91. Countries Input
// 92. Counter Input

const CreatePropertyPage = () => {
  return (
    <CardContainer
      title={'create property'}
      content={
        <FormContainer action={createPropertyAction}>
          <div className={'flex flex-col gap-4'}>
            <div className={'grid grid-cols-2 gap-5'}>
              <FormInput inputType={'text'} name={'name'} label={'Name (20 limit)'} defaultValue={'Cabin in latvia'} />
              <FormInput inputType={'text'} name={'tagline'} label={'Tagline (30 limit)'} defaultValue={'Dream Gateway Awaits you here'} />
              <PriceInput />
              <CategoriesInput />
            </div>
            <TextAreaInput name={'description'} labelText={'Description (10 - 1000 words)'} />
            <div className={'grid sm:grid-cols-2 gap-8'}>
              <CountriesInput />
              <ImageInput />
            </div>
            <h3 className={'text-lg font-medium'}>Accommodation Details</h3>
            <CounterInput detail={'guests'} />
            <CounterInput detail={'bedrooms'} />
            <CounterInput detail={'beds'} />
            <CounterInput detail={'baths'} />
            <h3 className={'text-lg font-medium'}>Amenities</h3>
            <AmenitiesInput />
            <SubmitButton text={'create rental'} className={'mt-8'} />
          </div>
        </FormContainer>
      }
    />
  );
};

export default CreatePropertyPage;
