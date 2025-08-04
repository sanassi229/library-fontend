import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { bookService } from '../services/bookService';
import { userService } from '../services/userService';
import { useShoppingCart } from '../pages/ShoppingCart';

const DetailBook = () => {
 const { bookId } = useParams();
 const navigate = useNavigate();
 const [book, setBook] = useState(null);
 const [loading, setLoading] = useState(true);
 const [borrowLoading, setBorrowLoading] = useState(false);
 const [returnLoading, setReturnLoading] = useState(false);
 const [error, setError] = useState(null);
 const [message, setMessage] = useState('');
 const [userBorrowedBooks, setUserBorrowedBooks] = useState([]);
 const { addToCart,removeFromCart, isInCart, getCartCount } = useShoppingCart();

 useEffect(() => {
   const fetchBookDetails = async () => {
     setLoading(true);
     try {
       const [bookResponse, borrowsResponse] = await Promise.all([
         bookService.getBookById(bookId),
         userService.getMyBorrows()
       ]);
       
       if (bookResponse.success && bookResponse.data) {
         setBook(bookResponse.data);
       } else {
         setError(bookResponse.message || "Không tìm thấy sách.");
       }

       if (borrowsResponse.success && borrowsResponse.data) {
         const borrowedBookIds = [];
         borrowsResponse.data.forEach(borrow => {
           borrow.books.forEach(book => {
             if (book.status === 'BORROWED') {
               borrowedBookIds.push(book.bookId);
             }
           });
         });
         setUserBorrowedBooks(borrowedBookIds);
       }
     } catch (err) {
       console.error('Error fetching data:', err);
       setError("Không thể tải thông tin sách. Vui lòng thử lại sau.");
     } finally {
       setLoading(false);
     }
   };

   fetchBookDetails();
 }, [bookId]);

 const isBookBorrowed = (bookId) => {
   return userBorrowedBooks.includes(parseInt(bookId));
 };

 const handleBorrowBook = async () => {
   if (book.availablebook <= 0) {
     setMessage("Sách này hiện đã hết. Vui lòng thử lại sau.");
     return;
   }

   if (isBookBorrowed(bookId)) {
     setMessage("Bạn đã mượn sách này rồi.");
     return;
   }

   setBorrowLoading(true);
   setMessage("Đang mượn sách...");
   
   try {
     const response = await userService.borrowBooks([parseInt(bookId)]);
     
     if (response.success) {
       setMessage("🎉 Mượn sách thành công!");
       setBook(prevBook => ({
         ...prevBook,
         availablebook: prevBook.availablebook - 1
       }));
       setUserBorrowedBooks(prev => [...prev, parseInt(bookId)]);
       
       setTimeout(() => {
         setMessage('');
        
       }, 2000);
     } else {
       setMessage(`❌ ${response.message || "Mượn sách thất bại."}`);
     }
   } catch (err) {
     console.error('Borrow error:', err);
     let errorMessage = "Có lỗi xảy ra khi mượn sách.";
     
     if (err.message) {
       errorMessage = err.message;
     } else if (typeof err === 'string') {
       errorMessage = err;
     }
     
     setMessage(`❌ ${errorMessage}`);
   } finally {
     setBorrowLoading(false);
     setTimeout(() => setMessage(''), 5000);
   }
 };

const handleAddToCart = () => {
  if (book.availablebook <= 0) {
    setMessage("❌ Sách này hiện đã hết, không thể thêm vào giỏ.");
    setTimeout(() => setMessage(''), 3000);
    return;
  }

  if (isBookBorrowed(bookId)) {
    setMessage("❌ Bạn đã mượn sách này rồi, không thể thêm vào giỏ.");
    setTimeout(() => setMessage(''), 3000);
    return;
  }

  if (inCart) {
    removeFromCart(book.idbook);
    setMessage("✅ Đã bỏ khỏi giỏ!");
  } else {
    const success = addToCart(book);
    if (success) {
      setMessage("✅ Thêm vào giỏ thành công!");
    } else {
      setMessage("ℹ️ Sách đã có trong giỏ!");
    }
  }
  setTimeout(() => setMessage(''), 2000);
};

const handleReturnBook = async () => {
 setReturnLoading(true);
 setMessage("Đang trả sách...");
 
 try {
   const borrowsResponse = await userService.getMyBorrows();
   let realBorrowId = null;
   
   if (borrowsResponse.success && borrowsResponse.data) {
     borrowsResponse.data.forEach(borrow => {
       borrow.books.forEach(book => {
         if (book.bookId == bookId && book.status === 'BORROWED') {
           realBorrowId = borrow.borrowId;
         }
       });
     });
   }
   
   if (!realBorrowId) {
     setMessage("❌ Không tìm thấy sách này trong danh sách đang mượn của bạn.");
     setReturnLoading(false);
     setTimeout(() => setMessage(''), 5000);
     return;
   }
   
   const response = await userService.returnBook(realBorrowId, parseInt(bookId));
   
   if (response.success) {
     setMessage("🎉 Trả sách thành công!");
     setBook(prevBook => ({
       ...prevBook,
       availablebook: prevBook.availablebook + 1
     }));
     setUserBorrowedBooks(prev => prev.filter(id => id !== parseInt(bookId)));
     
     setTimeout(() => {
       setMessage('');
     }, 3000);
   } else {
     setMessage(`❌ ${response.message || "Trả sách thất bại."}`);
   }
 } catch (err) {
   console.error('Return error:', err);
   let errorMessage = "Có lỗi xảy ra khi trả sách.";
   
   if (err.message) {
     errorMessage = err.message;
   } else if (typeof err === 'string') {
     errorMessage = err;
   }
   
   setMessage(`❌ ${errorMessage}`);
 } finally {
   setReturnLoading(false);
   setTimeout(() => setMessage(''), 5000);
 }
};

 const handleViewMyBorrows = () => {
   navigate('/bookshelf');
 };

 const handleViewCart = () => {
   navigate('/cart');
 };

 if (loading) {
   return (
     <Layout>
       <div className="flex items-center justify-center bg-gray-50">
         <div className="text-center">
           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
           <p className="text-gray-600 text-lg">Đang tải chi tiết sách...</p>
         </div>
       </div>
     </Layout>
   );
 }

 if (error || !book) {
   return (
     <Layout>
       <div className="flex items-center justify-center bg-gray-50">
         <div className="text-center">
           <div className="text-6xl mb-4">❌</div>
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Có lỗi xảy ra</h2>
           <p className="text-gray-600 mb-6">{error || 'Không tìm thấy sách này.'}</p>
           <Link to="/browse" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium">
             Về trang duyệt sách
           </Link>
         </div>
       </div>
     </Layout>
   );
 }

 const inCart = isInCart(book.idbook);
 const cartCount = getCartCount();
 const bookBorrowed = isBookBorrowed(bookId);

 return (
   <Layout>
     <div className="py-12 bg-gray-50">
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="bg-white rounded-lg shadow-md p-6">
           <div className="flex justify-between items-center border-b pb-4 mb-4">
             <div className="flex space-x-4">
               <button className="px-4 py-2 text-primary-600 font-semibold border-b-2 border-primary-600">
                 <span className="mr-2"></span> Đã quan tâm
               </button>
               <button 
                 onClick={handleReturnBook}
                 className="px-4 py-2 text-gray-500 hover:text-primary-600 transition-colors"
               >
                 <span className="mr-2"></span> Trả sách
               </button>
             </div>
             <div className="flex items-center space-x-4 text-sm text-gray-600">
               <span>
                 <span className="font-semibold text-gray-800">{book.quantitybook - book.availablebook}</span> Đang mượn
               </span>
               <span>
                 <span className="font-semibold text-gray-800">{book.availablebook}</span> Còn lại
               </span>
               <Link to="/browse" className="flex items-center text-primary-600 hover:underline">
                 Quay lại <span className="ml-1">→</span>
               </Link>
             </div>
           </div>

           <div className="flex flex-col md:flex-row gap-8">
             <div className="md:w-1/3 flex-shrink-0">
               <img
                 src={book.imagebook || "https://placehold.co/300x450/e0e0e0/ffffff?text=Book+Cover"}
                 alt={book.titlebook}
                 className="w-full h-auto rounded-lg shadow-lg"
               />
             </div>

             <div className="md:w-2/3">
               <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.titlebook}</h1>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-6">
                 <div>
                   <span className="font-semibold">Tác giả:</span> {book.authorbook}
                 </div>
                 <div>
                   <span className="font-semibold">Nhà xuất bản:</span> {book.publisherbook}
                 </div>
                 <div>
                   <span className="font-semibold">Mã sách:</span> {book.idbook}
                 </div>
                 <div>
                   <span className="font-semibold">Thể loại:</span> {book.categorybook}
                 </div>
                 <div>
                   <span className="font-semibold">Năm xuất bản:</span> {book.yearbook}
                 </div>
                 <div>
                   <span className="font-semibold">ISBN:</span> {book.isbnbook || 'N/A'}
                 </div>
                 <div>
                   <span className="font-semibold">Trạng thái:</span> 
                   <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                     bookBorrowed
                       ? 'bg-blue-100 text-blue-800'
                       : book.availablebook > 0 
                       ? 'bg-green-100 text-green-800' 
                       : 'bg-red-100 text-red-800'
                   }`}>
                     {bookBorrowed ? 'Đang mượn' : book.availablebook > 0 ? 'Có sẵn' : 'Hết sách'}
                   </span>
                 </div>
               </div>

               <div className="mb-6">
                 <h2 className="text-xl font-semibold text-gray-900 mb-2">Mô tả:</h2>
                 <p className="text-gray-600 leading-relaxed text-justify">
                   {book.descriptionbook || 'Chưa có mô tả cho cuốn sách này.'}
                 </p>
               </div>
               
               {message && (
                 <div className={`mb-4 p-3 rounded-lg text-center font-medium ${
                   message.includes('❌') 
                     ? 'bg-red-50 text-red-700 border border-red-200' 
                     : message.includes('🎉') || message.includes('✅')
                     ? 'bg-green-50 text-green-700 border border-green-200'
                     : 'bg-blue-50 text-blue-700 border border-blue-200'
                 }`}>
                   {message}
                 </div>
               )}
               
               <div className="flex flex-col sm:flex-row gap-4">
                 <button 
                   onClick={handleBorrowBook}
                   disabled={borrowLoading || book.availablebook <= 0 || bookBorrowed}
                   className={`flex items-center justify-center px-6 py-3 font-medium rounded-lg shadow-md transition-colors flex-1 ${
                     borrowLoading || book.availablebook <= 0 || bookBorrowed
                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                       : 'bg-primary-600 text-white hover:bg-primary-700'
                   }`}
                 >
                   {borrowLoading ? (
                     <>
                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                       Đang mượn...
                     </>
                   ) : (
                     <>
                       <span className="mr-2">{bookBorrowed ? '' : ''}</span>
                       {bookBorrowed ? 'Đã mượn' : book.availablebook > 0 ? 'Mượn ngay' : 'Hết sách'}
                     </>
                   )}
                 </button>
                 
               {!bookBorrowed && (
 <button 
  onClick={handleAddToCart}
  disabled={book.availablebook <= 0 || bookBorrowed}
  className={`flex items-center justify-center px-6 py-3 font-medium rounded-lg shadow-md transition-colors flex-1 ${
    book.availablebook <= 0 || bookBorrowed
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : inCart
      ? 'bg-red-100 text-red-700 hover:bg-red-200'  // Đổi màu đỏ cho "Bỏ khỏi giỏ"
      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
  }`}
>
  <span className="mr-2">{inCart ? '' : ''}</span>
  {bookBorrowed ? 'Không thể thêm' : inCart ? 'Bỏ khỏi giỏ' : 'Thêm vào giỏ'}
</button>
)}
               </div>

               {inCart && !bookBorrowed && (
                 <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                   <p className="text-blue-700 text-sm">
                     Sách đã được thêm vào giỏ! 
                     <button 
                       onClick={handleViewCart}
                       className="ml-2 font-medium underline hover:no-underline"
                     >
                       Xem giỏ sách ({cartCount})
                     </button>
                   </p>
                 </div>
               )}

          
             </div>
           </div>
         </div>
       </div>
     </div>
   </Layout>
 );
};

export default DetailBook;