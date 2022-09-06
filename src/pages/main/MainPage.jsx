import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Table from '../../components/table/Table'
import Button from '../../components/UI/button/Button';
import Input from '../../components/UI/input/Input';
import { AuthContext } from '../../context';
import { MainForm, MainWrapper } from './styled';

const MainPage = () => {
    const {token} = useContext(AuthContext)
    const [longLink, setLongLink] = useState('')
    const [allLinksInfo, setAllLinksInfo] = useState([])

    async function getLinksInfo() {
        await axios({
            method: 'GET',
            url: 'http://79.143.31.216/statistics',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {order: 'asc_short', offset: '0', limit: '0'}
        })
        .then(response => {
            const getlinks = []
            for (let i = 0; i < response.data.length; i++) {
                getlinks.push({long: response.data[i].target, short: `http://79.143.31.216/s/${response.data[i].short}`, counter: response.data[i].counter, id: response.data[i].id})
            }
            setAllLinksInfo(getlinks)
        })
        .catch(error => {
            console.error('Error: ' , error.message);
        });
    }

    useEffect(() => {
        getLinksInfo()
    }, [])

    const squeeze = async (e) => {
        e.preventDefault()
        if (longLink) {
            await axios({
                method: 'POST',
                url: 'http://79.143.31.216/squeeze',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                params: {link: longLink}
            })
            .then(response => {
                setAllLinksInfo([...allLinksInfo, {long: longLink, short: `http://79.143.31.216/s/${response.data.short}`, counter: response.data.counter, id: response.data.id}])
                setLongLink('')
            })
            .catch(error => {
                console.error('Error: ' , error.message);
            });
        }
    }

    return (
        <MainWrapper>
            <MainForm>
                <Input type="text" placeholder="Введите ссылку..." value={longLink} onChange={e => setLongLink(e.target.value)} />
                <Button onClick={e => squeeze(e)}>конвертировать</Button>
            </MainForm>
            <Table allLinksInfo={allLinksInfo} setAllLinksInfo={setAllLinksInfo} />
        </MainWrapper>
    );
};

export default MainPage;