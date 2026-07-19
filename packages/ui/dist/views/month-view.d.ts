import { LitElement } from 'lit';
import { CalendarDay } from '@glatam/calendar-core';

export declare class GlatamCalendarMonthView extends LitElement {
    static styles: import('lit').CSSResult;
    days: CalendarDay[];
    locale: string;
    startOfWeekDay: number;
    selectedDates: string[];
    role: string;
    size: string;
    minDate: string;
    maxDate: string;
    showNeighboringMonth: boolean;
    tileClassName: ((data: {
        date: Date;
        dateString: string;
    }) => string) | null;
    private getWeekdayNames;
    private handleDayClick;
    render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=month-view.d.ts.map