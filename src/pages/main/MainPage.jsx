import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
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
    const [limit, setLimit] = useLocalStorage('limit', 5);
    const [page, setPage] = useLocalStorage('page', 1);
    // const [offset, setOffset] = useLocalStorage('offset', 0)
    const [allPages, setAllPages] = useState(0)
    const [changePage, setChangePage] = useState(false)
    const [changeLimit, setChangeLimit] = useState(false)
    const [sortByLong, setSortByLong] = useState(false)
    const [sortByShort, setSortByShort] = useState(false)
    const [sortByCounter, setSortByCounter] = useState(false)

    const url = new URL('http://79.143.31.216/statistics')
    let params = new URLSearchParams(url.search)

    // получаем все имеюшиеся ссылки
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

    // получаем конкретную страницу с ссылками
    async function getLinksInfo() {
        await axios({
            method: 'GET',
            url: 'http://79.143.31.216/statistics',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: params,
        })
        .then(response => {
            const getlinks = []
            for (let i = 0; i < response.data.length; i++) {
                getlinks.push({long: response.data[i].target, short: `http://79.143.31.216/s/${response.data[i].short}`, counter: response.data[i].counter, id: response.data[i].id})
            }
            setCurrentPageLinks(getlinks)
        })
    }

    // конвертация
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
                setAllLinks([...allLinks, {long: longLink, short: `http://79.143.31.216/s/${response.data.short}`, counter: response.data.counter, id: response.data.id}])
                setLongLink('')
                getAllCurrentPages()
                getLinksInfo()
            })
        }
        setConverted(false)
    }

    // при первом запуске
    useEffect(() => {
        getAllCurrentPages() // получаем все элементы
        params.append('offset', 0) // открываем 1 страницу
        params.append('limit', 5) // дефолтный лимит - 5
        getLinksInfo() // получаем элементы 1 страницы
    }, [])

    // меняем страницы
    function onChangePageOrLimit(page, limit) {
        const currentPage = page
        const currentLimit = limit
        let offset;
        if (currentPage === 1) {
            offset = 0
        } else if (currentPage === 2){
            offset = 5
        } else {
            offset = currentLimit * (currentPage - 1)
        }
        params.set('offset', offset)
        params.set('limit', currentLimit)
    }

    // сортируем
    function onChangeSort() {
        let sort = []
        // target - изначально | все - false | только по длинной
        if ((!sortByCounter && !sortByLong && !sortByShort)
        || (!sortByCounter && sortByLong && !sortByShort)) {
            sort = ['asc_target']
            params.delete('order', 'asc_short')
            params.delete('order', 'asc_counter')
        }
        // если только по счетчику
        if (sortByCounter && !sortByLong && !sortByShort) {
            sort = ['asc_counter']
            params.delete('order', 'asc_short')
            params.delete('order', 'asc_target')
        }
        // если только по короткой
        if (!sortByCounter && !sortByLong && sortByShort) {
            sort = ['asc_short']
            params.delete('order', 'asc_target')
            params.delete('order', 'asc_counter')
        }
        // если по короткой и по длинной
        if (!sortByCounter && sortByLong && sortByShort) {
            sort = ['asc_short', 'asc_target']
            params.delete('order', 'asc_counter')
        }
        // если по короткой и по счетчику
        if (sortByCounter && !sortByLong && sortByShort) {
            sort = ['asc_short', 'asc_counter']
            params.delete('order', 'asc_target')
        }
        // если по длинной и по счетчику
        if (sortByCounter && sortByLong && !sortByShort) {
            sort = ['asc_target', 'asc_counter']
            params.delete('order', 'asc_short')
        }
        // если по длинной и по короткой и по счетчику
        if (sortByCounter && sortByLong && sortByShort) {
            sort = ['asc_short', 'asc_target', 'asc_counter']
        }
        sort.forEach(i => {
            params.append('order', i)
        })
    }
    
    // если меняется лимит/страница/сортировка:
    useEffect(() => {
        onChangePageOrLimit(page, limit)
        onChangeSort()
        getLinksInfo()
    }, [page, limit, sortByCounter, sortByLong, sortByShort])

    // если добавляем новую ссылку/меняем страницу/лимит ---> сортировка на стороне сервера
    useEffect(() => {
        if (changePage || converted || changeLimit) {
            getLinksInfo() // получаем элем тек страницы
            getAllCurrentPages() // все элем
            setChangePage(false)
            setChangeLimit(false)
        }
    }, [changePage, converted, changeLimit])

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
            <Table 
            currentPageLinks={currentPageLinks} 
            setCurrentPageLinks={setCurrentPageLinks} 
            sortByCounter={sortByCounter}
            setSortByCounter={setSortByCounter}
            sortByLong={sortByLong}
            setSortByLong={setSortByLong}
            sortByShort={sortByShort}
            setSortByShort={setSortByShort}
            />
            <Pagination allPages={allPages} page={page} setPage={setPage} setChangePage={setChangePage} />
        </MainWrapper>
    );
};

export default MainPage;