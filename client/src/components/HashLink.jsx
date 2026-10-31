import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToId } from '../lib/scroll.js';

/**
 * Anchor that behaves correctly for both route links ("/") and in-page sections ("/#fleet").
 */
export function HashLink({ to, children, onClick, ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (!to.startsWith('/#')) {
      if (to === '/' && location.pathname === '/') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    event.preventDefault();
    const id = to.slice(2);
    if (location.pathname === '/') {
      scrollToId(id);
      window.history.replaceState(null, '', to);
    } else {
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
