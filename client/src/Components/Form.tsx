import React, { useState } from 'react';

interface FormValues {
  name: string;
  email: string;
  phone: string;
}

const MyForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      // Formularen er gyldig - gør noget med formdataen her (f.eks. send til serveren)
      console.log('Formularen blev sendt:', formValues);
    } else {
      // Formularen er ugyldig - gør noget med fejlen her (f.eks. vis fejlmeddelelser)
      console.log('Formularen er ugyldig');
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Valider navn
    if (formValues.name.trim() === '') {
      newErrors.name = 'Navn er påkrævet';
      valid = false;
    } else if (formValues.name.length < 3) {
      newErrors.name = 'Navnet skal være mindst 3 tegn';
      valid = false;
    } else {
      newErrors.name = '';
    }

    // Valider email
    if (formValues.email.trim() === '') {
      newErrors.email = 'Email er påkrævet';
      valid = false;
    } else if (!isValidEmail(formValues.email)) {
      newErrors.email = 'Ugyldig email';
      valid = false;
    } else {
      newErrors.email = '';
    }

    // Valider telefonnummer
    if (formValues.phone.trim() === '') {
      newErrors.phone = 'Telefonnummer er påkrævet';
      valid = false;
    } else if (formValues.phone.length < 8) {
      newErrors.phone = 'Telefonnummeret skal være mindst 8 cifre';
      valid = false;
    } else {
      newErrors.phone = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidEmail = (email: string) => {
    // En simpel email-validering med regulære udtryk
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form className='border-[1px] border-black w-[30rem] h-[400px]' onSubmit={handleSubmit}>
      <div>
        <label>
          Navn:
          <input
            className={`w-full border-[1px] p-2 ${errors.name ? 'border-red-400' : 'border-green-500'}`}
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </label>
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>
          Email:
          <input
            className={`w-full border-[1px] p-2 ${errors.email ? 'border-red-400' : 'border-green-500'}`}
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </label>
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>
          Telefonnummer:
          <input
            className={`w-full border-[1px] p-2 ${errors.phone ? 'border-red-400' : 'border-green-500'}`}
            type="tel"
            name="phone"
            value={formValues.phone}
            onChange={handleInputChange}
          />
        </label>
        {errors.phone && <span>{errors.phone}</span>}
      </div>
      <button className='border-[1px] py-[10px] px-[20px]' type="submit">Indsend</button>
    </form>
  );
};

export default MyForm;
