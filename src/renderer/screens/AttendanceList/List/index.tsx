import { useCallback, useState } from 'react';

import DayPicker, { DayModifiers } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';
import { format } from 'date-fns';

import { BaseScreen } from '../../../components/BaseScreen';
import 'react-day-picker/lib/style.css';
import './styles.css';

export function AttendanceList() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (!modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

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
          onClick={() => navigate(format(selectedDate as Date, 'yyyy-MM-dd'))}
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
      />
    </BaseScreen>
  );
}
