import { useEffect, useRef, useState, useMemo } from 'react';
import { Spinner } from "react-bootstrap"
import "./InViewportComponent.css"

export default function App({fetchMoreData, isFetchingData, hasMoreVans}) {
    const ref1 = useRef(null);
    const ref2 = useRef(null);

    const isInViewport1 = useIsInViewport(ref1);
    if(isInViewport1 && !isFetchingData && hasMoreVans) fetchMoreData()
    if (isInViewport1 && !isFetchingData) fetchMoreData()
    console.log('isInViewport1: ', isInViewport1);

    const isInViewport2 = useIsInViewport(ref2);
    console.log('isInViewport2: ', isInViewport2);

    return (
        <div>
            <div ref={ref1}></div>
            <div className="spinnerContainer">
                <Spinner className="mySpinner" animation="border" size="xl" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
           

            <div style={{ height: '10rem' }} />

            <div ref={ref2}></div>
        </div>
    );
}

function useIsInViewport(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
        () =>
            new IntersectionObserver(([entry]) =>
                setIsIntersecting(entry.isIntersecting),
            ),
        [],
    );

    useEffect(() => {
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, observer]);

    return isIntersecting;
}