import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { User, Pencil, LogOut, Save, X, Loader } from 'lucide-react';
import { userService } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    fetchUserProfile();
  }, [isAuthenticated, user]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      console.log('Full user object:', user);
      console.log('user keys:', Object.keys(user || {}));
      const userId = user.id || user.iduser || user.userId;
      console.log('Extracted userId:', userId);
      const response = await userService.getUserProfile(userId);
      if (response.success) {
        setUserProfile(response.data);
        setEditData(response.data);
      } else {
        setError(response.message || 'Không thể tải thông tin người dùng');
      }
    } catch (err) {
      setError(err.message || 'Lỗi khi tải thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ 
      ...userProfile,
      phone: userProfile?.libraryCard?.phone || '',
      address: userProfile?.libraryCard?.address || ''
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ ...userProfile });
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updateData = {
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
        address: editData.address
      };
      const response = await userService.updateUserProfile(null, updateData);
      if (response.success) {
        setUserProfile(response.data);
        setIsEditing(false);
        
        window.location.reload();
        
        alert('Cập nhật thông tin thành công!');
      } else {
        alert(response.message || 'Lỗi khi cập nhật thông tin');
      }
    } catch (err) {
      alert(err.message || 'Lỗi khi cập nhật thông tin');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-16 bg-gray-50 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader className="w-6 h-6 animate-spin text-primary-500" />
            <span>Đang tải thông tin...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="py-16 bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg border border-red-200">
            <div className="text-center">
              <div className="text-red-500 mb-4">Lỗi</div>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={fetchUserProfile}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 bg-gray-50 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="flex flex-col items-center p-6 border-r border-gray-200">
            <div className="w-32 h-32 rounded-full border-2 border-primary-500 bg-gray-100 flex items-center justify-center mb-6">
              {userProfile?.avatar ? (
                <img 
                  src={userProfile.avatar} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-20 h-20 text-gray-400" />
              )}
            </div>
            
            {!isEditing ? (
              <>
                <button 
                  onClick={handleEdit}
                  className="flex items-center space-x-2 text-primary-500 hover:text-primary-700 transition-colors duration-200 mb-4 font-medium"
                >
                  <Pencil className="w-5 h-5" />
                  <span>Chỉnh sửa thông tin</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition-colors duration-200 font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center space-x-2 text-green-500 hover:text-green-700 transition-colors duration-200 mb-4 font-medium disabled:opacity-50"
                >
                  {saving ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium"
                >
                  <X className="w-5 h-5" />
                  <span>Hủy</span>
                </button>
              </>
            )}
          </div>

          <div className="md:col-span-2 space-y-8">
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Thông tin tài khoản
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center">
                  <span className="font-medium w-32 shrink-0">Họ tên:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <span className="text-gray-800">{userProfile?.name || 'Chưa cập nhật'}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32 shrink-0">Email:</span>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <span className="text-gray-800">{userProfile?.email || 'Chưa cập nhật'}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32 shrink-0">Vai trò:</span>
                  <span className="text-gray-800">
                    {userProfile?.role === 'admin' ? 'Quản trị viên' : 
                     userProfile?.role === 'librarian' ? 'Thủ thư' : 'Thành viên'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32 shrink-0">Ngày tạo tài khoản:</span>
                  <span className="text-gray-800">
                    {userProfile?.createdAt 
                      ? new Date(userProfile.createdAt).toLocaleDateString('vi-VN')
                      : 'Chưa có'
                    }
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Thẻ thư viện
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center">
                  <span className="font-medium w-48 shrink-0">Mã thẻ thư viện:</span>
                  <span className="text-gray-800">{userProfile?.libraryCard?.cardId || 'Chưa có'}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-48 shrink-0">Họ tên:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <span className="text-gray-800">{userProfile?.libraryCard?.name || userProfile?.name || 'Chưa cập nhật'}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-48 shrink-0">Email:</span>
                  <span className="text-gray-800">{userProfile?.email || 'Chưa cập nhật'}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-48 shrink-0">Số điện thoại:</span>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <span className="text-gray-800">{userProfile?.libraryCard?.phone || 'Chưa cập nhật'}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-48 shrink-0">Địa chỉ:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <span className="text-gray-800">{userProfile?.libraryCard?.address || 'Chưa cập nhật'}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-48 shrink-0">Ngày đăng ký thẻ:</span>
                  <span className="text-gray-800">
                    {userProfile?.libraryCard?.memberSince 
                      ? new Date(userProfile.libraryCard.memberSince).toLocaleDateString('vi-VN')
                      : 'Chưa có'
                    }
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-48 shrink-0">Ngày hết hạn thẻ:</span>
                  <span className={`${
                    userProfile?.libraryCard?.cardExpiry && 
                    new Date(userProfile.libraryCard.cardExpiry) < new Date() 
                      ? 'text-red-600 font-semibold' 
                      : 'text-gray-800'
                  }`}>
                    {userProfile?.libraryCard?.cardExpiry 
                      ? new Date(userProfile.libraryCard.cardExpiry).toLocaleDateString('vi-VN')
                      : 'Chưa có'
                    }
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-48 shrink-0">Trạng thái thẻ:</span>
                  <span className={`${
                    userProfile?.libraryCard?.cardStatus === 1 
                      ? 'text-green-600 font-semibold' 
                      : 'text-red-600 font-semibold'
                  }`}>
                    {userProfile?.libraryCard?.cardStatus === 1 ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;