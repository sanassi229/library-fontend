import React, { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, BookOpen, Calendar, Clock, CheckCircle, XCircle, RefreshCw, BarChart3, History, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { userService } from '../services/userService';

const PersonalBookshelf = () => {
    const [activeTab, setActiveTab] = useState('current');
    const [currentBorrows, setCurrentBorrows] = useState([]);
    const [borrowHistory, setBorrowHistory] = useState([]);
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [renewLoading, setRenewLoading] = useState({});
    const [returnLoading, setReturnLoading] = useState({});
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('borrowDate');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [historyPage, setHistoryPage] = useState(1);
    const [historyPagination, setHistoryPagination] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (activeTab === 'history') {
            fetchBorrowHistory(1);
        }
    }, [activeTab, filterStatus]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [borrowsResponse, statsResponse] = await Promise.all([
                userService.getMyBorrows(),
                userService.getBorrowStatistics()
            ]);

            if (borrowsResponse.success && borrowsResponse.data) {
                setCurrentBorrows(borrowsResponse.data);
            }

            if (statsResponse.success && statsResponse.data) {
                setStatistics(statsResponse.data);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Có lỗi xảy ra khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const fetchBorrowHistory = async (page = 1) => {
        try {
            const response = await userService.getBorrowHistory(page, 10, filterStatus === 'all' ? null : filterStatus);

            if (response.success && response.data) {
                setBorrowHistory(response.data.history);
                setHistoryPagination(response.data.pagination);
                setHistoryPage(page);
            }
        } catch (err) {
            console.error('Error fetching history:', err);
            showMessage('Không thể tải lịch sử mượn sách', 'error');
        }
    };

    const handleRenewBook = async (borrowId, bookId, bookTitle) => {
        const key = `${borrowId}-${bookId}`;
        setRenewLoading(prev => ({ ...prev, [key]: true }));

        try {
            const response = await userService.renewBook(borrowId, bookId, 15);

            if (response.success) {
                showMessage(`Gia hạn "${bookTitle}" thành công!`, 'success');
                await fetchData();
            } else {
                showMessage(response.message, 'error');
            }
        } catch (err) {
            console.error('Renew error:', err);
            showMessage(err.message || 'Có lỗi xảy ra khi gia hạn sách', 'error');
        } finally {
            setRenewLoading(prev => ({ ...prev, [key]: false }));
        }
    };

    const handleReturnBook = async (borrowId, bookId, bookTitle) => {
        const key = `${borrowId}-${bookId}`;
        setReturnLoading(prev => ({ ...prev, [key]: true }));

        try {
            const response = await userService.returnBook(borrowId, bookId);

            if (response.success) {
                showMessage(`Trả sách "${bookTitle}" thành công!`, 'success');
                await fetchData();
            } else {
                showMessage(response.message, 'error');
            }
        } catch (err) {
            console.error('Return error:', err);
            showMessage(err.message || 'Có lỗi xảy ra khi trả sách', 'error');
        } finally {
            setReturnLoading(prev => ({ ...prev, [key]: false }));
        }
    };

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 5000);
    };

    const filteredAndSortedBooks = React.useMemo(() => {
        let allBooks = [];

        if (activeTab === 'current') {
            currentBorrows.forEach(borrow => {
                borrow.books.forEach(book => {
                    allBooks.push({
                        ...book,
                        borrowId: borrow.borrowId,
                        borrowDate: borrow.borrowDate,
                        borrowStatus: borrow.status
                    });
                });
            });
        } else {
            allBooks = borrowHistory;
        }

        if (searchTerm) {
            allBooks = allBooks.filter(book =>
                book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.titlebook?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.authorbook?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus !== 'all' && activeTab === 'current') {
            allBooks = allBooks.filter(book => {
                switch (filterStatus) {
                    case 'borrowed':
                        return book.status === 'BORROWED';
                    case 'returned':
                        return book.status === 'RETURNED';
                    case 'overdue':
                        return book.isOverdue;
                    default:
                        return true;
                }
            });
        }

        allBooks.sort((a, b) => {
            const titleA = a.title || a.titlebook || '';
            const titleB = b.title || b.titlebook || '';
            const authorA = a.author || a.authorbook || '';
            const authorB = b.author || b.authorbook || '';

            switch (sortBy) {
                case 'title':
                    return titleA.localeCompare(titleB);
                case 'author':
                    return authorA.localeCompare(authorB);
                case 'dueDate':
                    return new Date(a.dueDate || a.duedate) - new Date(b.dueDate || b.duedate);
                case 'borrowDate':
                default:
                    return new Date(b.borrowDate || b.startdate) - new Date(a.borrowDate || a.startdate);
            }
        });

        return allBooks;
    }, [currentBorrows, borrowHistory, searchTerm, filterStatus, sortBy, activeTab]);

    const getStatusBadge = (book) => {
        const status = book.status || book.statusbook;
        const isOverdue = book.isOverdue || book.is_overdue;

        if (status === 'RETURNED') {
            return (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle size={12} className="mr-1" />
                    Đã trả
                </span>
            );
        } else if (isOverdue) {
            return (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <XCircle size={12} className="mr-1" />
                    Quá hạn
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <BookOpen size={12} className="mr-1" />
                    Đang mượn
                </span>
            );
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const getDaysInfo = (book) => {
        const status = book.status || book.statusbook;
        const returnDate = book.returnDate || book.returndate;
        const isOverdue = book.isOverdue || book.is_overdue;
        const daysUntilDue = book.daysUntilDue || book.days_until_due;

        if (status === 'RETURNED') {
            return `Đã trả ngày ${formatDate(returnDate)}`;
        } else if (isOverdue) {
            return `Quá hạn ${Math.abs(daysUntilDue)} ngày`;
        } else {
            return `Còn ${daysUntilDue} ngày`;
        }
    };

    const canRenewBook = (book) => {
        const status = book.status || book.statusbook;
        const renewCount = book.renewCount || book.renewcount || 0;
        const isOverdue = book.isOverdue || book.is_overdue;

        return status === 'BORROWED' && renewCount < 2 && !isOverdue;
    };

    const canReturnBook = (book) => {
        const status = book.status || book.statusbook;
        return status === 'BORROWED';
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 text-lg">Đang tải kệ sách của bạn...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không thể tải kệ sách</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="py-8 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kệ sách cá nhân</h1>
                        <p className="text-gray-600">Quản lý và theo dõi các sách bạn đã mượn</p>
                    </div>

                    {statistics && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <BookOpen className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Tổng sách đã mượn</p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {statistics.statistics.totalBooks}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Clock className="h-8 w-8 text-orange-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Đang mượn</p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {statistics.statistics.currentlyBorrowed}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Đã trả</p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {statistics.statistics.totalReturned}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <XCircle className="h-8 w-8 text-red-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Quá hạn</p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {statistics.statistics.overdueBooks}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-8 px-6">
                                <button
                                    onClick={() => setActiveTab('current')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'current'
                                            ? 'border-primary-500 text-primary-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <BookOpen className="inline-block h-4 w-4 mr-2" />
                                    Đang mượn
                                </button>
                                <button
                                    onClick={() => setActiveTab('history')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'history'
                                            ? 'border-primary-500 text-primary-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <History className="inline-block h-4 w-4 mr-2" />
                                    Lịch sử
                                </button>
                                <button
                                    onClick={() => setActiveTab('stats')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'stats'
                                            ? 'border-primary-500 text-primary-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <BarChart3 className="inline-block h-4 w-4 mr-2" />
                                    Thống kê
                                </button>
                            </nav>
                        </div>

                        <div className="p-6">
                            {activeTab !== 'stats' && (
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm theo tên sách hoặc tác giả..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>

                                    {activeTab === 'current' && (
                                        <div className="flex items-center space-x-2">
                                            <Filter className="h-5 w-5 text-gray-400" />
                                            <select
                                                value={filterStatus}
                                                onChange={(e) => setFilterStatus(e.target.value)}
                                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="all">Tất cả</option>
                                                <option value="borrowed">Đang mượn</option>
                                                <option value="overdue">Quá hạn</option>
                                            </select>
                                        </div>
                                    )}

                                    {activeTab === 'history' && (
                                        <div className="flex items-center space-x-2">
                                            <Filter className="h-5 w-5 text-gray-400" />
                                            <select
                                                value={filterStatus}
                                                onChange={(e) => setFilterStatus(e.target.value)}
                                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="all">Tất cả</option>
                                                <option value="BORROWED">Đang mượn</option>
                                                <option value="RETURNED">Đã trả</option>
                                                <option value="OVERDUE">Quá hạn</option>
                                            </select>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-2">
                                        <SortAsc className="h-5 w-5 text-gray-400" />
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="borrowDate">Ngày mượn</option>
                                            <option value="title">Tên sách</option>
                                            <option value="author">Tác giả</option>
                                            <option value="dueDate">Hạn trả</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {message && (
                                <div className={`p-4 rounded-lg mb-6 ${messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                    }`}>
                                    {message}
                                </div>
                            )}

                            {activeTab === 'stats' && statistics ? (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Thể loại yêu thích</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {statistics.topCategories.map((category, index) => (
                                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="font-medium">{category.categorybook}</div>
                                                    <div className="text-sm text-gray-500">{category.count} cuốn</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
                                        <div className="space-y-3">
                                            {statistics.recentActivity.map((activity, index) => (
                                                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                    <div className={`p-2 rounded-full ${activity.statusbook === 'RETURNED' ? 'bg-green-100' : 'bg-blue-100'
                                                        }`}>
                                                        {activity.statusbook === 'RETURNED' ?
                                                            <CheckCircle className="h-4 w-4 text-green-600" /> :
                                                            <BookOpen className="h-4 w-4 text-blue-600" />
                                                        }
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium">{activity.titlebook}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {activity.statusbook === 'RETURNED' ? 'Đã trả' : 'Đang mượn'} •
                                                            {formatDate(activity.startdate)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : filteredAndSortedBooks.length > 0 ? (
                                <div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {filteredAndSortedBooks.map((book, index) => (
                                            <div key={`${book.borrowId || book.idborrow}-${book.bookId || book.idbook}-${index}`}
                                                className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                                                onClick={() => window.location.href = `/books/${book.bookId || book.idbook}`}>
                                                <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                                                    {(book.image || book.imagebook) ? (
                                                        <img
                                                            src={book.image || book.imagebook}
                                                            alt={book.title || book.titlebook}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="text-gray-400 text-4xl">📖</div>
                                                    )}
                                                </div>

                                                <div className="p-4">
                                                    <div className="mb-2">
                                                        {getStatusBadge(book)}
                                                    </div>

                                                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                                                        {book.title || book.titlebook}
                                                    </h3>

                                                    <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                                                        {book.author || book.authorbook}
                                                    </p>

                                                    <div className="space-y-1 text-xs text-gray-500 mb-3">
                                                        <div className="flex items-center">
                                                            <Calendar size={12} className="mr-1" />
                                                            Mượn: {formatDate(book.borrowDate || book.startdate)}
                                                        </div>

                                                        {(book.status || book.statusbook) === 'BORROWED' && (
                                                            <div className="flex items-center">
                                                                <Clock size={12} className="mr-1" />
                                                                Hạn: {formatDate(book.dueDate || book.duedate)}
                                                            </div>
                                                        )}

                                                        <div className={`font-medium ${(book.isOverdue || book.is_overdue) ? 'text-red-600' :
                                                                (book.status || book.statusbook) === 'RETURNED' ? 'text-green-600' : 'text-blue-600'
                                                            }`}>
                                                            {getDaysInfo(book)}
                                                        </div>
                                                    </div>

                                                    {activeTab === 'current' && (book.status || book.statusbook) === 'BORROWED' && (
                                                        <div className="flex space-x-2">
                                                            {canRenewBook(book) && (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleRenewBook(
                                                                            book.borrowId || book.idborrow,
                                                                            book.bookId || book.idbook,
                                                                            book.title || book.titlebook
                                                                        );
                                                                    }}
                                                                    disabled={renewLoading[`${book.borrowId || book.idborrow}-${book.bookId || book.idbook}`]}
                                                                    className="flex-1 flex items-center justify-center space-x-1 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50"
                                                                >
                                                                    {renewLoading[`${book.borrowId || book.idborrow}-${book.bookId || book.idbook}`] ? (
                                                                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-600"></div>
                                                                    ) : (
                                                                        <RefreshCw className="h-3 w-3" />
                                                                    )}
                                                                    <span className="text-xs font-medium">
                                                                        {renewLoading[`${book.borrowId || book.idborrow}-${book.bookId || book.idbook}`] ? 'Gia hạn...' : 'Gia hạn'}
                                                                    </span>
                                                                </button>
                                                            )}

                                                            {canReturnBook(book) && (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleReturnBook(
                                                                            book.borrowId || book.idborrow,
                                                                            book.bookId || book.idbook,
                                                                            book.title || book.titlebook
                                                                        );
                                                                    }}
                                                                    disabled={returnLoading[`${book.borrowId || book.idborrow}-${book.bookId || book.idbook}`]}
                                                                    className="flex-1 flex items-center justify-center space-x-1 py-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
                                                                >
                                                                    {returnLoading[`${book.borrowId || book.idborrow}-${book.bookId || book.idbook}`] ? (
                                                                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-600"></div>
                                                                    ) : (
                                                                        <ArrowLeft className="h-3 w-3" />
                                                                    )}
                                                                    <span className="text-xs font-medium">
                                                                        {returnLoading[`${book.borrowId || book.idborrow}-${book.bookId || book.idbook}`] ? 'Trả...' : 'Trả sách'}
                                                                    </span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {activeTab === 'history' && historyPagination && historyPagination.totalPages > 1 && (
                                        <div className="mt-6 flex justify-center space-x-2">
                                            <button
                                                onClick={() => fetchBorrowHistory(historyPage - 1)}
                                                disabled={historyPage <= 1}
                                                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                Trước
                                            </button>

                                            <span className="px-3 py-2 text-gray-700">
                                                Trang {historyPage} / {historyPagination.totalPages}
                                            </span>

                                            <button
                                                onClick={() => fetchBorrowHistory(historyPage + 1)}
                                                disabled={historyPage >= historyPagination.totalPages}
                                                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                            >
                                                Sau
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📚</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {searchTerm || filterStatus !== 'all' ? 'Không tìm thấy sách phù hợp' :
                                            activeTab === 'current' ? 'Chưa có sách nào đang mượn' : 'Chưa có lịch sử mượn sách'}
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        {searchTerm || filterStatus !== 'all'
                                            ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
                                            : 'Hãy bắt đầu mượn sách để xây dựng kệ sách cá nhân của bạn!'
                                        }
                                    </p>
                                    {(!searchTerm && filterStatus === 'all' && activeTab === 'current') && (
                                        <button
                                            onClick={() => window.location.href = '/browse'}
                                            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium"
                                        >
                                            Khám phá sách
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PersonalBookshelf;