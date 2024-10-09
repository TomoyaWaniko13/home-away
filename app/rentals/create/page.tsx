import CardWrapper from '@/components/CardWrapper';
import FormWrapper from '@/components/form/FormWrapper';
import { createPropertyAction } from '@/utils/actions';
import FormInput from '@/components/form/FormInput';
import SubmitButton from '@/components/form/SubmitButton';

// 87. Create Property Page - Setup

const CreatePropertyPage = () => {
  return (
    <CardWrapper
      title={'create property'}
      content={
        <FormWrapper formSubmitAction={createPropertyAction}>
          <div className={'grid grid-cols-2 gap-5 pt-4'}>
            <FormInput inputType={'text'} name={'firstName'} label={'Name (20 limit)'} defaultValue={'Cabin in latvia'} />
            <FormInput inputType={'text'} name={'tagline'} label={'Tagline (30 limit)'} defaultValue={'Dream Gateway Awaits you here'} />
          </div>
          <SubmitButton text={'create rental'} className={'mt-8'} />
        </FormWrapper>
      }
    />
  );
};

export default CreatePropertyPage;
