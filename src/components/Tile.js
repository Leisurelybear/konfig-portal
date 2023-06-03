import React from 'react';
import '../styles/Tile.css';

const Tile = ({
                  name,
                  description,
                  creator,
                  date,
                  configCount,
                  isOnline,
                  onEdit,
              }) => {
    return (
        <div className="tile-container">
            <div className="tile-content">
                <div className="tile-header">
                    <h3>{name}</h3>
                    <div>
                        <button className="tile-button" onClick={onEdit}>
                            编辑
                        </button>
                        <button
                            className="tile-button"
                            onClick={() => {
                                // 在这里添加删除按钮的点击事件
                            }}
                        >
                            删除
                        </button>
                    </div>
                </div>
                <p>{description}</p>
                <p>创建者：{creator}</p>
                <p>创建时间：{date}</p>
                <p>配置个数：{configCount}</p>
                <div className="tile-status">
                    <span style={{ marginRight: 5 }}>是否上线：</span>
                    <span
                        style={{
                            width: 15,
                            height: 15,
                            borderRadius: 10,
                            backgroundColor: isOnline ? 'green' : 'red',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Tile;
