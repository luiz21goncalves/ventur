import { useEffect, useRef } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { useField } from '@unform/core';

type InputProps = {
  name: string;
  label?: string;
} & ChakraInputProps;

export function Input(props: InputProps) {
  const { name, label, isRequired, ...attrs } = props;

  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <FormControl isRequired={isRequired}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        ref={inputRef}
        id={name}
        defaultValue={defaultValue}
        {...attrs}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
