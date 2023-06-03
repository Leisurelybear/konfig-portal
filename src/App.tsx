// src/App.js
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ConfigurationSet from './pages/ConfigurationSet';
import User from './pages/User';
import UserGroup from './pages/UserGroup';
import Log from './pages/Log';
import Permission from './pages/Permission';
import './styles/ShowSidebarButton.css';

const App = () => {

    const sidebarWidth = 100

    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [mainMarginLeft, setMainMarginLeft] = useState(sidebarWidth)

    return (
        <Router>
            <div style={{display: 'flex', height: '100vh'}}>
                <Sidebar visible={sidebarVisible} width={sidebarWidth}/>
                <div style={{flex: 1, marginLeft: mainMarginLeft + 'px'}}>
                    <Routes>
                        <Route path="/configuration-set" element={<ConfigurationSet/>}/>
                        <Route path="/user" element={<User/>}/>
                        <Route path="/user-group" element={<UserGroup/>}/>
                        <Route path="/log" element={<Log/>}/>
                        <Route path="/permission" element={<Permission/>}/>
                    </Routes>
                    <div className="btn-show-sidebar">
                        <button onClick={() => {
                            setSidebarVisible(!sidebarVisible)
                            setMainMarginLeft(sidebarVisible ? 0 : sidebarWidth)
                        }}>
                            {sidebarVisible ? '隐藏边栏' : '显示边栏'}
                        </button>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
