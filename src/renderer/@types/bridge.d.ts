interface Window {
  Main: {
    createStudent: (data: unknown) => Promise<unknown>;
    updateStudent: (data: unknown) => Promise<unknown>;
    getStudent: (id: string) => Promise<unknown>;
    getAllStudents: () => Promise<unknown>;
    deleteStudent: (id: string) => Promise<unknown>;

    createOrUpdateAttendanceList: (data: unknown) => Promise<unknown>;
    getAttendanceList: (date: string) => Promise<unknown>;
    getAllAttendanceListByMonth: (data: { month: string }) => Promise<unknown>;

    getWorkingDay: (data: { month: string }) => Promise<unknown>;
    createOrUpdateWorkingDays: (data: unknown) => Promise<unknown>;
  };
}
