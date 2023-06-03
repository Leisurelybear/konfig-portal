// src/components/Sidebar.js
import Tab from './Tab';

const tabs = [
    { label: '配置集合', to: '/configuration-set' },
    { label: '用户', to: '/user' },
    { label: '用户组', to: '/user-group' },
    { label: '日志', to: '/log' },
    { label: '权限', to: '/permission' },
];

const Sidebar = ({ visible, width }) => {
    if (!visible) return null;

    return (
        <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: width+'px', borderRight: '1px solid #ccc' }}>
            {tabs.map((tab) => (
                <Tab key={tab.label} label={tab.label} to={tab.to} />
            ))}
        </div>
    );

};

export default Sidebar;
