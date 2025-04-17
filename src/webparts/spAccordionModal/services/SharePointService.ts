import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IAccordionItem } from "../models/IAccordionItem";

export class SharePointService {
  private context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  public async getAccordionItems(listName: string): Promise<IAccordionItem[]> {
    try {
      if (!listName) {
        return Promise.resolve([]);
      }

      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Id,Title,Description`,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch list items: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.value.map((item: any) => ({
        id: item.Id,
        title: item.Title,
        description: item.Description || ""
      }));
    } catch (error) {
      console.error('Error fetching accordion items:', error);
      return [];
    }
  }
}