import React, { useState, useEffect } from 'react';
import { contactService } from '../../services/api';
import { ContactMessageItem } from '../../types';
import {
  Mail,
  Trash2,
  CheckCircle2,
  Search,
  Eye,
  X,
  Clock,
  User
} from 'lucide-react';

export const AdminContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMsg, setSelectedMsg] = useState<ContactMessageItem | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await contactService.getAll();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenDetail = async (msg: ContactMessageItem) => {
    setSelectedMsg(msg);
    if (!msg.isRead) {
      try {
        await contactService.markRead(msg.id, true);
        fetchMessages();
      } catch (err) {}
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this message?')) {
      try {
        await contactService.delete(id);
        fetchMessages();
        if (selectedMsg?.id === id) setSelectedMsg(null);
      } catch (err) {
        alert('Failed to delete message.');
      }
    }
  };

  const filtered = messages.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            Contact Messages & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Messages submitted through the public contact form from students, faculty, and industry partners.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          Total Messages: <span className="font-bold text-slate-900">{messages.length}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search message text, sender, subject..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading inquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Messages Received</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Inquiries sent from the Contact page will be routed directly to this inbox.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleOpenDetail(msg)}
                className={`p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                  !msg.isRead ? 'bg-blue-50/50 hover:bg-blue-50/80 font-medium' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      !msg.isRead
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {msg.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-slate-900">{msg.name}</span>
                      <span className="text-[11px] text-slate-400">&lt;{msg.email}&gt;</span>
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-800 font-semibold mt-0.5">{msg.subject || 'Inquiry'}</div>
                    <p className="text-xs text-slate-500 line-clamp-1 max-w-xl mt-0.5">{msg.message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs text-slate-400">
                  <span>{msg.receivedAt ? new Date(msg.receivedAt).toLocaleDateString() : ''}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(msg.id);
                    }}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL: Read Message --- */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-900">Inquiry Details</h3>
              <button
                onClick={() => setSelectedMsg(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 pt-4 text-xs text-slate-700">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="text-sm font-bold text-slate-900">{selectedMsg.name}</div>
                <div className="text-xs text-slate-600">Email: <a href={`mailto:${selectedMsg.email}`} className="text-blue-600 hover:underline">{selectedMsg.email}</a></div>
                <div className="text-xs text-slate-500 font-semibold pt-1">Subject: {selectedMsg.subject}</div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-1.5">Message Content:</h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 whitespace-pre-wrap leading-relaxed text-slate-700">
                  {selectedMsg.message}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject || 'CSI VFSTR Inquiry')}`}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                <button
                  onClick={() => setSelectedMsg(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
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
