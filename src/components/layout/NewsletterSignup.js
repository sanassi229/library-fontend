import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email đăng ký:', email);
    setEmail('');
  };

  return (
    <div className="">
      <div className="max-w-lg">
        <h5 className="text-white text-lg font-semibold mb-4">
          Cập nhật thông tin mới từ chúng tôi
        </h5>

        <form onSubmit={handleSubmit} className="flex gap-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Địa chỉ email"
            className="flex-1 bg-gray-700 border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 rounded-l-lg"
            required
          />

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-medium rounded-r-lg transition-colors"
          >
            Đăng ký
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-3 flex items-start">
          <span className="text-white mr-2">*</span>
          Sẽ gửi cho bạn thông tin mới nhất từ chúng tôi
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;