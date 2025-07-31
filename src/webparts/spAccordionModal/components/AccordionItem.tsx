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
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Fix for content shifting - use a completely different approach
  useEffect(() => {
    if (contentRef.current && wrapperRef.current) {
      if (isExpanded) {
        // Get the height of the wrapper with all its content
        const wrapperHeight = wrapperRef.current.offsetHeight;
        // Set the height explicitly
        contentRef.current.style.height = `${wrapperHeight}px`;
      } else {
        contentRef.current.style.height = '0px';
      }
    }
  }, [isExpanded]);

  // Handle window resize to maintain proper heights
  useEffect(() => {
    const handleResize = () => {
      if (isExpanded && contentRef.current && wrapperRef.current) {
        const wrapperHeight = wrapperRef.current.offsetHeight;
        contentRef.current.style.height = `${wrapperHeight}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isExpanded]);

  const toggleAccordion = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.accordionItem} ${isExpanded ? '' : styles.accordionItemShadow}`}>
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
          <Icon className={styles.icon} iconName={isExpanded ? "ChevronUp" : "ChevronDown"} />
        </span>
      </div>
      <div 
        ref={contentRef}
        className={`${styles.accordionContent}`}
        aria-hidden={!isExpanded}
      >
        <div ref={wrapperRef} className={styles.contentWrapper}>
          <div 
            className={styles.accordionBody}
          />
            {item.description}
        </div>
      </div>
    </div>
  );
};