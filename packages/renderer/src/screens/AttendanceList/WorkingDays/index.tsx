import { useEffect, useState } from 'react';

import { isEqual } from 'date-fns';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Flex, useToast } from '@chakra-ui/react';

import { BaseScreen } from '../../../components/BaseScreen';

export function WorkingDays() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { month } = state as { month: string }
  const toast = useToast();

  const [selectedDays, setSelectedDays] = useState<Date[]>([]);

  useEffect(() => {
    async function load() {
      const response = await window.Main.getWorkingDayByMonth({ month });

      if (response !== null) {
        setSelectedDays(response.date);
      }
    }
    load();
  }, [month]);

  function handleDayClick(day: Date, { selected }: DayModifiers) {
    if (selected) {
      setSelectedDays((prevState) =>
        prevState.filter((date) => !isEqual(date, day))
      );
    } else {
      setSelectedDays((prevState) => [...prevState, day]);
    }
  }

  async function handleSubmit() {
    try {
      const number_of_weeks = Math.floor(selectedDays.length / 5);

      await window.Main.createOrUpdateWorkingDays({
        month,
        number_of_weeks,
        date: selectedDays,
      });

      toast({
        title: 'Dias uteis salvos',
        status: 'success',
        position: 'top',
      });
    } catch (err) {
      toast({
        title: 'Ocorreu um erro ao salvar os dias uteis',
        status: 'error',
        position: 'top',
      });
    }
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
