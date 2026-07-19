import { LitElement } from 'lit';
import { CalendarDay, TimeSlot } from '@glatam/calendar-core';

export declare class GlatamCalendarDayView extends LitElement {
    static styles: import('lit').CSSResult;
    day: CalendarDay | null;
    slots: TimeSlot[];
    locale: string;
    selectedRange: {
        dateString: string;
        start: string;
        end: string;
    } | null;
    role: string;
    private isDragging;
    private dragStartSlotIndex;
    private dragEndSlotIndex;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleMouseDown;
    private handleMouseEnter;
    private handleMouseUp;
    private isSlotSelected;
    private isSlotDragSelecting;
    render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=day-view.d.ts.map