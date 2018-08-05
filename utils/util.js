const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
};

const range = (start, end) => new Array(end - start + 1).fill(start).map((el, i) => start + i);

const pad = (n, width, z) => {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

const showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
};

const showLoading = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 1000
});

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  range: range,
  showSuccess: showSuccess,
  showModel: showModel,
  showLoading: showLoading
};