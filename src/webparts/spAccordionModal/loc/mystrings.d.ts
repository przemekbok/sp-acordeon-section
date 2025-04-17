declare interface ISpAccordionModalWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListNameFieldLabel: string;
  ListConfigGroupName: string;
  ListNameFieldDescription: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
  LoadingMessage: string;
  NoItemsMessage: string;
  ConfigureListMessage: string;
}

declare module 'SpAccordionModalWebPartStrings' {
  const strings: ISpAccordionModalWebPartStrings;
  export = strings;
}
