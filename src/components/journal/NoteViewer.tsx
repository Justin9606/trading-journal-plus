import React from 'react';
import { X, Tag, Paperclip, Clock, Edit2, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  tags: string[];
  attachments: string[];
  createdAt: string;
}

interface NoteViewerProps {
  note: Note;
  onClose: () => void;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteViewer({ note, onClose, onEdit, onDelete }: NoteViewerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-2xl bg-gray-900 rounded-xl shadow-xl border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">
              {new Date(note.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(note)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-primary-400"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="prose prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{note.content}</p>
          </div>

          {/* Tags */}
          {note.tags.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-800 rounded-full text-sm flex items-center space-x-1"
                  >
                    <Tag className="h-3 w-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Attachments */}
          {note.attachments.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Attachments</h4>
              <div className="grid grid-cols-2 gap-4">
                {note.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden group"
                  >
                    <img
                      src={attachment}
                      alt={`Attachment ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Paperclip className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}