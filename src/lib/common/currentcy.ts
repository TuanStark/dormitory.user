/**
 * Định dạng số tiền thành định dạng tiền tệ VND
 * @param amount Số tiền cần định dạng
 * @returns Chuỗi tiền tệ VND
 */
export default function formatCurrency(amount: number | string): string {
  // Chuyển về số nếu đầu vào là chuỗi
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Kiểm tra giá trị hợp lệ
  if (isNaN(numericAmount)) {
    return '0 VNĐ';
  }
  
  // Định dạng số với dấu phân cách hàng nghìn
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericAmount);
}