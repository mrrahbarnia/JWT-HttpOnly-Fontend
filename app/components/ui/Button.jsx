import classes from './Button.module.css';

const Button = (props) => {
    const classNames = `${classes.button} ${(props.className ? props.className : undefined)}`;
    return <button 
                className={classNames}
                type={props.type ? props.type : 'submit'}>
            {props.text ? props.text : 'Submit'}
        </button>
};

export default Button;