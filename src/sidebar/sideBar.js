// Sidebar.js
import React from 'react';
import MemeComponent from '../memes/meme';


const Sidebar = () => {
    return (
        <aside className="sidebar card">
            <h2>Meme Section</h2>
            <MemeComponent />
        </aside>
    );
};

export default Sidebar;
