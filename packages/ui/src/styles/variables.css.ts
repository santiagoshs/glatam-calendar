import { css } from 'lit';

export const variablesStyles = css`
  :host {
    /* Fonts */
    --glatam-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    
    /* Colors - Premium Apple Light Theme */
    --glatam-primary: #5856d6;
    --glatam-primary-hover: #4745b4;
    --glatam-primary-light: rgba(88, 86, 214, 0.1);
    --glatam-primary-light-hover: rgba(88, 86, 214, 0.25);
    
    --glatam-bg: #ffffff;
    --glatam-surface: #f5f5f7;
    --glatam-border: #e5e5ea;
    --glatam-text: #1d1d1f;
    --glatam-text-secondary: #86868b;
    --glatam-text-light: #ffffff;
    
    /* Blocked/Unavailable states */
    --glatam-blocked-bg: #fcfcfd;
    --glatam-blocked-stripe: #f2f2f7;
    --glatam-blocked-text: #aeaeae;
    --glatam-blocked-border: #e5e5ea;

    /* Selection Colors */
    --glatam-selection-bg: rgba(88, 86, 214, 0.15);
    --glatam-selection-border: #5856d6;
    
    /* Today highlighting */
    --glatam-today-text: #5856d6;
    --glatam-today-bg: rgba(88, 86, 214, 0.08);
    
    /* Dimensions & Layout */
    --glatam-border-radius: 12px;
    --glatam-padding: 16px;
    --glatam-grid-border-radius: 8px;
    --glatam-day-min-height: 72px;
    --glatam-time-col-width: 60px;
    --glatam-slot-height: 48px;
    
    /* Animation duration */
    --glatam-transition-fast: 0.15s ease;
    --glatam-transition-normal: 0.25s ease;
  }

  :host(.dark-mode) {
    /* Colors - Premium Apple Dark Theme */
    --glatam-primary: #5e5ce6;
    --glatam-primary-hover: #7d7aff;
    --glatam-primary-light: rgba(94, 92, 230, 0.15);
    --glatam-primary-light-hover: rgba(94, 92, 230, 0.3);
    
    --glatam-bg: #1c1c1e;
    --glatam-surface: #2c2c2e;
    --glatam-border: #38383a;
    --glatam-text: #f5f5f7;
    --glatam-text-secondary: #8e8e93;
    
    /* Blocked/Unavailable states */
    --glatam-blocked-bg: #242426;
    --glatam-blocked-stripe: #2c2c2e;
    --glatam-blocked-text: #707074;
    --glatam-blocked-border: #38383a;

    /* Selection Colors */
    --glatam-selection-bg: rgba(94, 92, 230, 0.25);
    --glatam-selection-border: #5e5ce6;
    
    /* Today highlighting */
    --glatam-today-text: #7d7aff;
    --glatam-today-bg: rgba(94, 92, 230, 0.12);
  }

  :host([size="small"]) {
    --glatam-day-min-height: 48px;
    --glatam-slot-height: 36px;
    --glatam-time-col-width: 48px;
    --glatam-padding: 10px;
    font-size: 0.8rem;
  }

  :host([size="large"]) {
    --glatam-day-min-height: 96px;
    --glatam-slot-height: 60px;
    --glatam-time-col-width: 72px;
    --glatam-padding: 24px;
    font-size: 1.1rem;
  }
`;
