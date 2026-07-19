import { css } from 'lit';

export const modalStyles = css`
  dialog {
    background: transparent;
    border: none;
    padding: 0;
    overflow: visible;
    outline: none;
    max-width: 100vw;
    max-height: 100vh;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .modal-content {
    background: var(--glatam-bg);
    color: var(--glatam-text);
    border-radius: 24px;
    padding: 28px;
    width: 90vw;
    max-width: 400px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    border: 1px solid var(--glatam-border);
    display: flex;
    flex-direction: column;
    gap: 18px;
    box-sizing: border-box;
    animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes zoomIn {
    from {
      transform: scale(0.92) translateY(10px);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
  h3 { margin: 0; font-size: 1.3rem; font-weight: 700; letter-spacing: -0.02em; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  label { font-size: 0.8rem; color: var(--glatam-text-secondary); font-weight: 600; }
  input[type="text"] {
    background: var(--glatam-surface);
    border: 1px solid var(--glatam-border);
    border-radius: 10px;
    padding: 10px 14px;
    color: var(--glatam-text);
    font-family: inherit;
    font-size: 0.9rem;
    outline: none;
    transition: border-color var(--glatam-transition-fast);
  }
  input[type="text"]:focus {
    border-color: var(--glatam-primary);
  }
  .switch-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
  }
  
  /* Apple Switch Style */
  .switch {
    position: relative;
    display: inline-block;
    width: 46px;
    height: 26px;
  }
  .switch input { opacity: 0; width: 0; height: 0; }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: var(--glatam-border);
    transition: .25s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 26px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .25s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }
  input:checked + .slider {
    background-color: var(--glatam-primary);
  }
  input:checked + .slider:before {
    transform: translateX(20px);
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
    margin-top: 4px;
  }
  .day-btn {
    width: 36px;
    height: 36px;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px solid var(--glatam-border);
    background: var(--glatam-bg);
    color: var(--glatam-text);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--glatam-transition-fast), color var(--glatam-transition-fast), border-color var(--glatam-transition-fast);
  }
  .day-btn:hover {
    background-color: var(--glatam-surface);
  }
  .day-btn.selected {
    background: var(--glatam-primary);
    color: var(--glatam-text-light);
    border-color: var(--glatam-primary);
  }
  .btn-actions { display: flex; gap: 10px; margin-top: 10px; justify-content: flex-end; }
  .btn {
    padding: 10px 18px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: opacity var(--glatam-transition-fast), transform var(--glatam-transition-fast);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .btn:active { transform: scale(0.97); }
  .btn-cancel { background: transparent; color: var(--glatam-text); border: 1px solid var(--glatam-border); }
  .btn-cancel:hover { background-color: var(--glatam-surface); }
  .btn-save { background: var(--glatam-primary); color: var(--glatam-text-light); }
  .btn-save:hover { opacity: 0.95; }
  .btn-danger {
    background: rgba(255, 69, 58, 0.12);
    color: #ff453a;
    margin-right: auto;
  }
  .btn-danger:hover {
    background: rgba(255, 69, 58, 0.18);
  }
`;
