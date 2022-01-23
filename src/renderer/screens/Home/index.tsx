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

import { BaseScreen } from '../../components/BaseScreen';

type Student = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  classes_per_week: number;
  price_per_month: number;
};

type AttendanceListData = {
  _id: string;
  year: number;
  month: number;
  day: number;
  students: Pick<Student, '_id' | 'classes_per_week' | 'price_per_month'>[];
};

export function Home() {
  const navigate = useNavigate();

  const [month, setMonth] = useState('01');
  const [attendanceList, setAttendaceList] = useState<AttendanceListData[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [workingDays, setWorkingDays] = useState([]);

  useEffect(() => {
    async function loadData() {
      const allStudents = await window.Main.getAllStudents();
      setStudents(allStudents as []);

      const workingDays = await window.Main.getWorkingDay({ month });
      setWorkingDays(workingDays as []);

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
        }, [])
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
          <option value="03">Março</option>
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
                <Text>Preço combinado: {student.price_per_month}</Text>
              </Stack>

              <Stack spacing="2">
                <Text>
                  Preço a ser pago:{' '}
                  {calculateMonthlyFee({
                    classes_per_week: student.classes_per_week,
                    month_weeks: workingDays?.number_of_weeks,
                    number_of_classes:
                      attendanceList[student._id]?.number_of_classes,
                    price: student?.price_per_month,
                  })}
                </Text>
                <Text>
                  Total de aulas no mês:{' '}
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
