'use client';

import { useState, useRef } from 'react';
import {
  ChevronRight, Search, Plus, Upload, FolderPlus, Grid, List,
  FileText, Image as ImageIcon, Video, FileSpreadsheet, Archive,
  Figma, ChevronDown, Clock, Trash2, Share2, Download, Eye,
  X, Check, Sparkles, Folder, HelpCircle, Bell
} from 'lucide-react';

/* ==================== TYPES ==================== */
type FileType = 'pdf' | 'png' | 'fig' | 'xlsx' | 'mp4' | 'docx' | 'zip';

interface FileItem {
  id: number;
  name: string;
  type: FileType;
  size: string;
  modified: string;
  owner: string;
  project: string;
}

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

const fileTypeConfig: Record<FileType, { icon: React.ReactNode; color: string; bg: string }> = {
  pdf: { icon: <FileText className="w-6 h-6 text-red-500" />, color: 'var(--danger)', bg: 'rgba(239,68,68,0.1)' },
  png: { icon: <ImageIcon className="w-6 h-6 text-teal-500" />, color: 'var(--secondary)', bg: 'rgba(20,184,166,0.1)' },
  fig: { icon: <Figma className="w-6 h-6 text-purple-500" />, color: '#A855F7', bg: 'rgba(168,85,247,0.1)' },
  xlsx: { icon: <FileSpreadsheet className="w-6 h-6 text-lime-600" />, color: 'var(--accent)', bg: 'rgba(132,204,22,0.1)' },
  mp4: { icon: <Video className="w-6 h-6 text-amber-500" />, color: 'var(--warning)', bg: 'rgba(245,158,11,0.1)' },
  docx: { icon: <FileText className="w-6 h-6 text-emerald-500" />, color: 'var(--primary)', bg: 'rgba(16,185,129,0.1)' },
  zip: { icon: <Archive className="w-6 h-6 text-slate-500" />, color: 'var(--muted)', bg: 'rgba(90,107,98,0.1)' },
};

/* ==================== MAIN COMPONENT ==================== */
export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>([
    { id: 1, name: 'Project_Brief.pdf', type: 'pdf', size: '2.4 MB', modified: 'Dec 12, 2024', owner: 'You', project: 'E-commerce Redesign' },
    { id: 2, name: 'Logo_Final.png', type: 'png', size: '1.1 MB', modified: 'Dec 10, 2024', owner: 'Sarah Kim', project: 'Brand Identity Design' },
    { id: 3, name: 'Wireframes.fig', type: 'fig', size: '5.8 MB', modified: 'Dec 09, 2024', owner: 'Marcus Lee', project: 'Mobile App Development' },
    { id: 4, name: 'Q3_Report.xlsx', type: 'xlsx', size: '840 KB', modified: 'Dec 05, 2024', owner: 'You', project: 'SEO Optimization' },
    { id: 5, name: 'App_Demo.mp4', type: 'mp4', size: '24.2 MB', modified: 'Dec 01, 2024', owner: 'Marcus Lee', project: 'Mobile App Development' },
    { id: 6, name: 'Contract_Signed.docx', type: 'docx', size: '320 KB', modified: 'Nov 28, 2024', owner: 'You', project: 'General' },
    { id: 7, name: 'Brand_Assets.zip', type: 'zip', size: '45.1 MB', modified: 'Nov 20, 2024', owner: 'Sarah Kim', project: 'Brand Identity Design' },
  ]);

  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'recent' | 'name' | 'size'>('recent');

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [selectedFileDetails, setSelectedFileDetails] = useState<FileItem | null>(null);

  // New Folder Form
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderProject, setNewFolderProject] = useState('');

  // Toast
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3200);
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName) {
      showToast('Error', 'Please enter a folder name');
      return;
    }
    setIsFolderModalOpen(false);
    showToast('Folder Created', `${newFolderName} has been added to your files`);
    setNewFolderName('');
    setNewFolderProject('');
  };

  const filteredFiles = files
    .filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      if (sortOption === 'size') return parseFloat(b.size) - parseFloat(a.size);
      return new Date(b.modified).getTime() - new Date(a.modified).getTime();
    });

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 fade-up">
        <div>
          <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: 'var(--muted)' }}>
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold" style={{ color: 'var(--text)' }}>Files</span>
          </div>
          <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
            Files & Assets<span style={{ color: 'var(--primary)' }}>.</span>
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsFolderModalOpen(true)}
            className="btn-ghost px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <FolderPlus className="w-4 h-4" />
            <span>New Folder</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      {/* Main Files Layout (Flex 2:1) */}
      <div className="flex flex-col lg:flex-row gap-6 fade-up">
        {/* Left: Files Main Area */}
        <div className="flex-1 gd-card overflow-hidden flex flex-col min-h-[560px]">
          {/* Header Controls */}
          <div className="p-5 border-b flex items-center justify-between flex-wrap gap-4" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>All Files</h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md" style={{ background: 'var(--bg-alt)', color: 'var(--muted)' }}>
                {filteredFiles.length} items
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle Buttons */}
              <div className="flex p-1 rounded-xl bg-[var(--bg-alt)]">
                <button
                  onClick={() => setCurrentView('grid')}
                  className={`p-1.5 rounded-lg text-xs transition-all ${
                    currentView === 'grid' ? 'bg-white text-[var(--primary)] shadow-sm' : 'text-[var(--muted)]'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentView('list')}
                  className={`p-1.5 rounded-lg text-xs transition-all ${
                    currentView === 'list' ? 'bg-white text-[var(--primary)] shadow-sm' : 'text-[var(--muted)]'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Selector */}
              <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value as any)}
                className="px-3 py-2 rounded-xl text-xs font-semibold border cursor-pointer focus:outline-none"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
              >
                <option value="recent">Recently Updated</option>
                <option value="name">Name (A-Z)</option>
                <option value="size">Size (Largest)</option>
              </select>
            </div>
          </div>

          {/* Files Container */}
          <div className="p-6 flex-1 overflow-y-auto">
            {filteredFiles.length === 0 ? (
              <div className="text-center py-16">
                <Folder className="w-12 h-12 mx-auto mb-3 text-[var(--soft)]" />
                <p className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>No files found</p>
              </div>
            ) : currentView === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFiles.map((file) => {
                  const cfg = fileTypeConfig[file.type];
                  return (
                    <div
                      key={file.id}
                      onClick={() => setSelectedFileDetails(file)}
                      className="gd-card p-4 cursor-pointer hover:-translate-y-1 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{ background: cfg.bg }}
                        >
                          {cfg.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm truncate mb-1" style={{ color: 'var(--text)' }}>
                          {file.name}
                        </h3>
                        <p className="text-[11px]" style={{ color: 'var(--muted)' }}>
                          {file.size} · {file.modified}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                <div className="grid grid-cols-12 gap-4 pb-3 text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--soft)' }}>
                  <div className="col-span-6">NAME</div>
                  <div className="col-span-2">OWNER</div>
                  <div className="col-span-2">MODIFIED</div>
                  <div className="col-span-2 text-right">SIZE</div>
                </div>
                {filteredFiles.map((file) => {
                  const cfg = fileTypeConfig[file.type];
                  return (
                    <div
                      key={file.id}
                      onClick={() => setSelectedFileDetails(file)}
                      className="grid grid-cols-12 gap-4 py-3 items-center cursor-pointer hover:bg-[var(--bg-alt)] hover:translate-x-1 transition-all rounded-lg px-2"
                    >
                      <div className="col-span-6 flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg }}>
                          {cfg.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-sm truncate" style={{ color: 'var(--text)' }}>{file.name}</div>
                          <div className="text-[10px] truncate" style={{ color: 'var(--muted)' }}>{file.project}</div>
                        </div>
                      </div>
                      <div className="col-span-2 text-xs" style={{ color: 'var(--text)' }}>{file.owner}</div>
                      <div className="col-span-2 text-xs" style={{ color: 'var(--muted)' }}>{file.modified}</div>
                      <div className="col-span-2 text-right text-xs font-semibold" style={{ color: 'var(--text)' }}>{file.size}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Panel (Storage & Recent Activity) */}
        <div className="w-full lg:w-80 space-y-6 flex flex-col">
          {/* Storage Meter Card */}
          <div className="gd-card p-6 flex flex-col items-center">
            <h3 className="font-bold text-base mb-4 self-start" style={{ fontFamily: "'Sora', sans-serif" }}>Storage</h3>

            {/* Storage Circle Progress */}
            <div className="relative w-36 h-36 rounded-full flex items-center justify-center mb-5 bg-[conic-gradient(#10B981_0%_42%,#14B8A6_42%_54%,#F59E0B_54%_68%,var(--bg-alt)_68%_100%)]">
              <div className="absolute inset-2.5 bg-white rounded-full flex flex-col items-center justify-center">
                <div className="text-2xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>
                  4.2<span className="text-sm font-normal">GB</span>
                </div>
                <div className="text-[9px] font-bold tracking-widest text-[var(--muted)] uppercase">OF 10GB USED</div>
              </div>
            </div>

            <div className="w-full space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-[var(--primary)]" /> Documents</span>
                <span className="font-bold">2.1 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-[var(--secondary)]" /> Images</span>
                <span className="font-bold">1.4 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-[var(--warning)]" /> Videos</span>
                <span className="font-bold">0.7 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-slate-200 border" /> Free Space</span>
                <span className="font-bold">5.8 GB</span>
              </div>
            </div>

            <button
              onClick={() => showToast('Upgrade Storage', 'Redirecting to cloud storage plans')}
              className="w-full mt-5 btn-ghost py-2.5 rounded-xl text-xs font-bold"
            >
              Upgrade Storage
            </button>
          </div>

          {/* Recent File Activity Feed */}
          <div className="gd-card p-5 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Sora', sans-serif" }}>Recent Activity</h3>
              <button
                onClick={() => showToast('Activity', 'Viewing all file activity')}
                className="text-[11px] font-semibold text-emerald-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {[
                { actor: 'You', action: 'uploaded', file: 'Project_Brief.pdf', time: '10 mins ago', type: 'pdf' },
                { actor: 'Sarah Kim', action: 'shared', file: 'Logo_Final.png', time: '2 hours ago', type: 'png' },
                { actor: 'You', action: 'deleted', file: 'Old_Mockups.zip', time: 'Yesterday', type: 'zip' },
                { actor: 'Marcus Lee', action: 'viewed', file: 'App_Demo.mp4', time: '2 days ago', type: 'mp4' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-[var(--bg-alt)] border flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold">
                    {item.actor.slice(0, 1)}
                  </div>
                  <div>
                    <div>
                      <span className="font-bold">{item.actor}</span> {item.action} <span className="font-semibold text-emerald-600">{item.file}</span>
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: 'var(--soft)' }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upload File Modal */}
      {isUploadModalOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsUploadModalOpen(false);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500">
                    <Upload className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>FILE UPLOAD</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Upload Files</h2>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 border-2 border-dashed rounded-2xl text-center bg-[var(--bg-alt)] border-[var(--border)] cursor-pointer hover:border-emerald-500 transition-all">
              <Upload className="w-10 h-10 mx-auto mb-3 text-[var(--primary)]" />
              <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Drag & Drop files here</h3>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>or click to browse from your computer</p>
            </div>

            <div className="flex gap-3 pt-6 mt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsUploadModalOpen(false);
                  showToast('Upload Complete', 'Your files have been successfully uploaded');
                }}
                className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
              >
                Confirm Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Folder Modal */}
      {isFolderModalOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFolderModalOpen(false);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500">
                    <FolderPlus className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>ORGANIZE</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Create New Folder</h2>
              </div>
              <button
                onClick={() => setIsFolderModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>FOLDER NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Q4 Marketing Assets"
                  value={newFolderName}
                  onChange={e => setNewFolderName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-emerald-400"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>LINK TO PROJECT (OPTIONAL)</label>
                <select
                  value={newFolderProject}
                  onChange={e => setNewFolderProject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none appearance-none cursor-pointer"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                >
                  <option value="">None</option>
                  <option value="E-commerce Redesign">E-commerce Redesign</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Brand Identity Design">Brand Identity Design</option>
                  <option value="SEO Optimization">SEO Optimization</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFolderModalOpen(false)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* File Details Modal */}
      {selectedFileDetails && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedFileDetails(null);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: fileTypeConfig[selectedFileDetails.type].bg }}
                >
                  {fileTypeConfig[selectedFileDetails.type].icon}
                </div>
                <div>
                  <h2 className="font-extrabold text-xl truncate" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {selectedFileDetails.name}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    {selectedFileDetails.size} · Uploaded by {selectedFileDetails.owner}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedFileDetails(null)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mb-5 p-4 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--muted)' }}>Project</span>
                <span className="font-semibold">{selectedFileDetails.project}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--muted)' }}>Last Modified</span>
                <span className="font-semibold">{selectedFileDetails.modified}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--muted)' }}>File Extension</span>
                <span className="font-bold uppercase">{selectedFileDetails.type}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedFileDetails(null);
                  showToast('Download', `Downloading ${selectedFileDetails.name}`);
                }}
                className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download
              </button>
              <button
                onClick={() => {
                  setSelectedFileDetails(null);
                  showToast('Share', 'Shareable link copied to clipboard');
                }}
                className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div
        className="fixed bottom-6 right-6 flex items-center gap-3 px-5 py-4 rounded-[14px] z-50 transition-all duration-[400ms]"
        style={{
          background: 'var(--sidebar)',
          border: '1px solid rgba(16,185,129,0.2)',
          boxShadow: '0 16px 40px -12px rgba(15,26,20,0.4)',
          color: 'white',
          maxWidth: 360,
          transform: toastState.visible ? 'translateX(0)' : 'translateX(140%)',
        }}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--primary)' }}>
          <Check className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold">{toastState.title}</div>
          <div className="text-xs" style={{ color: 'var(--sidebar-text)' }}>{toastState.msg}</div>
        </div>
        <button
          onClick={() => setToastState(t => ({ ...t, visible: false }))}
          className="ml-auto opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
