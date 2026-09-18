import React, { useState, useEffect } from 'react';
import { membershipService } from '../../services/api';
import { MembershipSubmission } from '../../types';
import {
  UserPlus,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Eye,
  X,
  Mail,
  Phone,
  FileText
} from 'lucide-react';

export const AdminMembership: React.FC = () => {
  const [requests, setRequests] = useState<MembershipSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState<MembershipSubmission | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await membershipService.getAll();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await membershipService.updateStatus(id, newStatus);
      fetchRequests();
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({ ...selectedRequest, status: newStatus as any });
      }
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Remove application from ${name}?`)) {
      try {
        await membershipService.delete(id);
        fetchRequests();
        if (selectedRequest?.id === id) setSelectedRequest(null);
      } catch (err) {
        alert('Failed to delete application.');
      }
    }
  };

  const filtered = requests.filter((r) => {
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            Membership Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review student registrations, check academic credentials, and update membership verification status.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          Total Applications: <span className="font-bold text-slate-900">{requests.length}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, roll no, dept..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status filter pills */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['All', 'Pending', 'Approved', 'Contacted', 'Rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading applications...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <UserPlus className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Membership Applications</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Applications submitted through the public "Membership" page will appear here for verification.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Roll Number</th>
                  <th className="p-4">Dept & Year</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{req.name}</div>
                        <div className="text-[11px] text-slate-400">{req.email}</div>
                        {req.phone && <div className="text-[10px] text-slate-500">{req.phone}</div>}
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-800">
                      {req.rollNumber}
                    </td>
                    <td className="p-4 font-medium text-slate-700">
                      <div>{req.department}</div>
                      <div className="text-[11px] text-slate-400">{req.year}</div>
                    </td>
                    <td className="p-4">
                      <select
                        value={req.status || 'Pending'}
                        onChange={(e) => handleUpdateStatus(req.id!, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          req.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : req.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : req.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title="View Application Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(req.id!, req.name)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- MODAL: View Application Detail --- */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-900">Applicant Details</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 pt-4 text-xs text-slate-700">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-base font-bold text-slate-900">{selectedRequest.name}</div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{selectedRequest.email}</span>
                </div>
                {selectedRequest.phone && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>{selectedRequest.phone}</span>
                  </div>
                )}
                <div className="font-semibold text-slate-800 pt-1">
                  Roll No: <span className="font-mono text-blue-700">{selectedRequest.rollNumber}</span>
                </div>
                <div>
                  Department: <span className="font-semibold">{selectedRequest.department}</span> • Year: <span className="font-semibold">{selectedRequest.year}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Why do you want to join CSI?</span>
                </h4>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed text-slate-600 italic">
                  "{selectedRequest.reason || 'No specific reason provided.'}"
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">Status:</span>
                  <select
                    value={selectedRequest.status || 'Pending'}
                    onChange={(e) => handleUpdateStatus(selectedRequest.id!, e.target.value)}
                    className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
