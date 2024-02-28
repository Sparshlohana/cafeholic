import { Link, useLocation } from 'react-router-dom';

const AccountNav = () => {
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role;
  let subpage = pathname.split('/')?.[2];

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const linkClases = (type = null) => {
    let classes =
      'flex justify-center mx-10 md:mx-0 gap-1 py-2 px-6 rounded-full';
    if (type === subpage) {
      classes += ' bg-primary text-white';
    } else {
      classes += ' bg-gray-200';
    }
    return classes;
  };
  return (
    <nav className="mt-24 mb-8 flex w-full flex-col justify-center gap-2 p-8 md:flex-row md:p-0">
      <Link className={linkClases('profile')} to={'/account'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        My Profile
      </Link>

      <Link className={linkClases('bookings')} to={`/account/bookings`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        My bookings
      </Link>
      <Link className={linkClases('cafe')} to={'/account/cafe'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
          />
        </svg>
        My Cafes
      </Link>
      {userRole === "admin" && <Link className={linkClases('cafe-request')} to={'/account/cafe-request'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={30}
          viewBox="0 0 256 256"
          space="preserve"
        >
          <defs />
          <g
            style={{
              stroke: "none",
              strokeWidth: 0,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "none",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
          >
            <path
              d="M 59.593 0 C 44.749 0 32.716 12.033 32.716 26.876 c 0 5.718 1.791 11.014 4.835 15.371 l -4.835 11.505 l 11.505 -4.835 c 4.357 3.044 9.653 4.835 15.371 4.835 c 14.843 0 26.876 -12.033 26.876 -26.876 C 86.469 12.033 74.436 0 59.593 0 z M 61.814 42.907 c -0.587 0.586 -1.392 0.921 -2.219 0.921 s -1.633 -0.335 -2.219 -0.921 c -0.146 -0.147 -0.282 -0.304 -0.398 -0.481 c -0.115 -0.168 -0.21 -0.345 -0.283 -0.544 c -0.083 -0.189 -0.146 -0.387 -0.178 -0.586 c -0.042 -0.199 -0.062 -0.408 -0.062 -0.607 c 0 -0.21 0.02 -0.418 0.062 -0.617 c 0.032 -0.199 0.095 -0.398 0.178 -0.586 c 0.074 -0.189 0.168 -0.377 0.283 -0.544 c 0.115 -0.168 0.251 -0.335 0.398 -0.481 c 1.162 -1.162 3.265 -1.162 4.437 0 c 0.146 0.146 0.272 0.314 0.387 0.481 c 0.114 0.167 0.208 0.356 0.292 0.544 c 0.074 0.188 0.137 0.387 0.178 0.586 c 0.042 0.199 0.063 0.408 0.063 0.617 C 62.735 41.515 62.4 42.321 61.814 42.907 z M 68.57 20.135 c 0 2.351 -0.902 4.573 -2.543 6.259 l -4.341 4.102 v 1.849 c 0 1.156 -0.937 2.093 -2.093 2.093 S 57.5 33.501 57.5 32.345 v -2.751 c 0 -0.576 0.237 -1.126 0.656 -1.522 l 4.934 -4.659 c 0.811 -0.838 1.294 -2.024 1.294 -3.279 v -0.183 c 0 -1.303 -0.514 -2.522 -1.448 -3.432 c -0.933 -0.91 -2.178 -1.407 -3.471 -1.358 c -2.572 0.066 -4.664 2.285 -4.664 4.944 c 0 1.156 -0.937 2.093 -2.093 2.093 c -1.156 0 -2.093 -0.937 -2.093 -2.093 c 0 -4.909 3.921 -9.005 8.742 -9.129 c 2.434 -0.055 4.752 0.841 6.501 2.545 c 1.749 1.705 2.712 3.988 2.712 6.43 V 20.135 z"
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 10,
                fill: "rgb(0,0,0)",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
            <path
              d="M 17.399 67.091 L 17.399 67.091 c -5.111 0 -9.254 -4.143 -9.254 -9.254 v -6.032 c 0 -5.111 4.143 -9.254 9.254 -9.254 h 0 c 5.111 0 9.254 4.143 9.254 9.254 v 6.032 C 26.653 62.948 22.51 67.091 17.399 67.091 z"
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 10,
                fill: "rgb(0,0,0)",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
            <path
              d="M 31.268 90 v -9.04 c 0 -7.659 -6.209 -13.868 -13.868 -13.868 h 0 C 9.74 67.091 3.531 73.3 3.531 80.96 V 90 H 31.268 z"
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 10,
                fill: "rgb(0,0,0)",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
          </g>
        </svg>
        Cafe Request
      </Link>}
      {(userRole === "admin" || userRole === "vendor") && <Link className={linkClases('all-bookings')} to={`/account/all-bookings`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        All Bookings
      </Link>}
    </nav>
  );
};

export default AccountNav;
