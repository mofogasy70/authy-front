import { Input } from "antd"
import { FC, ReactNode } from "react"
import { Control, Controller, FormState } from "react-hook-form"
interface InputControllerProps {
    name: string;
    label: string;
    formState: any;
    control: any;
    type:
    'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | (string & {});
    prefix?: ReactNode;
    suffix?: ReactNode;
    className?: any
}
const InputController: FC<InputControllerProps> = ({ formState, label, name, control, type, prefix, suffix, className }) => {
    return (<><Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
            <div className="">
                {formState.errors[name] && (
                    <div className="text-red-500 text-xs">{formState.errors[name].message}</div>
                )}
                <input type="" />
                <Input
                    className={" rounded-sm h-10 " + className}
                    prefix={prefix}
                    suffix={suffix}
                    placeholder={label}
                    type={type}
                    {...field}
                />
            </div>
        )}
    /></>)
}
export default InputController;