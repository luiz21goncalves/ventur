import { useCallback, useEffect, useState } from 'react';

import DayPicker, { DayModifiers } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, useToken } from '@chakra-ui/react';
import { format, toDate } from 'date-fns';

import { BaseScreen } from '../../../components/BaseScreen';
import 'react-day-picker/lib/style.css';
import './styles.css';

export function AttendanceList() {
  const navigate = useNavigate();
  const [pink100] = useToken('colors', ['pink.100']);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<Date[]>([]);

  const modifiersStyles = {
    saved: {
      backgroundColor: pink100,
      borderRadius: 8,
    },
  };

  const modifiersDates = {
    saved: dates,
  };

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (!modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  useEffect(() => {
    async function load() {
      const date = format(selectedDate, 'yyyy-MM-dd').split('-');

      const response = await window.Main.getAllAttendanceListByMonth({
        year: date[0],
        month: date[1],
      });

      const attendanceDays = response.map(({ day, month, year }) =>
        toDate(new Date(year, month - 1, day))
      );
      setDates(attendanceDays);
    }
    load();
  }, [selectedDate]);

  return (
    <BaseScreen title="Lista de presença">
      <Flex width="full" justifyContent="space-between" my="8">
        <Button
          width="40"
          colorScheme="red"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>

        <Button
          width="40"
          colorScheme="green"
          onClick={() => navigate(format(selectedDate, 'yyyy-MM-dd'))}
          disabled={!selectedDate}
        >
          Ver Detalhes
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
        selectedDays={selectedDate}
        disabledDays={{ daysOfWeek: [0, 6] }}
        onDayClick={handleDateChange}
        modifiersStyles={modifiersStyles}
        modifiers={modifiersDates}
      />
    </BaseScreen>
  );
}
