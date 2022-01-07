import { useEffect, useLayoutEffect, useState } from 'react';

import { Button, Divider, Flex, Select, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BaseScreen } from '../../components/BaseScreen';

export function Home() {
  const navigate = useNavigate();

  const [month, setMonth] = useState('01');
  const [attendanceList, setAttendaceList] = useState([]);

  useLayoutEffect(() => {
    window.Main.getAllStudents();
    window.Main.getAllAttendanceListByMonth({ month });
  }, [month]);

  useEffect(() => {
    window.Main.on('attendance-list-by-month', (data) => {
      setAttendaceList(
        data.reduce((acc, { students }, index) => {
          if (index === 0) {
            students.forEach(({ _id, name, attendance }, studentIndex) => {
              acc[studentIndex] = {
                _id,
                name,
                number_of_classes: attendance === 'true' ? 1 : 0,
              };
            });
          } else {
            students.forEach(({ attendance }, studentIndex) => {
              if (attendance === 'true') {
                acc[studentIndex].number_of_classes += 1;
              }
            });
          }

          return acc;
        }, [])
      );
    });

    return () =>
      window.Main.unsubscribe('attendance-list-by-month', setAttendaceList);
  }, []);

  return (
    <BaseScreen title="Home">
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

      <Stack spacing="4" overflowY="auto" marginTop="8">
        {attendanceList.map((student) => (
          <Stack key={student._id} spacing="4">
            <Divider />

            <Flex align="center" justify="space-between">
              <Stack spacing="2">
                <Text>Aluno: {student.name}</Text>
                <Text>Quantidade de aulas: {student.number_of_classes}</Text>
              </Stack>
              <Button
                onClick={() =>
                  navigate(`/attendance-list/student/${student._id}`)}
              >
                detalhes
              </Button>
            </Flex>
          </Stack>
        ))}
      </Stack>
    </BaseScreen>
  );
}
