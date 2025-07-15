import React from 'react';

const items = [
  {
    id: 1,
    title: 'Trọn bộ Trilogy về Hannibal Lecter đã có mặt trên Thư viện Arcadia!!',
    date: 'Ngày 3 tháng 7 năm 2025',
    image: '/TrilogyHannibal.png',
  },
  {
    id: 2,
    title: 'Trọn bộ Trilogy về Hannibal Lecter đã có mặt trên Thư viện Arcadia!!',
    date: 'Ngày 3 tháng 7 năm 2025',
    image: '/TrilogyHannibal.png',
  },
  {
    id: 3,
    title: 'Trọn bộ Trilogy về Hannibal Lecter đã có mặt trên Thư viện Arcadia!!',
    date: 'Ngày 3 tháng 7 năm 2025',
    image: '/TrilogyHannibal.png',
  },
];

const LatestItems = () => (
  <div className="mt-10">

          <h2
        className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text"
        style={{
          backgroundImage: 'linear-gradient(to bottom, #00A75E 0%, #FF13EB 100%)',
        }}> Mới nhất
          </h2>

    <div className="flex flex-col gap-4">
      {items.map(item => (
        <div key={item.id} className="bg-white rounded-xl shadow-md flex items-center gap-4 p-4 w-[400px]">
          <img
            src={item.image}
            alt={item.title}
            className="w-[80px] h-[110px] object-contain rounded"
          />
          <div>
            <p className="font-semibold text-sm">{item.title}</p>
            <p className="text-sm text-gray-500">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);


export default LatestItems;
