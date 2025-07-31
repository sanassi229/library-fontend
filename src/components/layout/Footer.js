import React from "react";
import { Link } from "react-router-dom";
import NewsletterSignup from './NewsletterSignup';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8"></div>
        <div className="pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-start">
              <h5 className="font-semibold">Liên hệ</h5>
              <div className="flex flex-row items-center mt-3">
                <img src="/ic_phone.svg" alt="Phone" />
                <h5 className="font-semibold ml-2">19002800</h5>
              </div>
              <div className="flex flex-row items-center mt-3">
                <img src="/ic_zalo.svg" alt="Zalo" />
                <h5 className="font-semibold ml-2">19002800</h5>
              </div>
              <div className="flex flex-row items-center mt-3">
                <img src="/ic_email.svg" alt="Email" />
                <h5 className="font-semibold ml-2">demo.@gmail</h5>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <h5 className="font-semibold">Địa chỉ công ty</h5>
              <div className="flex flex-row items-start mt-3">
                <img src="/ic_location.svg" alt="Location" />
                <h5 className="font-semibold ml-2">
                  828 Sư Vạn Hạnh, Phường 12, Quận 10, Hồ Chí Minh
                </h5>
              </div>
            </div>

            <div className="flex flex-col items-start ms-20">
              <h5 className="font-semibold">Thông tin pháp lý</h5>
              <h5 className="font-semibold mt-3 cursor-pointer hover:text-gray-300">
                Chính sách bảo mật
              </h5>
              <h5 className="font-semibold mt-3 cursor-pointer hover:text-gray-300">
                Điều khoản & Dịch vụ
              </h5>
              <h5 className="font-semibold mt-3 cursor-pointer hover:text-gray-300">
                Điều khoản sử dụng
              </h5>
            </div>
             <div className="flex flex-col items-end ">
          <NewsletterSignup />
           </div>
          </div>
          
      
        </div>
      </div>
    </footer>
  );
};

export default Footer;