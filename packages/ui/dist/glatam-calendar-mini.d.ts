import { LitElement } from 'lit';
import { BlockingRule, TimeSlot } from '@glatam/calendar-core';

export declare class GlatamCalendarMini extends LitElement {
    static styles: import('lit').CSSResult[];
    role: string;
    locale: string;
    startOfWeekDay: number;
    rules: BlockingRule[];
    selectedRange: {
        dateString: string;
        start: string;
        end: string;
    } | null;
    size: string;
    hostTimezone: string;
    activeTimezone: string;
    minDate: string;
    maxDate: string;
    showNeighboringMonth: boolean;
    tileClassName: ((data: {
        date: Date;
        dateString: string;
    }) => string) | null;
    slots: TimeSlot[];
    private activeDate;
    private dropdownOpen;
    private dropdownSelectedDateString;
    private handleDropdownDaySelect;
    private selectDropdownSlot;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'glatam-calendar-mini': GlatamCalendarMini;
    }
}
//# sourceMappingURL=glatam-calendar-mini.d.ts.map