import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import PaginationInput from '../../components/pagination-input/PaginationInput';
import Pagination from '../../components/pagination/Pagination';
import Table from '../../components/table/Table'
import Button from '../../components/UI/button/Button';
import Input from '../../components/UI/input/Input';
import { AuthContext } from '../../context';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { MainForm, MainWrapper } from './styled';

const MainPage = () => {
    const {token, isAuth, setIsAuth} = useContext(AuthContext)
    const [converted, setConverted] = useState(false)
    const [longLink, setLongLink] = useState('')
    const [allLinks, setAllLinks] = useState([])
    const [currentPageLinks, setCurrentPageLinks] = useState([])
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useLocalStorage('page', 1);
    const [allPages, setAllPages] = useState(0)
    const [changePage, setChangePage] = useState(false)
    const [changeLimit, setChangeLimit] = useState(false)

    // получаем все имеюшиеся ссылки
    async function getAllCurrentPages() {
        await axios({
            method: 'GET',
            url: 'https://79.143.31.216/statistics',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'access-control-allow-origin': 'interest-cohort'
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

    // получаем конкретную страницу с ссылками
    async function getLinksInfo() {
        let offset;
        if (page === 1) {
            offset = 0
        } else if (page === 2){
            offset = 5
        } else {
            offset = limit * (page - 1)
        }
        await axios({
            method: 'GET',
            url: 'https://79.143.31.216/statistics',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'access-control-allow-origin': 'interest-cohort'
            },
            params: {order: 'asc_short', offset: offset, limit: limit}
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
        if (changePage || converted || changeLimit) {
            getLinksInfo()
            getAllCurrentPages()
            setChangePage(false)
            setChangeLimit(false)
        }
    }, [changePage, converted, changeLimit])

    // конвертация
    const squeeze = async (e) => {
        setConverted(true)
        e.preventDefault()
        if (longLink) {
            await axios({
                method: 'POST',
                url: 'https://79.143.31.216/squeeze',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'access-control-allow-origin': 'interest-cohort'
                },
                params: {link: longLink}
            })
            .then(response => {
                setAllLinks([...allLinks, {long: longLink, short: `http://79.143.31.216/s/${response.data.short}`, counter: response.data.counter, id: response.data.id}])
                setLongLink('')
            })
        }
        setConverted(false)
    }

    const logout = () => {
        localStorage.clear()
        setIsAuth(!isAuth)
    }

    return (
        <MainWrapper>
                <Button onClick={() => logout()} style={{position: 'absolute', top: 0, right: 10}}>
                    EXIT
                </Button>
            <MainForm>
                <Input type="text" placeholder="Вставьте ссылку..." value={longLink} onChange={e => setLongLink(e.target.value)} />
                <Button onClick={e => squeeze(e)}>КОНВЕРТИРОВАТЬ</Button>
                <PaginationInput allLinks={allLinks} setLimit={setLimit} setChangeLimit={setChangeLimit} />
            </MainForm>
            <Table currentPageLinks={currentPageLinks} setCurrentPageLinks={setCurrentPageLinks} />
            <Pagination allPages={allPages} page={page} setPage={setPage} setChangePage={setChangePage} />
        </MainWrapper>
    );
};

export default MainPage;