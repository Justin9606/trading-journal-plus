import React, { useState } from 'react';
import { Save, X, Image, Link, List, Bold, Italic, Code, Hash, Calendar, Clock, AlertTriangle } from 'lucide-react';

interface NoteEditorProps {
  onSave: (note: {
    content: string;
    tags: string[];
    attachments: string[];
    tradeId?: string;
    mood?: 'positive' | 'neutral' | 'negative';
    marketContext?: string;
    lessons?: string[];
  }) => void;
  onClose: () => void;
  initialContent?: string;
  initialTags?: string[];
}

export function NoteEditor({
  onSave,
  onClose,
  initialContent = '',
  initialTags = [],
}: NoteEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [mood, setMood] = useState<'positive' | 'neutral' | 'negative'>('neutral');
  const [marketContext, setMarketContext] = useState('');
  const [lessons, setLessons] = useState<string[]>([]);
  const [newLesson, setNewLesson] = useState('');

  const handleSave = () => {
    onSave({
      content,
      tags,
      attachments,
      mood,
      marketContext,
      lessons,
    });
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const addLesson = () => {
    if (newLesson.trim() && !lessons.includes(newLesson.trim())) {
      setLessons([...lessons, newLesson.trim()]);
      setNewLesson('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const removeLesson = (lessonToRemove: string) => {
    setLessons(lessons.filter(lesson => lesson !== lessonToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: 'tag' | 'lesson') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'tag') {
        addTag();
      } else {
        addLesson();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-4xl bg-gray-900 rounded-xl shadow-xl border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold">Create Trading Note</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
              <Clock className="h-4 w-4 ml-2" />
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Note</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 p-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Editor Toolbar */}
            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Bold className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Italic className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <List className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Code className="h-4 w-4" />
              </button>
              <div className="h-5 w-px bg-gray-700"></div>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Image className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Link className="h-4 w-4" />
              </button>
            </div>

            {/* Content Area */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your trading notes here..."
              className="w-full h-64 bg-gray-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />

            {/* Market Context */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Market Context</label>
              <textarea
                value={marketContext}
                onChange={(e) => setMarketContext(e.target.value)}
                placeholder="Describe the market conditions, trends, and key events..."
                className="w-full h-24 bg-gray-800/50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Attachments</label>
              <div className="border-2 border-dashed border-gray-800 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <Image className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400 mb-2">
                    Drag and drop files here, or click to select files
                  </p>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                    Select Files
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mood Selection */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Trading Mood</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'positive', label: 'Positive', color: 'bg-green-500' },
                  { value: 'neutral', label: 'Neutral', color: 'bg-yellow-500' },
                  { value: 'negative', label: 'Negative', color: 'bg-red-500' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setMood(option.value as typeof mood)}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      mood === option.value
                        ? `border-${option.color} bg-${option.color}/10`
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-800 rounded-full text-sm flex items-center space-x-1"
                  >
                    <Hash className="h-3 w-3" />
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'tag')}
                  placeholder="Add tags..."
                  className="flex-1 px-4 py-2 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={addTag}
                  disabled={!newTag.trim()}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Lessons Learned */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Lessons Learned</label>
              <div className="space-y-2 mb-2">
                {lessons.map((lesson) => (
                  <div
                    key={lesson}
                    className="flex items-center justify-between p-2 bg-gray-800 rounded-lg"
                  >
                    <span className="text-sm">{lesson}</span>
                    <button
                      onClick={() => removeLesson(lesson)}
                      className="hover:text-red-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newLesson}
                  onChange={(e) => setNewLesson(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'lesson')}
                  placeholder="Add lesson..."
                  className="flex-1 px-4 py-2 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={addLesson}
                  disabled={!newLesson.trim()}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Important Reminders */}
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center space-x-2 text-yellow-500 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <h4 className="font-medium">Important Reminders</h4>
              </div>
              <ul className="text-sm space-y-2 text-gray-400">
                <li>• Document your thought process</li>
                <li>• Note any deviations from your plan</li>
                <li>• Include relevant screenshots</li>
                <li>• Tag entries for better organization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}