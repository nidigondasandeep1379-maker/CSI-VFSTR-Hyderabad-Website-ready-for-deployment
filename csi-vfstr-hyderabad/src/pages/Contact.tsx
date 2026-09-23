import React, { useState } from 'react';
import { useSiteSettings } from '../layouts/PublicLayout';
import { contactService } from '../services/api';
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Linkedin,
  Github,
  Instagram,
  Youtube,
  CheckCircle2,
  Building,
  ExternalLink
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { settings } = useSiteSettings();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const address =
    settings?.contact?.address ||
    "Vignan's Foundation for Science, Technology and Research (VFSTR), Hyderabad Campus, Deshmukhi, Telangana 508284, India";
  const email = settings?.contact?.email || 'csi@vfstrhyd.ac.in';
  const phone = settings?.contact?.phone || '+91 80080 00000';
  const socialLinks = settings?.contact?.socialLinks;
  const mapEmbedUrl =
    settings?.contact?.mapEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.225134706917!2d78.7143697!3d17.3425151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb0b001c75ae6b%3A0xc419a613794f4d3e!2sVignan%20University!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin';
  const mapDirectUrl =
    settings?.contact?.mapDirectUrl ||
    'https://www.google.com/maps/place/Vignan+University/@17.3421686,78.7157544,18.53z/data=!4m6!3m5!1s0x3bcb0b001c75ae6b:0xc419a613794f4d3e!8m2!3d17.3425151!4d78.7165579!16s%2Fg%2F11y5_pf7ww';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSending(true);
    setErrorMsg('');

    try {
      await contactService.submit(formData);
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-slate-50 py-12 min-h-[85vh]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Get In Touch
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900">
            Contact CSI Chapter
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Have questions about events, workshops, partnerships, or memberships? Reach out to our student executive body or faculty coordinators.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-10 border border-navy-800 shadow-xl relative overflow-hidden">
              <div className="tech-glow-circle w-64 h-64 bg-blue-600/20 -top-10 -right-10" />

              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/assets/csi_logo.png"
                  alt="CSI Logo"
                  className="w-12 h-12 object-contain rounded-full bg-white p-1"
                />
                <div>
                  <h3 className="font-display font-bold text-base text-white">Computer Society of India</h3>
                  <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">VFSTR Hyderabad Chapter</p>
                </div>
              </div>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-navy-800 text-cyan-400 shrink-0 border border-navy-700">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-0.5">Institution</h4>
                    <p className="text-xs text-slate-300">Vignan's Foundation for Science, Technology and Research (VFSTR)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-navy-800 text-cyan-400 shrink-0 border border-navy-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-0.5">Campus Address</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-navy-800 text-cyan-400 shrink-0 border border-navy-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-0.5">Official Email</h4>
                    <a href={`mailto:${email}`} className="text-xs text-cyan-300 hover:underline">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-navy-800 text-cyan-400 shrink-0 border border-navy-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-0.5">Phone & Helpline</h4>
                    <p className="text-xs text-slate-300">{phone}</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-navy-800">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Connect on Social Media
                </h4>
                <div className="flex items-center space-x-3">
                  {socialLinks?.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-navy-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400 transition-colors border border-navy-700"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks?.github && (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-navy-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400 transition-colors border border-navy-700"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks?.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-navy-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400 transition-colors border border-navy-700"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks?.youtube && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-navy-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400 transition-colors border border-navy-700"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-md">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">
                Send an Inquiry
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the form below and our team will get back to you shortly.
              </p>

              {sent ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900">Message Delivered</h3>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Thank you for reaching out! We have received your inquiry and will respond via email.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Workshop Registration Query / Speaker Invitation"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message here..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {sending ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Campus Location Map */}
        {mapEmbedUrl && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Campus Map Location</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Vignan University (VFSTR), Hyderabad Campus, Deshmukhi
                </p>
              </div>

              <a
                href={mapDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors border border-blue-200 shadow-sm w-fit"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <iframe
                title="VFSTR Hyderabad Campus Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
