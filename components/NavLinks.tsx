'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/meetings',
    label: 'Meetings',
  },
  {
    href: '/meetings/current',
    label: 'Current Meeting',
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [isCurrentMeeting, setIsCurrentMeeting] = useState(false);

  useEffect(() => {
    const current =
      window.location.pathname === '/meetings/current' ||
      (window.location.pathname.startsWith('/meetings/') &&
        new URLSearchParams(window.location.search).get('current') ===
          'true');

    setIsCurrentMeeting(current);
  }, [pathname]);

  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-slate-200 bg-slate-50"
    >
      <div className="mx-auto flex max-w-6xl gap-2 px-6 py-3">
        {links.map((link) => {
          let isActive = false;

          if (link.href === '/') {
            isActive = pathname === '/';
          } else if (link.href === '/meetings/current') {
            isActive = isCurrentMeeting;
          } else if (link.href === '/meetings') {
            isActive =
              pathname === '/meetings' ||
              (pathname.startsWith('/meetings/') &&
                !isCurrentMeeting);
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
