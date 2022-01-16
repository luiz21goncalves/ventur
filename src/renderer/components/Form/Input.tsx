import { useEffect, useRef } from 'react';

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { useField } from '@unform/core';

type InputProps = {
  name: string;
} & ChakraInputProps;

export function Input(props: InputProps) {
  const { name, ...attrs } = props;

  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return <ChakraInput ref={inputRef} defaultValue={defaultValue} {...attrs} />;
}
