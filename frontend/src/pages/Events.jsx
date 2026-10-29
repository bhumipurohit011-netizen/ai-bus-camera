import React, { useState, useEffect } from 'react';
import Icon from '../components/common/Icon.jsx';
import EventRow from '../components/cards/EventRow.jsx';
import { fetchEvents, createEvent } from '../api/client.js';

export default function Events({ onSelectEvent, searchQuery = '' }) {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('pothole');
  const [newSeverity, setNewSeverity] = useState('Urgent');
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle) return;
    const created = await createEvent({
      title: newTitle,
      type: newType,
      severity: newSeverity,
      location: newLocation || 'Reported Incident Corridor',
      busId: 'BUS-017',
      confidence: 95,
      lat: 12.9716,
      lng: 77.5946,
    });
    setEvents([created, ...events]);
    setShowAddModal(false);
    setNewTitle('');
    setNewLocation('');
  };

  const displayedEvents = events.filter((evt) => {
    if (filterType !== 'all' && evt.type !== filterType) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      evt.title.toLowerCase().includes(q) ||
      evt.busId.toLowerCase().includes(q) ||
      evt.location.toLowerCase().includes(q) ||
      evt.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-space-md">
      {/* Header */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-wrap items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs">
            <Icon name="event_available" size={24} className="text-primary" />
            <h2 className="font-headline-md text-headline-md text-on-surface">
              All Road Telemetry Events & Defect Audit Feed
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Chronological log of potholes, structural cavities, road waterlogging, and traffic incidents detected by bus cameras.
          </p>
        </div>

        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1.5 hover:bg-primary transition-colors shadow-sm"
          >
            <Icon name="add" size={18} />
            <span>Report Road Defect</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-lowest p-space-sm rounded-xl border border-outline-variant/30 text-label-sm font-label-sm">
        <span className="text-on-surface-variant font-bold pr-2">Filter Category:</span>
        {[
          { id: 'all', label: 'All Defects' },
          { id: 'pothole', label: 'Potholes' },
          { id: 'congestion', label: 'Congestion' },
          { id: 'waterlogging', label: 'Waterlogging' },
          { id: 'incident', label: 'Incidents' },
          { id: 'deficiency', label: 'Signage' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-space-sm py-1 rounded-lg transition-colors ${
              filterType === tab.id
                ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <span className="ml-auto text-on-surface-variant">
          Showing {displayedEvents.length} of {events.length} events
        </span>
      </div>

      {/* Events List Container */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-space-xs divide-y divide-outline-variant/10">
        {displayedEvents.map((evt) => (
          <EventRow key={evt.id} event={evt} onClick={onSelectEvent} />
        ))}
      </div>

      {/* Create Manual Defect Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 max-w-md w-full p-space-lg">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">
              Log Road Defect / Incident
            </h3>
            <form onSubmit={handleCreate} className="space-y-space-sm">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Defect Description / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deep Pothole in Lane 2"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-body-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-space-sm">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                    Category
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-body-sm"
                  >
                    <option value="pothole">Pothole</option>
                    <option value="congestion">Congestion</option>
                    <option value="waterlogging">Waterlogging</option>
                    <option value="incident">Incident</option>
                    <option value="deficiency">Signage</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                    Severity
                  </label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-body-sm"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                  Road Location / Street Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Downtown Central Arterial"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full p-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-body-sm"
                />
              </div>

              <div className="pt-space-sm flex items-center justify-end gap-space-xs">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-space-md py-space-xs rounded-lg border border-outline-variant/30 text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-semibold"
                >
                  Save Defect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
