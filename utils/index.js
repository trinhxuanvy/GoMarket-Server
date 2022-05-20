exports.getNextOrderStatus = (value) => {
  switch (value) {
    case 'Open':
      return 'Confirmed';
    case 'Confirmed':
      return 'Shipping';
    case 'Shipping':
      return 'Shipped';
    case 'Shipped':
      return 'Completed';
    default:
      return 'Cancelled';
  }
};
