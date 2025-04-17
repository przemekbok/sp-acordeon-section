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
  
  // Update the height calculation whenever the content changes or on window resize
  const updateHeight = (): void => {
    if (contentRef.current && bodyRef.current) {
      if (isExpanded) {
        // Get the exact height of the body content
        const bodyHeight = bodyRef.current.getBoundingClientRect().height;
        // Set the content container height
        contentRef.current.style.height = `${bodyHeight}px`;
      } else {
        contentRef.current.style.height = '0px';
      }
    }
  };
  
  // Handle expand/collapse
  useEffect(() => {
    updateHeight();
    
    // Also update on window resize for responsive behavior
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
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