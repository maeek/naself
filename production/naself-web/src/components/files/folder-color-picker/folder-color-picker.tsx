'use client';
import { CSSProperties, MutableRefObject, useEffect, useRef, useState } from 'react';
import { IconColorPicker, IconFolderFilled, IconRestore } from '@tabler/icons-react';
import { DEFAULT_COLORS } from '@/components/common/colors';
import { useClickOutside } from '@/components/hooks/useClickOutside';
import './folder-color-picker.scss';

export interface FolderColorPickerProps {
  color?: string;
  colors?: string[];
  onChange?: (color: string) => void;
}

export const FolderColorPicker = ({ color = '#2387fa', colors = DEFAULT_COLORS, onChange }: FolderColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState(color);
  const [initialColor] = useState(color);
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const entryBtnRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  useClickOutside(() => setIsOpened(false), ref as MutableRefObject<HTMLDivElement>);

  useEffect(() => {
    if (color !== initialColor) setSelectedColor(color);
  }, [initialColor, color]);

  const onChangeColor = (newColor: string) => {
    setIsOpened(false);
    setSelectedColor(newColor);
    onChange?.(newColor);
    entryBtnRef.current?.focus();
  };

  return (
    <div
      className='folder-color-picker'
      ref={ref}
    >
      <div className='folder-color-picker__icon'>
        <IconFolderFilled style={{ color: selectedColor } as CSSProperties} />
        <button
          className='folder-color-picker__selected'
          style={{ backgroundColor: selectedColor } as CSSProperties}
          onClick={() => {
            setSelectedColor(initialColor);
            setIsOpened(prev => !prev);
          }}
        />
      </div>
      {isOpened && (
        <div className='folder-color-picker__colors'>
          <button
            className='folder-color-picker__restore'
            onClick={() => {
              setIsOpened(false);
              entryBtnRef.current?.focus();
            }}
          >
            <IconRestore />
          </button>
          <div className='folder-color-picker__colors_list'>
            {colors.map(c => (
              <button
                key={c}
                className='folder-color-picker__color'
                style={{ backgroundColor: c }}
                onClick={() => onChangeColor(c)}
              />
            ))}
            {!colors.includes(selectedColor) && (
              <button
                key={selectedColor}
                className='folder-color-picker__color'
                style={{ backgroundColor: selectedColor }}
                onClick={() => onChangeColor(selectedColor)}
              />
            )}
          </div>

          <button
            className='folder-color-picker__color_picker'
            onClick={() => {
              colorInputRef.current?.click();
            }}
          >
            <IconColorPicker />
            <input
              ref={colorInputRef}
              type='color'
              onChange={e => {
                setSelectedColor(e.target.value);
                onChange?.(e.target.value);
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
};
