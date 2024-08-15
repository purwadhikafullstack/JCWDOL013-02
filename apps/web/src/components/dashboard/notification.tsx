import React from 'react';

type Props = {
  notif: boolean;
  setNotif: React.Dispatch<React.SetStateAction<boolean>>;
};

const Notification = ({ notif, setNotif }: Props) => {
  return (
    <div className="flex items-center relative cursor-pointer">
      {notif && (
        <div className="absolute top-full right-0 mt-2 bg-white border rounded shadow-md text-lg w-60 h-60 text-center">
          <p className="py-20">No new notifications</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
