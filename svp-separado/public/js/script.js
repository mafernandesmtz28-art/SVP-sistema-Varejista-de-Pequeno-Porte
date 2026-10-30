// INITIAL SYSTEM DATA (Reflecting UML Diagram with real product images)
    const state = {
      currentUserRole: 'vendedor',
      selectedPaymentMethod: 'Cartão',
      products: [
        { idProduto: 1, nome: "Refrigerante LATA 350ml", marca: "Coca-Cola", preco: 4.50, quantidadeEstoque: 48, categoria: "Bebidas", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80" },
        { idProduto: 2, nome: "Biscoito Recheado 140g", marca: "Bauducco", preco: 3.80, quantidadeEstoque: 30, categoria: "Alimentos", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80" },
        { idProduto: 3, nome: "Detergente Líquido 500ml", marca: "Ypê", preco: 2.90, quantidadeEstoque: 15, categoria: "Higiene & Limpeza", image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&w=500&q=80" },
        { idProduto: 4, nome: "Açúcar Refinado 1kg", marca: "União", preco: 5.20, quantidadeEstoque: 25, categoria: "Alimentos", image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=500&q=80" },
        { idProduto: 5, nome: "Café Torrado e Moído 500g", marca: "Pilão", preco: 18.90, quantidadeEstoque: 20, categoria: "Alimentos", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=500&q=80" },
        { idProduto: 6, nome: "Leite Integral 1L", marca: "Itambé", preco: 5.80, quantidadeEstoque: 40, categoria: "Padaria & Laticínios", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80" },
        { idProduto: 7, nome: "Arroz Branco Tipo 1 5kg", marca: "Tio João", preco: 28.50, quantidadeEstoque: 18, categoria: "Alimentos", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80" },
        { idProduto: 8, nome: "Feijão Carioca 1kg", marca: "Camil", preco: 8.40, quantidadeEstoque: 22, categoria: "Alimentos", image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=500&q=80" },
        { idProduto: 9, nome: "Sabão em Pó 1kg", marca: "OMO", preco: 16.90, quantidadeEstoque: 12, categoria: "Higiene & Limgiene", image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=500&q=80" },
        { idProduto: 10, nome: "Suco de Laranja Néctar 1L", marca: "Del Valle", preco: 7.50, quantidadeEstoque: 35, categoria: "Bebidas", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80" }
      ],
      currentCart: [
        { idItem: 1, idProduto: 1, nome: "Refrigerante 350ml (Coca-Cola)", quantidade: 2, precoUnitario: 4.50, subtotal: 9.00 }
      ],
      pendingSales: [],
      completedSales: [
        {
          idVenda: 1,
          cliente: "Maria Silva",
          vendedor: "João Pereira",
          data: "15/06/2025",
          valorTotal: 185.90,
          formaPagamento: "Cartão",
          status: "Concluída"
        }
      ],
      users: [
        { idUsuario: 2, nome: "João Pereira", login: "jpereira", cargo: "Vendedor" },
        { idUsuario: 3, nome: "Ana Costa", login: "ana.costa", cargo: "OperadorCaixa" },
        { idUsuario: 4, nome: "Carlos Lima", login: "carlos.lima", cargo: "Estoquista" },
        { idUsuario: 5, nome: "Fernanda Souza", login: "fernanda.s", cargo: "Administrador" }
      ]
    };

    // ROLE NAVIGATION DEFINITIONS
    const roleViews = {
      vendedor: [
        { id: 'venda', label: 'Registrar Venda', icon: 'fa-cash-register' },
        { id: 'cliente', label: 'Consultar Produtos', icon: 'fa-magnifying-glass' }
      ],
      caixa: [
        { id: 'caixa', label: 'Operador de Caixa', icon: 'fa-receipt' },
        { id: 'venda', label: 'Consultar Vendas', icon: 'fa-cash-register' }
      ],
      estoquista: [
        { id: 'estoque', label: 'Controle de Estoque', icon: 'fa-boxes-stacked' }
      ],
      admin: [
        { id: 'admin', label: 'Painel Geral', icon: 'fa-user-shield' },
        { id: 'venda', label: 'Vendas', icon: 'fa-cash-register' },
        { id: 'caixa', label: 'Caixa', icon: 'fa-receipt' },
        { id: 'estoque', label: 'Estoque', icon: 'fa-boxes-stacked' }
      ],
      cliente: [
        { id: 'cliente', label: 'Catálogo de Produtos', icon: 'fa-store' }
      ]
    };

    // SWITCH USER ROLE & BUILD NAV
    function switchUserRole(role) {
      state.currentUserRole = role;
      
      const navContainer = document.getElementById('navTabs');
      const tabs = roleViews[role] || roleViews['vendedor'];

      navContainer.innerHTML = tabs.map((tab, idx) => `
        <button onclick="showView('${tab.id}')" class="nav-tab-btn flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${idx === 0 ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'}" data-view="${tab.id}">
          <i class="fa-solid ${tab.icon}"></i>
          <span>${tab.label}</span>
        </button>
      `).join('');

      // Display the default view for this role
      showView(tabs[0].id);
    }

    // SHOW PANEL VIEW
    function showView(viewId) {
      document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.add('hidden');
      });

      const activePanel = document.getElementById(`view-${viewId}`);
      if (activePanel) {
        activePanel.classList.remove('hidden');
      }

      // Update Nav Buttons style
      document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-view') === viewId) {
          btn.className = 'nav-tab-btn flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap bg-blue-600 text-white shadow-md shadow-blue-600/30';
        } else {
          btn.className = 'nav-tab-btn flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap text-slate-300 hover:bg-slate-800/70 hover:text-white';
        }
      });
    }

    // ON INITIAL LOAD
    window.onload = function() {
      switchUserRole('vendedor');
      renderProducts();
      renderCart();
      renderStockTable();
      renderUsersList();
      renderPendingSales();
      renderReports();
      renderClientCatalog();
      renderAdminProductsTable();
    };

    // PRODUCT CATALOG RENDER (Vendedor)
    function renderProducts() {
      const grid = document.getElementById('salesProductGrid');
      grid.innerHTML = state.products.map(p => `
        <div class="p-3.5 border border-blue-900/40 rounded-xl bg-slate-950/60 hover:bg-slate-900 hover:border-blue-500/60 transition shadow-sm flex flex-col justify-between space-y-3">
          <div class="space-y-2">
            <div>
              <div class="flex justify-between items-start">
                <span class="text-[10px] uppercase font-bold text-slate-500">ID #${p.idProduto}</span>
                <span class="text-xs font-semibold ${p.quantidadeEstoque > 10 ? 'text-emerald-400' : 'text-amber-400'}">Estoque: ${p.quantidadeEstoque}</span>
              </div>
              <h4 class="font-bold text-white text-sm mt-0.5">${p.nome}</h4>
              <div class="text-[11px] font-medium text-slate-400">Marca: <span class="font-semibold text-blue-200">${p.marca || 'N/A'}</span></div>
              <div class="text-[10px] uppercase font-bold text-blue-400 mt-1">${p.categoria}</div>
              <p class="text-blue-300 font-extrabold text-base mt-1">R$ ${p.preco.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
          <button onclick="addToCart(${p.idProduto})" ${p.quantidadeEstoque === 0 ? 'disabled' : ''} class="w-full text-xs bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20">
            <i class="fa-solid fa-cart-plus"></i> Adicionar à Venda
          </button>
        </div>
      `).join('');
    }

    // PRODUCT ADMIN MANAGEMENT
    function renderAdminProductsTable() {
      const tbody = document.getElementById('adminProductsTableBody');
      const totalCount = document.getElementById('adminTotalProductsCount');
      if (totalCount) totalCount.innerText = state.products.length;

      if (!tbody) return;
      tbody.innerHTML = state.products.map(p => `
        <tr class="hover:bg-slate-850/60 transition">
          <td class="p-3 font-mono font-bold text-slate-400">#00${p.idProduto}</td>
          <td class="p-3 font-semibold text-white">${p.nome}</td>
          <td class="p-3 text-blue-200 font-medium">${p.marca || 'SVP'}</td>
          <td class="p-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800/50">${p.categoria}</span></td>
          <td class="p-3 font-bold text-emerald-400">R$ ${p.preco.toFixed(2).replace('.', ',')}</td>
          <td class="p-3 font-medium text-slate-200">${p.quantidadeEstoque} un.</td>
          <td class="p-3 text-right">
            <button onclick="removeProduct(${p.idProduto})" class="text-rose-400 hover:text-rose-300 font-bold hover:underline text-xs">Excluir</button>
          </td>
        </tr>
      `).join('');
    }

    function openProductModal() {
      document.getElementById('productModal').classList.remove('hidden');
    }

    function closeProductModal() {
      document.getElementById('productModal').classList.add('hidden');
    }

    function saveNewProduct() {
      const nome = document.getElementById('newProdNome').value;
      const marca = document.getElementById('newProdMarca').value;
      const categoria = document.getElementById('newProdCategoria').value;
      const preco = parseFloat(document.getElementById('newProdPreco').value);
      const estoque = parseInt(document.getElementById('newProdEstoque').value) || 0;

      if (!nome || isNaN(preco) || preco <= 0) {
        showToast("Preencha o nome do produto e um preço válido!", "error");
        return;
      }

      const newProd = {
        idProduto: state.products.length + 1,
        nome: nome,
        marca: marca || 'Genérica',
        categoria: categoria,
        preco: preco,
        quantidadeEstoque: estoque
      };

      state.products.push(newProd);

      // Refresh all views
      renderProducts();
      renderStockTable();
      renderClientCatalog();
      renderAdminProductsTable();

      // Clear form & close
      document.getElementById('newProdNome').value = '';
      document.getElementById('newProdMarca').value = '';
      document.getElementById('newProdPreco').value = '';
      closeProductModal();

      showToast(`Produto "${nome}" cadastrado com sucesso!`);
    }

    function removeProduct(id) {
      state.products = state.products.filter(p => p.idProduto !== id);
      renderProducts();
      renderStockTable();
      renderClientCatalog();
      renderAdminProductsTable();
      showToast("Produto removido do catálogo!");
    }

    // CART MANAGEMENT
    function addToCart(productId) {
      const prod = state.products.find(p => p.idProduto === productId);
      if (!prod || prod.quantidadeEstoque <= 0) return;

      const existingItem = state.currentCart.find(item => item.idProduto === productId);
      if (existingItem) {
        if (existingItem.quantidade + 1 > prod.quantidadeEstoque) {
          showToast("Quantidade limite em estoque atingida!", "error");
          return;
        }
        existingItem.quantidade++;
        existingItem.subtotal = existingItem.quantidade * existingItem.precoUnitario;
      } else {
        state.currentCart.push({
          idItem: state.currentCart.length + 1,
          idProduto: prod.idProduto,
          nome: `${prod.nome} (${prod.marca || 'SVP'})`,
          quantidade: 1,
          precoUnitario: prod.preco,
          subtotal: prod.preco
        });
      }

      renderCart();
      showToast(`${prod.nome} adicionado ao carrinho!`);
    }

    function updateCartItemQty(itemId, delta) {
      const item = state.currentCart.find(i => i.idItem === itemId);
      if (!item) return;

      const prod = state.products.find(p => p.idProduto === item.idProduto);
      const newQty = item.quantidade + delta;

      if (newQty <= 0) {
        state.currentCart = state.currentCart.filter(i => i.idItem !== itemId);
      } else if (newQty > prod.quantidadeEstoque) {
        showToast("Quantidade solicitada excede o estoque disponível!", "error");
        return;
      } else {
        item.quantidade = newQty;
        item.subtotal = item.quantidade * item.precoUnitario;
      }

      renderCart();
    }

    function renderCart() {
      const cartContainer = document.getElementById('orderItemsList');
      if (state.currentCart.length === 0) {
        cartContainer.innerHTML = `<div class="text-center text-slate-500 py-8 text-xs">Nenhum produto adicionado à venda.</div>`;
        document.getElementById('saleSubtotal').innerText = `R$ 0,00`;
        document.getElementById('saleTotal').innerText = `R$ 0,00`;
        return;
      }

      let total = 0;
      cartContainer.innerHTML = state.currentCart.map(item => {
        total += item.subtotal;
        return `
          <div class="p-2.5 bg-slate-950/80 border border-blue-900/40 rounded-xl flex items-center justify-between text-xs">
            <div class="space-y-0.5">
              <span class="font-bold text-white">${item.nome}</span>
              <div class="text-slate-400">R$ ${item.precoUnitario.toFixed(2).replace('.', ',')} un.</div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="flex items-center border border-blue-900/60 rounded-lg overflow-hidden bg-slate-900">
                <button onclick="updateCartItemQty(${item.idItem}, -1)" class="px-2 py-1 text-slate-300 hover:bg-blue-900/50">-</button>
                <span class="px-2 font-bold text-white">${item.quantidade}</span>
                <button onclick="updateCartItemQty(${item.idItem}, 1)" class="px-2 py-1 text-slate-300 hover:bg-blue-900/50">+</button>
              </div>
              <span class="font-bold text-blue-300 w-16 text-right">R$ ${item.subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        `;
      }).join('');

      document.getElementById('saleSubtotal').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
      document.getElementById('saleTotal').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // FORWARD TO CASHIER (Vendedor -> Caixa)
    function forwardToCashier() {
      if (state.currentCart.length === 0) {
        showToast("Adicione produtos ao carrinho antes de enviar ao caixa!", "error");
        return;
      }

      const totalVal = state.currentCart.reduce((sum, i) => sum + i.subtotal, 0);
      const newPendingSale = {
        idVenda: state.completedSales.length + state.pendingSales.length + 1,
        cliente: "Maria Silva",
        vendedor: "João Pereira",
        items: [...state.currentCart],
        valorTotal: totalVal,
        data: new Date().toLocaleDateString('pt-BR')
      };

      state.pendingSales.push(newPendingSale);
      state.currentCart = [];
      renderCart();
      renderPendingSales();

      showToast(`Venda #${newPendingSale.idVenda} enviada com sucesso para o Operador de Caixa!`);
    }

    // CASHIER RENDER & PAYMENT
    function renderPendingSales() {
      const list = document.getElementById('pendingSalesList');
      document.getElementById('pendingSalesCount').innerText = `${state.pendingSales.length} pendentes`;

      if (state.pendingSales.length === 0) {
        list.innerHTML = `<div class="text-center text-slate-500 py-6 text-xs">Nenhuma venda pendente de pagamento no momento.</div>`;
        document.getElementById('payTotalAmount').innerText = `R$ 0,00`;
        return;
      }

      list.innerHTML = state.pendingSales.map((sale, idx) => `
        <div class="p-3.5 border border-amber-900/50 bg-amber-950/30 rounded-xl flex justify-between items-center text-xs">
          <div>
            <strong class="text-white text-sm block">Venda #${sale.idVenda}</strong>
            <span class="text-slate-400">Cliente: ${sale.cliente} | Vendedor: ${sale.vendedor}</span>
            <div class="text-amber-300 font-extrabold text-sm mt-1">Total: R$ ${sale.valorTotal.toFixed(2).replace('.', ',')}</div>
          </div>
          <button onclick="selectActivePayment(${idx})" class="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-3 py-1.5 rounded-lg">
            Processar
          </button>
        </div>
      `).join('');

      selectActivePayment(0);
    }

    let activePaymentIndex = 0;
    function selectActivePayment(idx) {
      if (!state.pendingSales[idx]) return;
      activePaymentIndex = idx;
      const sale = state.pendingSales[idx];
      document.getElementById('payClientName').innerText = sale.cliente;
      document.getElementById('payVendorName').innerText = sale.vendedor;
      document.getElementById('payTotalAmount').innerText = `R$ ${sale.valorTotal.toFixed(2).replace('.', ',')}`;
    }

    function selectPaymentMethod(method) {
      state.selectedPaymentMethod = method;
      document.querySelectorAll('.pay-method-btn').forEach(btn => {
        btn.classList.remove('border-blue-500', 'bg-blue-950/60', 'text-blue-200');
        btn.classList.add('border-blue-900/50', 'bg-slate-950', 'text-slate-300');
      });
      event.currentTarget.classList.add('border-blue-500', 'bg-blue-950/60', 'text-blue-200');
      event.currentTarget.classList.remove('border-blue-900/50', 'bg-slate-950', 'text-slate-300');
    }

    function confirmPaymentAndEmitReceipt() {
      if (state.pendingSales.length === 0) {
        showToast("Nenhuma venda disponível para processar!", "error");
        return;
      }

      const sale = state.pendingSales[activePaymentIndex];
      
      // Deduct stock
      sale.items.forEach(item => {
        const prod = state.products.find(p => p.idProduto === item.idProduto);
        if (prod) prod.quantidadeEstoque = Math.max(0, prod.quantidadeEstoque - item.quantidade);
      });

      state.completedSales.push({
        idVenda: sale.idVenda,
        cliente: sale.cliente,
        vendedor: sale.vendedor,
        data: sale.data,
        valorTotal: sale.valorTotal,
        formaPagamento: state.selectedPaymentMethod,
        status: "Concluída"
      });

      state.pendingSales.splice(activePaymentIndex, 1);

      renderProducts();
      renderPendingSales();
      renderStockTable();
      renderReports();

      showToast(`Pagamento da Venda #${sale.idVenda} confirmado e comprovante emitido!`);
    }

    // STOCK MANAGEMENT (Estoquista)
    function renderStockTable() {
      const tbody = document.getElementById('stockTableBody');
      tbody.innerHTML = state.products.map(p => `
        <tr class="hover:bg-slate-850/60 transition">
          <td class="p-4 font-mono font-bold text-slate-400">#00${p.idProduto}</td>
          <td class="p-4 font-semibold text-white">${p.nome}</td>
          <td class="p-4 text-blue-200">R$ ${p.preco.toFixed(2).replace('.', ',')}</td>
          <td class="p-4 font-bold ${p.quantidadeEstoque > 10 ? 'text-white' : 'text-rose-400'}">${p.quantidadeEstoque} un.</td>
          <td class="p-4">
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${p.quantidadeEstoque > 10 ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50' : 'bg-amber-950/80 text-amber-300 border border-amber-800/50'}">
              ${p.quantidadeEstoque > 10 ? 'Estoque Ok' : 'Baixo Estoque'}
            </span>
          </td>
          <td class="p-4 text-right space-x-2">
            <button onclick="quickStockChange(${p.idProduto}, 5)" class="px-2 py-1 bg-blue-900/50 hover:bg-blue-800/70 border border-blue-700/50 text-blue-200 rounded text-xs font-bold">+5 Entrada</button>
            <button onclick="quickStockChange(${p.idProduto}, -1)" class="px-2 py-1 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/50 text-rose-300 rounded text-xs font-bold">-1 Saída</button>
          </td>
        </tr>
      `).join('');
    }

    function quickStockChange(productId, qty) {
      const prod = state.products.find(p => p.idProduto === productId);
      if (prod) {
        prod.quantidadeEstoque = Math.max(0, prod.quantidadeEstoque + qty);
        renderStockTable();
        renderProducts();
        showToast(`Estoque de "${prod.nome}" atualizado!`);
      }
    }

    function openStockModal() {
      const select = document.getElementById('stockProductSelect');
      select.innerHTML = state.products.map(p => `<option value="${p.idProduto}">${p.nome} (Atual: ${p.quantidadeEstoque})</option>`).join('');
      document.getElementById('stockModal').classList.remove('hidden');
    }

    function closeStockModal() {
      document.getElementById('stockModal').classList.add('hidden');
    }

    function saveStockEntry() {
      const prodId = parseInt(document.getElementById('stockProductSelect').value);
      const addQty = parseInt(document.getElementById('stockAddQty').value) || 0;
      quickStockChange(prodId, addQty);
      closeStockModal();
    }

    // ADMIN MANAGEMENT
    function renderUsersList() {
      const list = document.getElementById('usersList');
      list.innerHTML = state.users.map(u => `
        <div class="p-3 border border-blue-900/40 bg-slate-950/50 rounded-xl flex justify-between items-center text-xs">
          <div>
            <strong class="text-white text-sm block">${u.nome}</strong>
            <span class="text-slate-400">Login: ${u.login} | Cargo: <span class="font-semibold text-blue-400">${u.cargo}</span></span>
          </div>
          <span class="px-2 py-1 bg-slate-900 border border-blue-900/50 text-blue-300 rounded font-mono">ID #${u.idUsuario}</span>
        </div>
      `).join('');
    }

    function openUserModal() {
      document.getElementById('userModal').classList.remove('hidden');
    }

    function closeUserModal() {
      document.getElementById('userModal').classList.add('hidden');
    }

    function saveNewUser() {
      const name = document.getElementById('newUserName').value;
      const login = document.getElementById('newUserLogin').value;
      const cargo = document.getElementById('newUserCargo').value;

      if (!name || !login) {
        showToast("Preencha todos os campos do usuário!", "error");
        return;
      }

      state.users.push({
        idUsuario: state.users.length + 2,
        nome: name,
        login: login,
        cargo: cargo
      });

      renderUsersList();
      closeUserModal();
      showToast(`Novo usuário ${name} cadastrado!`);
    }

    function renderReports() {
      const container = document.getElementById('salesReportsList');
      const totalSalesVal = state.completedSales.reduce((acc, s) => acc + s.valorTotal, 0);

      document.getElementById('adminTotalSalesValue').innerText = `R$ ${totalSalesVal.toFixed(2).replace('.', ',')}`;
      document.getElementById('adminTotalSalesCount').innerText = `${state.completedSales.length} vendas concluídas`;

      container.innerHTML = state.completedSales.map(s => `
        <div class="p-3 bg-slate-950 border border-blue-900/40 rounded-xl text-xs space-y-1">
          <div class="flex justify-between font-bold text-white">
            <span>Venda #${s.idVenda} - ${s.cliente}</span>
            <span class="text-blue-400">R$ ${s.valorTotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div class="text-slate-400 flex justify-between">
            <span>Forma: ${s.formaPagamento} | Vendedor: ${s.vendedor}</span>
            <span>Data: ${s.data}</span>
          </div>
        </div>
      `).join('');
    }

    function exportSalesReport() {
      showToast("Relatório de Vendas exportado com sucesso!");
    }

    // CLIENT CATALOG RENDER
    function renderClientCatalog() {
      const grid = document.getElementById('clientCatalogGrid');
      grid.innerHTML = state.products.map(p => `
        <div class="p-4 bg-slate-900/90 border border-blue-900/40 rounded-2xl shadow-lg space-y-3 flex flex-col justify-between">
          <div>
            <span class="text-[10px] uppercase font-bold text-blue-300 bg-blue-950 border border-blue-800/50 px-2 py-0.5 rounded-full">${p.categoria}</span>
            <h4 class="font-bold text-white text-base mt-2">${p.nome}</h4>
            <div class="text-xl font-extrabold text-blue-400 mt-1">R$ ${p.preco.toFixed(2).replace('.', ',')}</div>
            <p class="text-xs text-slate-400 mt-1">Disponibilidade: ${p.quantidadeEstoque} unidades</p>
          </div>
          <button onclick="addToCart(${p.idProduto}); showView('venda');" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-xl text-xs transition shadow-md shadow-blue-600/30">
            Comprar / Solicitar
          </button>
        </div>
      `).join('');
    }

    // TOAST NOTIFICATIONS
    function showToast(message, type = "success") {
      const toast = document.getElementById('toastNotification');
      const msg = document.getElementById('toastMessage');
      const icon = document.getElementById('toastIcon');

      msg.innerText = message;
      if (type === "error") {
        icon.innerHTML = `<i class="fa-solid fa-circle-exclamation text-rose-400 text-xl"></i>`;
      } else {
        icon.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 text-xl"></i>`;
      }

      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 3000);
    }

    // SEARCH FILTER
    function filterProducts() {
      const query = document.getElementById('searchProductInput').value.toLowerCase();
      const cards = document.querySelectorAll('#salesProductGrid > div');
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? 'flex' : 'none';
      });
    }
