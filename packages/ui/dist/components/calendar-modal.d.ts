import { LitElement } from 'lit';
import { BlockingRule } from '@glatam/calendar-core';

export declare class GlatamCalendarModal extends LitElement {
    static styles: import('lit').CSSResult;
    open: boolean;
    dateString: string;
    startTime: string;
    endTime: string;
    isRange: boolean;
    existingRule: BlockingRule | null;
    private description;
    private blockAllDay;
    private isRecurring;
    private selectedDays;
    willUpdate(changedProperties: Map<string, any>): void;
    private toggleDay;
    private handleSave;
    private handleDelete;
    render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=calendar-modal.d.ts.map