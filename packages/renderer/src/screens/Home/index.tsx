import { useEffect, useState } from 'react';

import {
  Button,
  Divider,
  Flex,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';

import { BaseScreen } from '../../components/BaseScreen';

type Student = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  classes_per_week: number;
  price_per_month: number;
};

type AttendanceList = {
  [key: string]: {
    number_of_classes: number;
  };
};

type WorkingDays = {
  _id: string;
  month: string;
  number_of_weeks: number;
  date: Date[];
};

const currentMonth = format(new Date(), 'MM');

export function Home() {
  const navigate = useNavigate();

  const [month, setMonth] = useState(currentMonth);
  const [attendanceList, setAttendaceList] = useState<AttendanceList>({});
  const [students, setStudents] = useState<Student[]>([]);
  const [workingDays, setWorkingDays] = useState<WorkingDays>();

  useEffect(() => {
    async function loadData() {
      const allStudents = await window.Main.getAllStudents();
      setStudents(allStudents as []);

      const workingDaysResponse = await window.Main.getWorkingDayByMonth({
        month,
      });
      setWorkingDays(workingDaysResponse);

      const response = await window.Main.getAllAttendanceListByMonth({
        month,
        year: '2022',
      });

      setAttendaceList(
        response.reduce((acc, { students: studentsArray }, index) => {
          if (index === 0) {
            studentsArray.forEach(({ _id, attendance }) => {
              acc[_id] = {
                number_of_classes: attendance === 'true' ? 1 : 0,
              };
            });
          } else {
            studentsArray.forEach(({ _id, attendance }) => {
              if (attendance === 'true') {
                acc[_id].number_of_classes += 1;
              }
            });
          }

          return acc;
        }, {} as AttendanceList),
      );
    }

    loadData();
  }, [month]);

  function calculateMonthlyFee({
    number_of_classes,
    classes_per_week,
    month_weeks,
    price,
  }: {
    number_of_classes: number;
    classes_per_week: number;
    month_weeks: number;
    price: number;
  }) {
    const classesPerMonth = classes_per_week * month_weeks;
    const pricePerClass = price / classesPerMonth;

    return number_of_classes * pricePerClass;
  }

  return (
    <BaseScreen title="Home">
      <SimpleGrid columns={2} gap="8">
        <Select
          name="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="01">Janeiro</option>
          <option value="02">Fevereiro</option>
          <option value="03">Mar??o</option>
          <option value="04">Abril</option>
          <option value="05">Maio</option>
          <option value="06">Junho</option>
          <option value="07">Julho</option>
          <option value="08">Agosto</option>
          <option value="09">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </Select>

        <Button
          onClick={() =>
            navigate('/attendance-list/working-days', { state: { month } })
          }
        >
          Selecionar dias uteis
        </Button>
      </SimpleGrid>

      <Flex align="center" justify="space-between" marginTop="8">
        <Text fontSize="large">
          total de dias uteis: {workingDays?.date?.length}
        </Text>
        <Text fontSize="large">
          total de semanas: {workingDays?.number_of_weeks}
        </Text>
      </Flex>

      <Stack spacing="4" marginTop="8">
        {students.map((student) => (
          <Stack key={student._id} spacing="4">
            <Divider />

            <Flex align="center" justify="space-between">
              <Stack spacing="2">
                <Text fontWeight="bold">Aluno: {student.name}</Text>
                <Text>Aulas por semana: {student.classes_per_week}</Text>
                <Text>Pre??o combinado: {student.price_per_month}</Text>
              </Stack>

              <Stack spacing="2">
                <Text>
                  Pre??o a ser pago:{' '}
                  {calculateMonthlyFee({
                    classes_per_week: student.classes_per_week,
                    month_weeks: Number(workingDays?.number_of_weeks),
                    number_of_classes:
                      attendanceList[student._id]?.number_of_classes,
                    price: student?.price_per_month,
                  })}
                </Text>
                <Text>
                  Total de aulas no m??s:{' '}
                  {attendanceList[student._id]?.number_of_classes}
                </Text>
              </Stack>
            </Flex>
          </Stack>
        ))}
      </Stack>
    </BaseScreen>
  );
}
