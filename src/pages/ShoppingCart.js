import React, { useState, useEffect } from 'react';
import { ShoppingBag, Trash2, BookOpen, AlertCircle, CheckCircle, X, RefreshCw } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { userService } from '../services/userService';
import { bookService } from '../services/bookService';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [booksAvailability, setBooksAvailability] = useState({});
    const [loading, setLoading] = useState(false);
    const [borrowing, setBorrowing] = useState(false);
    const [checkingAvailability, setCheckingAvailability] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        loadCartFromStorage();
    }, []);

    useEffect(() => {
        if (cartItems.length > 0) {
            checkBooksAvailability();
        }
    }, [cartItems]);

    const loadCartFromStorage = () => {
        try {
            const savedCart = JSON.parse(localStorage.getItem('libraryCart') || '[]');
            setCartItems(savedCart);
        } catch (error) {
            console.error('Error loading cart:', error);
            setCartItems([]);
        }
    };

    const saveCartToStorage = (items) => {
        try {
            localStorage.setItem('libraryCart', JSON.stringify(items));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    };

    const checkBooksAvailability = async () => {
        if (cartItems.length === 0) return;

        setCheckingAvailability(true);
        try {
            const bookIds = cartItems.map(book => book.idbook);
            const response = await bookService.checkBooksAvailability(bookIds);

            if (response.success) {
                setBooksAvailability(response.data.books);
            }
        } catch (error) {
            console.error('Error checking availability:', error);
            showMessage('Không thể kiểm tra tình trạng sách', 'error');
        } finally {
            setCheckingAvailability(false);
        }
    };

    const addToCart = (book) => {
        const existingItem = cartItems.find(item => item.idbook === book.idbook);
        if (!existingItem) {
            const newCart = [...cartItems, book];
            setCartItems(newCart);
            saveCartToStorage(newCart);
            showMessage('Đã thêm sách vào giỏ!', 'success');
            return true;
        } else {
            showMessage('Sách đã có trong giỏ!', 'info');
            return false;
        }
    };

    const removeFromCart = (bookId) => {
        const newCart = cartItems.filter(item => item.idbook !== bookId);
        setCartItems(newCart);
        saveCartToStorage(newCart);
        showMessage('Đã xóa sách khỏi giỏ!', 'info');
    };

    const clearCart = () => {
        if (cartItems.length === 0) return;

        if (window.confirm('Bạn có chắc muốn xóa tất cả sách trong giỏ?')) {
            setCartItems([]);
            saveCartToStorage([]);
            setBooksAvailability({});
            showMessage('Đã xóa tất cả sách trong giỏ!', 'info');
        }
    };

    const borrowAllBooks = async () => {
        if (cartItems.length === 0) {
            showMessage('Giỏ sách đang trống!', 'error');
            return;
        }

        const availableBooks = cartItems.filter(book => {
            const availability = booksAvailability[book.idbook];
            return availability && availability.isAvailable;
        });

        if (availableBooks.length === 0) {
            showMessage('Không có sách nào có sẵn để mượn!', 'error');
            return;
        }

        setBorrowing(true);
        setMessage('Đang xử lý mượn sách...');
        setMessageType('info');

        try {
            const bookIds = availableBooks.map(book => book.idbook);
            const response = await userService.borrowBooks(bookIds);

            if (response.success) {
                setCartItems([]);
                saveCartToStorage([]);
                setBooksAvailability({});
                showMessage(
                    `🎉 Mượn ${response.data.totalBooks} cuốn sách thành công! Email xác nhận đã được gửi.`,
                    'success'
                );

                setTimeout(() => {
                    window.location.href = '/bookshelf';
                }, 3000);
            } else {
                showMessage(`❌ ${response.message}`, 'error');
            }
        } catch (error) {
            console.error('Borrow books error:', error);
            let errorMessage = 'Có lỗi xảy ra khi mượn sách.';

            if (error.message) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }

            showMessage(`❌ ${errorMessage}`, 'error');
        } finally {
            setBorrowing(false);
        }
    };

    const refreshAvailability = async () => {
        await checkBooksAvailability();
        showMessage('Đã cập nhật tình trạng sách!', 'success');
    };

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);

        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 5000);
    };

    const getMessageIcon = () => {
        switch (messageType) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'error':
                return <AlertCircle className="h-5 w-5 text-red-600" />;
            case 'info':
            default:
                return <BookOpen className="h-5 w-5 text-blue-600" />;
        }
    };

    const getMessageStyle = () => {
        switch (messageType) {
            case 'success':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'error':
                return 'bg-red-50 text-red-700 border-red-200';
            case 'info':
            default:
                return 'bg-blue-50 text-blue-700 border-blue-200';
        }
    };

    const getBookAvailabilityStatus = (book) => {
        const availability = booksAvailability[book.idbook];
        if (!availability) {
            return { status: 'checking', text: 'Đang kiểm tra...', className: 'bg-gray-100 text-gray-800' };
        }

        if (availability.isAvailable) {
            return {
                status: 'available',
                text: `Có sẵn (${availability.available}/${availability.total})`,
                className: 'bg-green-100 text-green-800'
            };
        } else {
            return {
                status: 'unavailable',
                text: 'Hết sách',
                className: 'bg-red-100 text-red-800'
            };
        }
    };

    const availableCount = cartItems.filter(book => {
        const availability = booksAvailability[book.idbook];
        return availability && availability.isAvailable;
    }).length;

    const unavailableCount = cartItems.filter(book => {
        const availability = booksAvailability[book.idbook];
        return availability && !availability.isAvailable;
    }).length;

    return (
        <Layout>
            <div className="py-8 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
                        <div className="flex items-center space-x-3">
                            <ShoppingBag className="h-8 w-8 text-primary-600" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Giỏ sách</h1>
                                <p className="text-gray-600 mt-1">
                                    {cartItems.length} cuốn sách trong giỏ
                                    {checkingAvailability && (
                                        <span className="ml-2 text-blue-600">
                                            <RefreshCw className="inline h-4 w-4 animate-spin mr-1" />
                                            Đang kiểm tra tình trạng...
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={refreshAvailability}
                                disabled={cartItems.length === 0 || checkingAvailability}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${cartItems.length === 0 || checkingAvailability
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                                    }`}
                            >
                                <RefreshCw className={`h-4 w-4 ${checkingAvailability ? 'animate-spin' : ''}`} />
                                <span>Cập nhật</span>
                            </button>

                            <button
                                onClick={clearCart}
                                disabled={cartItems.length === 0}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${cartItems.length === 0
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                                    }`}
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Xóa tất cả</span>
                            </button>

                            <button
                                onClick={borrowAllBooks}
                                disabled={cartItems.length === 0 || borrowing || availableCount === 0}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium shadow-md transition-colors ${cartItems.length === 0 || borrowing || availableCount === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-primary-600 text-white hover:bg-primary-700'
                                    }`}
                            >
                                {borrowing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Đang mượn...</span>
                                    </>
                                ) : (
                                    <>
                                        <BookOpen className="h-4 w-4" />
                                        <span>Mượn {availableCount > 0 ? availableCount : ''} cuốn</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {message && (
                        <div className={`flex items-center p-4 rounded-lg border mb-6 ${getMessageStyle()}`}>
                            {getMessageIcon()}
                            <span className="ml-3 font-medium">{message}</span>
                            <button
                                onClick={() => setMessage('')}
                                className="ml-auto"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}

                    {cartItems.length > 0 ? (
                        <>
                            {unavailableCount > 0 && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-start">
                                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                                        <div>
                                            <h4 className="font-medium text-yellow-800">Lưu ý</h4>
                                            <p className="text-sm text-yellow-700 mt-1">
                                                {unavailableCount} cuốn sách trong giỏ hiện đã hết.
                                                Bạn chỉ có thể mượn {availableCount} cuốn sách có sẵn.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                                {cartItems.map((book) => {
                                    const availabilityInfo = getBookAvailabilityStatus(book);

                                    return (
                                        <div key={book.idbook}
                                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                                            onClick={() => window.location.href = `/books/${book.idbook}`}>                                            <div className="relative aspect-[3/4] bg-gray-100 flex items-center justify-center">
                                                {book.imagebook ? (
                                                    <img
                                                        src={book.imagebook}
                                                        alt={book.titlebook}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-gray-400 text-4xl">📖</div>
                                                )}

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromCart(book.idbook);
                                                    }}
                                                    className="absolute top-2 right-2..."
                                                    title="Xóa khỏi giỏ"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="p-4">
                                                <div className="mb-2">
                                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${availabilityInfo.className}`}>
                                                        {availabilityInfo.text}
                                                    </span>
                                                </div>

                                                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                                                    {book.titlebook}
                                                </h3>

                                                <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                                                    {book.authorbook}
                                                </p>

                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-xs text-gray-500">
                                                        {book.categorybook}
                                                    </span>
                                                </div>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromCart(book.idbook);
                                                    }}
                                                    className="w-full flex items-center...">
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="text-sm font-medium">Xóa khỏi giỏ</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt giỏ sách</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">{cartItems.length}</div>
                                        <div className="text-sm text-gray-600">Tổng sách</div>
                                    </div>

                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">{availableCount}</div>
                                        <div className="text-sm text-gray-600">Có sẵn</div>
                                    </div>

                                    <div className="text-center p-4 bg-red-50 rounded-lg">
                                        <div className="text-2xl font-bold text-red-600">{unavailableCount}</div>
                                        <div className="text-sm text-gray-600">Hết sách</div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={borrowAllBooks}
                                        disabled={cartItems.length === 0 || borrowing || availableCount === 0}
                                        className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium shadow-md transition-colors ${cartItems.length === 0 || borrowing || availableCount === 0
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-primary-600 text-white hover:bg-primary-700'
                                            }`}
                                    >
                                        {borrowing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>Đang xử lý...</span>
                                            </>
                                        ) : (
                                            <>
                                                <BookOpen className="h-5 w-5" />
                                                <span>
                                                    {availableCount > 0
                                                        ? `Mượn ${availableCount} cuốn sách có sẵn`
                                                        : 'Không có sách để mượn'
                                                    }
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-8xl mb-6">🛒</div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                Giỏ sách đang trống
                            </h3>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                Hãy thêm những cuốn sách bạn quan tâm vào giỏ để mượn cùng lúc!
                            </p>
                            <button
                                onClick={() => window.location.href = '/browse'}
                                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                            >
                                Khám phá sách ngay
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export const useShoppingCart = () => {
    const addToCart = (book) => {
        const currentCart = JSON.parse(localStorage.getItem('libraryCart') || '[]');
        const existingItem = currentCart.find(item => item.idbook === book.idbook);

        if (!existingItem) {
            const newCart = [...currentCart, book];
            localStorage.setItem('libraryCart', JSON.stringify(newCart));
            return true;
        }
        return false;
    };

    const removeFromCart = (bookId) => {
        const currentCart = JSON.parse(localStorage.getItem('libraryCart') || '[]');
        const newCart = currentCart.filter(item => item.idbook !== bookId);
        localStorage.setItem('libraryCart', JSON.stringify(newCart));
    };

    const getCartCount = () => {
        const currentCart = JSON.parse(localStorage.getItem('libraryCart') || '[]');
        return currentCart.length;
    };

    const isInCart = (bookId) => {
        const currentCart = JSON.parse(localStorage.getItem('libraryCart') || '[]');
        return currentCart.some(item => item.idbook === bookId);
    };

    const getCartItems = () => {
        return JSON.parse(localStorage.getItem('libraryCart') || '[]');
    };

    const clearCart = () => {
        localStorage.setItem('libraryCart', JSON.stringify([]));
    };

    return {
        addToCart,
        removeFromCart,
        getCartCount,
        isInCart,
        getCartItems,
        clearCart
    };
};

export default ShoppingCart;