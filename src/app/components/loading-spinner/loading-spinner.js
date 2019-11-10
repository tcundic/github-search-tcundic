import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

import './loading-spinner.scss';

/**
 * Component which show animation during async network request loading.
 */
export const Spinner = () => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && (
            <div className="spinner">
                <Loader type="TailSpin" color="#66fcf1" height={100} width={100} />
            </div>
        )
    );
};
