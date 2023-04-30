import React, {Component, Suspense} from 'react';
import Preloader from '../common/Preloader/Preloader';

export function withSuspense <WCP extends object>(Component: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<Preloader />}>
            <Component {...props} />
        </Suspense>
    }
}