import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectionRouter = ({ children }) => {

    const { isAuthentication } = useSelector((reducer) => reducer.auth);

    if (!isAuthentication) {
        return <Navigate to='/login' />
    }

    return <>{children}</>
}

export default ProtectionRouter;
