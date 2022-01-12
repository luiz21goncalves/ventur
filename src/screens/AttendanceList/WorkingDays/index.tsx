import { useEffect, useLayoutEffect, useState } from 'react';

import { isEqual } from 'date-fns';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';

import { BaseScreen } from '../../../components/BaseScreen';

export function WorkingDays() {
  const navigate = useNavigate();
  const {
    state: { month },
  } = useLocation();

  const [selectedDays, setSelectedDays] = useState<Date[]>([]);

  useLayoutEffect(() => {
    window.Main.getWorkingDay({ month });
  }, [month]);

  useEffect(() => {
    window.Main.on('working-days', (data) => {
      if (data) {
        setSelectedDays(data.date);
      }
    });

    return () => window.Main.unsubscribe('working-days', setSelectedDays);
  }, []);

  function handleDayClick(day: Date, { selected }: DayModifiers) {
    if (selected) {
      setSelectedDays((prevState) =>
        prevState.filter((date) => !isEqual(date, day))
      );
    } else {
      setSelectedDays((prevState) => [...prevState, day]);
    }
  }

  function handleSubmit() {
    const number_of_weeks = Math.floor(selectedDays.length / 5);

    window.Main.createOrUpdateWorkingDays({
      month,
      number_of_weeks,
      date: selectedDays,
    });
  }

  return (
    <BaseScreen title="Selecione os dias uteis">
      <Flex width="full" justifyContent="space-between" my="8">
        <Button
          width="40"
          colorScheme="red"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>

        <Button width="40" colorScheme="green" onClick={handleSubmit}>
          Salvar
        </Button>
      </Flex>

      <DayPicker
        weekdaysShort={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
        months={[
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outobro',
          'Novembro',
          'Dezembro',
        ]}
        canChangeMonth={false}
        initialMonth={new Date(2022, Number(month) - 1)}
        selectedDays={selectedDays}
        onDayClick={handleDayClick}
      />
    </BaseScreen>
  );
}
