import { useState, type ChangeEvent, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface Props {
  label: string
  name: string
  required?: boolean
  as?: 'input' | 'textarea'
  type?: string
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'required' | 'className' | 'placeholder' | 'onChange'>
  textareaProps?: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'name' | 'required' | 'className' | 'placeholder' | 'onChange'>
}

export function FloatingField({ label, name, required, as = 'input', type, inputProps, textareaProps }: Props) {
  const [filled, setFilled] = useState(false)
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilled(e.target.value.length > 0)
  const sharedClass =
    'peer w-full border-0 border-b border-secondary/25 bg-transparent px-0 py-3 text-sm text-navy placeholder-transparent outline-none focus:border-primary'

  return (
    <div className="relative">
      {as === 'textarea' ? (
        <textarea id={name} name={name} required={required} rows={4} placeholder={label} onChange={onChange} className={sharedClass} {...textareaProps} />
      ) : (
        <input id={name} name={name} required={required} type={type ?? 'text'} placeholder={label} onChange={onChange} className={sharedClass} {...inputProps} />
      )}
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 top-3 text-sm text-secondary transition-all duration-200 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary ${
          filled ? '-top-3.5 text-xs text-primary' : ''
        }`}
      >
        {label} {required && <span className="text-primary">*</span>}
      </label>
    </div>
  )
}
