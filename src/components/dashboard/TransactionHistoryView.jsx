import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';
import soundEngine from '../../audio/SoundEngine.js';

export default function TransactionHistoryView({
  transactions,
  selectedTxn,
  onSelectTxn,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc' | 'date-asc' | 'amount-desc' | 'risk-desc'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered & Sorted Transactions
  const processedTransactions = useMemo(() => {
    let result = transactions.filter((t) => {
      const matchesSearch =
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.sender.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk =
        riskFilter === 'ALL' || t.riskCategory.toUpperCase() === riskFilter.toUpperCase();

      const matchesStatus =
        statusFilter === 'ALL' || t.status.toUpperCase().includes(statusFilter.toUpperCase());

      return matchesSearch && matchesRisk && matchesStatus;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      if (sortBy === 'risk-desc') return b.riskScore - a.riskScore;
      if (sortBy === 'date-asc') return a.timestamp.localeCompare(b.timestamp);
      return b.timestamp.localeCompare(a.timestamp); // default date-desc
    });

    return result;
  }, [transactions, searchQuery, riskFilter, statusFilter, sortBy]);

  const totalPages = Math.ceil(processedTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = processedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCSV = () => {
    soundEngine.playClick(500, 0.05);
    const headers = 'ID,Date,Recipient,Amount,RiskScore,RiskCategory,Status\n';
    const rows = processedTransactions
      .map(
        (t) =>
          `"${t.id}","${t.timestamp}","${t.recipient}","${t.amount}","${t.riskScore}%","${t.riskCategory}","${t.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `harbour_ledger_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="txn-history-container fade-in">
      {/* Header */}
      <div className="history-header-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="history-icon-box">
              <FileText className="w-6 h-6 text-cyan" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hero text-xl text-white font-bold">Searchable Transaction History</h2>
                <span className="badge-shield-live">IMMUTABLE LOGS</span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Cryptographic audit trail of all historical transfers, simulated risk indices, heuristic factors,
                and consensus settlement statuses.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportCSV}
            className="btn-export-csv"
            data-hover
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT AUDIT (CSV)</span>
          </button>
        </div>
      </div>

      {/* Toolbar: Search, Filters, Sorters */}
      <div className="history-toolbar-card mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="md:col-span-2 search-box-history">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by TXN ID, beneficiary, or sender..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input-history"
            />
          </div>

          {/* Risk Level Filter */}
          <div>
            <select
              value={riskFilter}
              onChange={(e) => {
                setRiskFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="history-select"
            >
              <option value="ALL">Risk Level: All</option>
              <option value="LOW">Risk: Low (0-24%)</option>
              <option value="MEDIUM">Risk: Medium (25-49%)</option>
              <option value="ELEVATED">Risk: Elevated (50-79%)</option>
              <option value="CRITICAL">Risk: Critical (80-100%)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="history-select"
            >
              <option value="date-desc">Sort: Newest First</option>
              <option value="date-asc">Sort: Oldest First</option>
              <option value="amount-desc">Sort: Highest Amount</option>
              <option value="risk-desc">Sort: Highest Risk</option>
            </select>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5 overflow-x-auto">
          <span className="font-mono text-[10px] text-slate-400 shrink-0 mr-1">ESCROW STATUS:</span>
          {['ALL', 'SETTLED', 'PAUSED', 'FLAGGED'].map((st) => (
            <button
              key={st}
              onClick={() => {
                soundEngine.playClick(600, 0.04);
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`status-filter-btn ${statusFilter === st ? 'active' : ''}`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Table */}
      <div className="table-responsive-box mt-4">
        {paginatedTransactions.length === 0 ? (
          <div className="empty-ledger-box text-center py-12">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h4 className="font-hero text-sm text-slate-300">No Transactions Found</h4>
            <p className="text-slate-500 text-xs mt-1">Try resetting your search query or filters.</p>
          </div>
        ) : (
          <table className="ledger-full-table">
            <thead>
              <tr>
                <th>TXN ID & DATE</th>
                <th>BENEFICIARY</th>
                <th>AMOUNT</th>
                <th>METHOD</th>
                <th>SIMULATED RISK</th>
                <th>STATUS</th>
                <th>AUDIT</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className={selectedTxn?.id === txn.id ? 'row-active-inspect' : ''}
                >
                  <td>
                    <div className="font-mono text-xs text-cyan font-bold">{txn.id}</div>
                    <div className="font-mono text-[10px] text-slate-500">{txn.timestamp}</div>
                  </td>
                  <td>
                    <div className="text-white text-xs font-medium">{txn.recipient}</div>
                    <div className="text-slate-400 text-[10px]">{txn.type}</div>
                  </td>
                  <td className="font-mono text-xs font-bold text-white">
                    {txn.formattedAmount}
                  </td>
                  <td className="text-slate-300 text-xs font-mono">{txn.paymentMethod}</td>
                  <td>
                    <span
                      className={`risk-badge-sm ${
                        txn.riskScore >= 80
                          ? 'risk-crit'
                          : txn.riskScore >= 50
                          ? 'risk-warn'
                          : 'risk-safe'
                      }`}
                    >
                      {txn.riskCategory} ({txn.riskScore}%)
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-pill ${
                        txn.status === 'SETTLED'
                          ? 'status-settled'
                          : txn.status === 'PAUSED'
                          ? 'status-review'
                          : 'status-blocked'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        soundEngine.playClick(650, 0.05);
                        onSelectTxn(txn);
                      }}
                      className="btn-audit-cell"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="pagination-bar mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="btn-page-nav"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <span className="font-mono text-xs text-slate-400">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> (
            {processedTransactions.length} Total Records)
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="btn-page-nav"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="txn-modal-backdrop fade-in">
          <div className="txn-modal-card">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan" />
                <h3 className="font-hero text-sm text-white font-bold">
                  CRYPTOGRAPHIC LEDGER AUDIT: {selectedTxn.id}
                </h3>
              </div>
              <button
                onClick={() => onSelectTxn(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                <div>
                  <span className="font-mono text-[10px] text-slate-500">TRANSFER AMOUNT:</span>
                  <div className="font-hero text-xl text-white font-bold">
                    {selectedTxn.formattedAmount}
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-500">SIMULATED RISK RATING:</span>
                  <div className="font-hero text-base font-bold text-cyan">
                    {selectedTxn.riskCategory} ({selectedTxn.riskScore}%)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="font-mono text-[10px] text-slate-500">ORIGIN SENDER:</span>
                  <div className="text-white font-medium">{selectedTxn.sender}</div>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-500">BENEFICIARY:</span>
                  <div className="text-white font-medium">{selectedTxn.recipient}</div>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-slate-500">CRYPTOGRAPHIC BLOCK HASH:</span>
                <div className="font-mono text-cyan bg-black/50 p-2 rounded-lg break-all">
                  {selectedTxn.hash}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-slate-500">ESCROW TRANSIT ROUTE:</span>
                <div className="text-slate-300 font-mono text-[11px] bg-black/50 p-2 rounded-lg">
                  {selectedTxn.route}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-amber block mb-1">
                  HEURISTIC RISK FACTORS:
                </span>
                <ul className="space-y-1 bg-black/30 p-2.5 rounded-lg">
                  {selectedTxn.riskFactors?.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-[11px]">
                      <span className="text-cyan">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5 pt-3 border-t border-white/10">
              <button
                onClick={() => onSelectTxn(null)}
                className="btn-primary-sm"
              >
                Close Audit Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
