import React from 'react';
import Icon from '../common/Icon.jsx';

export default function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="p-space-lg bg-inverse-surface text-inverse-on-surface flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <img
              src="/avatar.png"
              alt="Dr. Elena Vance"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary-fixed"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNDFquVsNw0poZCHuH6vDpIP-Vft_uE25rDnrYMeeGCFUKncq6BDgmxrfrobB-w0PjMztAR3OtVwTvcS2IapYmaudKHVg0dTaDX_aVOXLwDzqFho2wfMsph33S2_FX381RDWyW8XfmOOfdHm9Gdk524-J2vRNz8ErN-YgxugGXuDKLOwJhZs0Y9dfe_-FVVgTY_E4q-7tqpeLULVKAeJj3Gr1zsoxqmRLLuFZURmEIl8sYxxelvQ';
              }}
            />
            <div>
              <h3 className="font-headline-sm text-headline-sm text-surface-bright leading-tight">
                Dr. Elena Vance
              </h3>
              <p className="font-label-sm text-label-sm text-outline-variant">
                Transit Director • Command Authority
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline-variant hover:text-surface-bright hover:bg-tertiary-container/40 transition-colors"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-space-lg space-y-space-md">
          <div className="grid grid-cols-2 gap-space-sm font-body-sm text-body-sm">
            <div className="p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Department</span>
              <strong className="text-on-surface font-semibold">Urban Transit & Roads</strong>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Badge / ID</span>
              <strong className="text-on-surface font-semibold font-mono">DIR-8820-AI</strong>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Clearance Level</span>
              <strong className="text-primary font-semibold">Tier 1 Autonomous</strong>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Session Status</span>
              <strong className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
              </strong>
            </div>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container-low border border-outline-variant/20 text-body-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant block">Assigned Sector Responsibilities</span>
            <p className="mt-1 text-on-surface">
              Overseeing 284 instrumented public buses scanning road surfaces across Sectors 1 through 5.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-space-md bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">SIH 2026 Prototype Console</span>
          <button
            onClick={onClose}
            className="px-space-md py-space-xs bg-primary-container text-on-primary rounded-lg text-label-sm font-semibold hover:bg-primary transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
