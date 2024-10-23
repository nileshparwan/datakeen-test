import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { educationSchema, personalInfoSchema, skillsSchema } from '../../lib/zod/schema';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Skills from './Skills';
import Progressbar from '../Progressbar';
import ThankyouMessage from './ThankyouMessage';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isThankYouMessage, setIsThankYouMessage] = useState(false);

  const methods = useForm({
    defaultValues: formData,
    resolver: zodResolver(
      step === 1 ? personalInfoSchema :
        step === 2 ? educationSchema :
          skillsSchema
    ),
  });
  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  const onSubmit = (data) => {
    const finalData = { ...formData, ...data };
    setIsThankYouMessage(true);
  };

  return (
    <div className='w-full space-y-20 py-10'>
      {
        isThankYouMessage ? (<div className='md:my-20 md:w-[600px] md:mx-auto'>
          <ThankyouMessage />
        </div>) : (
          <>
            <div className='flex flex-col items-center justify-center'>
              <Progressbar step={step} />
            </div>
            <div className='p-10 md:w-[600px] md:mx-auto md:border md:rounded-lg md:border-gray-200 md:shadow-md'>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(step === 3 ? onSubmit : handleNext)}>
                  {step === 1 && <PersonalInfo />}
                  {step === 2 && <Education />}
                  {step === 3 && <Skills />}
                  <div className="mt-4">
                    {step > 1 && <button type="button" onClick={handlePrev} className="mr-2 bg-gray-200 px-4 py-2">Previous</button>}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                      {step === 3 ? 'Submit' : 'Next'}
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </>
        )
      }
    </div>
  );
};

export default MultiStepForm;