import { useState } from 'react';
import { FaCalendar, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

type Props = {
  invoiceId: string;
  onScheduleSuccess: (invoice: any) => void;
};

const ScheduleInvoiceForm = ({ invoiceId, onScheduleSuccess }: Props) => {
  const [recurrence, setRecurrence] = useState('none');
  const [isSaving, setIsSaving] = useState(false);

  const handleSchedule = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `http://localhost:8000/invoices/update-recurrence`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ invoiceId, recurrence }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        onScheduleSuccess(data.invoice);
        toast.success('Invoice schedule updated successfully');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to update invoice schedule: ${errorData.message}`);
      }
    } catch (error) {
      toast.error('Error scheduling invoice');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <select
        value={recurrence}
        onChange={(e) => setRecurrence(e.target.value)}
        disabled={isSaving}
      >
        <option value="none">None</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <button onClick={handleSchedule} disabled={isSaving}>
        <FaCalendarAlt className="ml-2 -mr-4 flex" size={20} color="yellow" />
      </button>
    </div>
  );
};

export default ScheduleInvoiceForm;
