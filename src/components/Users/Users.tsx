import React, {FC, useEffect} from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import {FilterType, follow, requestUsers, unfollow} from '../../redux/users-reducer'
import {UserSearchForm} from './UserSearchForm'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors'
import {AppDispatch} from '../../redux/redux-store'
import {createSearchParams, useLocation, useNavigate,} from 'react-router-dom'
import { Pagination } from 'antd'

type PropsType = {}

export const Users: FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const users = useSelector(getUsers)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch: AppDispatch = useDispatch()

    const useNavigateSearch = () => {
        const navigate = useNavigate()
        return (pathname: string, params: any) =>
            navigate(`${pathname}?${createSearchParams(params)}`)
    }

    const navigateSearch = useNavigateSearch()
    const location = useLocation()

    useEffect(() => {
        const query = new URLSearchParams(location.search)

        let actualPage = currentPage
        let actualFilter = filter

        const queryFriend = query.get('friend')
        const queryPage = query.get('page')
        const queryTerm = query.get('term')

        if (queryPage) actualPage = +queryPage

        if (queryTerm)
            actualFilter = {...actualFilter, term: queryTerm}

        switch (queryFriend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
            default:
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [location.search])

    useEffect(() => {

        navigateSearch('/developers', {
            page: `${currentPage}`,
            count: `${pageSize}`,
            term: `${filter.term}`,
            friend: `${filter.friend}`,
        })

    }, [filter, currentPage, pageSize])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const unfollowTransit = (userId: number) => {
        dispatch(unfollow(userId))
    }
    const followTransit = (userId: number) => {
        dispatch(follow(userId))

    }

    return <div>

        <UserSearchForm onFilterChanged={onFilterChanged}/>
        <Pagination
            showSizeChanger
            showQuickJumper
            defaultCurrent={currentPage}
            total={totalUsersCount}
            onChange={onPageChanged}
            // showTotal={(total) => `Total ${total} items`}

            // totalUsersCount={totalUsersCount} currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize}
            // old pagination

        />
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     key={u.id}
                                     unfollow={unfollowTransit}
                                     follow={followTransit}
                />)
            }
        </div>
    </div>
}

