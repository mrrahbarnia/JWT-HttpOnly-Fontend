import classes from './Link.module.css';

const Link = (props) => {
    const classNames = `${classes.link} ${(props.className ? props.className : undefined)}`;
    return <a className={classNames}>{props.text}</a>
};

export default Link;