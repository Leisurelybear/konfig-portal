import React, {useEffect, useState} from 'react';
import Tile from '../components/Tile';
import TableModal from '../components/ConfigsTableModel';
import '../styles/TopNav.css'
import '../constants/global'

const ConfigurationSet = () => {
    const [showTable, setShowTable] = useState(false);
    const [data, setData] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchCreator, setSearchCreator] = useState('');
    const [configItem, setConfigItem] = useState(0);

    useEffect(() => {
        const params = {
            sort: 0,
            pageNum: 1,
            pageSize: 9999,
            name: searchName,
            createdBy: searchCreator,
        };
        const queryString = Object.keys(params)
            .map((key) => key + '=' + encodeURIComponent(params[key]))
            .join('&');

        fetch(global.variable.host+`collection/list?${queryString}`, {
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
                setData(
                    data.collections.map((item) => ({
                        name: item.name,
                        description: item.desc,
                        creator: item.createdBy,
                        date: new Date(parseInt(item.createdAt) * 1000).toLocaleDateString(),
                        configCount: item.configCount,
                        isOnline: !item.isDraft,
                        collectionID: item.ID,
                    }))
                );
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [searchName, searchCreator]);

    const handleSearch = () => {
        console.log("search")
    };

    const handleEdit = (configItem) => {
        setShowTable(true);
        setConfigItem(configItem)
    }

    return (
        <>
            <div >
                <nav>
                    <div onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="searchName">Search by Name:</label>
                        <input type="text" id="searchName" name="searchName" value={searchName}
                               onChange={(e) => setSearchName(e.target.value)}/>

                        <label htmlFor="searchCreator">Search by Creator:</label>
                        <input type="text" id="searchCreator" name="searchCreator" value={searchCreator}
                               onChange={(e) => setSearchCreator(e.target.value)}/>

                        <button type="button" onClick={handleSearch}>Search</button>
                    </div>
                </nav>

                {data.map((item, index) => (
                    <Tile key={index} {...item} onEdit={() => handleEdit(item)}/>
                ))}
            </div>

            <TableModal show={showTable} onClose={() => setShowTable(false)} collectionItem={configItem}/>
        </>
    );
};

export default ConfigurationSet;