document.addEventListener('DOMContentLoaded', () => {
    // --- Cart System ---
    const cartToggleBtn = document.querySelector('.cart-toggle');
    const closeCartBtn = document.getElementById('closeCart');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const cartCountEls = document.querySelectorAll('.cart-count');
    const quickAddBtns = document.querySelectorAll('.btn-quick-add');

    let cart = [];

    // Open/Close Cart
    function toggleCart() {
        cartDrawer.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        if(cartDrawer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            renderCart();
        } else {
            document.body.style.overflow = '';
        }
    }

    cartToggleBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', (e) => {
        // Only close if clicking exactly on the overlay
        toggleCart();
    });

    // Add to Cart
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.dataset.id;
            const title = btn.dataset.title;
            const price = parseFloat(btn.dataset.price);
            const img = btn.dataset.img;

            addToCart({ id, title, price, img, quantity: 1 });
            
            // Show feedback
            const originalText = btn.textContent;
            btn.textContent = 'Added ✓';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
            
            // Open cart
            if(!cartDrawer.classList.contains('active')){
                toggleCart();
            }
        });
    });

    function addToCart(item) {
        const existing = cart.find(i => i.id === item.id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push(item);
        }
        updateCartCount();
        renderCart();
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEls.forEach(el => el.textContent = totalItems);
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is currently empty.</div>';
            cartTotalEl.textContent = '£0.00';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-price">£${item.price.toFixed(2)}</div>
                    <div class="qty-controls">
                        <button class="qty-btn minus" data-index="${index}">-</button>
                        <input type="text" class="qty-input" value="${item.quantity}" readonly>
                        <button class="qty-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotalEl.textContent = `£${total.toFixed(2)}`;

        // Attach listeners to new elements
        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                cart[e.target.dataset.index].quantity++;
                updateCartCount();
                renderCart();
            });
        });

        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.dataset.index;
                if(cart[idx].quantity > 1) {
                    cart[idx].quantity--;
                }
                updateCartCount();
                renderCart();
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.dataset.index;
                cart.splice(idx, 1);
                updateCartCount();
                renderCart();
            });
        });
    }

    // --- Mobile Menu System ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const closeMenuBtn = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    function toggleMobileMenu() {
        if(!mobileMenu) return;

        mobileMenu.classList.toggle('active');
        if(mobileMenu.classList.contains('active')){
            cartOverlay.classList.add('active'); // Reuse overlay
            cartOverlay.removeEventListener('click', toggleCart);
            cartOverlay.addEventListener('click', toggleMobileMenu, { once: true });
        } else {
            cartOverlay.classList.remove('active');
            cartOverlay.addEventListener('click', toggleCart);
        }
    }

    if(mobileMenuToggle && closeMenuBtn) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        closeMenuBtn.addEventListener('click', toggleMobileMenu);
    }
});
