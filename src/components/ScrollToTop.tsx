import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        // Scroll to the top whenever the route changes
        window.scrollTo(0, 0);
    }, [location]);

    return null; // This component doesn't render anything
}

export default ScrollToTop;