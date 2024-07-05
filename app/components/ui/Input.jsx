import { Fragment, useState } from "react";

const Input = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const onChange = (event) => {
        setEnteredValue(event.target.value);
    }
    return (
        <Fragment>
            <label className={props.labelClassName}>{props.label}</label>
            <input
                className={props.inputClassName} 
                value={props.value ? props.value : enteredValue}
                type={props.type} 
                name={props.name} 
                placeholder={props.placeHolder ? props.placeHolder : ''}
                onChange={props.onChange ? props.onChange : onChange}
            />
        </Fragment>
    )
};

export default Input;