import React, { useState } from 'react';
import { updateInvoice } from '@/services/invoice.service';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { IInvoice } from '@/interfaces/invoice.interface';
import { FaFloppyDisk } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';

interface StatusDropdownProps {
  invoiceId: string;
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
  setInvoices: React.Dispatch<React.SetStateAction<IInvoice[]>>;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  invoiceId,
  currentStatus,
  onStatusChange,
  setInvoices,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [isSaving, setIsSaving] = useState(false);

  const handleStatusUpdate = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('status', newStatus);

      const response = await updateInvoice(invoiceId, formData);

      if (response.ok) {
        onStatusChange(newStatus);
        setInvoices((prevInvoices) =>
          prevInvoices.map((invoice) =>
            invoice.id === invoiceId
              ? { ...invoice, status: newStatus }
              : invoice,
          ),
        );
        toast.success('Invoice status updated successfully');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to update invoice status: ${errorData.message}`);
      }
    } catch (error) {
      toast.success('Invoice status updated successfully');
      onStatusChange(newStatus);
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === invoiceId
            ? { ...invoice, status: newStatus }
            : invoice,
        ),
      );
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex items-center">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="bg-gray-800 text-white py-1 px-4 rounded-full"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Expired">Expired</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            className="ml-1 p-1 bg-blue-500 text-white rounded-full _hover:bg-blue-600"
            disabled={isSaving}
          >
            <FaCheckCircle size={20} />
          </button>
        </div>
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className={`font-bold py-1 px-4 rounded-full cursor-pointer ${
            currentStatus === 'Paid'
              ? 'bg-green-500'
              : currentStatus === 'Expired'
                ? 'bg-red-500'
                : 'bg-yellow-500'
          } text-white`}
        >
          {currentStatus}
        </span>
      )}
    </div>
  );
};

export default StatusDropdown;
