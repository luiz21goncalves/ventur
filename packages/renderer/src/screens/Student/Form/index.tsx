import { useRef } from 'react';

import { Stack } from '@chakra-ui/react';
import { Form } from '@unform/web';

import { Input } from '../../../components/Form';

type StudentFormProps<S> = {
  children: React.ReactNode;
  onSubmit: (data: S) => Promise<void>;
  initialData?: Partial<S>;
};

export function StudentForm<T>(props: StudentFormProps<T>) {
  const { children, onSubmit, initialData } = props;

  const formRef = useRef(null);

  return (
    <Form ref={formRef} onSubmit={onSubmit} initialData={initialData}>
      <Stack spacing="4">
        {children}

        <Input name="name" label="Nome" isRequired />

        <Input name="birthday" label="Aniversário" />

        <Input name="email" label="Email" />

        <Input name="password" label="Senha" />

        <Stack direction="row" spacing="8">
          <Input
            name="classes_per_week"
            label="Aulas por semana"
            type="number"
            isRequired
          />
          <Input
            name="price_per_month"
            label="Preço por mês"
            type="number"
            isRequired
          />
        </Stack>
      </Stack>
    </Form>
  );
}
