'use client';

import React, { useState } from 'react';
import SideBar from './components/sideBar';
import MobileSideBar from './components/mobileSideBar';
import NavBar from './components/navBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [notif, setNotif] = useState(false);

  return (
    <>
      <div
        className="w-full h-full fixed"
        style={{ backgroundImage: 'url("/assets/image/pattern.png")' }}
      >
        <div className="flex flex-no-wrap">
          {/* Sidebar starts */}
          <SideBar />
          {/* Sidebar ends */}

          {/*Mobile responsive sidebar*/}
          <MobileSideBar show={show} setShow={setShow} />
          {/*Mobile responsive sidebar*/}

          <div className="w-full">
            {/* Navigation starts */}
            <NavBar
              show={show}
              setShow={setShow}
              profile={profile}
              setProfile={setProfile}
              notif={notif}
              setNotif={setNotif}
            />
            {/* Navigation ends */}

            <div className="h-full">
              <div className="w-full h-full rounded">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
