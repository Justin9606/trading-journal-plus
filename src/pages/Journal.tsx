import React, { useState } from 'react';
import {
  Filter, Download, Plus, Calendar, BarChart2, RefreshCw,
  Search, MessageSquare
} from 'lucide-react';
import { NoteEditor } from '../components/journal/NoteEditor';
import { NotesList } from '../components/journal/NotesList';
import { NoteViewer } from '../components/journal/NoteViewer';

interface Trade {
  id: string;
  date: string;
  symbol: string;
  type: 'long' | 'short';
  entry: number;
  exit: number;
  quantity: number;
  pnl: number;
  status: 'open' | 'closed';
  strategy: string;
  timeframe: string;
  setup: string;
  notes: string;
  tags: string[];
  screenshots: string[];
  emotions: {
    before: 'positive' | 'neutral' | 'negative';
    during: 'positive' | 'neutral' | 'negative';
    after: 'positive' | 'neutral' | 'negative';
  };
  execution: {
    planFollowed: boolean;
    mistakes: string[];
    lessons: string[];
  };
  metrics: {
    riskRewardRatio: number;
    winProbability: number;
    timeInTrade: string;
    maxDrawdown: number;
  };
  notes?: {
    id: string;
    content: string;
    tags: string[];
    attachments: string[];
    createdAt: string;
  }[];
}

const generateMockNotes = () => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: `note-${i}`,
    content: `Trading observation ${i + 1}: Market showed strong momentum in the morning session. Key support levels held well. Volume was above average, indicating strong institutional participation.`,
    tags: ['Morning Session', 'Volume Analysis', 'Support Levels'].slice(0, Math.floor(Math.random() * 3) + 1),
    attachments: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    ],
    createdAt: new Date(2024, 1, i + 1).toISOString(),
  }));
};

export default function Journal() {
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [notes, setNotes] = useState(generateMockNotes());

  const handleSaveNote = (note: any) => {
    const newNote = {
      id: `note-${Date.now()}`,
      ...note,
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };

  const handleEditNote = (note: any) => {
    setNotes(notes.map((n) => (n.id === note.id ? note : n)));
    setSelectedNote(null);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    setSelectedNote(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Trading Journal</h1>
          <p className="text-gray-400">Document and analyze your trades</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search journal..."
              className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
            <button className="p-2 bg-primary-500 rounded-lg">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <Calendar className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <BarChart2 className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Filter className="h-5 w-5" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="h-5 w-5" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={() => setShowNoteEditor(true)}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Note</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <NotesList
          notes={notes}
          onNoteClick={setSelectedNote}
        />
      </div>

      {showNoteEditor && (
        <NoteEditor
          onSave={handleSaveNote}
          onClose={() => setShowNoteEditor(false)}
        />
      )}

      {selectedNote && (
        <NoteViewer
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onEdit={(note) => {
            setShowNoteEditor(true);
            setSelectedNote(null);
          }}
          onDelete={handleDeleteNote}
        />
      )}
    </div>
  );
}