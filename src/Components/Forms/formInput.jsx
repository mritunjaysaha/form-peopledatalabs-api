import { useContext, useRef } from "react";

import { FormContext } from "./index";

/**
 *
 * @param {*} props
 * @param {String} label
 * @param {String} type - default: text
 * @param {String} name
 * @param ...rest
 * @returns
 */
export function FormInput(props) {
    const { label, type = "text", name, ...rest } = props;

    const formContext = useContext(FormContext);
    const { form, handleFormChange } = formContext;

    const inputRef = useRef();

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <div>
                <input
                    ref={inputRef}
                    variant="outlined"
                    type={type}
                    id={name}
                    name={name}
                    placeholder={label}
                    value={form[name]}
                    onChange={handleFormChange}
                    {...rest}
                />
            </div>
        </div>
    );
}
