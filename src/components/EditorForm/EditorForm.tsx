import React from 'react';
import styles from './EditorForm.module.css';

interface IEditorFormProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.SyntheticEvent) => void;
  onHideClick: (event: React.SyntheticEvent) => void;
  placeholder?: string;
  submitText?: string;
  value: string;
}

export function EditorForm({
  onChange,
  onSubmit,
  onHideClick,
  placeholder,
  submitText = 'Submit',
  value,
}: IEditorFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.editorForm}>
      <textarea
        autoFocus
        className={styles.editorFormField}
        onChange={onChange}
        rows={3}
        value={value}
        placeholder={placeholder}></textarea>
      <div className={styles.editorFormButtons}>
        <button className={styles.editorFormCreateButton} type="submit" title={submitText}>
          {submitText}
        </button>
        <button
          className={styles.editorFormCancelButton}
          type="button"
          title="Cancel"
          onClick={onHideClick}>
          <svg
            className={styles.editorFormCancelIcon}
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </form>
  );
}
