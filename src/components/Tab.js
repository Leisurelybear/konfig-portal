// src/components/Tab.js
import { Link, useLocation } from 'react-router-dom';
import '../styles/SidebarTab.css'

const Tab = ({ label, to }) => {
    const location = useLocation();
    const active = location.pathname === to;

    var clzName = 'my-link'
    if(active){
        clzName = 'my-link my-link--active'
    }

    return (
        <Link
            to={to}
            className={clzName}
        >
            {label}
        </Link>
    );
};

export default Tab;
