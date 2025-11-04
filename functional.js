// Sistema de Reservas y Carrito - Funcionalidades Completas

// ============ BARBERÍA - SISTEMA DE RESERVAS ============
function initBarberBooking() {
    const barberButtons = document.querySelectorAll('#basico .demo-btn, #basico .gold-btn');
    barberButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showBarberModal();
        });
    });
}

function showBarberModal() {
    const modal = document.createElement('div');
    modal.id = 'barberModal';
    modal.className = 'functional-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🔥 Reservar Turno - UrbanCut</h2>
            <div class="booking-form">
                <div class="form-group">
                    <label>Servicio</label>
                    <select id="barberService" class="form-control">
                        <option value="">Selecciona un servicio</option>
                        <option value="Corte Premium|25">Corte Premium - $25</option>
                        <option value="Barba & Bigote|18">Barba & Bigote - $18</option>
                        <option value="Afeitado Premium|30">Afeitado Premium - $30</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" id="barberDate" class="form-control" min="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label>Hora</label>
                    <select id="barberTime" class="form-control">
                        <option value="">Selecciona una hora</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" id="barberName" class="form-control" placeholder="Tu nombre">
                </div>
                <div class="form-group">
                    <label>Teléfono</label>
                    <input type="tel" id="barberPhone" class="form-control" placeholder="Tu teléfono">
                </div>
                <button onclick="confirmBarberBooking()" class="btn-confirm">Confirmar Reserva</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function confirmBarberBooking() {
    const service = document.getElementById('barberService').value.split('|');
    const date = document.getElementById('barberDate').value;
    const time = document.getElementById('barberTime').value;
    const name = document.getElementById('barberName').value;
    const phone = document.getElementById('barberPhone').value;

    if (!service[0] || !date || !time || !name || !phone) {
        alert('⚠️ Por favor completa todos los campos');
        return;
    }

    alert(`✅ ¡Reserva Confirmada!\n\nServicio: ${service[0]}\nPrecio: $${service[1]}\nFecha: ${new Date(date).toLocaleDateString('es-ES')}\nHora: ${time}\nCliente: ${name}\nTeléfono: ${phone}\n\n¡Te esperamos en UrbanCut!`);
    document.getElementById('barberModal').remove();
}

// ============ HOTEL - SISTEMA DE RESERVAS ============
function initHotelBooking() {
    const hotelButtons = document.querySelectorAll('#estandar .demo-btn, #estandar .demo-btn-small, #estandar .blue-btn');
    hotelButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showHotelModal();
        });
    });
}

function showHotelModal() {
    const modal = document.createElement('div');
    modal.id = 'hotelModal';
    modal.className = 'functional-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🏨 Reservar Habitación - Hotel Serrano</h2>
            <div class="booking-form">
                <div class="form-group">
                    <label>Tipo de Habitación</label>
                    <select id="hotelRoom" class="form-control">
                        <option value="">Selecciona una habitación</option>
                        <option value="Suite Deluxe|120">Suite Deluxe - $120/noche</option>
                        <option value="Habitación Doble|85">Habitación Doble - $85/noche</option>
                        <option value="Cabaña Familiar|150">Cabaña Familiar - $150/noche</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Check-in</label>
                        <input type="date" id="hotelCheckIn" class="form-control" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label>Check-out</label>
                        <input type="date" id="hotelCheckOut" class="form-control" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Número de Huéspedes</label>
                    <input type="number" id="hotelGuests" class="form-control" value="1" min="1" max="10">
                </div>
                <div class="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" id="hotelName" class="form-control" placeholder="Tu nombre">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="hotelEmail" class="form-control" placeholder="tu@email.com">
                </div>
                <div class="form-group">
                    <label>Teléfono</label>
                    <input type="tel" id="hotelPhone" class="form-control" placeholder="Tu teléfono">
                </div>
                <div id="hotelTotal" class="booking-total"></div>
                <button onclick="confirmHotelBooking()" class="btn-confirm">Confirmar Reserva</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    
    // Calcular total automáticamente
    ['hotelRoom', 'hotelCheckIn', 'hotelCheckOut'].forEach(id => {
        document.getElementById(id).addEventListener('change', calculateHotelTotal);
    });
}

function calculateHotelTotal() {
    const room = document.getElementById('hotelRoom').value.split('|');
    const checkIn = new Date(document.getElementById('hotelCheckIn').value);
    const checkOut = new Date(document.getElementById('hotelCheckOut').value);
    
    if (room[1] && checkIn && checkOut && checkOut > checkIn) {
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const total = parseFloat(room[1]) * nights;
        document.getElementById('hotelTotal').innerHTML = `
            <p><strong>Noches:</strong> ${nights}</p>
            <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        `;
    }
}

function confirmHotelBooking() {
    const room = document.getElementById('hotelRoom').value.split('|');
    const checkIn = document.getElementById('hotelCheckIn').value;
    const checkOut = document.getElementById('hotelCheckOut').value;
    const guests = document.getElementById('hotelGuests').value;
    const name = document.getElementById('hotelName').value;
    const email = document.getElementById('hotelEmail').value;
    const phone = document.getElementById('hotelPhone').value;

    if (!room[0] || !checkIn || !checkOut || !name || !email || !phone) {
        alert('⚠️ Por favor completa todos los campos');
        return;
    }

    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const total = parseFloat(room[1]) * nights;

    alert(`✅ ¡Reserva Confirmada!\n\nHabitación: ${room[0]}\nCheck-in: ${new Date(checkIn).toLocaleDateString('es-ES')}\nCheck-out: ${new Date(checkOut).toLocaleDateString('es-ES')}\nNoches: ${nights}\nHuéspedes: ${guests}\nTotal: $${total.toFixed(2)}\n\nConfirmación enviada a: ${email}`);
    document.getElementById('hotelModal').remove();
}

// ============ E-COMMERCE - CARRITO DE COMPRAS ============
let cart = [];

function initShoppingCart() {
    const shopButtons = document.querySelectorAll('#ecommerce .demo-btn-small.pink-btn');
    const products = [
        { id: 1, name: 'Collar Luna Creciente', price: 28.99 },
        { id: 2, name: 'Aros Perla Elegante', price: 28.00 },
        { id: 3, name: 'Pulsera Cristal Rosa', price: 22.50 },
        { id: 4, name: 'Anillo Minimalista', price: 18.99 },
        { id: 5, name: 'Collar Corazón Dorado', price: 32.00 },
        { id: 6, name: 'Set Aros Múltiples', price: 24.99 }
    ];

    shopButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(products[index]);
            showNotification(`✅ ${products[index].name} agregado al carrito`);
        });
    });

    // Ícono del carrito
    const cartIcon = document.querySelector('#ecommerce .fa-shopping-bag');
    if (cartIcon) {
        cartIcon.style.cursor = 'pointer';
        cartIcon.parentElement.style.position = 'relative';
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = '0';
        cartIcon.parentElement.appendChild(badge);
        cartIcon.addEventListener('click', showCart);
    }
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
    }
}

function showCart() {
    const modal = document.createElement('div');
    modal.id = 'cartModal';
    modal.className = 'functional-modal';
    
    let cartHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button onclick="changeQuantity(${item.id}, -1)" class="qty-btn">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)" class="qty-btn">+</button>
                        <button onclick="removeFromCart(${item.id})" class="remove-btn">🗑️</button>
                    </div>
                    <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                </div>
            `;
        });
    }

    const shipping = subtotal > 50 ? 0 : 5;
    const total = subtotal + shipping;

    modal.innerHTML = `
        <div class="modal-content cart-content">
            <span class="close-modal">&times;</span>
            <h2>🛍️ Tu Carrito de Compras</h2>
            <div class="cart-items">${cartHTML}</div>
            ${cart.length > 0 ? `
                <div class="cart-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <strong>$${subtotal.toFixed(2)}</strong>
                    </div>
                    <div class="summary-row">
                        <span>Envío:</span>
                        <strong>${shipping === 0 ? 'Gratis' : '$' + shipping.toFixed(2)}</strong>
                    </div>
                    <div class="summary-row total">
                        <span>Total:</span>
                        <strong>$${total.toFixed(2)}</strong>
                    </div>
                </div>
                <div class="cart-actions">
                    <button onclick="document.getElementById('cartModal').remove()" class="btn-secondary">Seguir Comprando</button>
                    <button onclick="checkout()" class="btn-confirm">Proceder al Pago</button>
                </div>
            ` : ''}
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function changeQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartBadge();
            document.getElementById('cartModal').remove();
            showCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartBadge();
    document.getElementById('cartModal').remove();
    if (cart.length > 0) {
        showCart();
    }
}

function checkout() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5;
    const total = subtotal + shipping;
    
    alert(`✅ ¡Compra Exitosa!\n\nProductos: ${cart.length} items\nSubtotal: $${subtotal.toFixed(2)}\nEnvío: ${shipping === 0 ? 'Gratis' : '$' + shipping.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\n¡Gracias por tu compra en Luna Accesorios!`);
    
    cart = [];
    updateCartBadge();
    document.getElementById('cartModal').remove();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ============ INICIALIZACIÓN ============
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initBarberBooking();
        initHotelBooking();
        initShoppingCart();
    }, 1000);
});

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
