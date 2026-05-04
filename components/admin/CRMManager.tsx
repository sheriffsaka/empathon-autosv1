
import React, { useState, useEffect } from 'react';
import { MOCK_APPOINTMENTS, MOCK_PREORDERS, MOCK_INQUIRIES, MOCK_CORPORATE } from '../../utils/mockData';

interface CRMData {
  appointments: any[];
  preorders: any[];
  inquiries: any[];
  corporate: any[];
}

export const CRMManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [data, setData] = useState<CRMData>({ appointments: [], preorders: [], inquiries: [], corporate: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setData({
        appointments: MOCK_APPOINTMENTS,
        preorders: MOCK_PREORDERS,
        inquiries: MOCK_INQUIRIES,
        corporate: MOCK_CORPORATE
      });
    } catch (err: any) {
      console.error("Error fetching CRM data", err);
      setError(err.message || 'Failed to load CRM data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const TABS = [
    { id: 'appointments', label: 'Appointments' },
    { id: 'preorders', label: 'Pre-Orders' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'inquiries', label: 'Inquiries' },
  ];

  const renderTable = () => {
    if (loading) return <div className="p-8 text-center text-slate-500">Loading CRM data...</div>;
    
    let items: any[] = [];
    let columns: any[] = [];
    
    switch (activeTab) {
      case 'appointments':
        items = data.appointments;
        columns = [
          { header: 'Name', accessor: (i:any) => i?.fullName || 'N/A' },
          { header: 'Date', accessor: (i:any) => i?.appointmentDate ? new Date(i.appointmentDate).toLocaleDateString() : 'Pending' },
          { header: 'Type', accessor: (i:any) => i?.visitType || 'General' },
          { header: 'Contact', accessor: (i:any) => i?.email || '-' }
        ];
        break;
      case 'preorders':
        items = data.preorders;
        columns = [
          { header: 'Customer', accessor: (i:any) => i?.fullName || 'N/A' },
          { header: 'Vehicle', accessor: (i:any) => `${i?.brand || ''} ${i?.model || ''}`.trim() || 'Unknown' },
          { header: 'Color', accessor: (i:any) => i?.color || '-' },
          { header: 'Date', accessor: (i:any) => i?.createdAt ? new Date(i.createdAt).toLocaleDateString() : '-' }
        ];
        break;
      case 'corporate':
        items = data.corporate;
        columns = [
          { header: 'Company', accessor: (i:any) => i?.companyName || 'N/A' },
          { header: 'Contact', accessor: (i:any) => i?.contactPerson || '-' },
          { header: 'Fleet Size', accessor: (i:any) => i?.fleetSizeInterest || '0' },
          { header: 'Status', accessor: (i:any) => i?.status || 'Pending' }
        ];
        break;
      case 'inquiries':
        items = data.inquiries;
        columns = [
          { header: 'From', accessor: (i:any) => i?.name || 'N/A' },
          { header: 'Subject', accessor: (i:any) => i?.subject || 'General' },
          { header: 'Status', accessor: (i:any) => i?.status || 'New' },
          { header: 'Date', accessor: (i:any) => i?.createdAt ? new Date(i.createdAt).toLocaleDateString() : '-' }
        ];
        break;
    }

    if (items.length === 0) {
      return (
        <div className="p-12 text-center text-slate-500 bg-white/5 rounded-xl border border-dashed border-white/10">
          No records found for {activeTab}.
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-xs text-slate-400 uppercase tracking-widest">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="p-4 font-medium">{col.header}</th>
              ))}
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {items.map((item: any) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                {columns.map((col, idx) => (
                  <td key={idx} className="p-4 text-slate-300">{col.accessor(item)}</td>
                ))}
                <td className="p-4 text-right">
                   <button className="text-white hover:text-slate-300 transition-colors text-xs font-bold uppercase tracking-wider underline underline-offset-4">
                      Details
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-black/50 h-full flex flex-col">
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
          <button onClick={() => fetchData()} className="px-4 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-xs font-bold uppercase">
            Retry
          </button>
        </div>
      )}
      <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-black shadow-lg shadow-white/10' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden">
        {renderTable()}
      </div>
    </div>
  );
};
