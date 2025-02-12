import React from 'react';
import { MessageSquare, Tag, Paperclip, Clock } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  tags: string[];
  attachments: string[];
  createdAt: string;
}

interface NotesListProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
}

export function NotesList({ notes, onNoteClick }: NotesListProps) {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => onNoteClick(note)}
          className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary-400" />
              <p className="font-medium line-clamp-1">{note.content}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
              </div>
              {note.attachments.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Paperclip className="h-4 w-4" />
                  <span>{note.attachments.length}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-700 rounded-full text-xs flex items-center space-x-1"
                >
                  <Tag className="h-3 w-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}