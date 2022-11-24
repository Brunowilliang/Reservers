export declare global {
  namespace ReactNavigation {
    interface RootParamList {

      // Login Routes
      login: undefined;
      register: undefined;

      // App Routes
      home: undefined;
      userProfile: undefined;
      userSearch: undefined;
      userNewSchedule: item | undefined;
      userSchedules: undefined;
      userScheduleCompleted: undefined;

      // Company Routes
      companySchedule: undefined;
      companySettings: undefined;
      companyProfile: undefined;
      companySettingsHours: undefined;
      companyProfessionals: undefined;
      companyProfessionalsServices: undefined;
    }
  }
}
