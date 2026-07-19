import { LitElement } from 'lit';
import { BlockingRule, TimeSlot } from '@glatam/calendar-core';

export declare class GlatamCalendar extends LitElement {
    static styles: import('lit').CSSResult[];
    role: string;
    size: string;
    view: 'month' | 'week' | 'day';
    locale: string;
    startOfWeekDay: number;
    rules: BlockingRule[];
    selectedDates: string[];
    selectedRange: {
        dateString: string;
        start: string;
        end: string;
    } | null;
    hostTimezone: string;
    activeTimezone: string;
    slots: TimeSlot[];
    minDate: string;
    maxDate: string;
    showNeighboringMonth: boolean;
    tileClassName: ((data: {
        date: Date;
        dateString: string;
    }) => string) | null;
    private activeDate;
    private localRules;
    private darkMode;
    private modalOpen;
    private modalDateString;
    private modalStartTime;
    private modalEndTime;
    private modalIsRange;
    private modalExistingRule;
    firstUpdated(): void;
    willUpdate(changedProps: Map<string, any>): void;
    updated(changedProps: Map<string, any>): void;
    private handlePrev;
    private handleNext;
    private getHeaderTitle;
    private handleDaySelect;
    private handleRangeSelect;
    private handleSlotClick;
    private handleBlockDayAction;
    private openModal;
    private handleSaveRule;
    private handleDeleteRule;
    private getDisplaySlots;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'glatam-calendar': GlatamCalendar;
    }
}
//# sourceMappingURL=glatam-calendar.d.ts.map