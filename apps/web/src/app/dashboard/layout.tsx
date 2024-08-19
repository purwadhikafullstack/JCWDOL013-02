'use client';

import React, { useState } from 'react';
import SideBar from '../../components/dashboard/sideBar';
import MobileSideBar from '../../components/dashboard/mobileSideBar';
import NavBar from '../../components/dashboard/navBar';

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
        className="w-full h-full relative tracking-tighter"
        style={{
          backgroundImage: 'url("/assets/image/pattern.png")',
          height: '190vh',
        }}
      >
        <div className="flex flex-no-wrap">
          <SideBar />
          <MobileSideBar show={show} setShow={setShow} />
          <div className="w-full">
            <NavBar
              show={show}
              setShow={setShow}
              profile={profile}
              setProfile={setProfile}
              notif={notif}
              setNotif={setNotif}
            />
            <div className="h-full">
              <div className="lg:w-4/5 w-full h-full rounded lg:ml-72">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
