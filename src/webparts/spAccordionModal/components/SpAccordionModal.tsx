import * as React from 'react';
import styles from './SpAccordionModal.module.scss';
import type { ISpAccordionModalProps } from './ISpAccordionModalProps';
import { SharePointService } from '../services/SharePointService';
import { IAccordionItem } from '../models/IAccordionItem';
import { AccordionItem } from './AccordionItem';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';

export interface ISpAccordionModalState {
  accordionItems: IAccordionItem[];
  loading: boolean;
  error: string | null;
}

export default class SpAccordionModal extends React.Component<ISpAccordionModalProps, ISpAccordionModalState> {
  private sharePointService: SharePointService;

  constructor(props: ISpAccordionModalProps) {
    super(props);
    
    this.state = {
      accordionItems: [],
      loading: true,
      error: null
    };

    this.sharePointService = new SharePointService(this.props.context);
  }

  public componentDidMount(): void {
    this.fetchAccordionItems();
  }

  public componentDidUpdate(prevProps: ISpAccordionModalProps): void {
    if (prevProps.listName !== this.props.listName) {
      this.fetchAccordionItems();
    }
  }

  private async fetchAccordionItems(): Promise<void> {
    if (!this.props.listName) {
      this.setState({
        accordionItems: [],
        loading: false,
        error: 'Please configure a list name in the webpart properties.'
      });
      return;
    }

    this.setState({ loading: true, error: null });

    try {
      const items = await this.sharePointService.getAccordionItems(this.props.listName);
      this.setState({
        accordionItems: items,
        loading: false,
        error: items.length === 0 ? 'No items found in the list. Please make sure the list contains items with Title and Description fields.' : null
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: `Error loading accordion items: ${error.message}`
      });
    }
  }

  public render(): React.ReactElement<ISpAccordionModalProps> {
    const { loading, error, accordionItems } = this.state;
    const { hasTeamsContext } = this.props;

    return (
      <section className={`${styles.spAccordionModal} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.accordionContainer}>
          {loading && (
            <div className={styles.loading}>
              <Spinner size={SpinnerSize.large} label="Loading accordion items..." />
            </div>
          )}
          
          {!loading && error && (
            <MessageBar messageBarType={MessageBarType.error}>
              {error}
            </MessageBar>
          )}
          
          {!loading && !error && accordionItems.length > 0 && (
            <div>
              {accordionItems.map(item => (
                <AccordionItem key={item.id} item={item} />
              ))}
            </div>
          )}
          
          {!loading && !error && accordionItems.length === 0 && (
            <MessageBar messageBarType={MessageBarType.info}>
              No items found. Please add items to the list or configure the webpart properties.
            </MessageBar>
          )}
        </div>
      </section>
    );
  }
}