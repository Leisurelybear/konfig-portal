import React, {useEffect, useState} from 'react';
import '../styles/ConfigsTableModal.css';

function TableModal({ collectionItem, show, onClose }) {
    const [configs, setConfigs] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    const fetchMoreData = async (collectionID) => {
        const params = {
            sort: 0,
            pageNum: 1,
            pageSize: 9999,
            name: "",
            collectionID: collectionID,
        };
        const queryString = Object.keys(params)
            .map((key) => key + '=' + encodeURIComponent(params[key]))
            .join('&');

        fetch(global.variable.host + `config/list?${queryString}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin'
            },
            body: JSON.stringify(params),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setConfigs(
                    data.configs.map((item) => ({
                        ID: item.ID,
                        name: item.name,
                        key: item.key,
                        value: item.value,
                        updatedBy: item.updatedBy,
                        updatedAt: new Date(parseInt(item.updatedAt) * 1000).toLocaleDateString(),
                    }))
                );
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        if (show){
            fetchMoreData(collectionItem.collectionID);
        }
    }, [collectionItem]);


    if (!show) return null;

    return (
        <div className="table-modal-overlay">
            <div className="table-modal-container">
                <div className="table-modal-header">
                    <h2>配置列表</h2>
                    <button onClick={onClose}>X</button>
                </div>
                <div>
                    <h4>集合名：[{collectionItem.collectionID}] {collectionItem.name}</h4>
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Updated By</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {configs.map((config, index) => (
                            <tr key={index}>
                                <td>{config.ID}</td>
                                <td>{config.key}</td>
                                <td>{config.value}</td>
                                <td>{config.updatedBy}</td>
                                <td>
                                    <button>Edit</button>
                                </td>
                                <td>
                                    <button className={'button-delete'}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}


export default TableModal;
