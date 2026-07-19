import { css } from 'lit';

export const calendarStyles = css`
  :host {
    display: grid;
    min-width: 0;
    font-family: var(--glatam-font-family);
    color: var(--glatam-text);
    background-color: var(--glatam-bg);
    border-radius: var(--glatam-border-radius);
    padding: var(--glatam-padding);
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--glatam-border);
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    transition: background-color var(--glatam-transition-normal), border-color var(--glatam-transition-normal);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--glatam-padding);
    flex-wrap: wrap;
    gap: 12px;
  }

  .nav-group, .view-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-title {
    font-size: 1.25rem;
    font-weight: 600;
    min-width: 140px;
    text-align: center;
    letter-spacing: -0.01em;
  }

  .btn {
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid var(--glatam-border);
    background-color: var(--glatam-bg);
    color: var(--glatam-text);
    cursor: pointer;
    transition: background-color var(--glatam-transition-fast), border-color var(--glatam-transition-fast), transform var(--glatam-transition-fast);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
  }

  .btn:hover:not(:disabled) {
    background-color: var(--glatam-surface);
    border-color: var(--glatam-text-secondary);
  }

  .btn:active:not(:disabled) {
    transform: scale(0.97);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background-color: var(--glatam-primary);
    color: var(--glatam-text-light);
    border: none;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--glatam-primary-hover);
  }

  .btn-group {
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--glatam-border);
  }

  .btn-group .btn {
    border-radius: 0;
    border: none;
    border-right: 1px solid var(--glatam-border);
  }

  .btn-group .btn:last-child {
    border-right: none;
  }

  .btn-group .btn.active {
    background-color: var(--glatam-primary-light);
    color: var(--glatam-primary);
    font-weight: 600;
  }

  /* Timezone Selector Styles */
  .timezone-badge {
    font-size: 0.75rem;
    padding: 4px 8px;
    background: var(--glatam-surface);
    border: 1px solid var(--glatam-border);
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--glatam-text-secondary);
  }

  .timezone-select {
    background: transparent;
    border: none;
    color: var(--glatam-text);
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    padding-right: 4px;
  }

  /* Mini Popover Variant Styles */
  .dropdown-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .dropdown-toggle {
    width: 100%;
    justify-content: space-between;
    padding: 12px 16px;
    border-radius: 12px;
    font-weight: 600;
    height: 48px;
  }

  .dropdown-card {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 320px;
    background: var(--glatam-bg);
    border-radius: 16px;
    border: 1px solid var(--glatam-border);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
    z-index: 100;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .slot-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 220px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .slot-btn {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid var(--glatam-border);
    background: var(--glatam-bg);
    color: var(--glatam-text);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    text-align: center;
    transition: background-color var(--glatam-transition-fast);
  }

  .slot-btn:hover:not(.blocked) {
    background-color: var(--glatam-surface);
    border-color: var(--glatam-text-secondary);
  }

  .slot-btn.blocked {
    background-color: var(--glatam-surface);
    color: var(--glatam-blocked-text);
    text-decoration: line-through;
    cursor: not-allowed;
    border-color: var(--glatam-border);
    opacity: 0.6;
  }

  /* Smooth Apple Animation */
  .calendar-body {
    position: relative;
    width: 100%;
    overflow-x: auto;
    animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.995);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 600px) {
    :host {
      padding: 8px;
    }
    .calendar-header {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    .nav-group, .view-group {
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 6px;
    }
    .nav-title {
      flex: 1;
      font-size: 1.1rem;
      min-width: unset;
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .btn {
      font-size: 0.8rem;
      padding: 6px 10px;
      height: 32px;
      min-width: 32px;
    }
  }
`;
