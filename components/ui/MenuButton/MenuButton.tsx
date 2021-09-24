import cn from 'classnames';
import { FC, useState } from 'react'

import s from './menu-button.module.scss';

interface Props {
    defaultOpen?: boolean; 
    onClick: () => void
}

const MenuButton: FC<Props> = ({ defaultOpen = false, onClick }) => {
    const [open, setOpen] = useState(defaultOpen);
    const handleOnClick = () => {
        setOpen(!open)
        onClick()
    }

    return (
      <button className={cn(s.button, 'text-white fill-current', { [s.animate]: open === true })} aria-label="Toggle menu" onClick={handleOnClick}>
        <i className={cn(s.icon, s.iconClose)} aria-hidden="true"></i>
      </button>
    );
}

export default MenuButton;