import { useState, createContext } from "react";

export const FormContext = createContext({ form: {} });

/**
 *
 * @param {children} children
 * @param {submit} submit function to submit the form and send api request
 * @param {Object} initialValues
 * @returns {Element}
 */
export function Form(props) {
    const { children, submit = () => {}, initialValues } = props;

    const [form, setForm] = useState(initialValues);

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleFormSelectChangeMulti = (name, selectedOptions) => {
        console.log(selectedOptions);
        const ids = [];

        selectedOptions.map(({ value }) => ids.push(value));

        setForm({
            ...form,
            [name]: ids,
        });
    };

    const handleFormSelectChangeSingle = (name, selectedOptions) => {
        setForm({ ...form, [name]: selectedOptions.value });
    };

    return (
        <form onSubmit={(e) => submit(e, form)}>
            <FormContext.Provider
                value={{
                    form,
                    handleFormChange,
                    handleFormSelectChangeMulti,
                    handleFormSelectChangeSingle,
                }}
            >
                {children}
            </FormContext.Provider>
        </form>
    );
}
