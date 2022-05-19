import { useEffect, useRef, useState, useMemo } from 'react';
import { Spinner } from "react-bootstrap"
import "./InViewportComponent.css"

const InViewportComponent = (element, rootMargin) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
            }, { rootMargin:"5px" }
        );

        element.current && observer.observe(element.current);

        return () => observer.unobserve(element.current);
    }, []);

    return isVisible
};
export default InViewportComponent