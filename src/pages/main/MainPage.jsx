import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Pagination from '../../components/pagination/Pagination';
import Table from '../../components/table/Table'
import Button from '../../components/UI/button/Button';
import Input from '../../components/UI/input/Input';
import { AuthContext } from '../../context';
import { MainForm, MainWrapper } from './styled';

const MainPage = () => {
    const {token} = useContext(AuthContext)
    const [converted, setConverted] = useState(false)
    const [longLink, setLongLink] = useState('')
    const [allLinks, setAllLinks] = useState([])
    const [currentPageLinks, setCurrentPageLinks] = useState([])
    const [limit, setLimit] = useState(2);
    const [page, setPage] = useState(1);
    const [allPages, setAllPages] = useState(0)
    const [changePage, setChangePage] = useState(false)

    async function getAllCurrentPages() {
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
            setAllLinks(getlinks)
            setAllPages(Math.ceil(response.data.length / limit))
        })
    }
    async function getLinksInfo() {
        await axios({
            method: 'GET',
            url: 'http://79.143.31.216/statistics',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {order: 'asc_short', offset: page, limit: limit}
        })
        .then(response => {
            const getlinks = []
            for (let i = 0; i < response.data.length; i++) {
                getlinks.push({long: response.data[i].target, short: `http://79.143.31.216/s/${response.data[i].short}`, counter: response.data[i].counter, id: response.data[i].id})
            }
            setCurrentPageLinks(getlinks)
        })
    }

    useEffect(() => {
        getAllCurrentPages()
        getLinksInfo()
    }, [])

    useEffect(() => {
        if (changePage || converted) {
            getLinksInfo()
            getAllCurrentPages()
            setChangePage(false)
        }
    }, [changePage, converted])

    const squeeze = async (e) => {
        setConverted(true)
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
                setCurrentPageLinks([...currentPageLinks, {long: longLink, short: `http://79.143.31.216/s/${response.data.short}`, counter: response.data.counter, id: response.data.id}])
                setLongLink('')
            })
            .catch(error => {
                console.error('Error: ' , error.message);
            });
        }
        setConverted(false)
    }

    return (
        <MainWrapper>
            <MainForm>
                <Input type="text" placeholder="Введите ссылку..." value={longLink} onChange={e => setLongLink(e.target.value)} />
                <Button onClick={e => squeeze(e)}>КОНВЕРТИРОВАТЬ</Button>
            </MainForm>
            <Table currentPageLinks={currentPageLinks} setCurrentPageLinks={setCurrentPageLinks} />
            <Pagination allPages={allPages} page={page} setPage={setPage} setChangePage={setChangePage} />
        </MainWrapper>
    );
};

export default MainPage;