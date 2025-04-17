import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import styles from './SpAccordionModal.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
import { IAccordionItem } from '../models/IAccordionItem';

export interface IAccordionItemProps {
  item: IAccordionItem;
}

export const AccordionItem: React.FC<IAccordionItemProps> = (props) => {
  const { item } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        const contentHeight = contentRef.current.scrollHeight;
        contentRef.current.style.height = `${contentHeight}px`;
      } else {
        contentRef.current.style.height = '0px';
      }
    }
  }, [isExpanded]);

  const toggleAccordion = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.accordionItem}>
      <div 
        className={`${styles.accordionHeader} ${isExpanded ? styles.expanded : ''}`}
        onClick={toggleAccordion}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleAccordion();
            e.preventDefault();
          }
        }}
      >
        <h3 className={styles.accordionTitle}>{item.title}</h3>
        <span className={`${styles.accordionIcon} ${isExpanded ? styles.expanded : ''}`}>
          <Icon iconName={isExpanded ? "ChevronUp" : "ChevronDown"} />
        </span>
      </div>
      <div 
        ref={contentRef}
        className={`${styles.accordionContent} ${isExpanded ? styles.expanded : ''}`}
        aria-hidden={!isExpanded}
      >
        <div 
          className={styles.accordionBody}
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>
    </div>
  );
};