const products = [
    { image: 'https://i.imgur.com/9Jg0F3O.png', name: 'Wireless Headphones', price: '₹7,999', description: 'Noise-cancelling over-ear headphones.' },
    { image: 'https://i.imgur.com/CzXt5A4.png', name: 'Smartwatch', price: '₹12,999', description: 'Fitness tracking smartwatch.' },
    { image: 'https://i.imgur.com/HGzREc6.png', name: 'Gaming Mouse', price: '₹2,499', description: 'Ergonomic gaming mouse.' },
    { image: 'https://i.imgur.com/mV3S4dC.png', name: 'Laptop Stand', price: '₹1,999', description: 'Adjustable aluminium stand.' },
    { image: 'https://i.imgur.com/Of2v6zq.png', name: 'Bluetooth Speaker', price: '₹3,299', description: 'Portable wireless speaker.' },
    { image: 'https://i.imgur.com/e5PQFLm.png', name: 'Mechanical Keyboard', price: '₹5,299', description: 'RGB backlit mechanical keyboard.' },
    { image: 'https://i.imgur.com/hPb0h34.png', name: 'Webcam HD', price: '₹1,499', description: '1080p HD webcam with mic.' },
    { image: 'https://i.imgur.com/qRtIF0E.png', name: 'USB Hub', price: '₹899', description: '4-port USB 3.0 hub.' },
    { image: 'https://i.imgur.com/L8E3z1A.png', name: 'External SSD', price: '₹6,499', description: 'Fast 512GB external SSD.' },
    { image: 'https://i.imgur.com/k2xr49P.png', name: 'Monitor 24"', price: '₹9,999', description: 'Full HD LED monitor.' },
    { image: 'https://i.imgur.com/DcQUJeE.png', name: 'Wireless Charger', price: '₹1,299', description: 'Qi certified fast charger.' }
  ];

  const rowsPerPage = 10;
  let currentPage = 1;

  function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const currentProducts = products.slice(start, end);

    currentProducts.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td data-label="Product Image"><img src="${product.image}" alt="product"></td>
        <td data-label="Product Name">${product.name}</td>
        <td data-label="Price">${product.price}</td>
        <td data-label="Description">${product.description}</td>
      `;
      tableBody.appendChild(row);
    });

    document.getElementById('pageInfo').innerText = `Page ${currentPage} of ${Math.ceil(products.length / rowsPerPage)}`;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === Math.ceil(products.length / rowsPerPage);
  }

  function nextPage() {
    if (currentPage < Math.ceil(products.length / rowsPerPage)) {
      currentPage++;
      renderTable();
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  }

  renderTable();

