import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Redirect } from 'react-router-dom'
import Friendlist from '../components/Friendlist'
import Msgboard from '../components/Msgboard'

export default function Chatwithfriends () {
  const params = useParams()
  const userProps = useSelector(state => state.userData)

  if (userProps.uid === null) {
    return <Redirect to='/login' />
  } else {
    return (
      <div className='d-flex'>
        <Friendlist userProps={userProps} hisUid={params.hisuid} />
        <Msgboard userProps={userProps} hisUid={params.hisuid} />
      </div>
    )
  }
}
