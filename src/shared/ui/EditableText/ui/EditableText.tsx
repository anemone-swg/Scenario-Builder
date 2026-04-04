import { type KeyboardEvent, memo, useCallback, useState } from "react";
import { clsx } from "clsx";

interface EditableTextProps {
  value: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  onSave: (newValue: string) => void;
}

const EditableText = ({
  value,
  placeholder = "",
  className = "",
  inputClassName = "",
  onSave,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const startEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setEditValue(value);
      setIsEditing(true);
    },
    [value],
  );

  const save = useCallback(() => {
    const trimmedValue = editValue.trim();
    if (trimmedValue && trimmedValue !== value) {
      onSave(trimmedValue);
    }
    setIsEditing(false);
  }, [editValue, value, onSave]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        save();
      } else if (e.key === "Escape") {
        setIsEditing(false);
        setEditValue(value);
      }
    },
    [save, value],
  );

  if (isEditing) {
    return (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={save}
        onKeyDown={handleKeyDown}
        className={clsx(
          "bg-transparent border-b border-(--input-color) outline-none text-center",
          inputClassName,
        )}
        placeholder={placeholder}
        autoFocus
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <div
      onClick={startEdit}
      className={clsx(
        "cursor-pointer hover:text-(--input-color) transition-colors",
        !value && "opacity-50",
        className,
      )}
    >
      {value || placeholder || "..."}
    </div>
  );
};

export default memo(EditableText);
