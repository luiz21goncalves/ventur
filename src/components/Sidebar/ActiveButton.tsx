import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type ActiveButtonProps = {
  children: string;
  to: string;
  shouldMatchExactHref?: boolean;
};

export function ActiveButton(props: ActiveButtonProps) {
  const { children, to, shouldMatchExactHref = false } = props;
  let isActive = false;
  const route = window.location.hash.replace('#', '');

  const navigate = useNavigate();

  if (shouldMatchExactHref && route === to) {
    isActive = true;
  }

  if (!shouldMatchExactHref && route.startsWith(to.toString())) {
    isActive = true;
  }

  return (
    <Button
      colorScheme={isActive ? 'pink' : 'gray'}
      onClick={() => navigate(to)}
    >
      {children}
    </Button>
  );
}
