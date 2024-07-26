import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Error from "../../pages/Error";
import {publicRoutes, privateRoutes} from "../../router";
import Login from "../../pages/Login";
import {AuthContext} from "../../context";
import Loader from "./Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    if (isLoading) {
        return <Loader/>
    }
    return (
        isAuth
            ?
                <Routes>
                    {privateRoutes.map(route =>
                        <Route
                            element={route.component}
                            path={route.path}
                            key={route.path}
                        />
                    )}
                    <Route path="*" element={<Error />}/>
                </Routes>
            :
                <Routes>
                    {publicRoutes.map(route =>
                       <Route
                            element={route.component}
                            path={route.path}
                            key={route.path}
                       />
                    )}
                <Route path="*" element={<Login />}/>
                </Routes>
    );
};

export default AppRouter;