import { ReactNode, useEffect, useRef } from 'react';

import { useField } from '@unform/core';
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react';

type SelectProps = {
  name: string;
  children: ReactNode;
} & ChakraSelectProps;

export function Select(props: SelectProps) {
  const { name, children, ...attrs } = props;

  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef?.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <ChakraSelect
      ref={selectRef}
      defaultValue={defaultValue}
      name={fieldName}
      {...attrs}
    >
      {children}
    </ChakraSelect>
  );
}
