import { fetchRentalDetails, updatePropertyAction, updatePropertyImageAction } from '@/actions/propertyAction';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import { redirect } from 'next/navigation';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import PriceInput from '@/components/form/PriceInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import { CategoryLabel } from '@/utils/categories';
import CountriesInput from '@/components/form/CountriesInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CounterInput from '@/components/form/CounterInput';
import { SubmitButton } from '@/components/form/Buttons';

// 154. Edit Rentals Page

const EditRentalPage = async ({ params }: { params: { id: string } }) => {
  const property = await fetchRentalDetails(params.id);
  if (!property) redirect('/');

  return (
    <section>
      <h1 className={'text-2xl font-semibold mb-8 capitalize'}>Edit Property</h1>
      <div className={'border p-8 rounded-md'}>
        <ImageInputContainer name={property.name} buttonText={'Update Image'} action={updatePropertyImageAction} image={property.image}>
          <input type='hidden' name={'id'} value={property.id} />
        </ImageInputContainer>
        <FormContainer action={updatePropertyAction}>
          <input type={'hidden'} name={'id'} value={property.id} />
          <div className={'grid md:grid-cols-2 gap-8 mb-4 mt-8'}>
            <FormInput name={'name'} inputType={'text'} label={'Name (20 limit)'} defaultValue={property.name} />
            <FormInput name={'tagline'} inputType={'text'} label={'Name (20 limit)'} defaultValue={property.name} />
            <PriceInput defaultValue={property.price} />
            <CategoriesInput defaultValue={property.category as CategoryLabel} />
            <CountriesInput defaultValue={property.country} />
          </div>
          <TextAreaInput name={'description'} labelText={'Description (10-100 words)'} defaultValue={property.description} />
          <h3 className={'text-lg mt-8 mb-4 font-medium'}>Accommodation Details</h3>
          <CounterInput detail={'guests'} defaultValue={property.guests} />
          <CounterInput detail={'guests'} defaultValue={property.bedrooms} />
          <CounterInput detail={'guests'} defaultValue={property.beds} />
          <CounterInput detail={'guests'} defaultValue={property.baths} />
          <SubmitButton text={'edit property'} className={'mt-12'} />
        </FormContainer>
      </div>
    </section>
  );
};

export default EditRentalPage;
