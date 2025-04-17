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
  const bodyRef = useRef<HTMLDivElement>(null);
  
  // Calculate and set the proper height on expand/collapse
  useEffect(() => {
    if (contentRef.current && bodyRef.current) {
      if (isExpanded) {
        // Get the exact height of the body content including its padding
        const bodyHeight = bodyRef.current.getBoundingClientRect().height;
        // Set the outer container height to match
        contentRef.current.style.height = `${bodyHeight}px`;
      } else {
        // Collapse by setting height to 0
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
        className={`${styles.accordionHeader}`}
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
          ref={bodyRef}
          className={styles.accordionBody}
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>
    </div>
  );
};