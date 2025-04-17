import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpAccordionModalProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  listName: string;
  context: WebPartContext;
}