/// <reference types="vite/client" />

import * as React from 'react';
import { BlockingRule, TimeSlot } from '@glatam/calendar-core';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'glatam-calendar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        view?: 'month' | 'week' | 'day';
        locale?: string;
        startOfWeekDay?: number;
        rules?: BlockingRule[];
        slots?: TimeSlot[];
        selectedDates?: string[];
        selectedRange?: { dateString: string; start: string; end: string } | null;
        ref?: React.RefObject<any>;
      };
    }
  }
}
