fetch('/api/products')
      .then(res => res.json())
      .then(products => {
        const container = document.getElementById('catalog');
        products.forEach(p => {
          const div = document.createElement('div');
          div.className = 'product';
          div.innerHTML = `
            <img src="${p.image}" alt="${p.name}" />
            <h3>${p.name}</h3>
            <p>$${p.price.toFixed(2)}</p>
          `;
          container.appendChild(div);
        });
      });