import React, { useState } from 'react';
import { resendInvoice } from '@/services/invoice.service';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { FaArrowRotateLeft } from 'react-icons/fa6';

type Props = {
  invoiceId: string;
  invoiceNumber: string;
};

const ResendInvoiceButton: React.FC<Props> = ({ invoiceId, invoiceNumber }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await resendInvoice(invoiceId);
      toast.success(`Invoice ${invoiceNumber} resent successfully!`);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Failed to resend invoice ${invoiceNumber}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleResend} className="" disabled={isLoading}>
      {isLoading ? (
        <div className="animate-spin items-center px-5">
          <FaSpinner size={25} />
        </div>
      ) : (
        <div className="flex items-center">
          <FaArrowRotateLeft />
          Resend
        </div>
      )}
    </button>
  );
};

export default ResendInvoiceButton;
