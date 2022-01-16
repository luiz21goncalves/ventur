interface Window {
  Main: {
    createStudent: (data: unknown) => Promise<any>;

    updateStudent: (data: unknown) => void;

    getStudent: (id: string) => void;

    getAllStudents: () => void;

    deleteStudent: (id: string) => void;

    createOrUpdateAttendanceList: (data: unknown) => void;

    getAttendanceList: (date: string) => void;

    getAllAttendanceListByMonth: (data: { month: string }) => void;

    getWorkingDay: (data: { month: string }) => void

    createOrUpdateWorkingDays: (data: unknown) => void

    on: (channel: string, callback: Function) => void

    unsubscribe: (channel: string, callback: (...args: unknown[]) => void) => void
  } ;
}
